using Microsoft.EntityFrameworkCore;
using WepApi.Data;
using WepApi.Model;

namespace WepApi.Repos
{
  public class CityRepository : ICityRepository
  {
    private readonly DataContext _context;

    public CityRepository(DataContext context)
    {
      this._context = context;
    }
    public void Add(City city)
        {
            _context.Cities.Add(city);
        }

    public void Delete(int id)
    {
      var city = _context.Cities.Find(id);
      if (city != null)
      {
        _context.Cities.Remove(city);
      }
    }

    public async Task<IEnumerable<City>> GetAllAsync()
    {
      return await _context.Cities.ToListAsync();
    }
  }
}