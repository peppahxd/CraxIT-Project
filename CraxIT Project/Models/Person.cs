using Microsoft.AspNetCore.Identity;

namespace CraxIT_Project.Models
{
    public class Person : IdentityUser
    {
        public string FirstName { get; set; }

        public string LastName { get; set; }

        public Person() {}

    }
}
