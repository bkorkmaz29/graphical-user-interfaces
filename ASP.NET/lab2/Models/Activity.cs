using System;
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using System.Linq;
using Newtonsoft.Json;

namespace lab2.Models
{
    public class Activity
    {

        [JsonProperty("code ")]
        public string Code { get; set; }

        [JsonProperty("manager ")]
        public string Manager { get; set; }

        [JsonProperty("name ")]
        public string Name { get; set; }

        [JsonProperty("budget ")]
        public int Budget { get; set; }

    }
}
