using System;
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using System.Linq;
using Newtonsoft.Json;

namespace lab2.Models
{
    public class AddEntry
    {
        [JsonProperty("date ")]
        [DataType(DataType.Date)]
        public string Date { get; set; }

        [JsonProperty("code ")]
        public string Code { get; set; }

        [JsonProperty("time ")]
        public int Time { get; set; }

        [JsonProperty("description ")]
        public string Description { get; set; }

        public List<string> Codes { get; set; } = new();

    }
}
