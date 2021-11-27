using System.ComponentModel.DataAnnotations;

namespace CraxIT_Project.Models
{
    public class House
    {
        public House(string name)
        {
            Name = name;
        }

        [Key]
        public long id { get; set; }
        public string Name { get; set; }
    }
}
