using Microsoft.VisualStudio.TestTools.UnitTesting;
using SLAppi.Logic;

namespace LogicTest
{
    [TestClass]
    public class LogicTests
    {
        [TestMethod]
        public void TestGetSmartSuggestions()
        {
            new SearchLogic().GetSmartSuggestions("bananfisk2000");
        }
    }
}
