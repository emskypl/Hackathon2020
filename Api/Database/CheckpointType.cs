using System;
using System.Collections.Generic;

namespace HackApi.Database
{
    public partial class CheckpointType
    {
        public CheckpointType()
        {
            Checkpoints = new HashSet<Checkpoints>();
        }

        public int CheckpointTypeId { get; set; }
        public string CheckpointTypeName { get; set; }

        public virtual ICollection<Checkpoints> Checkpoints { get; set; }
    }
}
