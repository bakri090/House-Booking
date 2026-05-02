using System.ComponentModel.DataAnnotations;

namespace WepApi.Model
{
    public class City : BaseEntity
    {
        public string Name { get; set; } = string.Empty;
        [Required]
        public required string Country { get; set; } 
    }
}