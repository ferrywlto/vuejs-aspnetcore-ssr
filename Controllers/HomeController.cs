using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using System.Threading;
using Microsoft.AspNetCore.Mvc;

namespace vdn.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {            
            return View();
        }

        [Route("initialMessages")]
        public JsonResult initialMessages(){
            //Added to simulate initial loading from remote server
            Thread.Sleep(2000);

            var initialMessages = FakeMessageStore.FakeMessages
                .OrderByDescending(m => m.Date)
                .Take(2);

            var initialValues = new ClientState(){
                Messages = initialMessages,
                LastFetchedMessageDate = initialMessages.Last().Date
            };

            return Json(initialValues);
        }

        [Route("fetchMessages")]
        public JsonResult FetchMessages(DateTime lastFetchedMessageDate){
            return Json(Message.CreateMessage(
                "New Message",
                DateTime.Now.Millisecond.ToString(),
                DateTime.Now
            ));
        }
    }
}
