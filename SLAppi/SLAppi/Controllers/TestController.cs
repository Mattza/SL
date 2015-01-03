using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using SlDatabaseAccess;
using SLAppi.Logic;

namespace SLAppi.Controllers
{
    public class TestController : ApiController
    {


        // GET api/test
        public List<object> Get()
        {
            new SlContext().Database.CreateIfNotExists();
            return new SearchLogic().GetSmartSuggestions("bananfisk2000");
        }
    }
}
