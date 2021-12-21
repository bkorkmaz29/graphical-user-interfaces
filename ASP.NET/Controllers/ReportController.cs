using lab2.Models;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Collections.Generic;
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
                emptyReport.Months = months;
                return View(emptyReport);
            }


            
            Report report = new();
            HashSet<string> codes = new HashSet<string>();
            Dictionary<string, int> times = new();


            string path = @".\db\" + _sessionManager.UserName + "\\" + _sessionManager.UserName + "-" +
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
            var username = _sessionManager.UserName;
            string path = @".\db\" + _sessionManager.UserName+ "";
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
