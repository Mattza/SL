namespace SlDatabaseAccess.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class M1 : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Trips", "User_id", c => c.Int());
            CreateIndex("dbo.Trips", "User_id");
            AddForeignKey("dbo.Trips", "User_id", "dbo.Users", "id");
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Trips", "User_id", "dbo.Users");
            DropIndex("dbo.Trips", new[] { "User_id" });
            DropColumn("dbo.Trips", "User_id");
        }
    }
}
