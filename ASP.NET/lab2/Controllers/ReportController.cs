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
using System.IO;

namespace lab2.Controllers
{
    public class ReportController : Controller
    {
        private readonly ISessionManager _sessionManager;



        public ReportController(ISessionManager sessionManager)
        {
            _sessionManager = sessionManager;
        }

        [HttpGet]
        public IActionResult Index(string monthselect)
        {
            var months = SearchMonths();
            if (monthselect == null)
            {
                Report emptyReport = new();
                //emptyReport.TimeSpent = new();
                emptyReport.Months = months;
                return View(emptyReport);
            }


            
            Report report = new();
            HashSet<string> codes = new HashSet<string>();
            Dictionary<string, int> times = new();


            string path = @"C:\Users\BK\Desktop\Codedump\EGUI21Z-Korkmaz-Baran\lab2\lab2\db\" + _sessionManager.Name() + "\\" + _sessionManager.Name() + "-" +
                monthselect + ".json";
            var json = System.IO.File.ReadAllText(path);
            _sessionManager.ReportEntries = JsonConvert.DeserializeObject<Entries>(json);
            var entries = _sessionManager.ReportEntries;
            foreach (var i in entries.EntryList)
            {
                codes.Add(i.Code);
            }
            foreach (var j in codes)
            {
                times.Add(j, TimeSpent(entries, j));
            }

            report.TimeSpent = times;
            report.Months = months;

            return View(report);
        }

        public int TimeSpent(Entries entries, string nCode)
        {
            var total = 0;
            foreach (var i in entries.EntryList)
            {
                if (i.Code == nCode)
                {
                    total += i.Time;
                }

            }

            return total;
        }


        public List<string> SearchMonths()
        {
            List<string> months = new();
            var username = _sessionManager.Name();
            string path = @"C:\Users\BK\Desktop\Codedump\EGUI21Z-Korkmaz-Baran\lab2\lab2\db\" + _sessionManager.Name()+ "";
            DirectoryInfo hdDirectoryInWhichToSearch = new DirectoryInfo(path);
            FileInfo[] filesInDir = hdDirectoryInWhichToSearch.GetFiles("*" + username + "*.*");

            foreach (FileInfo foundFile in filesInDir)
            {

                months.Add(foundFile.Name.Substring((username.Length + 1), 7));


            }

            return months;
        }


    }



}
