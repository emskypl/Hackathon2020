using System.Collections.Generic;

namespace HackApi.Models
{
    public class MeetingUsers
    {
        public Organizer organizer { get; set; }
        public List<Attendee> attendees { get; set; }
    }
}
