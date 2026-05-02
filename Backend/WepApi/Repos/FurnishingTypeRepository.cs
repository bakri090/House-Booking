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
  public class FurnishingTypeRepository : IFurnishingTypeRepository
  {
    private readonly DataContext dc;

    public FurnishingTypeRepository(DataContext dc )
    {
    this.dc = dc;
    }
    public async Task<IEnumerable<FurnishingType>> GetAll()
    {
    return await dc.FurnishingTypes.ToListAsync();
    }
  }
}