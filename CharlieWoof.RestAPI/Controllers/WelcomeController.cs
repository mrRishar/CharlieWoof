using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CharlieWoof.RestAPI.Controllers
{
    [Route("/welcome")]
    [AllowAnonymous]
    public class WelcomeController : ControllerBase
    {
        [HttpGet]
        public IActionResult Get()
        {
            return Ok("Welcome to Charlie Woof Rest API");
        }
    }
}