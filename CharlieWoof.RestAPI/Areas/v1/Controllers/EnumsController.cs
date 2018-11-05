using System.Threading.Tasks;
using CharlieWoof.Core.Enums;
using CharlieWoof.RestAPI.Areas.v1.Models.Abstractions;
using Extensions.EnumExtension;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CharlieWoof.RestAPI.Areas.v1.Controllers
{
    [Produces("application/json")]
    [Route("v1/Enums")]
    [AllowAnonymous]
    public class EnumsController : ControllerBase
    {
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var result = new
            {
                MagicFileTypes = typeof(MagicFileTypes).ToApiList<MagicFileTypes>(),
                MagicPagesTypes = typeof(MagicPagesTypes).ToApiList<MagicPagesTypes>(),
                MagicRoles = typeof(MagicRoles).ToApiList<MagicRoles>(),
                Settings = typeof(Settings).ToApiList<Settings>(),
            };

            return Ok(new ApiOkResponse(result));
        }
    }
}