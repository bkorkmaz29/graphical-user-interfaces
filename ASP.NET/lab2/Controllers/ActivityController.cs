using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Hosting;
using System.Linq;
using System.IO;
using System.Text;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using lab2.Models;


namespace lab2.Controllers
{
    public class ActivityController : Controller
    {

        private readonly ISessionManager _sessionManager;

        public ActivityController(ISessionManager sessionManager)
        {
            _sessionManager = sessionManager;
        }
        public IActionResult Index()
        {   

            var json = System.IO.File.ReadAllText(@"C:\Users\BK\Desktop\Codedump\EGUI21Z-Korkmaz-Baran\lab2\lab2\db\activities\activities.json");
            var activities = JsonConvert.DeserializeObject<Activities>(json);
            return View(activities);
            
        }

        public IActionResult AddActivity()
        {
            return View();
        }

        [HttpPost]
        public IActionResult Add(Activity newActivity)
        {
            var json = System.IO.File.ReadAllText(@"C:\Users\BK\Desktop\Codedump\EGUI21Z-Korkmaz-Baran\lab2\lab2\db\activities\activities.json");
            var activities = JsonConvert.DeserializeObject<Activities>(json);
        
            activities.ActivityList.Add(newActivity);
            JObject obj = (JObject)JToken.FromObject(activities);
            System.IO.File.WriteAllText(@"C:\Users\BK\Desktop\Codedump\EGUI21Z-Korkmaz-Baran\lab2\lab2\db\activities\activities.json", obj.ToString());
            _sessionManager.Codes.Add(newActivity.Code);

            return RedirectToAction(actionName: "Index", controllerName: "Activity", new
            {
                activities = activities

            }); 

            

        }
    }
}
