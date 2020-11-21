using System.Collections.Generic;

namespace HackApi.Database
{
    public partial class Meetings
    {
        public Meetings()
        {
            Checkpoints = new HashSet<Checkpoints>();
        }

        public string MeetingId { get; set; }

        public virtual ICollection<Checkpoints> Checkpoints { get; set; }
    }
}
