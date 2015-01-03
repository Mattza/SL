namespace SlDatabaseAccess.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class M : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Coordinates",
                c => new
                    {
                        id = c.Int(nullable: false, identity: true),
                        X = c.Long(nullable: false),
                        Y = c.Long(nullable: false),
                    })
                .PrimaryKey(t => t.id);
            
            CreateTable(
                "dbo.Locations",
                c => new
                    {
                        id = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                        Date = c.DateTime(nullable: false),
                        CoordinateKey = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.id)
                .ForeignKey("dbo.Coordinates", t => t.CoordinateKey, cascadeDelete: true)
                .Index(t => t.CoordinateKey);
            
            CreateTable(
                "dbo.Trips",
                c => new
                    {
                        id = c.Int(nullable: false, identity: true),
                        Date = c.DateTime(nullable: false),
                        CoordinateKey = c.Int(nullable: false),
                        Destination_id = c.Int(),
                        Origin_id = c.Int(),
                    })
                .PrimaryKey(t => t.id)
                .ForeignKey("dbo.Coordinates", t => t.CoordinateKey, cascadeDelete: true)
                .ForeignKey("dbo.Locations", t => t.Destination_id)
                .ForeignKey("dbo.Locations", t => t.Origin_id)
                .Index(t => t.CoordinateKey)
                .Index(t => t.Destination_id)
                .Index(t => t.Origin_id);
            
            CreateTable(
                "dbo.Users",
                c => new
                    {
                        id = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                    })
                .PrimaryKey(t => t.id);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Trips", "Origin_id", "dbo.Locations");
            DropForeignKey("dbo.Trips", "Destination_id", "dbo.Locations");
            DropForeignKey("dbo.Trips", "CoordinateKey", "dbo.Coordinates");
            DropForeignKey("dbo.Locations", "CoordinateKey", "dbo.Coordinates");
            DropIndex("dbo.Trips", new[] { "Origin_id" });
            DropIndex("dbo.Trips", new[] { "Destination_id" });
            DropIndex("dbo.Trips", new[] { "CoordinateKey" });
            DropIndex("dbo.Locations", new[] { "CoordinateKey" });
            DropTable("dbo.Users");
            DropTable("dbo.Trips");
            DropTable("dbo.Locations");
            DropTable("dbo.Coordinates");
        }
    }
}
