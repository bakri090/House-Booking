using System.ComponentModel.DataAnnotations;

namespace WepApi.Model
{
    public class PropertyType : BaseEntity
    {
        [Required]
        public string Name { get; set; } = string.Empty;
    }
}