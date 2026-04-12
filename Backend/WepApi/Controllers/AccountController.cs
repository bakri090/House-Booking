using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using WepApi.Dtos;
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
            if (user == null)
            {
                return Unauthorized("Invalid userName or Password");
            }
            var logRes = new LoginResDto();
            logRes.UserName = loginDto.UserName;
            logRes.Token = CreateJwt(user);
            return Ok(logRes);
        }
        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterDto loginDto)
        {
            if(loginDto.Email == null || loginDto.Email == "")
				return BadRequest("Please insert Email field");

			if (await _ofw.UserRepository.UserAlreadyExist(loginDto.Email))
            {
                return BadRequest("User is already exist");
            }
            _ofw.UserRepository.Register(loginDto);
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
                Expires = DateTime.UtcNow.AddMinutes(30),
                SigningCredentials = signingCredentials
            };
            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}