using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SlDatabaseAccess.Entities
{
    public class Coordinate : BaseEntity
    {
        public long X { get; set; }
        public long Y { get; set; }
    }
}
