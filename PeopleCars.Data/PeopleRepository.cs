using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PeopleCars.Data
{
    public class PeopleRepository
    {
        private readonly string _connectionString;

        public PeopleRepository(string connectionString)
        {
            _connectionString = connectionString;
        }

        public List<Person> GetPeople()
        {
            using var context = new PeopleCarsDataContext(_connectionString);
            return context.People.ToList();
        }

        public Person GetPerson(int id)
        {
            using var context = new PeopleCarsDataContext(_connectionString);
            return context.People.FirstOrDefault(p => p.Id == id);
        }

        public void Insert(Person person)
        {
            using var context = new PeopleCarsDataContext(_connectionString);
            context.People.Add(person);
            context.SaveChanges();
        }
    }
}
