using WepApi.Data;
using WepApi.Interfaces;

namespace WepApi.Repos
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly DataContext _context;

        public UnitOfWork(DataContext context)
        {
            this._context = context;
        }
        public ICityRepository CityRepository => new CityRepository(_context);
        public IUserRepository UserRepository => new UserRepository(_context);

    public IPropertyRepository propertyRepository => new PropertyRepository(_context);
    public IPropertyTypeRepository propertyTypeRepository => new PropertyTypeRepository(_context);
    public IFurnishingTypeRepository furnishingTypeRepository => new FurnishingTypeRepository(_context);
    public async Task<bool> SaveAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }
    }
}