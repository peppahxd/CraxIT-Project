using CraxIT_Project.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

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

        [Route("houses")]
        [HttpPost]
        public IActionResult RetrieveHouses()
        {
            return Content("");
        }


        [Route("login")]
        [HttpPost]
        public IActionResult Login(LoginModel model)
        {
            if (!ModelState.IsValid)
                return StatusCode(400);

            var person = Context.Persons.FirstOrDefault(x => x.UserName.Equals(model.Username));
            if (person == null)
                return StatusCode(400);


            var result = signInManager.CheckPasswordSignInAsync(person, model.Password, false);
            if (result.IsCompletedSuccessfully)
            {
                ///

                return StatusCode(200); 
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
                FirstName = model.Firstname,
                LastName = model.Lastname,
                UserName = model.Username
            };

            userManager.CreateAsync(person, model.Password);
            return StatusCode(201);
        }
    }
}
