using System.ComponentModel.DataAnnotations;

namespace WepApi.Model
{
    public class User : BaseEntity
    {
        [Required]
        public required string UserName { get; set; }
        public required string Email {get; set;}
        public string? Mobile {get; set;}
        [Required]
        public required byte[] Password { get; set; }
        [Required]
        public required byte[] PasswordKey { get; set; }
    }
}