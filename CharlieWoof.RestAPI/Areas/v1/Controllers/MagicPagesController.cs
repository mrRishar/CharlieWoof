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
    [Produces("application/json")]
    [Route("v1/MagicPages")]
    public class MagicPagesController : TargetBaseController<MagicPage, IMagicPagesService, Guid>
    {
        protected IMagicPagesService MagicPagesService { get; }
        protected IMagicContentItemsService MagicContentItemsService { get; }

        public MagicPagesController(IUsersService usersService,
                                    IMagicPagesService magicPagesService,
                                    IMagicContentItemsService magicContentItemsService)
            : base(magicPagesService, usersService)
        {
            this.MagicPagesService = magicPagesService;
            this.MagicContentItemsService = magicContentItemsService;
        }


        [AllowAnonymous]
        [HttpGet]
        public new async Task<IActionResult> Get()
        {
            var result = this.MagicPagesService.GetAll();
            return Ok(new ApiOkResponse(result.OrderBy(x => x.SortNumder)));
            //  return await base.Get();
        }

        [AllowAnonymous]
        [HttpGet("GetWithContentItems")]
        public new async Task<IActionResult> GetWithContentItems()
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new ApiBadRequestResponse(ModelState));
            }

            var pages = this.TargetService.GetAll();
          
            foreach (var item in pages)
            {
                item.MagicContentItems = MagicContentItemsService.GetForMagicPage(item.Id).ToList();
            }
            return Ok(new ApiOkResponse(pages));
        }



        [AllowAnonymous]
        [HttpGet("{type}")]
        public new async Task<IActionResult> GetForType(MagicPagesTypes type)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new ApiBadRequestResponse(ModelState));
            }

            var model = this.TargetService.GetForType(type);
            if (model == null)
            {
                return NotFound(new ApiResponse(404, $"Product not found for {type.ToString()}"));
            }
            model.MagicContentItems = MagicContentItemsService.GetForMagicPage(model.Id).ToList();
            return Ok(new ApiOkResponse(model));
        }

        [Authorize(policy: "AdminOnlyPolicy")]
        // [AllowAnonymous]
        [HttpPost]
        public override IActionResult Post([FromBody] MagicPage model)
        {
            return base.Post(model);
        }


        [Authorize(policy: "AdminOnlyPolicy")]
        [HttpPut("{id}")]
        public override IActionResult Put(Guid id, [FromBody] MagicPage model)
        {
            var page = this.MagicPagesService.Get(id);
            page.Description = model?.Description;
            page.Title = model.Title;
            page.Content = model.Content;
            page.SeoDescription = model.SeoDescription;
            page.SeoTitle = model.SeoTitle;
            page.SeoKeywords = model.SeoKeywords;
            page.SortNumder = model.SortNumder;

            return base.Put(id, page);
        }

        [Authorize(policy: "AdminOnlyPolicy")]
        [HttpDelete("{id}")]
        public override IActionResult Delete(Guid id)
        {
            var page = this.MagicPagesService.Get(id);

            if ((byte)page.Type > 10)
                return base.Delete(id);

            return BadRequest(new ApiBadRequestResponse("Delete failed: Can't remove this page"));
        }
    }
}