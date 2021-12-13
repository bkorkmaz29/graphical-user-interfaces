using System;
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using System.Linq;
using Newtonsoft.Json;

namespace lab2.Models { 
public class Activities
{
        [JsonProperty("activities ")]
        public List<Activity> ActivityList { get; set; } = new();   
    }
}


