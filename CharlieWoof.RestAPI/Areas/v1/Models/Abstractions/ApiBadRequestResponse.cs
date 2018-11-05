using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace CharlieWoof.RestAPI.Areas.v1.Models.Abstractions
{
    public class ApiBadRequestResponse : ApiResponse
    {
        public IEnumerable<string> Errors { get; }

        public ApiBadRequestResponse(ModelStateDictionary modelState)
            : base(400)
        {
            if (modelState.IsValid)
            {
                throw new ArgumentException("ModelState must be invalid", nameof(modelState));
            }

            Errors = modelState.SelectMany(x => x.Value.Errors)
                               .Select(x => x.ErrorMessage).ToArray();
        }


        public ApiBadRequestResponse(string errorMessage)
                : base(400)
        {
            Errors = new List<string>(){ errorMessage };
        }
    }
}
