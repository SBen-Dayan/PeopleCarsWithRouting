using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PeopleCars.Data;

namespace PeopleCars.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PeopleController : ControllerBase
    {
        private readonly string _connectionString;

        public PeopleController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("conStr");
        }

        [HttpGet("getAll")]
        public List<Person> GetAll() => new PeopleRepository(_connectionString).GetPeople();

        [HttpGet("getPerson")]
        public Person GetPerson(int id) => new PeopleRepository(_connectionString).GetPerson(id);

        [HttpPost("addPerson")]
        public void AddPerson(Person person) => new PeopleRepository(_connectionString).Insert(person);

        
    }
}
