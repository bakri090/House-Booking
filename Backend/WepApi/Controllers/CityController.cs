using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace WepApi.Controllers;
[Route("api/[controller]")]
[ApiController]
public class CityController : ControllerBase
{
	[HttpGet]
	public IActionResult getAll()
	{
		string[] cities = { "Atalanta", "New York" };
		return Ok(cities);
	}
}
