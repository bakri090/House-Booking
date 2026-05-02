using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using WepApi.Dtos;
using WepApi.Errors;
using WepApi.Interfaces;
using WepApi.Model;

namespace WepApi.Controllers
{
    public class AccountController : BaseController
    {
        private readonly IUnitOfWork _ofw;
        private readonly IConfiguration _configuration;

        public AccountController(IUnitOfWork ofw, IConfiguration configuration)
        {
            this._ofw = ofw;
            this._configuration = configuration;
        }
        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDto loginDto)
        {
            var user = await _ofw.UserRepository.Authenticate(loginDto.UserName, loginDto.Password);
            ApiError apiError = new ApiError();
            if (user == null)
            {
                apiError.ErrorCode= Unauthorized().StatusCode;
                apiError.ErrorMessage = "Invalid userName or Password";
                apiError.ErrorDetails = "This error apear when provided user id or password does not exists";
                return Unauthorized(apiError);
            }
            var logRes = new LoginResDto();
            logRes.UserName = loginDto.UserName;
            logRes.Token = CreateJwt(user);
            return Ok(logRes);
        }
        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterDto regDto)
        {
            ApiError apiError = new ApiError();
            if(string.IsNullOrEmpty(regDto.Email) || string.IsNullOrEmpty(regDto.Password))
            {
                apiError.ErrorCode = BadRequest().StatusCode;
                apiError.ErrorMessage = "email password can not be blank";
                return BadRequest(apiError);
            }
            if (string.IsNullOrEmpty(regDto.UserName))
            {
                var len = regDto.Email.IndexOf('@');
                regDto.UserName = regDto.Email.Substring(0,len);
            }
			if (await _ofw.UserRepository.UserAlreadyExist(regDto.Email))
            {
                return BadRequest("User is already exist");
            }
            _ofw.UserRepository.Register(regDto);
            await _ofw.SaveAsync();
            return StatusCode(201);

        }
        private string CreateJwt(User user)
        {
            // Implementation for creating JWT token
            var key = _configuration.GetSection("Jwt:key").Value ?? "no key";
            var SymmetricSecurityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key));
            var cliams = new Claim[]
            {
                new Claim(ClaimTypes.Name, user.UserName),
                new Claim(ClaimTypes.NameIdentifier,user.Id.ToString())
            };
            var signingCredentials = new SigningCredentials(SymmetricSecurityKey, SecurityAlgorithms.HmacSha256Signature);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(cliams),
                Expires = DateTime.UtcNow.AddDays(30),
                SigningCredentials = signingCredentials
            };
            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}