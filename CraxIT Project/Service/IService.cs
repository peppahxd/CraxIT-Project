namespace CraxIT_Project.Service
{
    public interface IService
    {
        void Create(object o);
        void Update(object o);
        List<object> GetAll();
    }
}
