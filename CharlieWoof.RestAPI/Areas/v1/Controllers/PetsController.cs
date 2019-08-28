using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CharlieWoof.Core.Abstractions.Services.MagicPackage;
using CharlieWoof.Core.Abstractions.Services.User;
using CharlieWoof.Core.Enums;
using CharlieWoof.Core.Models.MagicPackage;
using CharlieWoof.RestAPI.Areas.v1.Models.Abstractions;
using CharlieWoof.Services.Services.MagicPackage;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CharlieWoof.RestAPI.Areas.v1.Controllers
{
    [Authorize(policy: "AdminOnlyPolicy")]
    [Route("v1/Pets")]
    [Produces("application/json")]
    public class PetsController : TargetBaseController<Pet, IPetsService, Guid>
    {
        protected IPetsService PetsService { get; }

        public PetsController(IUsersService usersService,
                                    IPetsService petsService)
            : base(petsService, usersService)
        {
            this.PetsService = petsService;
        }

        [HttpGet("petsOwner")]
        public IActionResult GetForOwner()
        {
            var users = UsersService.GetAll().ToList();
            var petsList = this.PetsService.GetAll().ToList();
            var result = new List<OwnerInfo>();

            foreach (var item in petsList)
            {
                var user = UsersService.Get(item.OwnerUserId);

                var order = new OwnerInfo()
                {
                    Id = item.Id,
                    OwnerUserId = item.OwnerUserId,
                    OwnerName = (user?.Firstname + " " + user?.Secondname) ?? "-",
                    CreatedOnUtc = item.CreatedOnUtc,
                    Note = item.Note,
                    Birthday = item.Birthday,
                    Breed = item.Breed,
                    Image = item.Image,
                    Name = item.Name,
                    UpdatedByUserId = item.UpdatedByUserId,
                    UpdatedOnUtc = item.UpdatedOnUtc,
                };
                result.Add(order);
            }

            return Ok(new ApiOkResponse(result));
        }

        //[HttpGet("{userId}")]
        //public IActionResult GetForUser(Guid userId)
        //{
        //    var users = UsersService.GetAll().ToList();
        //    var pets = PetsService.GetAll().ToList();

        //    var petList = this.PetsService.GetForOwner(userId).ToList();
        //    var result = new List<OwnerInfo>();


        //    foreach (var item in petList)
        //    {
        //        var u = UsersService.Get(item.OwnerUserId);
        //        var ownerInfo = new OwnerInfo()
        //        {
        //            Id = item.Id,
        //            OwnerUserId = item.OwnerUserId,
        //            //PetId = item.PetId,
        //            OwnerName = (u?.Firstname + " " + u?.Secondname) ?? "-",
        //            CreatedOnUtc = item.CreatedOnUtc,
        //            Birthday = item.Birthday,
        //            Breed = item.Breed,
        //            Image = item.Image,
        //            Name = item.Name,
        //            Note = item.Note,
        //            UpdatedByUserId = item.UpdatedByUserId,
        //            UpdatedOnUtc = item.UpdatedOnUtc,
        //        };       
        //        result.Add(ownerInfo);
        //    }
        //    return Ok(new ApiOkResponse(result));
        //}


        [HttpGet]
        public IActionResult Get()
        {
            var model = this.TargetService.GetAll();

            if (model == null)
            {
                return NotFound(new ApiResponse(404, $"Items were not found"));
            }

            return Ok(new ApiOkResponse(model));
        }

        [HttpGet("{ownerId}")]
        public IActionResult GetForOwner(Guid ownerId)
        {
            var result = this.PetsService.GetForOwner(ownerId);

            return Ok(new ApiOkResponse(result));

        }

        [Authorize(policy: "AdminOnlyPolicy")]
        // [AllowAnonymous]
        [HttpPost]
        public override IActionResult Post([FromBody] Pet model)
        {
            return base.Post(model);
        }


        [Authorize(policy: "AdminOnlyPolicy")]
        [HttpPut("{id}")]
        public override IActionResult Put(Guid id, [FromBody] Pet model)
        {
            var pet = this.PetsService.Get(id);
            pet.Birthday = model.Birthday;
            pet.Breed = model.Breed;
            pet.Image = model.Image;
            pet.Name = model.Name;
            pet.Note = model.Note;
            pet.OwnerUserId = model.OwnerUserId;

            return base.Put(id, pet);
        }

        [Authorize(policy: "AdminOnlyPolicy")]
        [HttpDelete("{id}")]
        public override IActionResult Delete(Guid id)
        {
            var page = this.PetsService.Get(id);

            // if ((byte)page.Type > 10)
            return base.Delete(id);

            // return BadRequest(new ApiBadRequestResponse("Delete failed: Can't remove this page"));
        }
    }
}