using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace SlDatabaseAccess.Entities
{
    public class Location : BaseEntity
    {
        public string Name { get; set; }
        public DateTime Date { get; set; }
        [ForeignKey("Coordinate")]
        public int CoordinateKey { get; set; }
        public virtual Coordinate Coordinate { get; set; }
    }
}
