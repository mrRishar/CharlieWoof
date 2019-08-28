using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using CharlieWoof.Core.Abstractions.PrimitiveBase;
using CharlieWoof.Data.Abstractions;
using Microsoft.EntityFrameworkCore;

namespace CharlieWoof.Data.Repository
{
    public abstract class StatableEntityBaseRepository<TEntity, TPrimaryKey, TUserPrimaryKey> : IStatableEntityBaseRepository<TEntity, TPrimaryKey, TUserPrimaryKey>
        where TEntity : class, IPrimary<TPrimaryKey>, ITrackable<TUserPrimaryKey>, IStatable
    {
        protected DataContextProvider DbContext;

        public StatableEntityBaseRepository(DataContextProvider context)
        {
            DbContext = context;
        }

        public TEntity Add(TEntity entity, TUserPrimaryKey updatedById)
        {
            entity.UpdatedByUserId = updatedById;
            entity.UpdatedOnUtc = DateTime.UtcNow;
            entity.CreatedOnUtc = DateTime.UtcNow;
            //entity.IsDeleted = false;
            DbContext.Set<TEntity>().Add(entity);
            DbContext.SaveChanges();

            //returnins just added order Id
            DbContext.Entry(entity).GetDatabaseValues();

            return entity;
        }

        public void Add(IEnumerable<TEntity> entities, TUserPrimaryKey updatedByUserId)
        {
            entities = entities.ToList();
            foreach (var item in entities)
            {
                item.UpdatedOnUtc = DateTime.UtcNow;
                item.CreatedOnUtc = DateTime.UtcNow;
                item.IsDeleted = false;
                item.UpdatedByUserId = updatedByUserId;
            }

            for (int i = 0; i < entities.Count() + 1; i++)
            {
                DbContext.Set<TEntity>().AddRange(entities.Skip(i * 500).Take(500));
                DbContext.SaveChanges();
            }
        }

        public Task<int> AddAsync(TEntity entity, TUserPrimaryKey updatedById)
        {
            entity.UpdatedByUserId = updatedById;
            entity.UpdatedOnUtc = DateTime.UtcNow;
            entity.CreatedOnUtc = DateTime.UtcNow;

            DbContext.Set<TEntity>().Add(entity);
            return DbContext.SaveChangesAsync();
        }



        public void Update(TEntity entity, TUserPrimaryKey updatedById)
        {
            entity.UpdatedByUserId = updatedById;
            entity.UpdatedOnUtc = DateTime.UtcNow;
            DbContext.Entry(entity).State = EntityState.Modified;
            DbContext.SaveChanges();
        }

        public async Task UpdateAsync(TEntity entity, TUserPrimaryKey updatedById)
        {
            entity.UpdatedByUserId = updatedById;
            entity.UpdatedOnUtc = DateTime.UtcNow;
            DbContext.Entry(entity).State = EntityState.Modified;
            int x = await DbContext.SaveChangesAsync();

        }

        public void Delete(TPrimaryKey id, TUserPrimaryKey updatedByUserId)
        {
            this.Delete(this.GetOne(id), updatedByUserId);
        }

        public void Delete(TEntity entity, TUserPrimaryKey updatedByUserId)
        {
            entity.IsDeleted = true;
            this.Update(entity, updatedByUserId);
        }

        public void Delete(IEnumerable<TPrimaryKey> ids, TUserPrimaryKey updatedByUserId)
        {
            foreach (var item in ids)
            {
                var entity = GetOne(item);
                entity.UpdatedByUserId = updatedByUserId;
                entity.UpdatedOnUtc = DateTime.UtcNow;
                entity.IsDeleted = true;
                DbContext.Entry(entity).State = EntityState.Modified;
            }

            DbContext.SaveChanges();
        }


        public new IEnumerable<TEntity> GetAll()
        {
            return DbContext.Set<TEntity>().AsNoTracking().Where(f => f.IsDeleted == false);
        }

        public IEnumerable<TEntity> GetAll(IEnumerable<TPrimaryKey> ids)
        {
            if (ids.Count() == 0)
                return new List<TEntity>();

            return DbContext.Set<TEntity>().AsNoTracking().Where(f => ids.Contains(f.Id) && f.IsDeleted == false);
        }

        /// <summary>
        /// Returns a collection of objects which match the provided expression
        /// </summary>
        /// <remarks>Synchronous</remarks>
        /// <param name="predicate">A linq expression filter to find one or more results</param>
        /// <returns>An ICollection of object which match the expression filter</returns>
        public new IEnumerable<TEntity> GetAll(Expression<System.Func<TEntity, bool>> predicate)
        {
            return DbContext.Set<TEntity>().AsNoTracking().Where(predicate.Compile()).Where(f => f.IsDeleted == false);
            //return DbContext.Set<TEntity>().AsNoTracking().Where(f => f.IsDeleted == false);
        }

        public new TEntity GetOne(TPrimaryKey id)
        {
            return DbContext.Set<TEntity>().AsNoTracking().FirstOrDefault(f => f.Id.Equals(id) && f.IsDeleted == false);
        }

        public new TEntity GetOne(Expression<Func<TEntity, bool>> predicate)
        {
            return DbContext.Set<TEntity>().AsNoTracking().Where(f => f.IsDeleted == false).FirstOrDefault(predicate.Compile());
        }

        public new TEntity GetLast()
        {
            return DbContext.Set<TEntity>().AsNoTracking().Where(f => f.IsDeleted == false).OrderByDescending(f => f.Id).FirstOrDefault();
        }

        public new int Count()
        {
            return DbContext.Set<TEntity>().AsNoTracking().Count(f => f.IsDeleted == false);
        }

        public new int Count(Expression<System.Func<TEntity, bool>> predicate)
        {
            return DbContext.Set<TEntity>().AsNoTracking().Where(f => f.IsDeleted == false).Count(predicate.Compile());
        }
    }
}