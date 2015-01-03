using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Web.Http;
using System.Web.Mvc;
using Newtonsoft.Json;
using SlDatabaseAccess;
using SlDatabaseAccess.Entities;
using SLAppi.Logic;

namespace SLAppi.Controllers
{
    public class TestController : ApiController
    {
        // GET api/test
        public object Get()
        {
           return new SearchLogic().GetDestinations(new Coordinate{X = 8, Y = 8});
        }
    }
}
