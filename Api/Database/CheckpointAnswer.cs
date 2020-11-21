using System;
using System.Collections.Generic;

namespace HackApi.Database
{
    public partial class CheckpointAnswer
    {
        public CheckpointAnswer()
        {
            Checkpoints = new HashSet<Checkpoints>();
        }

        public int CheckpointAnswerId { get; set; }
        public string CheckpointAnswerBody { get; set; }

        public virtual ICollection<Checkpoints> Checkpoints { get; set; }
    }
}
