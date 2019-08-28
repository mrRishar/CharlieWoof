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
            var enumarableResult = new List<object>();

            if (obj is string)
                return obj;

            if (IsObjectEnumerable(obj))
            {
                var enumerable = obj as System.Collections.IEnumerable;

                foreach (var item in enumerable)
                {
                    if (item is Guid)
                    {
                        enumarableResult.Add(item);
                    }
                    else
                    {
                        enumarableResult.Add(RemovePropertiesFromResultObject(item));
                    }
                }

                return enumarableResult;
            }

            return RemovePropertiesFromResultObject(obj);
        }

        private object RemovePropertiesFromResultObject(object obj)
        {
            var properties = obj.GetType().GetProperties();

            IDictionary<string, Object> resultObj = new ConcurrentDictionary<string, object>();

            var bannedProps = new[]
            {
                    "PasswordHash",
                    "IsDeleted",
                    "UpdatedByUserId"
            };

            foreach (var item in properties.Where(f => !bannedProps.Contains(f.Name)))
            {
                var itemObjValue = item.GetValue(obj);
                if (IsObjectEnumerable(itemObjValue))
                {
                    resultObj.Add(item.Name, CheckAndRemovePropertiesFromObjec(item.GetValue(obj)));
                }
                else
                {
                    resultObj.Add(item.Name, itemObjValue);
                }
            }

            return resultObj;
        }

        private bool IsObjectEnumerable(object obj)
        {
            if (obj?.GetType() == typeof(string))
                return false;

            var enumerable = obj as System.Collections.IEnumerable;

            if (enumerable != null)
            {
                return true;
            }

            return false;
        }
    }
}