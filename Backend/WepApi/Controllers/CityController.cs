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
  
  private readonly IUnitOfWork unitOfWork;

  public CityController( IUnitOfWork unitOfWork)
	{
    this.unitOfWork = unitOfWork;
  }
	[HttpGet]
	public async Task<IActionResult> getAll()
	{
		var cities = await unitOfWork.CityRepository.GetAllAsync();
		var citiesDto = from c in cities
						select new CityDto
						{
							Id = c.Id,
							Name = c.Name
						};
		return Ok(citiesDto);
	}
	[HttpPost()]
	public async Task<IActionResult> add([FromBody] CityDto city)
	{
		City cityToAdd = new City
		{
			Name = city.Name,
			LastUpdatedBy = 1, // Replace with actual user ID
			LastUpdatedOn = DateTime.UtcNow
		};
		unitOfWork.CityRepository.Add(cityToAdd);
		await unitOfWork.SaveAsync();
		return StatusCode(201, new { message = "City added successfully" });
	}
	[HttpDelete("{id}")]
	public async Task<IActionResult> delete(int id)
	{
		unitOfWork.CityRepository.Delete(id);
		await unitOfWork.SaveAsync();
		return Ok(new { message = "City deleted successfully" });
	}
}
