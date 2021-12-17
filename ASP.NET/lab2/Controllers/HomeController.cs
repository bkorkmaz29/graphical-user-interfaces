using lab2.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Net;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.IO;
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

            string pathActivity = @"C:\Users\BK\Desktop\Codedump\EGUI21Z-Korkmaz-Baran\lab2\lab2\db\activities\activities.json";
            _sessionManager.ChangeName(UserName);

            _sessionManager.Entries.EntryList.Clear();
            string dirEntry = @"C:\Users\BK\Desktop\Codedump\EGUI21Z-Korkmaz-Baran\lab2\lab2\db\" + _sessionManager.Name();
            System.IO.Directory.CreateDirectory(dirEntry);

            if (!System.IO.File.Exists(pathActivity))
            {
                System.IO.File.Create(pathActivity);
            }
            else
            {
                var json = System.IO.File.ReadAllText(pathActivity);
                _sessionManager.LoadActivities(json);
                var activities = JsonConvert.DeserializeObject<Activities>(json);
                foreach (var i in activities.ActivityList)
                {
                    _sessionManager.Codes.Add(i.Code);
                }
            }


            return RedirectToAction(actionName: "Index", controllerName: "Home");
        }

        [HttpGet]
        public IActionResult Index()
        {
            _sessionManager.changeDate(DateTime.Now);
            string date = _sessionManager.CurrentDate.ToString("yyyy-MM");
            string path = @"C:\Users\BK\Desktop\Codedump\EGUI21Z-Korkmaz-Baran\lab2\lab2\db\" + _sessionManager.Name() + "\\" + _sessionManager.Name() + "-" +
                date + ".json";
            if (!System.IO.File.Exists(path))
            {
                System.IO.File.Create(path).Close();
                JObject obj = (JObject)JToken.FromObject(_sessionManager.Entries);
                System.IO.File.WriteAllText(path, obj.ToString());
                var json = System.IO.File.ReadAllText(path);
                _sessionManager.LoadEntries(json);

            }
            else
            {
                var json = System.IO.File.ReadAllText(path);
                _sessionManager.LoadEntries(json);

            }

            _sessionManager.addDaily();


            return View(_sessionManager);

        }

        [HttpPost]

        public IActionResult Index(string StringDate)
        {
            DateTime selectedDate = DateTime.Parse(StringDate);
            string newDate = selectedDate.ToString("yyyy-MM");
            string oldDate = _sessionManager.CurrentDate.Month.ToString("yyyy-MM");

            if (newDate == oldDate)
            {
                _sessionManager.changeDate(selectedDate);
                _sessionManager.addDaily();
            }


            string path = @"C:\Users\BK\Desktop\Codedump\EGUI21Z-Korkmaz-Baran\lab2\lab2\db\" + _sessionManager.Name() + "\\" + _sessionManager.Name() + "-" +
            newDate + ".json";
            if (!System.IO.File.Exists(path))
            {

                System.IO.File.Create(path).Close();
                _sessionManager.Entries.EntryList.Clear();

                JObject obj = (JObject)JToken.FromObject(_sessionManager.Entries);
                System.IO.File.WriteAllText(path, obj.ToString());
                _sessionManager.addDaily();
            }
            else if (System.IO.File.Exists(path))
            {
                var json = System.IO.File.ReadAllText(path);
                _sessionManager.LoadEntries(json);
                _sessionManager.changeDate(selectedDate);
                _sessionManager.addDaily();
            }

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
            string date = DisplayDate.ToString("yyyy-MM");
            string path = @"C:\Users\BK\Desktop\Codedump\EGUI21Z-Korkmaz-Baran\lab2\lab2\db\" + _sessionManager.Name() + "\\" + _sessionManager.Name() + "-" +
                date + ".json";

            if (date != _sessionManager.CurrentDate.ToString("yyyy-MM")) {
                _sessionManager.Entries.EntryList.Clear();
            }
            
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
            string path = @"C:\Users\BK\Desktop\Codedump\EGUI21Z-Korkmaz-Baran\lab2\lab2\db\" + _sessionManager.Name() + "\\" + _sessionManager.Name() + "-" +
                date + ".json";


            JObject obj = (JObject)JToken.FromObject(_sessionManager.Entries);
            System.IO.File.WriteAllText(path, obj.ToString());
            return RedirectToAction(actionName: "Index", controllerName: "Home");

        }

        [HttpGet]
        public IActionResult DeleteEntry(int id)
        {
            
            string date = _sessionManager.CurrentDate.ToString("yyyy-MM");
            string path = @"C:\Users\BK\Desktop\Codedump\EGUI21Z-Korkmaz-Baran\lab2\lab2\db\" + _sessionManager.Name() + "\\" + _sessionManager.Name() + "-" +
                date + ".json";
            _sessionManager.Entries.EntryList.RemoveAt(id);


            JObject obj = (JObject)JToken.FromObject(_sessionManager.Entries);
            System.IO.File.WriteAllText(path, obj.ToString());
            return RedirectToAction(actionName: "Index", controllerName: "Home");

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
