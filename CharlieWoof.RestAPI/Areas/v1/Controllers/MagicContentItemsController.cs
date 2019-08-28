using System;
using System.Linq;
using System.Threading.Tasks;
using CharlieWoof.Core.Abstractions.Services.MagicPackage;
using CharlieWoof.Core.Abstractions.Services.User;
using CharlieWoof.Core.Enums;
using CharlieWoof.Core.Models.MagicPackage;
using CharlieWoof.RestAPI.Areas.v1.Models.Abstractions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CharlieWoof.RestAPI.Areas.v1.Controllers
{
    [Route("v1/MagicContentItems")]
    [Produces("application/json")]
    public class MagicContentItemsController : TargetBaseController<MagicContentItem, IMagicContentItemsService, Guid>
    {
        protected IMagicContentItemsService MagicContentItemsService { get; }

        public MagicContentItemsController(IUsersService usersService,
                                    IMagicContentItemsService magicContentItemsService)
            : base(magicContentItemsService, usersService)
        {
            this.MagicContentItemsService = magicContentItemsService;
        }

        [AllowAnonymous]
        [HttpGet("{magicPageId}")]
        public IActionResult GetForPage(Guid magicPageId)
        {
            var result = this.MagicContentItemsService.GetForMagicPage(magicPageId);

            return Ok(new ApiOkResponse(result.OrderBy(x => x.SortNumder)));

        }

        [Authorize(policy: "AdminOnlyPolicy")]
        // [AllowAnonymous]
        [HttpPost]
        public override IActionResult Post([FromBody] MagicContentItem model)
        {
            return base.Post(model);
        }


        [Authorize(policy: "AdminOnlyPolicy")]
        [HttpPut("{id}")]
        public override IActionResult Put(Guid id, [FromBody] MagicContentItem model)
        {
            var contentItem = this.MagicContentItemsService.Get(id);
            contentItem.Color = model.Color;
            contentItem.Content = model.Content;
            contentItem.Css = model.Css;
            contentItem.Description = model.Description;
            contentItem.Icon = model.Icon;
            contentItem.MagicPageId = model.MagicPageId;
            contentItem.Title = model.Title;
            contentItem.Image = model.Image;
            contentItem.SortNumder = model.SortNumder;

            return base.Put(id, contentItem);
        }

        [Authorize(policy: "AdminOnlyPolicy")]
        [HttpDelete("{id}")]
        public override IActionResult Delete(Guid id)
        {
            var page = this.MagicContentItemsService.Get(id);

            // if ((byte)page.Type > 10)
            return base.Delete(id);

            // return BadRequest(new ApiBadRequestResponse("Delete failed: Can't remove this page"));
        }
    }
}