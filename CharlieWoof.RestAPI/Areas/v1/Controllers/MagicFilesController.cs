using System;
using System.IO;
using System.Linq;
using CharlieWoof.Core.Abstractions.Services;
using CharlieWoof.Core.Abstractions.Services.MagicPackage;
using CharlieWoof.Core.Abstractions.Services.User;
// using CharlieWoof.Core.DTOs;
using CharlieWoof.Core.Enums;
using CharlieWoof.Core.Models.MagicPackage;
using CharlieWoof.RestAPI.Areas.v1.Controllers;
using CharlieWoof.RestAPI.Areas.v1.Models.Abstractions;
using CharlieWoof.RestAPI.FileHelpers;
using Microsoft.AspNetCore.Authorization;
// using CharlieWoof.WebSite.Areas.ControlPanel.Models.MagicFiles;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
// using Web.Extensions.FileHelpers;

namespace CharlieWoof.WebSite.Areas.ControlPanel.Controllers
{
    [Produces("application/json")]
    [Route("v1/MagicFiles")]
    public class MagicFilesController : BaseController
    {
        private IHostingEnvironment _hostingEnvironment;

        private IMagicFilesService _magicFilesService;
        public MagicFilesController(IUsersService usersService,
            IHostingEnvironment environment,
            ISettingsService settingsService,
            IMagicFilesService magicFilesService) : base(usersService, settingsService)
        {
            _hostingEnvironment = environment;
            this._magicFilesService = magicFilesService;
        }

        [Authorize(policy: "AdminOnlyPolicy")]
        [HttpGet("getFiles")]
        public IActionResult Index()
        {

            if (!ModelState.IsValid)
            {
                return BadRequest(new ApiBadRequestResponse(ModelState));
            }

            var model = this._magicFilesService.GetFiles().ToList();
            if (model == null)
            {
                return NotFound(new ApiResponse(404, $"Product not found"));
            }
            return Ok(new ApiOkResponse(model));
        }


        [Authorize(policy: "AdminOnlyPolicy")]
        [HttpGet("getImages")]
        public IActionResult Images()
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new ApiBadRequestResponse(ModelState));
            }

            var model = this._magicFilesService.GetImages().ToList();
            if (model == null)
            {
                return NotFound(new ApiResponse(404, $"Product not found"));
            }

            return Ok(new ApiOkResponse(model));
        }

        [Authorize(policy: "AdminOnlyPolicy")]
        [HttpPost("{name}/{type}")]
        public IActionResult Add(string name, MagicFileTypes type = (MagicFileTypes)MagicFileTypes.File)
        {

            var file = Request.Form.Files.Count > 0 ? Request.Form.Files[0] : null;
            if (file != null)
            {
                string filename = string.Empty;
                if (type == (MagicFileTypes)MagicFileTypes.Image)
                    filename = FileHelper.Save(file, Path.Combine(_hostingEnvironment.WebRootPath, "Content/Images/"), true);
                else
                    filename = FileHelper.Save(file, Path.Combine(_hostingEnvironment.WebRootPath, "Content/Files/"), true);

                var magicFile = new MagicFile
                {
                    FileName = filename,
                    Name = name,
                    Type = type
                };
                this._magicFilesService.Add(magicFile, this.GetUserId());

                return Ok();
            }

            return NotFound(new ApiResponse(404, $"Items were not found"));

            //if (magicFileType == (byte)MagicFileTypes.File)
            //    return RedirectToAction("Index", "MagicFiles", new { area = "ControlPanel" });
            //return RedirectToAction("Images", "MagicFiles", new { area = "ControlPanel" });
        }



        [HttpDelete("{id}")]
        [Authorize(policy: "AdminOnlyPolicy")]
        public IActionResult Delete(Guid id)
        {
            var file = this._magicFilesService.Get(id);
            this._magicFilesService.Delete(id, this.GetUserId());

            if (System.IO.File.Exists(Path.Combine(_hostingEnvironment.WebRootPath, "Content/Files/" + file.FileName)))
                System.IO.File.Delete(Path.Combine(_hostingEnvironment.WebRootPath, "Content/Files/" + file.FileName));

            return Ok(new ApiOkResponse(true));
        }
    }
}