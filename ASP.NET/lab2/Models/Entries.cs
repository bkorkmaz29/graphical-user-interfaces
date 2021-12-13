using System;
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using System.Linq;
using Newtonsoft.Json;

namespace lab2.Models
{
    public class Entries
    {
        [JsonProperty("entries ")]
        public List<Entry> EntryList { get; set; } = new();
    }
}
