using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using CharlieWoof.Core.Abstractions.Services.User;
using CharlieWoof.Core.Constants;
using CharlieWoof.Core.Models;
using CharlieWoof.RestAPI.Areas.v1.Controllers;
using CharlieWoof.RestAPI.Areas.v1.Models.Abstractions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

namespace CharlieWoof.RestAPI.Controllers
{
    [Route("/Auth")]
    public class AuthController : BaseController
    {
        public AuthController(IUsersService usersService) : base(usersService)
        { }

        [HttpPost("token")]
        [AllowAnonymous]
        public IActionResult Token()
        {
            try
            {
                //string tokenString = "test";
                var header = Request.Headers["Authorization"];
                if (header.ToString().StartsWith("Basic"))
                {
                    var usernameAndPass = GetLoginPassword(header);

                    var user = this.UsersService.Get(usernameAndPass[0], usernameAndPass[1]);
                    if (user != null)
                    {
                        var claimsData = CreateClaimsForUser(user);
                        var signInCred = new SigningCredentials(Auth.Key, SecurityAlgorithms.HmacSha256Signature);
                        var token = new JwtSecurityToken(issuer: Auth.Issuer,
                                                         audience: Auth.Audience,
                                                         expires: DateTime.Now.AddMinutes(60),
                                                         claims: claimsData,
                                                         signingCredentials: signInCred);

                        var tokenString = new JwtSecurityTokenHandler().WriteToken(token);
                        return Ok(tokenString);
                    }
                }

                return Unauthorized();
            }
            catch (Exception e)
            {
                return BadRequest(new ApiBadRequestResponse(e.Message));
            }
        }


        [HttpGet("info")]
        [Authorize]
        public IActionResult Info()
        {
            var signedUser = this.GetUser();
            var result = new
            {
                signedUser.Id,
                name = signedUser.Firstname,
                lastName = signedUser.Secondname,
                email = signedUser.Email,
                role = signedUser.Role,
                photo = signedUser.PhotoUrl
            };

            return Ok(new ApiOkResponse(result));
        }


        private string[] GetLoginPassword(string header)
        {
            var credValue = header.Substring("Basic ".Length).Trim();
            var usernameAndPassenc = Encoding.UTF8.GetString(Convert.FromBase64String(credValue)); //format=> login:pass
            return usernameAndPassenc.Split(":");
        }

        private Claim[] CreateClaimsForUser(User user)
        {
            return new[]
             {
                new Claim(ClaimTypes.Sid, user.Id.ToString()),
                new Claim(ClaimTypes.Name, user.Email),
                new Claim(ClaimTypes.Role, user.Role.ToString()),
                new Claim(ClaimTypes.Surname, user.Secondname),
            };
        }
    }
}