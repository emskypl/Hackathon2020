using HackApi.Database;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HackApi.Models
{
    public class MeetingCheckpoint
    {
        public string MeetingId { get; set; }
        public List<Checkpoints> Checkpoints { get; set; }


    }
}
