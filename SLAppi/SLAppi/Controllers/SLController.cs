using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace SLAppi.Controllers
{
    public class SLController : ApiController
    {

        public object Get(string origin, string destination)
        {
            var url = @"http://api.sl.se/api2/TravelplannerV2/trip.json?key=6a517447db2c4a72adc256399cef82ad&originId={0}&destId={1}";
            url = string.Format(url, origin, destination);
            var request = (HttpWebRequest) WebRequest.Create(url);
            var response = (HttpWebResponse ) request.GetResponse();
            var text = new StreamReader(response.GetResponseStream()).ReadToEnd();
            return text;
        }
    }
}