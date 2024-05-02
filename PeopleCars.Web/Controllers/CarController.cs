using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PeopleCars.Data;
using PeopleCars.Web.Models;

namespace PeopleCars.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CarController : ControllerBase
    {
        private readonly string _connectionString;

        public CarController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("conStr");
        }

        [HttpGet("carsForPerson")]
        public List<Car> GetCars(int id) => new CarsRepository(_connectionString).GetCarsForPerson(id);

        [HttpGet("carCountForPerson")]
        //public int GetCarCount(int id) => new CarsRepository(_connectionString).GetCarCountForPerson(id);
        public int GetCarCount(int id)
        {
            var repo = new CarsRepository(_connectionString);
            var result = repo.GetCarCountForPerson(id);
            return result;
        }

        [HttpPost("addCar")]
        public void AddCar(Car car) => new CarsRepository(_connectionString).Insert(car);

        [HttpPost("deleteCarsForPerson")]
        public void DeleteCars(PersonIdModel idModel) => new CarsRepository(_connectionString).DeleteCarsForPerson(idModel.Id);
    }
}
