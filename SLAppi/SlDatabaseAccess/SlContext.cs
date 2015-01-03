using System.Data.Entity;
using SlDatabaseAccess.Entities;

namespace SlDatabaseAccess
{
    public class SlContext : DbContext
    {
        public DbSet<User> Users{ get; set; }
        public DbSet<Coordinate> Coordinates{ get; set; }
        public DbSet<Trip> Trips{ get; set; }
        public DbSet<Location> Locations { get; set; }
    }
}
