using System;
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using System.Linq;
using Newtonsoft.Json;
using System.IO;

namespace lab2.Models
{
    public class Report
    {
        public string Month { get; set; } 
        public List<string> Months { get; set; } = new();
        public Dictionary<string, int> TimeSpent { get; set; } = new(); 

    }
}
