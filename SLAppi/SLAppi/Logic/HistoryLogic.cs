using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc.Html;
using SlDatabaseAccess;
using SlDatabaseAccess.Entities;

namespace SLAppi.Logic
{
    public class SearchLogic
    {

        public List<object> GetSmartSuggestions<T>(T data)
        {
            var currentPosition = new Coordinate();
            var locs = new List<Location>().AsQueryable();
            return null;
            throw new NotImplementedException();
        }

    }
}