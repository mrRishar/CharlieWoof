using System;
using AutoMapper;
using CharlieWoof.Core.Abstractions.Services;
using CharlieWoof.Core.Abstractions.Services.MagicPackage;
using CharlieWoof.Core.Abstractions.Services.User;
using CharlieWoof.Core.Constants;
using CharlieWoof.Core.Enums;
using CharlieWoof.Core.Models;
using CharlieWoof.Core.Models.MagicPackage;
using CharlieWoof.Data.Abstractions;
using CharlieWoof.Data.Models;
using CharlieWoof.Data.Repositories;
using CharlieWoof.Data.Repository;
using CharlieWoof.Services.Mappings;
using CharlieWoof.Services.Services.MagicPackage;
using CharlieWoof.Services.Services.SettingsService;
using CharlieWoof.Services.Services.UserService;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Authorization;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;

//using Swashbuckle.AspNetCore.Swagger;

namespace CharlieWoof.RestAPI
{
    public class Startup
    {
        public Startup(IConfiguration configuration, IHostingEnvironment env)
        {
            this.HostingEnvironment = env;
            this.Configuration = configuration;
        }

        public IHostingEnvironment HostingEnvironment { get; }
        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            this.ConfigureAuth(ref services);
            this.ConfigureDataContext(ref services);


            var mappingConfig = new MapperConfiguration(mc =>
            {
                mc.AddProfile(new Mapping());
            });

            IMapper mapper = mappingConfig.CreateMapper();
            services.AddSingleton(mapper);

            // services.AddMvc();
            // services.AddAutoMapper(a => a.AddProfile(new Mapping()));

            //services
            services.AddScoped<IMagicPagesService, MagicPagesService>();
            services.AddScoped<IMagicFilesService, MagicFilesService>();
            services.AddScoped<IUsersService, UsersService>();
            services.AddScoped<ISettingsService, SettingsService>();

            //repositories
            services.AddScoped<IStatableEntityBaseRepository<MagicPage, Guid, Guid>, MagicPagesEntityBaseRepository>();
            services.AddScoped<IStatableEntityBaseRepository<MagicFile, Guid, Guid>, MagicFilesEntityBaseRepository>();
            services.AddScoped<IStatableEntityBaseRepository<User, Guid, Guid>, UsersEntityBaseRepository>();
            services.AddScoped<IStatableEntityBaseRepository<Setting, Guid, Guid>, SettingsEntityBaseRepository>();

            services.AddCors(option =>
            {
                option.AddPolicy("AllowSpecificOrigins",
                        builder =>
                        {
                            builder.AllowAnyOrigin()
                                   .AllowAnyHeader()
                                   .AllowAnyMethod();
                        });
            });

            services.AddMvc(config =>
            {
                var policy = new AuthorizationPolicyBuilder()
                             .RequireAuthenticatedUser()
                             .Build();

                config.Filters.Add(new AuthorizeFilter(policy));
            });

            services.AddSwaggerGen(swagger =>
            {
                swagger.SwaggerDoc("v1", new Swashbuckle.AspNetCore.Swagger.Info { Title = "CharlieWoof" });
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            //if (env.IsDevelopment())
            app.UseSwagger();
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "CharlieWoof");
            });

            {
                app.UseDeveloperExceptionPage();
            }

            app.UseStaticFiles();

            app.UseAuthentication();

            app.UseCors("AllowSpecificOrigins");

            app.UseMvc(routes =>
            {
                routes.MapRoute("v1", "v1/{controller=Home}/{action=Index}/{id?}");

                routes.MapRoute("default", "{controller=Welcome}/{action=Index}/{id?}");
            });


            // Enable the Swagger UI middleware and the Swagger generator
            //app.UseSwaggerUi(typeof(Startup).GetTypeInfo().Assembly, settings =>
            //{
            //    settings.GeneratorSettings.DefaultPropertyNameHandling =
            //            PropertyNameHandling.CamelCase;
            //});


            //app.UseSwagger();
            //app.UseSwaggerUI(c =>
            //{
            //    c.SwaggerEndpoint("/swagger/v1/swagger.json", "ICT web API v1");
            //    c.RoutePrefix = string.Empty;
            //});
        }

        private void ConfigureAuth(ref IServiceCollection services)
        {
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                    .AddJwtBearer(options =>
                                  {
                                      options.TokenValidationParameters = new TokenValidationParameters
                                      {
                                          ValidateIssuer = true,
                                          ValidateAudience = true,
                                          ValidateIssuerSigningKey = true,
                                          ValidIssuer = Auth.Issuer,
                                          ValidAudience = Auth.Audience,
                                          IssuerSigningKey = Auth.Key
                                      };
                                  });

            services.AddAuthorization(options => { options.AddPolicy(Auth.AdminOnlyPolicy, policy => policy.RequireRole(MagicRoles.Admin.ToString())); });
        }

        private void ConfigureDataContext(ref IServiceCollection services)
        {
            if (this.HostingEnvironment.IsDevelopment())
            {
                services.AddDbContext<CWDataContext>(options => options.UseSqlServer(this.Configuration.GetConnectionString("cwEntitiesDevelopmentMode")));
            }
            else
            {
                services.AddDbContext<CWDataContext>(options => options.UseSqlServer(this.Configuration.GetConnectionString("cwEntitiesUSProductionMode")));
            }

            services.AddTransient<DataContextProvider>();
        }
    }
}