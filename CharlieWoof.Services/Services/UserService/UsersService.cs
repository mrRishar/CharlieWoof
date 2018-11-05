using System;
using AutoMapper;
using CharlieWoof.Core.Abstractions.Services.User;
using CharlieWoof.Core.Models;
using CharlieWoof.Data.Abstractions;
using CharlieWoof.Services.Implementations;
using Extensions.Encrypt;

namespace CharlieWoof.Services.Services.UserService
{
    public class UsersService : StatableService<User, User, Guid, Guid>, IUsersService
    {
        public UsersService(IStatableEntityBaseRepository<User, Guid, Guid> repository, IMapper mapper) : base(repository, mapper)
        {}

        public User Get(string login, string password)
        {
            var passwordHash = Sha256GeneratorAdapter.Generate(password);
            return this.Repository.GetOne(f => f.Email == login && f.PasswordHash == passwordHash);
        }

        public bool IsNewPassword(Guid idUser, string newPassword)
        {
            var user = this.Repository.GetOne(idUser);
            var newPasswordHash = Sha256GeneratorAdapter.Generate(newPassword);

            return user.PasswordHash != newPasswordHash;
        }

        public void UpdatePassword(Guid id, Guid updatedByUserId, string password)
        {
            var user = this.Repository.GetOne(id);
            user.PasswordHash = Sha256GeneratorAdapter.Generate(password);

            this.Repository.Update(user, updatedByUserId);
        }

        public bool TryUpdatePassword(Guid id, Guid updatedByUserId, string password, string oldPassword)
        {
            if (string.IsNullOrEmpty(oldPassword))
                throw new ApplicationException("Provided old password is not correct");

            if (string.IsNullOrEmpty(password))
                throw new ApplicationException("Provided new password is not correct");

            var user = this.Repository.GetOne(id);

            var oldPasswordHash = Sha256GeneratorAdapter.Generate(oldPassword);
            if (user.PasswordHash == oldPasswordHash)
                throw new ApplicationException("Provided old password is not correct");

            user.PasswordHash = Sha256GeneratorAdapter.Generate(password);

            this.Repository.Update(user, updatedByUserId);

            return true;
        }

        public new User Add(User model)
        {
            if (string.IsNullOrEmpty(model.Email))
                throw new ApplicationException("Email is required");

            if (string.IsNullOrEmpty(model.PasswordHash))
                throw new ApplicationException("Password is required");

            if (string.IsNullOrEmpty(model.Firstname))
                throw new ApplicationException("First Name is required");


            if (string.IsNullOrEmpty(model.Secondname))
                throw new ApplicationException("Last Name is required");


            model.PasswordHash = Sha256GeneratorAdapter.Generate(model.PasswordHash);
            return base.Add(model);
        }
    }
}