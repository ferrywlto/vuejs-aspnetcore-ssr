using System.Collections.Generic;
using System;

public class FakeMessageStore {
    private static DateTime startDateTime = DateTime.Now;

    public static readonly List<Message> FakeMessages = new List<Message>(){
        Message.CreateMessage("First message title", "First message text", startDateTime),
        Message.CreateMessage("2nd msg title", "2nd msg txt", startDateTime.AddDays(1)),
        Message.CreateMessage("3rd msg title", "3rd msg txt", startDateTime.AddDays(2)),
        Message.CreateMessage("4th msg title", "4th msg txt", startDateTime.AddDays(3)),
        Message.CreateMessage("5th msg title", "5th msg txt", startDateTime.AddDays(4)),
        Message.CreateMessage("6th msg title", "6th msg txt", startDateTime.AddDays(5))
    };
}