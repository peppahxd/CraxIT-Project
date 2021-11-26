using System.ComponentModel.DataAnnotations;

namespace CraxIT_Project.Models
{
    public class House
    {
        [Key]
        public long id { get; set; }
        public string Name { get; set; }
    }
}
