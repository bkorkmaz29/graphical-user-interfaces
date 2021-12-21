using System.Collections.Generic;
using Newtonsoft.Json;

namespace lab2.Models { 
public class Activities
{
        [JsonProperty("activities ")]
        public List<Activity> ActivityList { get; set; } = new();   
    }
}


