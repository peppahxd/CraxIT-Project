using AutoMapper;
using CraxIT_Project.DTO;
using CraxIT_Project.Models;
using CraxIT_Project.Service;
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
        private DAOService Service;
        private IMapper Mapper;

        public ApiController(Context Context, DAOService service, UserManager<Person> userManager, SignInManager<Person> signInManager, IMapper mapper)
        {
            this.Context = Context;
            this.Service = service;
            this.userManager = userManager;
            this.signInManager = signInManager;
            this.Mapper = mapper;

        }


        [Route("login")]
        [HttpPost]
        public IActionResult Login(PersonDto personDto)
        {
            var userName = Mapper.Map<Person>(personDto).UserName;

            var person = Context.Persons.FirstOrDefault(x => x.UserName.Equals(userName));
            if (person == null)
                return StatusCode(400);


            var signIn = signInManager.CheckPasswordSignInAsync(person, personDto.Password, false);
            if (signIn.Result.Succeeded)
            {
                return new JsonResult(person.Id);
            }

            return StatusCode(400);
        }


        [Route("register")]
        [HttpPost]
        public async Task<IActionResult> Register(PersonDto personDto)
        {
            if (!ModelState.IsValid)
                return StatusCode(400);


            var person = Mapper.Map<Person>(personDto);

            var result = await userManager.CreateAsync(person, personDto.Password);
            if (result.Succeeded)
                return new JsonResult(person.Id);
            else
                return StatusCode(400);


        }


        [Route("houses")]
        [HttpGet]
        public IActionResult RetrieveHouses(string privKey)
        {
            var person = Context.Persons.FirstOrDefault(x => x.Id.Equals(privKey));
            if (person == null)
                return StatusCode(400);


            return new JsonResult(this.Service.GetAll()); 
        }

        [Route("createHouse")]
        [HttpPost]
        public IActionResult CreateHouse(HouseDto houseDto)
        {
            if (!this.ValidateUser(houseDto.privKey))
                return StatusCode(400);

            if (!ModelState.IsValid)
                return StatusCode(400);


            var house = Mapper.Map<House>(houseDto);
            
            this.Service.Create(house);

            return StatusCode(201);
        }


        [Route("editHouse")]
        [HttpPut]
        public IActionResult EditHouse(HouseDto houseDto)
        {
            if (!this.ValidateUser(houseDto.privKey))
                return StatusCode(400);

            if (!ModelState.IsValid)
                return StatusCode(400);

            var house = Mapper.Map<House>(houseDto);

            this.Service.Update(house);

            return StatusCode(200);
        }


        private bool ValidateUser(string privKey)
        {
            var person = this.Context.Persons.FirstOrDefault(x => x.Id.Equals(privKey));
            if (person == null)
                return false;

            return true;
        }
    }
}
