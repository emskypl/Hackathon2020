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
        public async Task<List<MeetInformation>> Test()
        {
            string bearerToken = string.Empty;
            var response = string.Empty;
            List<Value> values = new List<Value>();
            List<MeetInformation> meetings = new List<MeetInformation>();

            using (var client = new HttpClient())
            {
                using(HackathonContext db = new HackathonContext())
                {
                    bearerToken = db.MrkApiToken.First().Token;
                }
                client.DefaultRequestHeaders.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", bearerToken);
                
                // HttpResponseMessage result = await client.GetAsync("https://graph.microsoft.com/v1.0/me/calendarview?startdatetime=2020-11-20T21:46:19.804Z&enddatetime=2020-11-27T21:46:19.804Z");
                HttpResponseMessage result = await client.GetAsync("https://graph.microsoft.com/v1.0//me/events");
                if (result.IsSuccessStatusCode)
                {
                    response = await result.Content.ReadAsStringAsync();
                    var temperatures = JsonConvert.DeserializeObject<Temperatures>(response);

                    foreach(var tem in temperatures.Value)
                    {
                        meetings.Add(new MeetInformation() { MeetId = tem.Id, StartTime = tem.Start.DateTime });
                    }
                }
                else
                {
                    response = "Fail \n" + result.StatusCode;
                }

            }
            return meetings;
        }
    }
}
