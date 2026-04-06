using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WepApi.Data;
using WepApi.Dtos;
using WepApi.Interfaces;
using WepApi.Model;
using WepApi.Repos;

namespace WepApi.Controllers;

[Route("api/[controller]")]
[ApiController]
public class CityController : ControllerBase
{

	private readonly IUnitOfWork _unitOfWork;
	private readonly IMapper _mapper;

	public CityController(IUnitOfWork unitOfWork, IMapper mapper)
	{
		this._unitOfWork = unitOfWork;
		this._mapper = mapper;
	}

	[HttpGet]
	public async Task<IActionResult> getAll()
	{
		throw new UnauthorizedAccessException();
		var cities = await _unitOfWork.CityRepository.GetAllAsync();
		var citiesDto = _mapper.Map<IEnumerable<CityDto>>(cities);

		return Ok(citiesDto);
	}

	[HttpPost("post")]
	public async Task<IActionResult> add([FromBody] CityDto city)
	{
		City cityToAdd = new City
		{
			Name = city.Name,
			LastUpdatedBy = 1, // Replace with actual user ID
			LastUpdatedOn = DateTime.UtcNow
		};
		_unitOfWork.CityRepository.Add(cityToAdd);
		await _unitOfWork.SaveAsync();
		return StatusCode(201, new { message = "City added successfully" });
	}

	[HttpPut("update/{id}")]
	public async Task<IActionResult> update(int id, [FromBody] CityDto cityDto)
	{
		if (id != cityDto.Id)
			return BadRequest("update not allowed");

		var cityFromDb = await _unitOfWork.CityRepository.UpdateAsync(id);

		if (cityFromDb == null)
			return NotFound(new { message = "No city with this id" });

		cityFromDb.LastUpdatedBy = 1;
		cityFromDb.LastUpdatedOn = DateTime.UtcNow;
		_mapper.Map(cityDto, cityFromDb);
		await _unitOfWork.SaveAsync();
		return StatusCode(200);
	}

	[HttpPut("updateName/{id}")]
	public async Task<IActionResult> update(int id, [FromBody] CityUpdateDto cityDto)
	{

		var cityFromDb = await _unitOfWork.CityRepository.UpdateAsync(id);
		if (cityFromDb == null)
			return NotFound(new { message = "No city with this id" });
		cityFromDb.LastUpdatedBy = 1;
		cityFromDb.LastUpdatedOn = DateTime.UtcNow;
		_mapper.Map(cityDto, cityFromDb);
		throw new Exception("Some unknown error occured");
		await _unitOfWork.SaveAsync();
		return StatusCode(200);
	}

	[HttpDelete("delete/{id}")]
	public async Task<IActionResult> delete(int id)
	{
		_unitOfWork.CityRepository.Delete(id);
		await _unitOfWork.SaveAsync();
		return Ok(new { message = "City deleted successfully" });
	}

}
