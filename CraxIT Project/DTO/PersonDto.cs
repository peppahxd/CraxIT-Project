using Microsoft.AspNetCore.Identity;

namespace CraxIT_Project.DTO
{
    public class PersonDto
    {

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string UserName { get; set; }

        public string Email { get; set; }

        public string Password { get; set; }

        public PersonDto() { }
    }
}
