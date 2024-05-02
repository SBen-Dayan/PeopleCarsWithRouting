using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PeopleCars.Data
{
    public class CarsRepository
    {
        private readonly string _connectionString;

        public CarsRepository(string connectionString)
        {
            _connectionString = connectionString;
        }

        public List<Car> GetCarsForPerson(int personId)
        {
            using var context = new PeopleCarsDataContext(_connectionString);
            return context.Cars.Where(c => c.PersonId == personId).ToList();
        }

        public int GetCarCountForPerson(int personId)
        {
            using var context = new PeopleCarsDataContext(_connectionString);
            return context.Cars.Count(c => c.PersonId == personId);
            //return context.Database.ExecuteSqlInterpolated($"SELECT TOP 1 COUNT(*) FROM Cars WHERE personId = {personId}");
        }

        public void DeleteCarsForPerson(int personId)
        {
            using var context = new PeopleCarsDataContext(_connectionString);
            context.Database.ExecuteSqlInterpolated($"DELETE FROM Cars WHERE personId = {personId}");
        }

        public void Insert(Car car)
        {
            using var context = new PeopleCarsDataContext(_connectionString);
            context.Cars.Add(car);
            context.SaveChanges();
        }
    }
}
