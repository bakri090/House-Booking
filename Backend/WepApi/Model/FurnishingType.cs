using System.ComponentModel.DataAnnotations;

namespace WepApi.Model
{
    public class FurnishingType : BaseEntity
    {
        [Required]
        public string Name { get; set; } = string.Empty;
    }
}