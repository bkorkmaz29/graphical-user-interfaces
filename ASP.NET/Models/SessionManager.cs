using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.ComponentModel;
using Newtonsoft.Json;


namespace lab2.Models
{

    public class SessionManager : ISessionManager
    {

        [Required]
        [StringLength(100, MinimumLength = 2)]
        [DisplayName("User Name")]
        public string UserName { get; set; }

        [DisplayFormat(DataFormatString = "{yyyy-MM-dd}")]
        public DateTime CurrentDate { get; set; } = DateTime.Now;

        public Activities Activities { get; set; }

        public Entries Entries { get; set; } = new();
        public Entries ReportEntries { get; set; } = new();

        public List<string> Codes { get; set; } = new();

        public List<Entry> dailyEntries { get; set; } = new();


        public int Index { get; set; }

  
        SessionManager ISessionManager.SessionManager => throw new NotImplementedException();


        public void LoadActivities(string json)
        {

            Activities = JsonConvert.DeserializeObject<Activities>(json);


        }


        public void LoadEntries(string json)
        {

           Entries = JsonConvert.DeserializeObject<Entries>(json);
            var count = 1;
            foreach(var i in Entries.EntryList)
            {
                i.Id = count;
                count++;
            }


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


        public int NewId()
        {

            if (Entries.EntryList.Count == 0)
                return 1;
            else
            {
                return (Entries.EntryList.Last().Id + 1);
            }


        }
        public void AddEntry(Entry newEntry)
        {

            Entries.EntryList.Add(newEntry);
           // JObject obj = (JObject)JToken.FromObject(Entries);
            //System.IO.File.WriteAllText(@"C:\Users\BK\Desktop\korkmaz.json", obj.ToString());


        }

    }
}