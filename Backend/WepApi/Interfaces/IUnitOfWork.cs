using WepApi.Repos;

namespace WepApi.Interfaces
{
    public interface IUnitOfWork
    {
        public ICityRepository CityRepository { get; }
        public Task<bool> SaveAsync();
    }
}