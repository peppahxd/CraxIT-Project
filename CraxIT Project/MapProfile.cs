using AutoMapper;
using CraxIT_Project.DTO;
using CraxIT_Project.Models;

namespace CraxIT_Project
{
    public class MapProfile : Profile
    {
        public MapProfile()
        {
            CreateMap<House, HouseDto>();
            CreateMap<HouseDto, House>();

            CreateMap<Person, PersonDto>();
            CreateMap<PersonDto, Person>();
        }
    }
}
