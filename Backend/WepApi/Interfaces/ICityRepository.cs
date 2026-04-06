using WepApi.Model;

namespace WepApi.Repos
{
    public interface ICityRepository
    {
        Task<IEnumerable<City>> GetAllAsync();
        void Add(City city);
        void Delete(int id);
        Task<City?> UpdateAsync(int id);
    }
}