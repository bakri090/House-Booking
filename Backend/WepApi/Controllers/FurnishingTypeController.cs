
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using WepApi.Dtos;
using WepApi.Interfaces;

namespace WepApi.Controllers
{
    public class FurnishingTypeController : BaseController
    {
        private readonly IUnitOfWork unitOf;
        private readonly IMapper mapper;

    public FurnishingTypeController(IUnitOfWork unitOf,IMapper mapper)
        {
            this.unitOf = unitOf;
            this.mapper = mapper;
        }
        [HttpGet("list")]
        public async Task<IActionResult> GetAll()
        {
            var props = await unitOf.furnishingTypeRepository.GetAll();
            if(props is null) return NotFound();
            var propDtos = mapper.Map<IEnumerable<KeyValuePairDto>>(props);
            return Ok(propDtos);
        }
    }
}