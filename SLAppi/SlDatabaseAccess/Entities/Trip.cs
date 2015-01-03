using System;
using System.ComponentModel.DataAnnotations.Schema;
using System.Dynamic;

namespace SlDatabaseAccess.Entities
{
    public class Trip : BaseEntity
    {
        //[ForeignKey("Origin")]
        //public int OriginKey { get; set; }
        public Location Origin { get; set; }
        //[ForeignKey("Destination")]
        //public int DestinationKey { get; set; }
        public Location Destination { get; set; }
        public DateTime Date { get; set; }
        [ForeignKey("Coordinate")]
        public int CoordinateKey { get; set; }
        public virtual Coordinate Coordinate { get; set; }
    }

}
