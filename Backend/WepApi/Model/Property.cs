using System.ComponentModel.DataAnnotations.Schema;

namespace WepApi.Model
{
    public class Property : BaseEntity
    {
        public int SellRent { get; set; }
        public string Name { get; set; } = string.Empty;
        public int PropertyTypeId { get; set; }
        public required PropertyType PropertyType {get; set;}
        public int BHK { get; set; }
        public int FurnishingTypeId { get; set; }
        public required FurnishingType FurnishingType {get; set;}
        public int Price { get; set; }
        public int BuiltArea { get; set; }
        public int CarpetArea { get; set; }
        public string Address { get; set; } = string.Empty;
        public string Address2 { get; set; } = string.Empty;
        public int CityId { get; set; }
        public required City City { get; set; }
        public int FloorNo { get; set; }
        public int TotalFloors { get; set; }
        public bool ReadyToMove { get; set; }
        public string MainEntrance { get; set; } = string.Empty;
        public int Security { get; set; }
        public bool Gated { get; set; }
        public int Maintenance { get; set; }
        public DateTime EstPossessionOn { get; set; }
        public int Age { get; set; }
        public string Description { get; set; } = string.Empty;
        public required ICollection<Photo> Photos {get; set;}
        public DateTime PostedOn { get; set; } = DateTime.UtcNow;
        [ForeignKey("User")]
        public int PostedBy { get; set; }
        public required User User { get; set; }
    }
}