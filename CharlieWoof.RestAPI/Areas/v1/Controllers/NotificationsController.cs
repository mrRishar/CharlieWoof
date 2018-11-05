using System;
using System.IO;
using System.Threading.Tasks;
using CharlieWoof.Core.Abstractions.Services.User;
using CharlieWoof.Core.Constants;
using CharlieWoof.Core.Enums;
using CharlieWoof.Core.Models;
using CharlieWoof.RestAPI.Areas.v1.Models.Abstractions;
using CharlieWoof.RestAPI.FileHelpers;
using CharlieWoof.Services.Services.UserService;
using Extensions.Email;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;

namespace CharlieWoof.RestAPI.Areas.v1.Controllers
{
    [Produces("application/json")]

    [AllowAnonymous]
    public class NotificationsController : ControllerBase
    {
        [Route("v1/Notifications")]
        [HttpPost]
        public IActionResult Send([FromBody] SendedEmail sendedEmail)
        {
            string senderEmail = Program.Configuration["SystemEmail:Email"];
            string password = Program.Configuration["SystemEmail:Password"];
            string smtpServer = Program.Configuration["SystemEmail:SMTPServer"];
            int smtpPort = Convert.ToInt32(Program.Configuration["SystemEmail:SMTPPort"]);

            try
            {
                var sender = new EmailNotification("charlieWoof", senderEmail, password, "virenyarchak@ukr.net",
                                                   $"Email: {sendedEmail.Email}",
                                                   "charlieWoof site: Нове замовлення<br> " +
                                                   $"Ім'я: {sendedEmail.Name} <br>" +
                                                   $"Телефон: {sendedEmail.Phone} <br>" +
                                                   $"Сервіс: {sendedEmail.Services}<br>" +
                                                   $"Порода: {sendedEmail.Breed} <br>" +
                                                   $"Дата:{sendedEmail.Date} <br>" +
                                                   $"час від: {sendedEmail.StartTime} <br>" +
                                                   $"До: {sendedEmail.StartTime}<br>" +
                                                   $"Повідомлення: {sendedEmail.Message} <br>", smtpServer, smtpPort);
                sender.SendMessage();
            }
            catch (Exception e)
            {
            }

            return Ok();
        }

        // [Produces("application/json")]
        [Route("v1/Notifications/Contact")]
        [HttpPost]
        public IActionResult ContactUs([FromBody] ContactUs contactUs)
        {
            string senderEmail = Program.Configuration["SystemEmail:Email"];
            string password = Program.Configuration["SystemEmail:Password"];
            string smtpServer = Program.Configuration["SystemEmail:SMTPServer"];
            int smtpPort = Convert.ToInt32(Program.Configuration["SystemEmail:SMTPPort"]);

            try
            {
                var sender = new EmailNotification("charlieWoof", senderEmail, password, "virenyarchak@gmail.com",
                                                   "charlieWoof site: Нове замовлення<br> " +
                                                   $"О'єкт: {contactUs.Subject} <br>" +
                                                   $"Повідомлення: {contactUs.Message} <br>",
                                                   $"Email: {contactUs.Email}",
                                                   smtpServer, smtpPort);
                sender.SendMessage();
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }

            return Ok();
        }

    }


    public class SendedEmail
    {
        public string Name { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string Services { get; set; }
        public string Breed { get; set; }
        public string Date { get; set; }
        public string StartTime { get; set; }
        public string EndTime { get; set; }
        public string Message { get; set; }
    }
    public class ContactUs
    {
        public string Email { get; set; }
        public string Subject { get; set; }
        public string Message { get; set; }
    }
}