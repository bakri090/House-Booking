using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WepApi.Data;
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
		return Ok(await unitOfWork.CityRepository.GetAllAsync());
	}
	[HttpPost()]
	public async Task<IActionResult> add([FromBody] City city)
	{
		unitOfWork.CityRepository.Add(city);
		await unitOfWork.SaveAsync();
		return Ok(city);
	}
	[HttpDelete("{id}")]
	public async Task<IActionResult> delete(int id)
	{
		unitOfWork.CityRepository.Delete(id);
		await unitOfWork.SaveAsync();
		return Ok(new { message = "City deleted successfully" });
	}
}
