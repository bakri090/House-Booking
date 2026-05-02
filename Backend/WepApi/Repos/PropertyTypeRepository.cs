using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using WepApi.Data;
using WepApi.Interfaces;
using WepApi.Model;

namespace WepApi.Repos
{
  public class PropertyTypeRepository : IPropertyTypeRepository
  {
    private readonly DataContext dc;

    public PropertyTypeRepository(DataContext dc )
    {
    this.dc = dc;
    }
    public async Task<IEnumerable<PropertyType>> GetAll()
    {
    return await dc.PropertyTypes.ToListAsync();
    }
  }
}