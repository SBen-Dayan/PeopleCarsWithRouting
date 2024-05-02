using Microsoft.EntityFrameworkCore;

namespace PeopleCars.Data;

public class PeopleCarsDataContext : DbContext
{
    private readonly string _connectionString;

    public PeopleCarsDataContext(string connectionString)
    {
        _connectionString = connectionString;
    }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseSqlServer(_connectionString);
    }
    
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        foreach (var relationship in modelBuilder.Model.GetEntityTypes().SelectMany(e => e.GetForeignKeys()))
        {
            relationship.DeleteBehavior = DeleteBehavior.Restrict;
        }
    }
    
    public DbSet<Person> People { get; set; }
    public DbSet<Car> Cars { get; set; }
}
