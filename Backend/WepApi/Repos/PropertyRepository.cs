using Microsoft.EntityFrameworkCore;
using WepApi.Data;
using WepApi.Interfaces;
using WepApi.Model;

namespace WepApi.Repos
{
public class PropertyRepository : IPropertyRepository
{
    private readonly DataContext dc;

    public PropertyRepository(DataContext dc)
    {
    this.dc = dc;
    }
    public async Task<IEnumerable<Property>> GetPropertiesAsync(int SellRent)
    {
    var props = await dc.Properties
    .Include( p => p.PropertyType)
    .Include( p => p.FurnishingType)
    .Include(p => p.City)
    .Where(p => p.SellRent == SellRent).ToListAsync();
    
    return props;
    }
        public async Task<Property?> GetPropertyDetailAsync(int id)
    {
    var prop = await dc.Properties
    .Include( p => p.PropertyType)
    .Include( p => p.FurnishingType)
    .Include(p => p.City)
    .Where(p => p.Id == id).FirstOrDefaultAsync();
    if(prop == null)
        return null;

    return prop;
    }
}
}