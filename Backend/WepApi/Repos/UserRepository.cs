using System.Security.Cryptography;
using System.Text;
using Microsoft.EntityFrameworkCore;
using WepApi.Data;
using WepApi.Dtos;
using WepApi.Interfaces;
using WepApi.Model;

namespace WepApi.Repos
{
  public class UserRepository : IUserRepository
  {
    private readonly DataContext _context;

    public UserRepository(DataContext context)
    {
      this._context = context;
    }
    public async Task<User> Authenticate(string UserName, string Password)
    {
      User user = await _context.Users.FirstOrDefaultAsync(x => x.UserName == UserName);

      if(user == null || user.PasswordKey == null)
      return null;

      if (!MatchPasswordHash(Password, user.Password, user.PasswordKey))
        return null;
      
      return user;
    }

    private bool MatchPasswordHash(string passwordText, byte[] password, byte[] passwordKey)
    {
      using var hmac = new HMACSHA512(passwordKey);
      var passHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(passwordText));

      for(int i =0; i < passHash.Length; i++)
      if(passHash[i] != password[i])
      return false;

      return true;
    }

    public void Register(RegisterDto dto)
    {
      byte[] passwordHash, passwordKey;
      using var hmac = new HMACSHA512();
      passwordKey = hmac.Key;
      passwordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(dto.Password));
      
      var user = new User
      {
        UserName = dto.UserName,
        Password = passwordHash,
        PasswordKey = passwordKey,
        Email = dto.Email,
        Mobile = dto.Mobile
      };
      _context.Users.Add(user); 
    }

    public async Task<bool> UserAlreadyExist(string email)
    {
      return await _context.Users.AnyAsync(x => x.Email == email);
    }
  }
}