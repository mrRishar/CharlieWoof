using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using Newtonsoft.Json;

namespace CharlieWoof.RestAPI.Areas.v1.Models.Abstractions
{
    public class ApiOkResponse : ApiResponse
    {
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public object Result { get; }

        public ApiOkResponse(object result) : base(200)
        {
            Result = CheckAndRemovePropertiesFromObjec(result);
        }
        
        private object CheckAndRemovePropertiesFromObjec(object obj)
        {
            var enumerable = obj as System.Collections.IEnumerable;

            var enumarableResult = new List<object>();

            if (enumerable != null)
            {
                foreach (var item in enumerable)
                {
                    enumarableResult.Add(RemovePropertiesFromResultObject(item));
                }

                return enumarableResult;
            }

            return RemovePropertiesFromResultObject(obj);
        }

        private object RemovePropertiesFromResultObject(object result)
        {
            var properties = result.GetType().GetProperties();

            IDictionary<string, Object> resultObj = new ConcurrentDictionary<string, object>();

            var bannedProps = new[]
            {
                    "PasswordHash",
                    "IsDeleted",
                    "UpdatedByUserId"
            };

            foreach (var item in properties.Where(f => !bannedProps.Contains(f.Name)))
            {
                resultObj.Add(item.Name, item.GetValue(result));
            }

            return resultObj;
        }
    }
}