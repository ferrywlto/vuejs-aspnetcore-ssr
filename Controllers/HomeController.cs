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
            var initialMessages = FakeMessageStore.FakeMessages
                .OrderByDescending(m => m.Date)
                .Take(2);

            var initialValues = new ClientState(){
                Messages = initialMessages,
                LastFetchedMessageDate = initialMessages.Last().Date
            };

            return Json(initialValues);
        }

        [HttpPost]
        [Route("fetchMessages")]
        public JsonResult FetchMessages([FromBody]FetchMessageRequest request){
            var messages = FakeMessageStore.FakeMessages
                .OrderByDescending(m => m.Date)
                .Where(p => p.Date < request.lastMessageDate);
            
            if(messages.Any()){
                var newMessages = messages.Take(2);
                return Json(new ClientState()
                {
                    Messages = newMessages,
                    LastFetchedMessageDate = newMessages.Last().Date
                });
            }
            return Json(null);
        }
    }
    public class FetchMessageRequest {
        public DateTime lastMessageDate {get; set;}
    }
}
