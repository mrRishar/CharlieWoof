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

            //services
            services.AddScoped<IMagicPagesService, MagicPagesService>();
            services.AddScoped<IMagicContentItemsService, MagicContentItemsService>();
            services.AddScoped<IMagicFilesService, MagicFilesService>();
            services.AddScoped<IUsersService, UsersService>();
            services.AddScoped<ISettingsService, SettingsService>();
            services.AddScoped<IPetsService, PetsService>();
            services.AddScoped<IOrdersService, OrdersService>();


            //repositories
            services.AddScoped<IStatableEntityBaseRepository<MagicPage, Guid, Guid>, MagicPagesEntityBaseRepository>();
            services.AddScoped<IStatableEntityBaseRepository<MagicContentItem, Guid, Guid>, MagicContentItemsEntityBaseRepository>();
            services.AddScoped<IStatableEntityBaseRepository<Pet, Guid, Guid>, PetsEntityBaseRepository>();
            services.AddScoped<IStatableEntityBaseRepository<Order, Guid, Guid>, OrdersEntityBaseRepository>();
            services.AddScoped<IStatableEntityBaseRepository<MagicFile, Guid, Guid>, MagicFilesEntityBaseRepository>();
            services.AddScoped<IStatableEntityBaseRepository<User, Guid, Guid>, UsersEntityBaseRepository>();
            services.AddScoped<IStatableEntityBaseRepository<Setting, Guid, Guid>, SettingsEntityBaseRepository>();


            services.AddMvc(config =>
            {
                var policy = new AuthorizationPolicyBuilder()
                             .RequireAuthenticatedUser()
                             .Build();

                config.Filters.Add(new AuthorizeFilter(policy));
            });

            services.AddCors(options => options.AddPolicy("CorsPolicy",
          builder =>
          {
              builder.AllowAnyMethod().AllowAnyHeader()
                     .WithOrigins("http://localhost:63908", "http://localhost:4200", "http://charliegroom.com.ua")
                     //.AllowAnyOrigin()
                     .AllowCredentials();
          }));


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

            MigrateScheduleContext(app);

            app.UseStaticFiles();

            app.UseAuthentication();

            app.UseCors("CorsPolicy");

            app.UseMvc(routes =>
            {
                routes.MapRoute("v1", "v1/{controller=Home}/{action=Index}/{id?}");

                routes.MapRoute("default", "{controller=Welcome}/{action=Index}/{id?}");
            });

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
            services.AddAuthorization(options => { options.AddPolicy(Auth.GrummerAndAdminPolicy, policy => 
                policy.RequireRole(MagicRoles.Admin.ToString(), MagicRoles.Grummer.ToString())); });
        }

        private void ConfigureDataContext(ref IServiceCollection services)
        {
            if (this.HostingEnvironment.IsDevelopment())
            {
                services.AddDbContext<CWDataContext>(options => options.UseSqlServer(this.Configuration.GetConnectionString("cwEntitiesDevelopment")));
            }
            else
            {
                services.AddDbContext<CWDataContext>(options => options.UseSqlServer(this.Configuration.GetConnectionString("cwEntitiesProduction")));
            }

            services.AddTransient<DataContextProvider>();
        }

        private void MigrateScheduleContext(IApplicationBuilder app)
        {
            try
            {
                using (var serviceScope = app.ApplicationServices.GetService<IServiceScopeFactory>().CreateScope())
                {
                    var context = serviceScope.ServiceProvider.GetRequiredService<CWDataContext>();
                    if (!context.Database.EnsureCreated())
                    {
                        context.Database.Migrate();
                        try
                        {
                            new Data.DataSeeds.CreateDatabaseIfNotExists(context).WriteInitialData();
                        }
                        catch { }
                    }
                }
            }
            catch (Exception ex)
            {
                //logger.LogError(ex, "Migration Error");
            }
        }
    }
}