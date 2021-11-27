using CraxIT_Project.Models;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace CraxIT_Project.Controllers
{
    [Route("api")]
    [ApiController]
    public class ApiController : ControllerBase
    {
        private UserManager<Person> userManager;
        private SignInManager<Person> signInManager;
        private Context Context;

        public ApiController(Context Context, UserManager<Person> userManager, SignInManager<Person> signInManager)
        {
            this.Context = Context;
            this.userManager = userManager;
            this.signInManager = signInManager;

        }



        [Route("login")]
        [HttpPost]
        public IActionResult Login(LoginModel model)
        {
            if (!ModelState.IsValid)
                return StatusCode(400);

            var person = Context.Persons.FirstOrDefault(x => x.UserName.Equals(model.UserName));
            if (person == null)
                return StatusCode(400);


            var signIn = signInManager.CheckPasswordSignInAsync(person, model.Password, false);
            if (signIn.Result.Succeeded)
            {
                return new JsonResult(person.Id);
            }

            return StatusCode(400);
        }


        [Route("register")]
        [HttpPost]
        public IActionResult Register(RegisterModel model)
        {
            if (!ModelState.IsValid)
                return StatusCode(400);

            Person person = new Person
            {
                FirstName = model.FirstName,
                LastName = model.LastName,
                UserName = model.UserName,
                Email = model.Email
            };

            userManager.CreateAsync(person, model.Password);
            return StatusCode(201);
        }


        [Route("houses")]
        [HttpGet]
        public IActionResult RetrieveHouses()
        {
            return new JsonResult(this.Context.Houses.ToList()); 
        }

        [Route("createHouse")]
        [HttpPost] 
        public IActionResult CreateHouse(House house)
        {
            if (!ModelState.IsValid)
                return StatusCode(400);

            this.Context.Houses.Add(house);
            this.Context.SaveChanges();

            return StatusCode(201);
        }
    }
}
