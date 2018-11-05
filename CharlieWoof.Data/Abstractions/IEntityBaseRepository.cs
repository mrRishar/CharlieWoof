using CharlieWoof.Core.Abstractions.PrimitiveBase;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace CharlieWoof.Data.Abstractions
{
    public interface IEntityBaseRepository<TEntity, TPrimaryKey> where TEntity : class, IPrimary<TPrimaryKey>
    {
        TEntity Add(TEntity entity);
        void Add(IEnumerable<TEntity> entities);
        Task<int> AddAsync(TEntity entity);
        
        IEnumerable<TEntity> GetAll();
        IEnumerable<TEntity> GetAll(IEnumerable<TPrimaryKey> ids);
        IEnumerable<TEntity> GetAll(Expression<System.Func<TEntity, bool>> predicate);

        int Count();
        int Count(Expression<System.Func<TEntity, bool>> predicate);

        TEntity GetOne(TPrimaryKey id);
        TEntity GetOne(Expression<System.Func<TEntity, bool>> predicate);
        Task<TEntity> GetOneAsync(TPrimaryKey id);

        TEntity GetLast();

        void Update(TEntity entity);
        Task UpdateAsync(TEntity entity);

        void Delete(TEntity entity);
        void Delete(TPrimaryKey id);
        void Delete(IEnumerable<TPrimaryKey> ids);
    }
}