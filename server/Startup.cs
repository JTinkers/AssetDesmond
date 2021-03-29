using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.FileProviders;
using Microsoft.Extensions.Options;
using System;
using System.IO;

namespace AssetDesmondServer
{
    public class Startup
    {
        public IConfigurationRoot Configuration { get; set; }

        public Startup(IWebHostEnvironment env)
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("serversettings.json", optional: true, reloadOnChange: true);

            Configuration = builder.Build();
        }

        public void ConfigureServices(IServiceCollection services) 
        {
            services.Configure<ServerSettings>(Configuration);
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, IOptions<ServerSettings> settings) 
        {
            var path = Path.Combine(env.ContentRootPath + settings.Value.AppPath);
            var fileProvider = new PhysicalFileProvider(path);

            app.UseDefaultFiles(new DefaultFilesOptions
            {
                FileProvider = fileProvider,
            });

            app.UseStaticFiles(new StaticFileOptions
            {
                FileProvider = fileProvider,
            });
        }
    }
}
