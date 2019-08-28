using System;
using System.Collections.Generic;
using System.Linq;
using CharlieWoof.Core.Abstractions.Services.MagicPackage;
using CharlieWoof.Core.Abstractions.Services.User;
using CharlieWoof.Core.Enums;
using CharlieWoof.Core.Models;
using CharlieWoof.Core.Models.MagicPackage;
using CharlieWoof.RestAPI.Areas.v1.Models.Abstractions;
using CharlieWoof.Services.Services.UserService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CharlieWoof.RestAPI.Areas.v1.Controllers
{
    [Authorize(policy: "GrummerAndAdminPolicy")]
    [Route("v1/Orders")]
    [Produces("application/json")]
    public class OrdersController : TargetBaseController<Order, IOrdersService, Guid>
    {
        protected IOrdersService OrdersService { get; }
        protected IPetsService PetsService { get; }

        public OrdersController(IUsersService usersService,
                                IOrdersService ordersService,
                                IPetsService petsService)
            : base(ordersService, usersService)
        {
            this.OrdersService = ordersService;
            this.PetsService = petsService;
        }

        [HttpGet]
        public IActionResult Get()
        {
            var model = this.OrdersService.GetAll();

            if (model == null)
            {
                return NotFound(new ApiResponse(404, $"Items were not found"));
            }

            return Ok(new ApiOkResponse(model));
        }

        [HttpGet("ordersList")]
        public IActionResult GetForName()
        {
            var curentUser = this.GetUser();
            var users = UsersService.GetAll().ToList();
            var pets = PetsService.GetAll().ToList();

            var orderList = this.OrdersService.GetAll().ToList();
            var result = new List<OrderInfo>();


            foreach (var item in orderList)
            {
                var user = UsersService.Get(item.UserId);

                var order = new OrderInfo()
                {
                    Id = item.Id,
                    UserId = item.UserId,
                    PetId = item.PetId,
                    GrummerUserId = item.GrummerUserId,
                    UserName = (user?.Firstname + " " + user?.Secondname) ?? "-",
                    CreatedOnUtc = item.CreatedOnUtc,
                    Date = item.Date,
                    Note = item.Note,
                    Price = item.Price,
                    Services = item.Services,
                    Status = item.Status,
                    UpdatedByUserId = item.UpdatedByUserId,
                    UpdatedOnUtc = item.UpdatedOnUtc,
                    //Grummers = users.Where(x => x.IsInRole(MagicRoles.Grummer)).ToList()
                };
                if (this.GetUser().Role == MagicRoles.Admin)
                {
                    order.UserPhone = user?.Phone ?? "-";
                }
                if (item.PetId.HasValue)
                {
                    var pet = PetsService.Get(item.PetId.Value);
                    order.PetName = pet?.Name ?? "-";
                }
                if (item.GrummerUserId.HasValue)
                {
                    var grummer = UsersService.Get(item.GrummerUserId.Value);
                    order.GrummerName = (grummer?.Firstname + " " + grummer?.Secondname) ?? "-";
                }
                result.Add(order);
            }
            if ((this.GetUser().Role == MagicRoles.Grummer || this.GetUser().Role == MagicRoles.Trader))
            {
               result = result.Where(x => x.GrummerUserId == curentUser.Id).ToList();
            }

            return Ok(new ApiOkResponse(result));

        }

        [HttpGet("{userId}")]
        public IActionResult GetForUser(Guid userId)
        {
            var users = UsersService.GetAll().ToList();
            var pets = PetsService.GetAll().ToList();

            var orderList = this.OrdersService.GetForUser(userId).ToList();
            var result = new List<OrderInfo>();


            foreach (var item in orderList)
            {
                var u = UsersService.Get(item.UserId);

                var order = new OrderInfo()
                {
                    Id = item.Id,
                    UserId = item.UserId,
                    PetId = item.PetId,
                    UserName = (u?.Firstname + " " + u?.Secondname) ?? "-",
                    CreatedOnUtc = item.CreatedOnUtc,
                    Date = item.Date,
                    Note = item.Note,
                    Price = item.Price,
                    Services = item.Services,
                    Status = item.Status,
                    GrummerName = (u?.Firstname + " " + u?.Secondname) ?? "-",
                    GrummerUserId = item.GrummerUserId,
                    UpdatedByUserId = item.UpdatedByUserId,
                    UpdatedOnUtc = item.UpdatedOnUtc,
                };
                if (this.GetUser().Role == MagicRoles.Admin)
                {
                    order.UserPhone = u?.Phone ?? "-";
                }
                if (item.PetId.HasValue)
                {
                    var p = PetsService.Get(item.PetId.Value);
                    order.PetName = p?.Name ?? "-";
                }
                if (item.GrummerUserId.HasValue)
                {
                    var grummer = UsersService.Get(item.GrummerUserId.Value);
                    order.GrummerName = (grummer?.Firstname + " " + grummer?.Secondname) ?? "-";
                }
                result.Add(order);
            }

            return Ok(new ApiOkResponse(result));

        }


        //[HttpGet("orderPage/{userId/orderId}")]
        //public IActionResult UpdateOrder(Guid userId, Guid orderId)
        //{
        //    var users = UsersService.GetAll().Where(x => x.IsInRole(MagicRoles.Grummer)).ToList();
        //    var pets = PetsService.GetAll().Where(x => x.OwnerUserId == userId).ToList();

        //    var orderList = this.OrdersService.GetForUser(userId).ToList();
        //    var orderSelected = this.OrdersService.Get(orderId);

        //    var u = UsersService.Get(orderSelected.UserId);

        //    var order = new OrderInfo()
        //    {
        //        Id = orderSelected.Id,
        //        UserId = orderSelected.UserId,
        //        PetId = orderSelected.PetId,
        //        UserName = (u?.Firstname + " " + u?.Secondname) ?? "-",
        //        CreatedOnUtc = orderSelected.CreatedOnUtc,
        //        Date = orderSelected.Date,
        //        Note = orderSelected.Note,
        //        Price = orderSelected.Price,
        //        Services = orderSelected.Services,
        //        Status = orderSelected.Status,
        //        GrummerName = (u?.Firstname + " " + u?.Secondname) ?? "-",
        //        GrummerUserId = orderSelected.GrummerUserId,
        //        UpdatedByUserId = orderSelected.UpdatedByUserId,
        //        UpdatedOnUtc = orderSelected.UpdatedOnUtc,
        //    };
        //    if (this.GetUser().Role == MagicRoles.Admin)
        //    {
        //        order.UserPhone = u?.Phone ?? "-";
        //    }
        //    if (orderSelected.PetId.HasValue)
        //    {
        //        var p = PetsService.Get(orderSelected.PetId.Value);
        //        order.PetName = p?.Name ?? "-";
        //    }
        //    return Ok(new ApiOkResponse(order));

        //}

        [HttpPost]
        public override IActionResult Post([FromBody] Order model)
        {
            return base.Post(model);
        }


        [HttpPut("{id}")]
        public override IActionResult Put(Guid id, [FromBody] Order model)
        {
            var order = this.OrdersService.Get(id);
            var user = this.GetUser();
            if (user.IsInRole(MagicRoles.Grummer))
            {
                order.Status = model.Status;
                order.Note = model.Note;
            }
            else if (user.IsInRole(MagicRoles.Admin))
            {
                order.Note = model.Note;
                order.Price = model.Price;
                order.Date = model.Date;
                order.Services = model.Services;
                order.Status = model.Status;
                order.UserId = model.UserId;
                order.PetId = model.PetId;
                order.GrummerUserId = model.GrummerUserId;
            }
            return base.Put(id, order);
        }

        [Authorize(policy: "AdminOnlyPolicy")]
        [HttpDelete("{id}")]
        public override IActionResult Delete(Guid id)
        {
            var page = this.OrdersService.Get(id);

            // if ((byte)page.Type > 10)
            return base.Delete(id);

            // return BadRequest(new ApiBadRequestResponse("Delete failed: Can't remove this page"));
        }
    }
}