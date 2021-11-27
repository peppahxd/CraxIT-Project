namespace CraxIT_Project.DTO
{
    public class HouseDto
    {
        public string privKey { get; set; }
        public int id { get; set; }
        public string Name { get; set; }

        public HouseDto(string privKey, string Name)
        {
            this.privKey = privKey;
            this.Name = Name;  
        }
    }
}
