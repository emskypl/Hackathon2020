namespace HackApi.Database
{
    public partial class Checkpoints
    {
        public int CheckpointId { get; set; }
        public string MeetingId { get; set; }
        public string CheckpointTitle { get; set; }
        public int CheckpointTypeId { get; set; }
        public int? CheckpointAnswerId { get; set; }
        public string CheckpointAnswerOptions { get; set; }
        public bool CheckpointIsEnded { get; set; }
        public int CheckpointOrdinalNumber { get; set; }

        public virtual CheckpointAnswer CheckpointAnswer { get; set; }
        public virtual CheckpointType CheckpointType { get; set; }
        public virtual Meetings Meeting { get; set; }
    }
}
