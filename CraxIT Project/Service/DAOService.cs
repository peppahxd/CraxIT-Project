using CraxIT_Project.Models;

namespace CraxIT_Project.Service
{
    public class DAOService : IService
    {
        private readonly Context Context;

        public DAOService(Context context)
        {
            this.Context = context;
        }

        public void Create(object o)
        {
            this.Context.Houses.Add((House)o);
            this.Context.SaveChanges();
        }

        public List<object> GetAll()
        {
            return this.Context.Houses.ToList<object>();
        }

        public void Update(object o)
        {
            this.Context.Houses.Update((House)o);
            this.Context.SaveChanges();
        }
    }
}
