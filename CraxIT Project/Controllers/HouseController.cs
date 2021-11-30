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
    public class HouseController : ControllerBase
    {
        private HouseService HouseService;

        public HouseController(HouseService houseService)
        {
            this.HouseService = houseService;
        }

        [Route("houses")]
        [HttpGet]
        public IActionResult RetrieveHouses(string privKey)
        {
            var houseList = this.HouseService.RetrieveHouses(privKey);
            if (houseList == null)
                return Unauthorized();


            return new JsonResult(houseList); 
        }

        [Route("createHouse")]
        [HttpPost]
        public IActionResult CreateHouse(HouseDto houseDto)
        {
            if (!ModelState.IsValid)
                return BadRequest();

            var house = this.HouseService.CreateHouse(houseDto);
            if (house == null)
                return Unauthorized();

            return Created("", house);
        }


        [Route("editHouse")]
        [HttpPut]
        public IActionResult EditHouse(HouseDto houseDto)
        {
            if (!ModelState.IsValid)
                return StatusCode(400);

            var house = this.HouseService.EditHouse(houseDto);
            if (house == null)
                return Unauthorized();

            return Ok(house);
        }
    }
}
