using System;
using System.Threading.Tasks;
using CharlieWoof.Core.Abstractions.PrimitiveBase;
using CharlieWoof.Core.Abstractions.PrimitiveServices;
using CharlieWoof.Core.Abstractions.Services.User;
using CharlieWoof.RestAPI.Areas.v1.Models.Abstractions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CharlieWoof.RestAPI.Areas.v1.Controllers
{
    [Authorize]
    public abstract class TargetBaseController<TTarget, TITargetService, TTargetPrimaryKey> : BaseController
        where TTarget : class, IPrimary<TTargetPrimaryKey>
        where TTargetPrimaryKey : struct
        where TITargetService : IStatableService<TTarget, TTargetPrimaryKey, Guid>
    {
        protected TITargetService TargetService { get; set; }
        protected IUsersService UsersService{ get; set; }

        protected TargetBaseController(TITargetService itService, IUsersService usersService) : base(usersService)
        {
            this.TargetService = itService;
            this.UsersService = usersService;
        }

        [HttpGet("get")]
        public virtual async Task<IActionResult> Get()
        {
            var model = this.TargetService.GetAll();

            if (model == null)
            {
                return NotFound(new ApiResponse(404, $"Items were not found"));
            }

            return Ok(new ApiOkResponse(model));
        }

        [AllowAnonymous]
        [HttpGet("get/{id}")]

        public virtual async Task<IActionResult> Get(TTargetPrimaryKey id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new ApiBadRequestResponse(ModelState));
            }

            var model = this.TargetService.Get(id);
            if (model == null)
            {
                return NotFound(new ApiResponse(404, $"Product not found with id {id}"));
            }

            return Ok(new ApiOkResponse(model));
        }

        // POST: api/Shelfs/5
        [HttpPost]
        public virtual IActionResult Post([FromBody] TTarget model)
        {
            try
            {
                var result = this.TargetService.Add(model, this.GetUserId());
                return Ok(result.Id);
            }
            catch (Exception e)
            {
                return BadRequest(new ApiBadRequestResponse("Insert failed:" + e.Message));
            }
        }

        // PUT: api/Shelfs/5
        [HttpPut("{id}")]
        public virtual IActionResult Put(TTargetPrimaryKey id, [FromBody] TTarget model)
        {
            try
            {
                this.TargetService.Update(model, this.GetUserId());
                return Ok(true);
            }
            catch (Exception e)
            {
                return BadRequest(new ApiBadRequestResponse("Update failed:" + e.Message));
            }
        }

        [HttpDelete("{id}")]
        public virtual IActionResult Delete(TTargetPrimaryKey id)
        {
            try
            {
                this.TargetService.Delete(id, this.GetUserId());
                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest(new ApiBadRequestResponse("Delete failed:" + e.Message));
            }
        }
    }
}