using HackApi.Models;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;

namespace HackApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : ControllerBase
    {

        [HttpGet]
        [Route("GetUserMeetings")]
        public async Task<List<MeetInformation>> GetUserMeetings()
        {
            string bearerToken = string.Empty;
            var response = string.Empty;
            List<Value> values = new List<Value>();
            List<MeetInformation> meetings = new List<MeetInformation>();

            using (var client = new HttpClient())
            {
                using (HackathonContext db = new HackathonContext())
                {
                    bearerToken = db.MrkApiToken.First().Token;
                }
                client.DefaultRequestHeaders.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", bearerToken);

                HttpResponseMessage result = await client.GetAsync("https://graph.microsoft.com/v1.0//me/events");
                //HttpResponseMessage result = await client.GetAsync("https://graph.microsoft.com/v1.0//me/events/AAMkAGYwN2EyMTEwLTI1YTQtNDYzZC04Y2E3LTg4M2ZlMzkyMTY4YgBGAAAAAADAqOZAh5XmT5uUCZzwTgZnBwClIBnIR6xkQazNRRkdtxcUAAAAAAENAAClIBnIR6xkQazNRRkdtxcUAAFV_waLAAA=");
                if (result.IsSuccessStatusCode)
                {
                    response = await result.Content.ReadAsStringAsync();
                    var temperatures = JsonConvert.DeserializeObject<Temperatures>(response);

                    foreach (var tem in temperatures.Value)
                    {
                        meetings.Add(new MeetInformation() { MeetId = tem.Id, StartTime = tem.Start.DateTime, EndTime = tem.End.DateTime });
                    }
                }
                else
                {
                    response = "Fail \n" + result.StatusCode;
                }

            }
            return meetings;
        }

        [HttpGet]
        [Route("CheckIsMeetingActiveAndGetUsers/{meetId}")]
        public async Task<MeetingUsers> CheckIsMeetingActiveAndGetUsers(string meetId)
        {
            string bearerToken = string.Empty;
            var response = string.Empty;
            MeetingUsers meetingUsers = new MeetingUsers();
            using (var client = new HttpClient())
            {
                using (HackathonContext db = new HackathonContext())
                {
                    bearerToken = db.MrkApiToken.First().Token;
                }
                client.DefaultRequestHeaders.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", bearerToken);

                HttpResponseMessage result = await client.GetAsync("https://graph.microsoft.com/v1.0//me/events/" + meetId);
                if (result.IsSuccessStatusCode)
                {
                    response = await result.Content.ReadAsStringAsync();
                    var attendeeValue = JsonConvert.DeserializeObject<Value>(response);
                    List<Attendee> listOfAttende = new List<Attendee>();
                    foreach (var att in attendeeValue.Attendees)
                    {
                        listOfAttende.Add(att);                   
                    }
                    meetingUsers.attendees = listOfAttende;
                    meetingUsers.organizer = attendeeValue.Organizer;
                }
                else
                {
                    response = "Fail \n" + result.StatusCode;
                }
            }
            return meetingUsers;
        }
        //[HttpPost]
        //[Route("")]
        //public async Task

    }
}
