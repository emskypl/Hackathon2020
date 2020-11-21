using HackApi.Database;
using HackApi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Buffers.Text;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;

namespace HackApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : ControllerBase
    {
        [HttpGet]
        [Route("test/{webApp}")]
        public async Task<string> Test(bool webApp)
        {
            string bearerToken = string.Empty;
            var response = string.Empty;
            using (var client = new HttpClient())
            {
                using (HackathonContext db = new HackathonContext())
                {
                    bearerToken = webApp ? db.MrkApiToken.First().Token : db.MrkApiTokenStudent.First().Token;

                    client.DefaultRequestHeaders.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", bearerToken);

                    HttpResponseMessage result = await client.GetAsync("https://graph.microsoft.com/v1.0/reports/getTeamsUserActivityUserDetail(period='D30')");
                    response = await result.Content.ReadAsStringAsync();

                    return response;

                }
            }
        }



        [HttpGet]
        [Route("GetUserMeetings/{webApp}")]
        public async Task<List<MeetInformation>> GetUserMeetings(bool webApp)
        {
            string bearerToken = string.Empty;
            var response = string.Empty;
            List<Value> values = new List<Value>();
            List<MeetInformation> meetings = new List<MeetInformation>();

            using (var client = new HttpClient())
            {
                using (HackathonContext db = new HackathonContext())
                {
                    bearerToken = webApp ? db.MrkApiToken.First().Token : db.MrkApiTokenStudent.First().Token;

                    client.DefaultRequestHeaders.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", bearerToken);

                    HttpResponseMessage result = await client.GetAsync("https://graph.microsoft.com/v1.0/me/events");
                    if (result.IsSuccessStatusCode)
                    {
                        response = await result.Content.ReadAsStringAsync();
                        var temperatures = JsonConvert.DeserializeObject<Temperatures>(response);

                        foreach (var tem in temperatures.Value.Where(x => x.IsCancelled == false || !x.Subject.ToLower().Contains("canceled")))
                        {
                            bool isCheckpointsExist = db.Checkpoints.Any(x => x.MeetingId == tem.Id);
                            meetings.Add(new MeetInformation()
                            {
                                MeetId = tem.Id,
                                MeetSubject = tem.Subject,
                                StartTime = tem.Start.DateTime,
                                EndTime = tem.End.DateTime,
                                IsCheckpointsExist = isCheckpointsExist
                            });
                        }
                    }
                    else
                    {
                        response = "Fail \n" + result.StatusCode;
                    }
                }
            }
            return meetings;
        }

        [HttpGet]
        [Route("CheckIsMeetingActiveAndGetUsers/{meetId}/{webApp}")]
        public async Task<MeetingUsers> CheckIsMeetingActiveAndGetUsers(string meetId, bool webApp)
        {
            var response = string.Empty;
            MeetingUsers meetingUsers = new MeetingUsers();
            using (var client = new HttpClient())
            {
                using (HackathonContext db = new HackathonContext())
                {
                    string bearerToken = webApp ? db.MrkApiToken.First().Token : db.MrkApiTokenStudent.First().Token;
                    client.DefaultRequestHeaders.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", bearerToken);
                }

                HttpResponseMessage result = await client.GetAsync("https://graph.microsoft.com/v1.0//me/events/" + meetId);
                if (result.IsSuccessStatusCode)
                {
                    response = await result.Content.ReadAsStringAsync();
                    var attendeeValue = JsonConvert.DeserializeObject<Value>(response);
                    List<Attendee> listOfAttende = new List<Attendee>();
                    foreach (var att in attendeeValue.Attendees)
                    {
                        HttpResponseMessage resultByMail = await client.GetAsync("https://graph.microsoft.com/v1.0/users/" + att.EmailAddress.Address);
                        dynamic userObject = JObject.Parse(await resultByMail.Content.ReadAsStringAsync());
                        string userId = userObject.id;
                        HttpResponseMessage photo = await client.GetAsync("https://graph.microsoft.com/v1.0/users/" + userId + "/photo/$value");
                        att.Photo = await photo.Content.ReadAsStringAsync();

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

        [HttpGet]
        [Route("GetCheckpointsByMeetings/{meetingId}/{userMail}")]
        public MeetingCheckpoint GetCheckpointsByMeetings(string meetingId, string userMail)
        {
            var response = string.Empty;
            MeetingCheckpoint meetingCheckpoint = new MeetingCheckpoint();

            using (HackathonContext db = new HackathonContext())
            {
                List<Checkpoints> checkpoints = db.Checkpoints.Where(x => x.MeetingId == meetingId
                                                                        && x.CreatedDate > DateTime.Now
                                                                        && x.UserMail.ToLower() == userMail.ToLower()
                                                                        && x.CheckpointIsEnded == false).ToList();

                meetingCheckpoint.Checkpoints = checkpoints;
                meetingCheckpoint.MeetingId = meetingId;
                return meetingCheckpoint;
            }
        }

        [HttpPost]
        [Route("UpdateIsCheckpointEnded/{checkpointId}")]
        public void UpdateIsCheckpointEnded(int checkpointId)
        {
            using (HackathonContext db = new HackathonContext())
            {
                Checkpoints checkpoints = db.Checkpoints.Where(x => x.CheckpointId == checkpointId).FirstOrDefault();
                checkpoints.CheckpointIsEnded = true;
                db.Checkpoints.Update(checkpoints);
                db.SaveChanges();
            }
        }



        [HttpPost]
        [Route("InsertNewCheckpoint/{meetingId}/{checkpointTitle}/{checkpointTypeId}/{userMail}/{checkpointAnswerOptions}")]
        public void InsertNewCheckpoint(string meetingId, string checkpointTitle, int checkpointTypeId, string userMail, string checkpointAnswerOptions = null)
        {
            using (HackathonContext db = new HackathonContext())
            {
                if (!db.Meetings.Any(x => x.MeetingId == meetingId))
                {
                    db.Meetings.Add(new Meetings()
                    {
                        MeetingId = meetingId
                    });
                    db.SaveChanges();
                }

                if (db.Checkpoints.Any(x => x.MeetingId == meetingId))
                {
                    int numberOfCheckpoints = db.Checkpoints.Where(x => x.MeetingId == meetingId).Count();
                    db.Checkpoints.Add(new Checkpoints()
                    {
                        MeetingId = meetingId,
                        CheckpointIsEnded = false,
                        CheckpointAnswerOptions = checkpointTypeId == 1 ? checkpointAnswerOptions : "",
                        CheckpointOrdinalNumber = numberOfCheckpoints + 1,
                        CheckpointTitle = checkpointTitle,
                        CheckpointTypeId = checkpointTypeId,
                        CreatedDate = DateTime.Now.AddMinutes(1),
                        UserMail = userMail
                    });
                }
                else
                {
                    db.Checkpoints.Add(new Checkpoints()
                    {
                        MeetingId = meetingId,
                        CheckpointIsEnded = false,
                        CheckpointAnswerOptions = checkpointTypeId == 1 ? checkpointAnswerOptions : "",
                        CheckpointOrdinalNumber = 0,
                        CheckpointTitle = checkpointTitle,
                        CheckpointTypeId = checkpointTypeId,
                        CreatedDate = DateTime.Now.AddMinutes(1),
                        UserMail = userMail
                    });
                }
                db.SaveChanges();
            }
        }

        [HttpPost]
        [Route("InsertCheckpointAnswer/{checkpointId}/{checkpointAnswer}")]
        public void InsertCheckpointAnswer(int checkpointId, string checkpointAnswer)
        {
            using (HackathonContext db = new HackathonContext())
            {
                db.CheckpointAnswer.Add(new CheckpointAnswer()
                {
                    CheckpointId = checkpointId,
                    CheckpointAnswerBody = checkpointAnswer
                });
                db.SaveChanges();

                Checkpoints checkpoints = db.Checkpoints.Where(x => x.CheckpointId == checkpointId).FirstOrDefault();
                checkpoints.CheckpointAnswerId = db.CheckpointAnswer.FirstOrDefault(x => x.CheckpointId == checkpointId).CheckpointAnswerId;

                db.Checkpoints.Update(checkpoints);
                db.SaveChanges();
            }
        }
    }
}
