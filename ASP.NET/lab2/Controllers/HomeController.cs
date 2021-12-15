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
            string path = @"C:\Users\BK\Desktop\Codedump\EGUI21Z-Korkmaz-Baran\lab2\lab2\.json\activities\activities.json";
            _sessionManager.ChangeName(UserName);

            if (!System.IO.File.Exists(path))
            {
                System.IO.File.Create(path);
            }
            else
            {
                var json = System.IO.File.ReadAllText(path);
                _sessionManager.LoadActivities(json);
                var activities = JsonConvert.DeserializeObject<Activities>(json);
                foreach (var i in activities.ActivityList)
                {
                    _sessionManager.Codes.Add(i.Code);
                }
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
            string path = @"C:\Users\BK\Desktop\Codedump\EGUI21Z-Korkmaz-Baran\lab2\lab2\.json\" + _sessionManager.Name() + "-" +
                 date + ".json";
            if (!System.IO.File.Exists(path))
            {
                System.IO.File.Create(path);
            }
            else
            {
                var json = System.IO.File.ReadAllText(path);
                _sessionManager.LoadEntries(json);
                _sessionManager.addDaily();
            }
           


            
            return View(_sessionManager);
            
        }

        [HttpPost]

        public IActionResult Index(DateTime selectedDate)
        {
            string newDate = selectedDate.ToString("yyyy-MM");
            string oldDate = _sessionManager.CurrentDate.Month.ToString("yyyy-MM");

            if (newDate == oldDate)
            {
                _sessionManager.changeDate(selectedDate);
                _sessionManager.addDaily();
            }
            else
            {
                string path = @"C:\Users\BK\Desktop\Codedump\EGUI21Z-Korkmaz-Baran\lab2\lab2\.json\" + _sessionManager.Name() + "-" +
                newDate + ".json";
                if (!System.IO.File.Exists(path))
                {
                    System.IO.File.Create(path);
                }
                else
                {
                    var json = System.IO.File.ReadAllText(path);
                    _sessionManager.LoadEntries(json);
                    _sessionManager.changeDate(selectedDate);
                    _sessionManager.addDaily();
                }

            }
            
            //var json = System.IO.File.ReadAllText(@"C:\Users\BK\Desktop\Codedump\EGUI21Z-Korkmaz-Baran\lab2\lab2\.json\" + _sessionManager.UserName + "-" +
                // date + ".json");
            //_sessionManager.entries = JsonConvert.DeserializeObject<Entries>(json);
            

          //  _sessionManager.addDaily();
            return View(_sessionManager);

        }
      
  

        public IActionResult AddEntry()
        {
            AddEntry newEntry = new();
            newEntry.Codes = _sessionManager.Codes;

            return View(newEntry);
        }

        [HttpPost]
        public IActionResult AddNewEntry(Entry newEntry, DateTime DisplayDate, string Code)
        {
            newEntry.Code = Code;
            newEntry.Date = DisplayDate.ToString("yyyy-MM-dd");
            string date = _sessionManager.CurrentDate.ToString("yyyy-MM");
            string path = @"C:\Users\BK\Desktop\Codedump\EGUI21Z-Korkmaz-Baran\lab2\lab2\.json\" + _sessionManager.Name() + "-" +
               date + ".json";
            var json = System.IO.File.ReadAllText(path);

            _sessionManager.Entries.EntryList.Add(newEntry);
            JObject obj = (JObject)JToken.FromObject(_sessionManager.Entries);
            System.IO.File.WriteAllText(path, obj.ToString());

            return RedirectToAction(actionName: "Index", controllerName: "Home", new
            {
                selectedDate = _sessionManager.CurrentDate

            }) ;

        }
        [HttpGet]
        public IActionResult EditEntry(int id)
        {
            Console.WriteLine(id);
            Entry editEntry = _sessionManager.Entries.EntryList[id];
            _sessionManager.Index = id;

            return View(editEntry);
        }




       

        [HttpPost]
        public IActionResult Edit(Entry editEntry)
        {
            int i = _sessionManager.Index;
            _sessionManager.Entries.EntryList[i].Description = editEntry.Description;
            _sessionManager.Entries.EntryList[i].Time = editEntry.Time;
            string date = _sessionManager.CurrentDate.ToString("yyyy-MM");
            string path = @"C:\Users\BK\Desktop\Codedump\EGUI21Z-Korkmaz-Baran\lab2\lab2\.json\" + _sessionManager.Name() + "-" +
               date + ".json";


            JObject obj = (JObject)JToken.FromObject(_sessionManager.Entries);
            System.IO.File.WriteAllText(path, obj.ToString());
            return RedirectToAction(actionName: "Index", controllerName: "Home", new
            {
                selectedDate = _sessionManager.CurrentDate

            });

        }

        [HttpGet]
        public IActionResult DeleteEntry(int id)
        {
            
            string date = _sessionManager.CurrentDate.ToString("yyyy-MM");
            string path = @"C:\Users\BK\Desktop\Codedump\EGUI21Z-Korkmaz-Baran\lab2\lab2\.json\" + _sessionManager.Name() + "-" +
               date + ".json";
            _sessionManager.Entries.EntryList.RemoveAt(id);


            JObject obj = (JObject)JToken.FromObject(_sessionManager.Entries);
            System.IO.File.WriteAllText(path, obj.ToString());
            return RedirectToAction(actionName: "Index", controllerName: "Home", new
            {
                selectedDate = _sessionManager.CurrentDate

            });

        }

        public IActionResult Report()
        {
            Report report = new();
            HashSet<string> codes = new HashSet<string>();
            Dictionary<string, int> times = new();
            var entries = _sessionManager.Entries;
            foreach(var i in entries.EntryList)
            {
                codes.Add(i.Code);
            }
            foreach(var j in codes)
            {
                times.Add(j, TimeSpent(entries, j));
            }

            report.TimeSpent = times;

            return View(report);
        }

        public int TimeSpent(Entries entries, string nCode)
        {
            var total = 0;
            foreach (var i in entries.EntryList)
            {
                if(i.Code == nCode)
                {
                    total += i.Time;
                }

            }

            return total;
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
