using System.Collections.Generic;

namespace CharlieWoof.Core.Abstractions.PrimitiveServices
{
    public interface IStatableService<TDto, TPrimaryKey, TUserPrimaryKey> : IService<TDto, TPrimaryKey>
        where TDto : class
        where TPrimaryKey : struct
        where TUserPrimaryKey : struct
    {
        TDto Add(TDto model, TUserPrimaryKey updatedUserId);
        void Add(IEnumerable<TDto> models, TUserPrimaryKey updatedUserId);

        void Delete(TPrimaryKey id, TUserPrimaryKey updatedUserId);
        void Delete(IEnumerable<TPrimaryKey> ids, TUserPrimaryKey updatedUserId);

        void Update(TDto model, TUserPrimaryKey updatedUserId);
    }
}