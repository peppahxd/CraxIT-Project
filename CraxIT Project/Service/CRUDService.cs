using CraxIT_Project.Models;

namespace CraxIT_Project.Service
{
    public class CRUDService : ICRUDService
    {
        private readonly Context Context;

        public CRUDService(Context context)
        {
            this.Context = context;
        }

        public void Create<T>(T t) where T : class
        {
            this.Context.Set<T>().Add(t);
            this.Context.SaveChanges();
        }

        public void Update<T>(T t) where T : class
        {
            this.Context.Set<T>().Update(t);
            this.Context.SaveChanges();
        }

        public List<T> GetAll<T>() where T : class
        {
            return this.Context.Set<T>().ToList();
        }
    }
}
