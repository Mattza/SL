using System.Data.Entity.Migrations;

namespace SlDatabaseAccess.Migrations
{
    internal sealed class Configuration : DbMigrationsConfiguration<SlContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
        }

        protected override void Seed(SlContext context)
        {
        
        }
    }
}
