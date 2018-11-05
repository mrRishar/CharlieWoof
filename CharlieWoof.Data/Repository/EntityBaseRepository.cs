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
    public abstract class EntityBaseRepository<TEntity, TPrimaryKey> : IEntityBaseRepository<TEntity, TPrimaryKey>
        where TEntity : class, IPrimary<TPrimaryKey>
    {
        protected DataContextProvider dbContext;

        public EntityBaseRepository(DataContextProvider context) { this.dbContext = context; }

        public TEntity Add(TEntity entity)
        {
            dbContext.Set<TEntity>().Add(entity);
            dbContext.SaveChanges();

            //update obj
            dbContext.Entry(entity).GetDatabaseValues();

            return entity;
        }

        /// <summary>
        /// saves list of entities to DB
        /// </summary>
        public void Add(IEnumerable<TEntity> entities)
        {
            entities = entities.ToList();
            for (int i = 0; i < entities.Count() + 1; i++)
            {
                dbContext.Set<TEntity>().AddRange(entities.Skip(i * 500).Take(500));
                dbContext.SaveChanges();
            }
        }

        public Task<int> AddAsync(TEntity entity)
        {
            dbContext.Set<TEntity>().Add(entity);
            return dbContext.SaveChangesAsync();
        }

        public IEnumerable<TEntity> GetAll() { return dbContext.Set<TEntity>(); }

        public IEnumerable<TEntity> GetAll(IEnumerable<TPrimaryKey> Ids)
        {
            if (Ids.Count() == 0) return new List<TEntity>();

            return dbContext.Set<TEntity>().Where(f => Ids.Contains(f.Id));
        }

        /// <summary>
        /// Returns a collection of objects which match the provided expression
        /// </summary>
        /// <remarks>Synchronous</remarks>
        /// <param name="predicate">A linq expression filter to find one or more results</param>
        /// <returns>An ICollection of object which match the expression filter</returns>
        public IEnumerable<TEntity> GetAll(Expression<System.Func<TEntity, bool>> predicate) { return dbContext.Set<TEntity>().AsNoTracking().Where(predicate.Compile()); }

        public int Count() { return dbContext.Set<TEntity>().Count(); }

        public int Count(Expression<System.Func<TEntity, bool>> predicate) { return dbContext.Set<TEntity>().Count(predicate.Compile()); }

        public TEntity GetOne(TPrimaryKey id) { return dbContext.Set<TEntity>().AsNoTracking().FirstOrDefault(f => f.Id.Equals(id)); }

        public TEntity GetOne(Expression<Func<TEntity, bool>> predicate) { return dbContext.Set<TEntity>().AsNoTracking().FirstOrDefault(predicate.Compile()); }

        public TEntity GetLast() { return dbContext.Set<TEntity>().OrderByDescending(f => f.Id).FirstOrDefault(); }

        public async Task<TEntity> GetOneAsync(TPrimaryKey id) { return await dbContext.Set<TEntity>().FindAsync(id); }


        public void Update(TEntity entity)
        {
            dbContext.Entry(entity).State = EntityState.Modified;
            dbContext.SaveChanges();
            dbContext.Entry(entity).State = EntityState.Detached;
        }

        public async Task UpdateAsync(TEntity entity)
        {
            dbContext.Entry(entity).State = EntityState.Modified;
            await dbContext.SaveChangesAsync();
        }

        public void Delete(TEntity entity)
        {
            var entry = dbContext.Entry(entity);

            if (entry.State == EntityState.Detached) dbContext.Set<TEntity>().Attach(entity);

            dbContext.Set<TEntity>().Remove(entity);
            dbContext.SaveChanges();
        }

        public void Delete(TPrimaryKey id)
        {
            var obj = dbContext.Set<TEntity>().Find(id);
            var entry = dbContext.Entry(obj);

            if (entry.State == EntityState.Detached) dbContext.Set<TEntity>().Attach(obj);

            dbContext.Set<TEntity>().Remove(obj);
            dbContext.SaveChanges();
        }

        public void Delete(IEnumerable<TPrimaryKey> Ids)
        {
            if (Ids.Count() == 0) return;

            dbContext.Set<TEntity>().RemoveRange(dbContext.Set<TEntity>().Where(f => Ids.Contains(f.Id)));
            dbContext.SaveChanges();
        }
    }
}