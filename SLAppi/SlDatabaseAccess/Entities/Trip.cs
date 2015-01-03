using System;
using System.ComponentModel.DataAnnotations.Schema;
using System.Dynamic;

namespace SlDatabaseAccess.Entities
{
    public class Trip : BaseEntity
    {
        public Location Origin { get; set; }
        public Location Destination { get; set; }
        public DateTime Date { get; set; }
        [ForeignKey("Coordinate")]
        public int CoordinateKey { get; set; }
        public virtual Coordinate Coordinate { get; set; }
        public virtual User User { get; set; }
    }

}
