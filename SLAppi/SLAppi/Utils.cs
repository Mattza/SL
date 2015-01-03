using Newtonsoft.Json;

namespace SLAppi
{
    public static class Utils
    {
        public static object ToJson(this string s)
        {
            return JsonConvert.DeserializeObject(s);
        }
    }
}