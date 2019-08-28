using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using CharlieWoof.Core.Abstractions.Services.MagicPackage;
using CharlieWoof.Core.Abstractions.Services.User;
using CharlieWoof.Core.Constants;
using CharlieWoof.Core.Enums;
using CharlieWoof.Core.Models;
using CharlieWoof.Core.Models.MagicPackage;
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
    [Route("v1/Users")]
    [Authorize(policy: "GrummerAndAdminPolicy")]
    public class UsersController : BaseController
    {
        protected IHostingEnvironment HostingEnvironment { get; }
        protected IPetsService PetsService { get; }

        public UsersController(IUsersService usersService,
                               IHostingEnvironment hostingEnvironment,
                               IPetsService petsService)
            : base(usersService)
        {
            HostingEnvironment = hostingEnvironment;
            PetsService = petsService;
        }

        //[AllowAnonymous]
        //[HttpGet("{getClientsPets}")]
        //public IActionResult GetClientsPets(Guid userId)
        //{
        //    var users = UsersService.GetAll().ToList();
        //    var petsList = this.PetsService.GetAll(userId);
        //    var result = new List<UserWithPets>();

        //    foreach (var item in petsList)
        //    {
        //        var pet = PetsService.Get(item.OwnerUserId);

        //        var order = new UserWithPets()
        //        {
        //            Id = item.Id,
        //            Firstname = user?.Firstname ?? "-",
        //            Secondname = user?.Secondname ?? "-",

        //            CreatedOnUtc = item.CreatedOnUtc,
        //            Note = item.Note,
        //            Birthday = item.Birthday,
        //            Breed = item.Breed,
        //            Image = item.Image,
        //            Name = item.Name,
        //            UpdatedByUserId = item.UpdatedByUserId,
        //            UpdatedOnUtc = item.UpdatedOnUtc,
        //        };
        //        result.Add(order);
        //    }

        //    return Ok(new ApiOkResponse(result));

        //}


        //[HttpGet("getClientPets")]
        //public async Task<IActionResult> GetClientPets()
        //{
        //    var user = this.GetUser();
        //    if (user.IsInRole(MagicRoles.Client))
        //    {
        //        return BadRequest(new ApiBadRequestResponse("Access denied"));
        //    }

        //    var model = this.UsersService.GetAll();
        //    if (model == null)
        //    {
        //        return NotFound(new ApiResponse(404, $"Items were not found"));
        //    }

        //    return Ok(new ApiOkResponse(model));
        //}

        [HttpGet("get")]
        public async Task<IActionResult> Get()
        {
            var user = this.GetUser();
            var model = this.UsersService.GetAll().ToList();
            if (user.IsInRole(MagicRoles.Trader) || user.IsInRole(MagicRoles.Grummer))
            {
                return NotFound(new ApiResponse(404, $"Items were not found"));

                //  return Ok(new ApiOkResponse(model.Where(x => x.IsInRole(MagicRoles.Grummer)).ToList()));
            }

            if (model == null)
            {
                return NotFound(new ApiResponse(404, $"Items were not found"));
            }
            return Ok(new ApiOkResponse(model));
        }

        [HttpGet("getUsersWithPets")]
        public async Task<IActionResult> GetClientsPets()
        {
            var result = GetUserWithPets();
            var user = this.GetUser();
            if (user.IsInRole(MagicRoles.Trader) || user.IsInRole(MagicRoles.Grummer))
            {
                return NotFound(new ApiResponse(404, $"Items were not found"));
            }

            return Ok(new ApiOkResponse(result));
        }

        private IEnumerable<UserWithPets> GetUserWithPets()
        {
            var clients = this.UsersService.GetAll(x => x.IsInRole(MagicRoles.Client)).ToList();

            var petsList = this.PetsService.GetAll().ToList();

            foreach (var item in clients)
            {
                yield return new UserWithPets
                {
                    Id = item.Id,
                    Firstname = item.Firstname,
                    Secondname = item.Secondname,
                    Email = item.Email,
                    Phone = item.Phone,
                    PhotoUrl = item.PhotoUrl,
                    Street = item.Street,
                    Role = item.Role,
                    CreatedOnUtc = item.CreatedOnUtc,
                    Note = item.Note,
                    Birthday = item.Birthday,
                    UpdatedByUserId = item.UpdatedByUserId,
                    UpdatedOnUtc = item.UpdatedOnUtc,
                    Pets = petsList.Where(x => x.OwnerUserId == item.Id)
                };
            }
        }

        [HttpGet("get/{userId}")]
        public async Task<IActionResult> Get(Guid userId)
        {
            var user = this.GetUser();
            var model = this.UsersService.Get(userId);
            if (model.IsInRole(MagicRoles.Client))
            {
                if (user.IsInRole(MagicRoles.Trader) || user.IsInRole(MagicRoles.Grummer))
                {
                    var result = CropedUser(model);
                    return Ok(new ApiOkResponse(result));
                }
            }
            else if (model.IsInRole(MagicRoles.Admin))
            {
                if (user.IsInRole(MagicRoles.Trader) || user.IsInRole(MagicRoles.Grummer))
                {
                    return BadRequest(new ApiBadRequestResponse("Access denied"));
                }
            }

            //if (user.IsInRole(MagicRoles.Trader))
            //{
            //    var result = CropedUser(model);
            //    return Ok(new ApiOkResponse(result));
            //}

            if (model == null)
            {
                return NotFound(new ApiResponse(404, $"User not found with id {userId}"));
            }

            return Ok(new ApiOkResponse(model));
        }

        private object CropedUser(User model)
        {
            return new
            {
                model.Id,
                model.Firstname,
                model.Secondname,
                //model.Email,
                model.PhotoUrl,
                model.UpdatedOnUtc,
            };
        }


        [Authorize(policy: "AdminOnlyPolicy")]
        [HttpPost, DisableRequestSizeLimit]
        public IActionResult Post([FromForm] User model)
        {
            var file = Request.Form.Files[0];

            try
            {
                if (file != null && file.Length > 0)
                {
                    var filename = FileHelper.Save(file, Path.Combine(HostingEnvironment.WebRootPath + Paths.UserImage), true);
                    model.PhotoUrl = filename;
                }
                else
                {
                    model.PhotoUrl = String.Empty;
                }

                if ((byte)model.Role == 0)
                    model.Role = MagicRoles.Trader;

                if (model.Birthday == null)
                {
                    model.Birthday = "-";
                }
                else if (model.Email == null)
                {
                    model.Email = "-";
                }
                else if (model.Note == null)
                {
                    model.Note = "-";
                }
                else if (model.Secondname == null)
                {
                    model.Secondname = "-";
                }
                else if (model.Street == null)
                {
                    model.Street = "-";
                }
                var result = this.UsersService.Add(model, this.GetUserId());
                return Ok(new ApiOkResponse(result.Id));
            }
            catch (Exception e)
            {
                throw new ApplicationException("Insert failed", e);
            }
        }

        [Authorize(policy: "AdminOnlyPolicy")]
        [HttpPost("RegisterGrummer")]
        public IActionResult RegisterGrummer([FromBody] User model)
        {
            try
            {
                model.Role = MagicRoles.Grummer;
                if (model.Birthday == null)
                {
                    model.Birthday = "-";
                }
                else if (model.Email == null)
                {
                    model.Email = "-";
                }
                else if (model.Note == null)
                {
                    model.Note = "-";
                }
                else if (model.Secondname == null)
                {
                    model.Secondname = "-";
                }
                else if (model.Street == null)
                {
                    model.Street = "-";
                }
                var result = this.UsersService.Add(model, Guid.Empty);
                return Ok(new ApiOkResponse(result.Id));
            }
            catch (Exception e)
            {
                return BadRequest(new ApiBadRequestResponse("Insert failed" + e));
            }
        }

        [Authorize(policy: "AdminOnlyPolicy")]
        [HttpPost("RegisterClient")]
        public IActionResult RegisterClient([FromBody] User model)
        {
            try
            {
                model.Role = MagicRoles.Client;
                if (model.Birthday == null)
                {
                    model.Birthday = "-";
                }
                else if (model.Email == null)
                {
                    model.Email = "-";
                }
                else if (model.Note == null)
                {
                    model.Note = "-";
                }
                else if (model.Secondname == null)
                {
                    model.Secondname = "-";
                }
                else if (model.Street == null)
                {
                    model.Street = "-";
                }
                var result = this.UsersService.Add(model, Guid.Empty);
                return Ok(new ApiOkResponse(result.Id));
            }
            catch (Exception e)
            {
                return BadRequest(new ApiBadRequestResponse("Insert failed" + e));
            }
        }

        [AllowAnonymous]
        [HttpPost("Register")]
        public IActionResult Register([FromBody] User model)
        {
            try
            {
                model.Role = MagicRoles.Trader;
                if (model.Birthday == null)
                {
                    model.Birthday = "-";
                }
                else if (model.Email == null)
                {
                    model.Email = "-";
                }
                else if (model.Note == null)
                {
                    model.Note = "-";
                }
                else if (model.Secondname == null)
                {
                    model.Secondname = "-";
                }
                else if (model.Street == null)
                {
                    model.Street = "-";
                }
                var result = this.UsersService.Add(model, Guid.Empty);
                return Ok(new ApiOkResponse(result.Id));
            }
            catch (Exception e)
            {
                return BadRequest(new ApiBadRequestResponse("Insert failed" + e));
            }
        }

        [HttpPost("UploadPhoto/{userId}"), DisableRequestSizeLimit]
        public IActionResult UpdatePhoto(Guid userId)
        {
            var file = Request.Form.Files[0];

            if (file == null || file.Length == 0)
                return BadRequest(new ApiBadRequestResponse("File is not received"));

            try
            {
                var user = this.GetUser();
                if (user.IsInRole(MagicRoles.Trader))
                {
                    if (userId != user.Id)
                    {
                        return BadRequest(new ApiBadRequestResponse("Access denied"));
                    }
                }

                var filename = FileHelper.Save(file, Path.Combine(HostingEnvironment.WebRootPath + Paths.UserImage), true);

                var modelInDb = this.UsersService.Get(userId);
                modelInDb.PhotoUrl = filename;
                this.UsersService.Update(modelInDb, user.Id);

                return Ok(new ApiOkResponse(true));
            }
            catch (Exception e)
            {
                return BadRequest(new ApiBadRequestResponse("Update failed" + e));
            }
        }


        // PUT: api/Shelfs/5
        [HttpPut("{userId}")]
        public IActionResult Put(Guid userId, [FromBody] User model)
        {
            try
            {
                var modelInDb = this.UsersService.Get(userId);
                var user = this.GetUser();

                modelInDb.Firstname = model.Firstname;
                modelInDb.Secondname = model.Secondname;
                modelInDb.Birthday = model.Birthday;
                modelInDb.Note = model.Note;
                modelInDb.Street = model.Street;
                modelInDb.PhotoUrl = model.PhotoUrl;

                //var user = this.GetUser();
                if (!user.IsInRole(MagicRoles.Admin))
                {
                    if (userId != user.Id)
                        return BadRequest(new ApiBadRequestResponse("Access denied"));

                    this.UsersService.Update(modelInDb, user.Id);

                    return Ok(new ApiOkResponse(true));
                }
                modelInDb.Phone = model.Phone;
                modelInDb.Email = model.Email;
                modelInDb.Role = model.Role;
                modelInDb.Phone = model.Phone;
                this.UsersService.Update(modelInDb, user.Id);
                return Ok(new ApiOkResponse(true));
            }
            catch (Exception e)
            {
                return BadRequest(new ApiBadRequestResponse("Update failed" + e));
            }
        }

        // PUT: api/Shelfs/5
        [HttpPut("ChangePassword/{id}/{oldPassword}/{newPassword}")]
        public IActionResult ChangePassword(Guid id, string oldPassword, string newPassword)
        {
            if (string.IsNullOrEmpty(newPassword))
                return BadRequest(new ApiBadRequestResponse("Provide new password"));

            try
            {
                var user = this.GetUser();
                if (user.IsInRole(MagicRoles.Trader))
                {
                    if (id != user.Id)
                    {
                        return BadRequest(new ApiBadRequestResponse("Access denied"));
                    }
                }

                var result = this.UsersService.TryUpdatePassword(id, user.Id, newPassword, oldPassword);

                return Ok(new ApiOkResponse(result));
            }
            catch (Exception e)
            {
                return BadRequest(new ApiBadRequestResponse("Update failed" + e));
            }
        }

        [Authorize(policy: "AdminOnlyPolicy")]
        [HttpPut("ChangePassword/{id}/{password}")]
        public IActionResult ChangePassword(Guid id, string password)
        {
            if (string.IsNullOrEmpty(password))
                return BadRequest(new ApiBadRequestResponse("Provide a password"));

            try
            {
                this.UsersService.UpdatePassword(id, this.GetUserId(), password);

                return Ok(new ApiOkResponse(true));
            }
            catch (Exception e)
            {
                return BadRequest(new ApiBadRequestResponse("Update failed" + e));
            }
        }

        [AllowAnonymous]
        [HttpPut("RestorePassword/{userId}/{hash}/{password}")]
        public IActionResult RestorePassword(Guid userId, string hash, string password)
        {
            if (string.IsNullOrEmpty(password))
                return BadRequest(new ApiBadRequestResponse("Provide a password"));

            try
            {
                var user = this.UsersService.Get(userId);
                if (user.PasswordHash != hash)
                    return BadRequest(new ApiBadRequestResponse("Bad link. You can't update password"));

                this.UsersService.UpdatePassword(userId, userId, password);

                return Ok(new ApiOkResponse(true));
            }
            catch (Exception e)
            {
                return BadRequest(new ApiBadRequestResponse("Update failed" + e));
            }
        }

        [AllowAnonymous]
        [HttpPost("SendForgotPasswordMessage/{email}")]
        public IActionResult SendForgotPasswordMessage(string email)
        {
            if (string.IsNullOrEmpty(email))
                return BadRequest(new ApiBadRequestResponse("Provide a password"));

            try
            {
                var user = this.UsersService.Get(f => f.Email.Equals(email, StringComparison.InvariantCultureIgnoreCase));

                if (user == null)
                    return BadRequest(new ApiBadRequestResponse("No user found using this email"));

                string senderEmail = Program.Configuration["SystemEmail:Email"];
                string password = Program.Configuration["SystemEmail:Password"];
                string smtpServer = Program.Configuration["SystemEmail:SMTPServer"];
                int smtpPort = Convert.ToInt32(Program.Configuration["SystemEmail:SMTPPort"]);

                try
                {
                    var sender = new EmailNotification("Capital Wave Inc", senderEmail, password, user.Email,
                            $"You know what yo do - http://localhost:3000/new-password/{user.Id}/{user.PasswordHash}/",
                            "Forgot your password?",
                            smtpServer, smtpPort);
                    sender.SendMessage();
                }
                catch { }


                return Ok(new ApiOkResponse(true));
            }
            catch (Exception e)
            {
                return BadRequest(new ApiBadRequestResponse("Update failed" + e));
            }
        }
    }
}