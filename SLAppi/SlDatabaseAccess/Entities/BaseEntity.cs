using System.ComponentModel.DataAnnotations;

namespace SlDatabaseAccess.Entities
{
    public class BaseEntity
    {
        [Key ]
        public int id { get; set; }
    }
}
