using System.Net;
using WepApi.Errors;

namespace WepApi.Middlewares
{
    public class ExceptionMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<ExceptionMiddleware> _logger;
    private readonly IHostEnvironment _env;

    public ExceptionMiddleware(RequestDelegate next, ILogger<ExceptionMiddleware> logger, IHostEnvironment env)
        {
            this._next = next;
            this._logger = logger;
      this._env = env;
    }
        public async Task Invoke(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (Exception ex)
            {
                ApiError apiError;
                HttpStatusCode statusCode = HttpStatusCode.InternalServerError;
                string message = "";
                ReturnTypeError(ex.GetType(),ref statusCode,ref message);

                if (_env.IsDevelopment())
                {
                    apiError = new ApiError((int)statusCode,ex.Message,ex.StackTrace?.ToString().Trim());
                }else
                {
                    apiError = new ApiError((int)statusCode,message);
                    
                }
                _logger.LogError(ex, ex.Message);
                context.Response.StatusCode = (int) statusCode;
                context.Response.ContentType = "application/json";
                await context.Response.WriteAsync(apiError.ToString() ?? "null details");
            }
        }

        private void ReturnTypeError(Type exType,ref HttpStatusCode statusCode,ref string message)
        {

            if(exType == typeof(UnauthorizedAccessException))
            {
                statusCode = HttpStatusCode.Forbidden;
                message = "You are not authorized";
            }
            else
            {
                statusCode = HttpStatusCode.InternalServerError;
                message = "Some unknown error occured";
            }
        }
    }
}