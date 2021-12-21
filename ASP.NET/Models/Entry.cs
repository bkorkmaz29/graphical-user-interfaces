using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json;

namespace lab2.Models
{
    public class Entry
    {
        [JsonProperty("date ")]
        [DataType(DataType.Date)]
        public string Date { get; set; }

        [JsonProperty("code ")]
        public string Code { get; set; }

        [JsonProperty("time ")]
        public int Time { get; set; }

        [DisplayFormat(ConvertEmptyStringToNull = false)]
        [JsonProperty("description ")]
        public string Description { get; set; }

        [JsonIgnore]
        public int Id { get; set; }
    }
}
