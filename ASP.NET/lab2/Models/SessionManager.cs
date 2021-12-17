using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using lab2.Models;

namespace lab2.Models
{

    public class SessionManager : ISessionManager
    {

        [Required]
        [StringLength(100, MinimumLength = 2)]
        [DisplayName("User Name")]
        public string UserName { get; set; }

        [DisplayFormat(DataFormatString = "{yyyy-MM-dd}")]
        public DateTime CurrentDate { get; set; }

        public string currDate { get; set; }


        public Activities Activities { get; set; }


        public Entries Entries { get; set; } = new();
        public Entries ReportEntries { get; set; } = new();

        public List<string> Codes { get; set; } = new();

        public List<Entry> dailyEntries { get; set; } = new();

        public List<Entry> MonthlyEntries { get; set; } = new();

        public int Index { get; set; }

  
        SessionManager ISessionManager.SessionManager => throw new NotImplementedException();


        public void LoadActivities(string json)
        {

            Activities = JsonConvert.DeserializeObject<Activities>(json);


        }


        public void LoadEntries(string json)
        {

           Entries = JsonConvert.DeserializeObject<Entries>(json);


        }
        public void addDaily()
        {
            dailyEntries.Clear();
            if (Entries.EntryList != null)
            {
                foreach (var i in Entries.EntryList)
                {
                    if (i.Date == CurrentDate.ToString("yyyy-MM-dd"))
                    {
                        dailyEntries.Add(i);
                    }


                }
            }
        }

        public string Name()
        {
            return UserName;
        }

   

        public void changeDate(DateTime selectedDate)
        {
            CurrentDate = selectedDate;
        }

        public void ChangeName(String username)
        {
            UserName = username;
        }

        public void AddEntry(Entry newEntry)
        {

            Entries.EntryList.Add(newEntry);
           // JObject obj = (JObject)JToken.FromObject(Entries);
            //System.IO.File.WriteAllText(@"C:\Users\BK\Desktop\korkmaz.json", obj.ToString());


        }

    }
}