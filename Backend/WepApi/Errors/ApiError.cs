using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;

namespace WepApi.Errors
{
    public class ApiError
    {
        public ApiError()
        {
        }
        public ApiError(int errorCode, string errorMessage, string? errorDetails = null)
        {
            ErrorCode = errorCode;
            ErrorMessage = errorMessage;
            ErrorDetails = errorDetails;
        }

        public int ErrorCode { get; set; }
        public string ErrorMessage { get; set; } = string.Empty;
        public string? ErrorDetails { get; set; }

        public override string ToString()
        {
            var opt = new JsonSerializerOptions()
            {
                PropertyNamingPolicy = JsonNamingPolicy.CamelCase
            };
            return JsonSerializer.Serialize(this,opt);
        }
    }
}