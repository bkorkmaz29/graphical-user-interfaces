using System.Collections.Generic;
using Newtonsoft.Json;

namespace lab2.Models
{
    public class Entries
    {

        [JsonProperty("entries ")]
        public List<Entry> EntryList { get; set; } = new();

    }
}
