namespace CraxIT_Project.Service
{
    public interface ICRUDService
    {
        void Create<T>(T t) where T : class;
        void Update<T>(T t) where T : class;
        List<T> GetAll<T>() where T : class;
    }
}
