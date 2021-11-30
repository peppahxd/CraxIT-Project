using AutoMapper;
using CraxIT_Project.DTO;
using CraxIT_Project.Models;
using CraxIT_Project.Service;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace CraxIT_Project.Controllers
{
    [Route("api")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private LoginService loginService;

        public LoginController(LoginService loginService)
        {
            this.loginService = loginService; 
        }


        [Route("login")]
        [HttpPost]
        public IActionResult Login(PersonDto personDto)
        {
            bool loggedIn = loginService.Login(personDto, out string id);
            if (!loggedIn)
                return BadRequest();

            return new JsonResult(id);

        }
    }
}
