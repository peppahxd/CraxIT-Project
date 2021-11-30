using AutoMapper;
using CraxIT_Project.DTO;
using CraxIT_Project.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace CraxIT_Project.Service
{
    public class LoginService
    {
        private IMapper Mapper;
        private UserManager<Person> userManager;
        private SignInManager<Person> signInManager;
        private Context Context;

        public LoginService(Context Context, UserManager<Person> userManager, SignInManager<Person> signInManager, IMapper mapper)
        {
            this.Context = Context;
            this.userManager = userManager;
            this.signInManager = signInManager;
            this.Mapper = mapper;
        }

        public bool Login(PersonDto dto, out string id)
        {
            id = "";

            var userName = Mapper.Map<Person>(dto).UserName;

            var person = Context.Persons.FirstOrDefault(x => x.UserName.Equals(userName));
            if (person == null)
                return false;


            var signIn = signInManager.CheckPasswordSignInAsync(person, dto.Password, false);
            if (signIn.Result.Succeeded)
            {
                id = person.Id;
                return true;
            }

            return false;
        }

    }
}
