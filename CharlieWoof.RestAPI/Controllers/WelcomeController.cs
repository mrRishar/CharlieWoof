using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CharlieWoof.RestAPI.Controllers
{
    [Route("/")]
    public class WelcomeController : ControllerBase
    {
        [HttpGet]
        [AllowAnonymous]
        public IActionResult Get()
        {
            return Ok("Welcome to CW Rest API");
        }
    }
}