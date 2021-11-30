using AutoMapper;
using CraxIT_Project.DTO;
using CraxIT_Project.Models;
using CraxIT_Project.Service;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace CraxIT_Project.Controllers
{
    [Route("api/")]
    [ApiController]
    public class RegisterController : ControllerBase
    {
        private RegisterService registerService;

        public RegisterController(RegisterService registerService)
        {
            this.registerService = registerService;
        }



        [Route("register")]
        [HttpPost]
        public IActionResult Register(PersonDto personDto)
        {
            if (!ModelState.IsValid)
                return BadRequest();

            bool registered = this.registerService.Register(personDto, out string id);
            if (!registered)
                return BadRequest();

            return new JsonResult(id);



        }
    }
}
