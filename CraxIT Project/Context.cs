using CraxIT_Project.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace CraxIT_Project
{
    public class Context : IdentityDbContext
    {
        
        public virtual DbSet<Person> Persons { get; set; }

        public virtual DbSet<House> Houses { get; set; }

        public Context() { }

        public Context(DbContextOptions<Context> options) : base(options) { }


    }
}
