
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using WepApi.Dtos;
using WepApi.Interfaces;

namespace WepApi.Controllers
{
    public class PropertyTypeController : BaseController
    {
        private readonly IUnitOfWork unitOf;
        private readonly IMapper mapper;

    public PropertyTypeController(IUnitOfWork unitOf,IMapper mapper)
        {
            this.unitOf = unitOf;
            this.mapper = mapper;
        }
        [HttpGet("list")]
        public async Task<IActionResult> GetAll()
        {
            var props = await unitOf.propertyTypeRepository.GetAll();
            if(props is null) return NotFound();
            var propDtos = mapper.Map<IEnumerable<KeyValuePairDto>>(props);
            return Ok(propDtos);
        }
    }
}