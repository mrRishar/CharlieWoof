using System;
using System.Linq;
using System.Security.Claims;
using CharlieWoof.Core.Abstractions.Services;
using CharlieWoof.Core.Abstractions.Services.User;
using CharlieWoof.Core.Models;
using Microsoft.AspNetCore.Mvc;

namespace CharlieWoof.RestAPI.Areas.v1.Controllers
{
    public abstract class BaseController : ControllerBase
    {
        private ISettingsService settingsService;

        protected IUsersService UsersService{ get; }

        protected BaseController(IUsersService usersService)
        {
            this.UsersService = usersService;
        }

        public BaseController(IUsersService usersService, ISettingsService settingsService) : this(usersService)
        {
            this.settingsService = settingsService;
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