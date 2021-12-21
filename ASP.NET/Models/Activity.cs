using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;

namespace lab2.Models
{
    public class Activity
    {
        [Required]
        [JsonProperty("code ")]
        public string Code { get; set; }
        [Required]
        [JsonProperty("manager ")]
        public string Manager { get; set; }
        [Required]
        [JsonProperty("name ")]
        public string Name { get; set; }
        [Required]
        [JsonProperty("budget ")]
        public int Budget { get; set; }

    }
}
