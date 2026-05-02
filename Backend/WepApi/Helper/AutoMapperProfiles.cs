using AutoMapper;
using WepApi.Dtos;
using WepApi.Model;
namespace WepApi.Helper
{
    public class AutoMapperProfiles: Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<City, CityDto>().ReverseMap();
            CreateMap<City, CityUpdateDto>().ReverseMap();
            CreateMap<Property,PropertyListDto>()
            .ForMember(
                p => p.City , op => op.MapFrom(c => c.City.Name)
            )
            .ForMember(p => p.PropertyType, op => op.MapFrom(p => p.PropertyType.Name))
            .ForMember(c => c.Country, op => op.MapFrom(c => c.City.Country))
            .ForMember(f => f.FurnishingType, op => op.MapFrom(f => f.FurnishingType.Name));

            CreateMap<Property, PropertyDetailDto>().ForMember(
                p => p.City , op => op.MapFrom(c => c.City.Name)
            )
            .ForMember(p => p.PropertyType, op => op.MapFrom(p => p.PropertyType.Name))
            .ForMember(c => c.Country, op => op.MapFrom(c => c.City.Country))
            .ForMember(f => f.FurnishingType, op => op.MapFrom(f => f.FurnishingType.Name));
            CreateMap<PropertyType,KeyValuePairDto>().ReverseMap();
            CreateMap<FurnishingType,KeyValuePairDto>().ReverseMap();
        }
    }
}