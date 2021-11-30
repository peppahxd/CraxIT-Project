using AutoMapper;
using CraxIT_Project.DTO;
using CraxIT_Project.Models;
using Microsoft.AspNetCore.Identity;

namespace CraxIT_Project.Service
{
    public class HouseService
    {
        private Context context;
        private CRUDService crudService;
        private IMapper Mapper;

        public HouseService(CRUDService crudService, Context Context, IMapper mapper)
        {
            this.context = Context;
            this.crudService = crudService;
            this.Mapper = mapper;
        }

        public List<House> RetrieveHouses(string privKey)
        {
            if (!this.ValidateUser(privKey))
                return null;


            return crudService.GetAll<House>();
        }

        public House CreateHouse(HouseDto dto)
        {
            if (!this.ValidateUser(dto.privKey))
                return null;

            var house = Mapper.Map<House>(dto);
            this.crudService.Create<House>(house);
            
            return house;
        }

        public House EditHouse(HouseDto dto)
        {
            if (!this.ValidateUser(dto.privKey))
                return null;


            var house = Mapper.Map<House>(dto);
            this.crudService.Update<House>(house);

            return house;
        }

        private bool ValidateUser(string privKey)
        {
            var person = this.context.Persons.FirstOrDefault(x => x.Id.Equals(privKey));
            if (person == null)
                return false;

            return true;
        }

    }
}
