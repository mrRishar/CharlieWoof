using System;
using System.Linq;
using System.Security.Claims;
using CharlieWoof.Core.Abstractions.Services.User;
using CharlieWoof.Core.Models;
using Microsoft.AspNetCore.Mvc;

namespace CharlieWoof.RestAPI.Areas.v1.Controllers
{
    public abstract class BaseController : ControllerBase
    {
        protected IUsersService UsersService{ get; }

        protected BaseController(IUsersService usersService)
        {
            this.UsersService = usersService;
        }

        protected User GetUser()
        {
            return this.UsersService.Get(this.GetUserId());
        }

        protected Guid GetUserId()
        {
            return new Guid(this.User.Claims.FirstOrDefault(f => f.Type == ClaimTypes.Sid)?.Value);
        }
    }
}