using System.Net;
using System.Net.Mail;

namespace Extensions.Email
{
    public class EmailNotification
    {
        protected string FromName;
        protected string SenderEmail;
        protected string ToEmail;
        protected string Message;
        protected string Subject;
        protected string SenderPassword;
        protected string SmtpServer;
        protected int SmtpPort;

        public EmailNotification(string fromName, string senderEmail, string senderPassword, string toEmail, string message,
            string subject, string smtpServer, int smtpPort)
        {
            this.FromName = fromName;
            this.SenderEmail = senderEmail;
            this.SenderPassword = senderPassword;
            this.Message = message;
            this.ToEmail = toEmail;
            this.Subject = subject;
            this.SmtpServer = smtpServer;
            this.SmtpPort = smtpPort;
        }


        public void SendMessage()
        {
            var fromAddress = new MailAddress(this.SenderEmail, this.FromName);
            var toAddress = new MailAddress(this.ToEmail);

            var smtp = new SmtpClient
            {
                Host = this.SmtpServer,
                Port = this.SmtpPort,
                EnableSsl = true,
                DeliveryMethod = SmtpDeliveryMethod.Network,
                UseDefaultCredentials = false,
                Credentials = new NetworkCredential(fromAddress.Address, SenderPassword)
            };

            using (var msп = new MailMessage(fromAddress, toAddress)
            {
                Subject = Subject,
                Body = Message,
                IsBodyHtml = true
            })
            {
                smtp.Send(msп);
            }
        }
    }
}
