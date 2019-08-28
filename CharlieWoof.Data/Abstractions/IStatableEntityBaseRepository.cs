using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;
using CharlieWoof.Core.Abstractions.PrimitiveBase;

namespace CharlieWoof.Data.Abstractions
{
    public interface IStatableEntityBaseRepository<TEntity, TPrimaryKey, TUserPrimaryKey>
        where TEntity : class, IPrimary<TPrimaryKey>, ITrackable<TUserPrimaryKey>, IStatable
    {
        TEntity Add(TEntity entity, TUserPrimaryKey updatedByUserId);
        void Add(IEnumerable<TEntity> entities, TUserPrimaryKey updatedByUserId);
        Task<int> AddAsync(TEntity entity, TUserPrimaryKey updatedByUserId);
        void Update(TEntity entity, TUserPrimaryKey updatedByUserId);
        Task UpdateAsync(TEntity entity, TUserPrimaryKey updatedByUserId);
        void Delete(TPrimaryKey id, TUserPrimaryKey updatedByUserId);
        void Delete(TEntity entity, TUserPrimaryKey updatedByUserId);
        void Delete(IEnumerable<TPrimaryKey> ids, TUserPrimaryKey updatedByUserId);
        IEnumerable<TEntity> GetAll();
        IEnumerable<TEntity> GetAll(IEnumerable<TPrimaryKey> ids);

        /// <summary>
        /// Returns a collection of objects which match the provided expression
        /// </summary>
        /// <remarks>Synchronous</remarks>
        /// <param name="predicate">A linq expression filter to find one or more results</param>
        /// <returns>An ICollection of object which match the expression filter</returns>
        IEnumerable<TEntity> GetAll(Expression<System.Func<TEntity, bool>> predicate);

        TEntity GetOne(TPrimaryKey id);
        TEntity GetOne(Expression<Func<TEntity, bool>> predicate);
        TEntity GetLast();
        int Count();
        int Count(Expression<System.Func<TEntity, bool>> predicate);
    }
}