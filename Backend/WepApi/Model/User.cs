using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WepApi.Model
{
    public class User
    {
        public int Id { get; set; }
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