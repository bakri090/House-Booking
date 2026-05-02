using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using WepApi.Dtos;
using WepApi.Errors;
using WepApi.Interfaces;

namespace WepApi.Controllers
{
    public class PropertyController : BaseController
    {
        private readonly IUnitOfWork uof;
        private readonly IMapper mapper;

        public PropertyController(IUnitOfWork unitOf, IMapper mapper)
        {
            this.uof = unitOf;
            this.mapper = mapper;
        }
        [HttpGet("list/{sellRent}")]
        public async Task<IActionResult> GetPropertyList(int SellRent)
        {
            var props = await uof.propertyRepository.GetPropertiesAsync(SellRent);
            var propsDto = mapper.Map<IEnumerable<PropertyListDto>>(props);
            return Ok(propsDto);
        }
        [HttpGet("detail/{id}")]
        public async Task<IActionResult> GetPropertyDetail(int id)
        {
            var props = await uof.propertyRepository.GetPropertyDetailAsync(id);
            if(props == null)
            {
                var apiError = new ApiError();
                apiError.ErrorCode = NotFound().StatusCode;
                apiError.ErrorMessage = "no property found";
                return NotFound(apiError);
            }
            var propDto = mapper.Map<PropertyDetailDto>(props);
            return Ok(propDto);
        }
    }
}