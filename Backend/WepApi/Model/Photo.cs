using System.ComponentModel.DataAnnotations.Schema;

namespace WepApi.Model
{
    [Table("Photos")]
    public class Photo : BaseEntity
    {
        public string ImageUrl { get; set; } = string.Empty;
        public bool IsPrimary { get; set; }
        public int PropertyId { get; set; }
        public required Property Property {get; set;} 
    }
}