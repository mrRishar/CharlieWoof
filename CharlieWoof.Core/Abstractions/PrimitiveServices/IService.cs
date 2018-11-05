using System.Collections.Generic;
using System.Linq.Expressions;

namespace CharlieWoof.Core.Abstractions.PrimitiveServices
{
    public interface IService<TDto, TPrimary>
        where TDto : class
        where TPrimary : struct
    {
        TDto Add(TDto model);
        void Add(IEnumerable<TDto> models);

        TDto Get(TPrimary id);
        TDto Get(Expression<System.Func<TDto, bool>> predicate);

        TDto GetLast();

        IEnumerable<TDto> GetAll();
        IEnumerable<TDto> GetAll(IEnumerable<TPrimary> ids);
        IEnumerable<TDto> GetAll(Expression<System.Func<TDto, bool>> predicate);

        int Count();
        int Count(Expression<System.Func<TDto, bool>> predicate);

        void Delete(TPrimary id);
        void Delete(IEnumerable<TPrimary> ids);

        void Update(TDto model);

    }
}