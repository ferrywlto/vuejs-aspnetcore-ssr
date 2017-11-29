using Newtonsoft.Json;
using System;
using System.Collections.Generic;
public class ClientState {
    [JsonProperty(PropertyName = "messages")]
    public IEnumerable<Message> Messages {get; set;}

    [JsonProperty(PropertyName = "lastFetchedMessageDate")]
    public DateTime LastFetchedMessageDate {get; set;}
}