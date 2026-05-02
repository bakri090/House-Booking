using WepApi.Repos;




namespace WepApi.Interfaces
{
    public interface IUnitOfWork
    {
        public ICityRepository CityRepository { get; }
        public IUserRepository UserRepository { get; }
        public IPropertyRepository propertyRepository {get; }
        public IPropertyTypeRepository propertyTypeRepository {get; }
        public IFurnishingTypeRepository furnishingTypeRepository {get; }
        public Task<bool> SaveAsync();
    }
}