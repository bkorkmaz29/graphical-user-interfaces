using System;
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using System.Linq;
using Newtonsoft.Json;

namespace lab2.Models
{
    public class Report
    {

        public List<string> Months { get; set; } = new();
        public Dictionary<string, int> TimeSpent { get; set; } = new(); 

    }
}
