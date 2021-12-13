using lab2.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Net;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;

namespace lab2.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private readonly ISessionManager _sessionManager;


     
        public HomeController(ILogger<HomeController> logger, ISessionManager sessionManager)
        {
           _logger = logger;
            _sessionManager = sessionManager;
        }

        public IActionResult Welcome()
        {
            return View();
            
        }


        public IActionResult Login()
        {
            return View();
        }

        

        [HttpPost]
        public IActionResult SignIn(string UserName)
        {

            _sessionManager.ChangeName(UserName);
            var json = System.IO.File.ReadAllText(@"C:\Users\BK\Desktop\Codedump\EGUI21Z-Korkmaz-Baran\lab2\lab2\.json\activities\activities.json");
            
            _sessionManager.LoadActivities(json);
            var activities = JsonConvert.DeserializeObject<Activities>(json);
            foreach (var i in activities.ActivityList)
            {
                _sessionManager.Codes.Add(i.Code);
            }
 

            return RedirectToAction(actionName: "Index", controllerName: "Home", new
                 {
                     userName = UserName

                 });
        }

        [HttpGet]
        public IActionResult Index(string userName)
        {
            //_sessionManager.UserName = userName;
            _sessionManager.changeDate(DateTime.Now);
            string date = _sessionManager.CurrentDate.ToString("yyyy-MM");

            var json = System.IO.File.ReadAllText(@"C:\Users\BK\Desktop\Codedump\EGUI21Z-Korkmaz-Baran\lab2\lab2\.json\" + _sessionManager.Name() + "-" +
                   date + ".json");


            _sessionManager.LoadEntries(json);
            _sessionManager.addDaily();
            return View(_sessionManager);
            
        }

        [HttpPost]

        public IActionResult Index(DateTime selectedDate)
        {

            _sessionManager.changeDate(selectedDate);
            string date = selectedDate.ToString("yyyy-MM");
            
            //var json = System.IO.File.ReadAllText(@"C:\Users\BK\Desktop\Codedump\EGUI21Z-Korkmaz-Baran\lab2\lab2\.json\" + _sessionManager.UserName + "-" +
                // date + ".json");
            //_sessionManager.entries = JsonConvert.DeserializeObject<Entries>(json);
            

            _sessionManager.addDaily();
            return View(_sessionManager);

        }
      
  

        public IActionResult AddEntry()
        {
            return View();
        }

        [HttpPost]
        public IActionResult AddNewEntry(Entry newEntry)
        {
            string date = _sessionManager.CurrentDate.ToString("yyyy-MM");
            var json = System.IO.File.ReadAllText(@"C:\Users\BK\Desktop\Codedump\EGUI21Z-Korkmaz-Baran\lab2\lab2\.json\" + _sessionManager.Name() + "-" +
                   date + ".json");
           //var entry = JsonConvert.DeserializeObject<Entry>(json);

            _sessionManager.Entries.EntryList.Add(newEntry);
            //var entry = JsonConvert.DeserializeObject<Entry>(json);

            JObject obj = (JObject)JToken.FromObject(_sessionManager.Entries);
            System.IO.File.WriteAllText(@"C:\Users\BK\Desktop\Codedump\EGUI21Z-Korkmaz-Baran\lab2\lab2\.json\" + _sessionManager.Name() + "-" +
                   date + ".json", obj.ToString());
            // return View("~/Views/Home/Index.cshtml");
            return RedirectToAction(actionName: "Index", controllerName: "Home", new
            {
                selectedDate = _sessionManager.CurrentDate

            }) ;

        }

        public IActionResult EditEntry(Entry editEntry)
        {   
            return View(editEntry);
        }

     

        [HttpPost]
        public IActionResult Edit(Entry editEntry)
        {
            var json = System.IO.File.ReadAllText(@"C:\Users\BK\Desktop\korkmaz.json");
            var entry = JsonConvert.DeserializeObject<Entry>(json);

            
            JObject obj = (JObject)JToken.FromObject(entry);
            System.IO.File.WriteAllText(@"C:\Users\BK\Desktop\korkmaz.json", obj.ToString());
            return View("~/Views/Home/Index.cshtml");

        }

        [HttpPost]
        public IActionResult DeleteEntry([FromBody] Entry deleteEntry)
        {
            var json = System.IO.File.ReadAllText(@"C:\Users\BK\Desktop\korkmaz.json");
            var entry = JsonConvert.DeserializeObject<Entry>(json);

            
            JObject obj = (JObject)JToken.FromObject(entry);
            //obj.Remove(deleteEntry);
            obj.Property("entries").Remove();
            System.IO.File.WriteAllText(@"C:\Users\BK\Desktop\korkmaz2.json", obj.ToString());
            return View("~/Views/Activity/AddEntry.cshtml");

        }


        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View();
        }
    }
}
