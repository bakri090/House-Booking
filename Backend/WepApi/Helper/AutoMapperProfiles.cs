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
        }
    }
}