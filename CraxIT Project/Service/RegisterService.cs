using AutoMapper;
using CraxIT_Project.DTO;
using CraxIT_Project.Models;
using Microsoft.AspNetCore.Identity;

namespace CraxIT_Project.Service
{
    public class RegisterService
    {

        private IMapper Mapper;
        private UserManager<Person> userManager;
        private SignInManager<Person> signInManager;
        private Context Context;

        public RegisterService(Context Context, UserManager<Person> userManager, SignInManager<Person> signInManager, IMapper mapper)
        {
            this.Context = Context;
            this.userManager = userManager;
            this.signInManager = signInManager;
            this.Mapper = mapper;
        }

        public bool Register(PersonDto dto, out string id)
        {
            id = "";

            var person = Mapper.Map<Person>(dto);

            var result = userManager.CreateAsync(person, dto.Password);
            if (result.IsCompletedSuccessfully)
            {
                id = person.Id;
                return true;
            }
            
            
            return false;
        }
    }
}
