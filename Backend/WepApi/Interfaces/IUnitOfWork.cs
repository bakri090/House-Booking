using WepApi.Repos;

namespace WepApi.Interfaces
{
    public interface IUnitOfWork
    {
        public ICityRepository CityRepository { get; }
        public IUserRepository UserRepository { get; }
        public Task<bool> SaveAsync();
    }
}