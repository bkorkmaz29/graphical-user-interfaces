using System.Collections.Generic;

namespace lab2.Models
{
    public class Report
    {
        public string Month { get; set; } 
        public List<string> Months { get; set; } = new();
        public Dictionary<string, int> TimeSpent { get; set; } = new(); 

    }
}
