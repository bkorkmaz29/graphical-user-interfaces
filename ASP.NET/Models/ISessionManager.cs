using System;
using System.Collections.Generic;



namespace lab2.Models

{
	public interface ISessionManager
	{
		public SessionManager SessionManager { get; }
		void addDaily();
        public string UserName { get; set; }
		public void LoadActivities(string json);
		public void LoadEntries(string json);
		Entries Entries { get; set; }
		Entries ReportEntries { get; set; }
		DateTime CurrentDate { get; set; }

		int NewId();
		int Index { get; set; }

		public List<string> Codes { get; set; }

		public void AddEntry(Entry newEntry);
		
	}


}