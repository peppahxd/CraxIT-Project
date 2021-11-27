using CraxIT_Project.Controllers;
using CraxIT_Project.Models;
using NUnit.Framework;
using System.Collections.Generic;

namespace UnitTesting
{
   
    public class RegistrationTests
    {

        [SetUp]
        public void Setup()
        {
            
        }

        [Test]
        public void GetAllHouses_ShouldReturnAllHouses()
        {
            var houses = this.GetTestHouses();
        }




        private List<House> GetTestHouses()
        {
            var testProducts = new List<House>();
            testProducts.Add(new House("Small house"));
            testProducts.Add(new House("Large house"));
            testProducts.Add(new House("Cabin"));

            return testProducts;
        }
    }
}