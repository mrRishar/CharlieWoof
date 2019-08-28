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
using CharlieWoof.RestAPI.Areas.v1.Models.Notifications;
using CharlieWoof.Core.Abstractions.Services;
using CharlieWoof.Core.Abstractions.Services.MagicPackage;
using CharlieWoof.Core.Models.MagicPackage;

namespace CharlieWoof.RestAPI.Areas.v1.Controllers
{
    [Produces("application/json")]

    [AllowAnonymous]
    public class NotificationsController : BaseController
    {
        private IOrdersService ordersService;
        public NotificationsController(IOrdersService ordersService,
            IUsersService usersService, ISettingsService settingsService) : base(usersService, settingsService)
        {
            this.ordersService = ordersService;
        }

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
                var user = this.UsersService.Get(sendedEmail.Email);
                if (user == null)
                {
                    user = new User
                    {
                        Email = sendedEmail.Email,
                        Firstname = sendedEmail.Name,
                        Phone = sendedEmail.Phone,
                        Birthday = "-",
                        Note = "-",
                        Secondname = "-",
                        Street = "-",
                        Role = MagicRoles.Client,
                        PasswordHash = "-",
                        PhotoUrl = "-"
                    };
                   this.UsersService.Add(user, Guid.Empty);
                }
                var order = new Order
                {
                    Date = sendedEmail.Date,
                    Note = "-",
                    PetId = Guid.Empty,
                    Price = 0,
                    Services = ServicesOrder.MoreServices,
                    Status = Status.New,
                    UserId = user.Id,
                };
                this.ordersService.Add(order, Guid.Empty);

                var sender = new EmailNotification("charlieWoof", senderEmail, password, "groomlviv@gmail.com",
                                                   "charlieWoof site: Нове замовлення<br> " +
                                                   $"Ім'я: {sendedEmail.Name} <br>" +
                                                   $"Телефон: {sendedEmail.Phone} <br>" +
                                                   $"Сервіс: {sendedEmail.Services}<br>" +
                                                   $"Порода: {sendedEmail.Breed} <br>" +
                                                   $"Дата:{sendedEmail.Date} <br>" +
                                                   $"час від: {sendedEmail.StartTime} <br>" +
                                                   $"До: {sendedEmail.StartTime}<br>" +
                                                   $"Повідомлення: {sendedEmail.Message} <br>",
                                                   $"Email: {sendedEmail.Email}",
                                                   smtpServer, smtpPort);
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
                var sender = new EmailNotification("charlieWoof", senderEmail, password, "groomlviv@gmail.com",
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

        [Route("v1/Notifications/AddToCourses")]
        [HttpPost]
        public IActionResult AddToCourses([FromBody] AddToCourses addToCourses)
        {
            string senderEmail = Program.Configuration["SystemEmail:Email"];
            string password = Program.Configuration["SystemEmail:Password"];
            string smtpServer = Program.Configuration["SystemEmail:SMTPServer"];
            int smtpPort = Convert.ToInt32(Program.Configuration["SystemEmail:SMTPPort"]);

            try
            {
                var sender = new EmailNotification("charlieWoof", senderEmail, password, "groomlviv@gmail.com",
                                                   "charlieWoof site: Новий запис на Курси Грумінгу<br> " +
                                                   $"Телефон: {addToCourses.Phone} <br>",
                                                   $"Ім'я: {addToCourses.Name}",
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
}