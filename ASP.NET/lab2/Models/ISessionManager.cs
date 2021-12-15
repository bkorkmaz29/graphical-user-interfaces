using lab2.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Net;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;


namespace lab2.Models

{
	public interface ISessionManager
	{
		public SessionManager SessionManager { get; }
		void addDaily();
		void changeDate(DateTime a);
		void ChangeName(String a);
		public void LoadActivities(string json);
		public void LoadEntries(string json);

		Entries Entries { get; set; }
		DateTime CurrentDate { get; set; }

		int Index { get; set; }

		public List<string> Codes { get; set; }

		public void AddEntry(Entry newEntry);
		

		public string Name();

	}


}