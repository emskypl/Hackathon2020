using System;
using System.Collections.Generic;

namespace HackApi
{

    public partial class Temperatures
    {
        public Uri OdataContext { get; set; }
        public Uri OdataNextLink { get; set; }
        public List<Value> Value { get; set; }
    }

    public partial class Value
    {
        public string OdataEtag { get; set; }
        public string Id { get; set; }
        public string CreatedDateTime { get; set; }
        public string LastModifiedDateTime { get; set; }
        public string ChangeKey { get; set; }
        public List<object> Categories { get; set; }
        public object TransactionId { get; set; }
        public string OriginalStartTimeZone { get; set; }
        public string OriginalEndTimeZone { get; set; }
        public string ICalUId { get; set; }
        public long ReminderMinutesBeforeStart { get; set; }
        public bool IsReminderOn { get; set; }
        public bool HasAttachments { get; set; }
        public string Subject { get; set; }
        public string BodyPreview { get; set; }
        public Importance Importance { get; set; }
        public Importance Sensitivity { get; set; }
        public bool IsAllDay { get; set; }
        public bool IsCancelled { get; set; }
        public bool IsOrganizer { get; set; }
        public bool ResponseRequested { get; set; }
        public object SeriesMasterId { get; set; }
        public ShowAs ShowAs { get; set; }
        public ValueType Type { get; set; }
        public Uri WebLink { get; set; }
        public string OnlineMeetingUrl { get; set; }
        public bool IsOnlineMeeting { get; set; }
        public OnlineMeetingProvider OnlineMeetingProvider { get; set; }
        public bool AllowNewTimeProposals { get; set; }
        public bool IsDraft { get; set; }
        public object Recurrence { get; set; }
        public Status ResponseStatus { get; set; }
        public Body Body { get; set; }
        public End Start { get; set; }
        public End End { get; set; }
        public PurpleLocation Location { get; set; }
        public List<LocationElement> Locations { get; set; }
        public List<Attendee> Attendees { get; set; }
        public Organizer Organizer { get; set; }
        public OnlineMeeting OnlineMeeting { get; set; }
    }

    public partial class Attendee
    {
        public AttendeeType Type { get; set; }
        public Status Status { get; set; }
        public EmailAddress EmailAddress { get; set; }
        public string Photo { get; set; }
    }

    public partial class EmailAddress
    {
        public string Name { get; set; }
        public string Address { get; set; }
    }

    public partial class Status
    {
        public Response Response { get; set; }
        public DateTime Time { get; set; }
    }

    public partial class Body
    {
        public ContentType ContentType { get; set; }
        public string Content { get; set; }
    }

    public partial class End
    {
        public string DateTime { get; set; }
        public TimeZone TimeZone { get; set; }
    }

    public partial class PurpleLocation
    {
        public string DisplayName { get; set; }
        public LocationType LocationType { get; set; }
        public UniqueIdType UniqueIdType { get; set; }
        public Address Address { get; set; }
        public Address Coordinates { get; set; }
        public string UniqueId { get; set; }
    }

    public partial class Address
    {
    }

    public partial class LocationElement
    {
        public string DisplayName { get; set; }
        public LocationType LocationType { get; set; }
        public string UniqueId { get; set; }
        public string UniqueIdType { get; set; }
    }

    public partial class OnlineMeeting
    {
        public Uri JoinUrl { get; set; }
    }

    public partial class Organizer
    {
        public EmailAddress EmailAddress { get; set; }
    }

    public enum Response { Accepted, Declined, None, NotResponded, Organizer };

    public enum AttendeeType { Optional, Required };

    public enum ContentType { Html };

    public enum TimeZone { Utc };

    public enum Importance { High, Normal };

    public enum LocationType { Default };

    public enum UniqueIdType { Private, Unknown };

    public enum OnlineMeetingProvider { TeamsForBusiness, Unknown };

    public enum OriginalTimeZone { CentralEuropeanStandardTime, WEuropeStandardTime };

    public enum ShowAs { Busy, Free, Tentative };

    public enum ValueType { SingleInstance };
}
