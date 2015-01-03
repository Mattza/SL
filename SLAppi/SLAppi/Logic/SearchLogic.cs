using System.Collections.Generic;
using System.Linq;
using SlDatabaseAccess;
using SlDatabaseAccess.Entities;

namespace SLAppi.Logic
{
    public class SearchLogic
    {

        public List<Location> GetDestinations(Coordinate coords)
        {
            var destinations = new SlContext().Trips.GroupBy(x => x.Destination);
            var scoreByDist = destinations.ToList().Select(x =>
                new
                {
                    x.Key,
                    destinationScore = x.Select(y => abs(y.Coordinate.X - coords.X) + abs(y.Coordinate.Y - coords.Y)),
                }).ToList();
            return scoreByDist.OrderByDescending(x => Mean(x.destinationScore)).Select(x => x.Key).ToList();
        }


        //private static IEnumerable<long> Decay(IEnumerable<long> src, float w = 1)
        //{
        //    return src.Select(x => Decay(x, 1)).Cast<long>();
        //}

        private static long Mean(IEnumerable<long> src)
        {
            return src.Sum()/src.Count();
        }

        private static long Decays(long l, float w = 1)
        {
            return (long) (1/(w*l + 1));
        }

        private static long abs(long l)
        {
            return l < 0 ? -l : l;
        }

    }
}