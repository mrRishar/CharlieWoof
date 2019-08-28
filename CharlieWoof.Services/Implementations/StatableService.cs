using CharlieWoof.Core.Abstractions.PrimitiveBase;
using CharlieWoof.Core.Abstractions.PrimitiveServices;
using CharlieWoof.Data.Abstractions;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using AutoMapper;

namespace CharlieWoof.Services.Implementations
{
    public abstract class StatableService<TDto, TEntity, TPrimaryKey, TUserPrimaryKey> : IStatableService<TDto, TPrimaryKey, TUserPrimaryKey>
        where TEntity : class, IPrimary<TPrimaryKey>, ITrackable<TUserPrimaryKey>, IStatable
        where TDto : class
        where TPrimaryKey : struct
        where TUserPrimaryKey : struct
    {
        private readonly IStatableEntityBaseRepository<TEntity, TPrimaryKey, TUserPrimaryKey> _repository;
        protected virtual IStatableEntityBaseRepository<TEntity, TPrimaryKey, TUserPrimaryKey> Repository => this._repository;

        protected IMapper Mapper;


        public StatableService(IStatableEntityBaseRepository<TEntity, TPrimaryKey, TUserPrimaryKey> repository, IMapper mapper)
        {
            this._repository = repository;
            this.Mapper = mapper;
        }

        #region Not supported

        public TDto Add(TDto model)
        {
            throw new ApplicationException("Wrong method called. Call trackable method instead");
        }

        public void Add(IEnumerable<TDto> models)
        {
            throw new ApplicationException("Wrong method called. Call trackable method instead");
        }


        public void Delete(TPrimaryKey id)
        {
            throw new ApplicationException("Wrong method called. Call trackable method instead");
        }

        public void Delete(IEnumerable<TPrimaryKey> ids)
        {
            throw new ApplicationException("Wrong method called. Call trackable method instead");
        }

        public void Update(TDto model)
        {
            throw new ApplicationException("Wrong method called. Call trackable method instead");
        }
        #endregion

        public TDto Get(TPrimaryKey id)
        {
            TEntity entity = this.Repository.GetOne(id);
            return this.Mapper.Map<TEntity, TDto>(entity);
        }

        public TDto Get(Expression<Func<TDto, bool>> predicate)
        {
            var mappedPredicate = this.Mapper.Map<Expression<Func<TDto, bool>>, Expression<Func<TEntity, bool>>>(predicate);

            TEntity entity = this.Repository.GetOne(mappedPredicate);
            return this.Mapper.Map<TEntity, TDto>(entity);
        }


        public TDto GetLast()
        {
            TEntity entity = this.Repository.GetLast();
            return this.Mapper.Map<TEntity, TDto>(entity);
        }

        public IEnumerable<TDto> GetAll()
        {
            IEnumerable<TEntity> entities = this.Repository.GetAll();
            return this.Mapper.Map<IEnumerable<TEntity>, IEnumerable<TDto>>(entities);
        }

        public IEnumerable<TDto> GetAll(IEnumerable<TPrimaryKey> ids)
        {
            IEnumerable<TEntity> entities = this.Repository.GetAll(ids);
            return this.Mapper.Map<IEnumerable<TEntity>, IEnumerable<TDto>>(entities);
        }

        public IEnumerable<TDto> GetAll(Expression<Func<TDto, bool>> predicate)
        {
            var mappedPredicate = this.Mapper.Map<Expression<Func<TDto, bool>>, Expression<Func<TEntity, bool>>>(predicate);

            IEnumerable<TEntity> entities = this.Repository.GetAll(mappedPredicate);
            return this.Mapper.Map<IEnumerable<TEntity>, IEnumerable<TDto>>(entities);
        }

        public int Count()
        {
            return this.Repository.Count();
        }

        public int Count(Expression<Func<TDto, bool>> predicate)
        {
            var mappedPredicate = this.Mapper.Map<Expression<Func<TDto, bool>>, Expression<Func<TEntity, bool>>>(predicate);
            return this.Repository.Count(mappedPredicate);
        }


        public TDto Add(TDto model, TUserPrimaryKey updatedUserId)
        {
            TEntity entity = this.Mapper.Map<TDto, TEntity>(model);
            entity = this.Repository.Add(entity, updatedUserId);

            return this.Mapper.Map<TEntity, TDto>(entity);
        }

        public void Add(IEnumerable<TDto> models, TUserPrimaryKey updatedUserId)
        {
            IEnumerable<TEntity> entities = this.Mapper.Map<IEnumerable<TDto>, IEnumerable<TEntity>>(models);
            this.Repository.Add(entities, updatedUserId);
        }

        public void Delete(TPrimaryKey id, TUserPrimaryKey updatedUserId)
        {
            this.Repository.Delete(id, updatedUserId);
        }

        public void Delete(IEnumerable<TPrimaryKey> ids, TUserPrimaryKey updatedUserId)
        {
            this.Repository.Delete(ids, updatedUserId);
        }

        public void Update(TDto model, TUserPrimaryKey updatedUserId)
        {
            TEntity entity = this.Mapper.Map<TDto, TEntity>(model);

            this.Repository.Update(entity, updatedUserId);
        }

    }
}