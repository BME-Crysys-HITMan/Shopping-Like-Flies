using Castle.Core.Configuration;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Serilog.Core;
using ShoppingLikeFiles.DomainServices.Options;
using ShoppingLikeFiles.DomainServices.Service;
using ShoppingLikeFiles.DomainServices;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using IConfiguration = Microsoft.Extensions.Configuration.IConfiguration;

namespace DomainServices.UnitTest
{
    public class DependencyTests
    {
        [Fact]
        public void Test1()
        {
            IConfiguration cfg = getConfig();
            IServiceCollection services = new ServiceCollection();
            var logger = new LoggerConfiguration().WriteTo.Console().CreateLogger();

            services.AddTransient<ILogger, Logger>((x) => logger);

            services.AddCaffProcessor(cfg);

            var provider = services.BuildServiceProvider();


            var service = provider.GetRequiredService<ICaffService>();
            var data = provider.GetRequiredService<IDataService>();
            var payment = provider.GetRequiredService<IPaymentService>();
        }

        [Fact]
        public void Test2()
        {
            IConfiguration cfg = getConfig();
            IServiceCollection services = new ServiceCollection();

            var generator = Directory.GetCurrentDirectory() + Path.DirectorySeparatorChar + "generator";
            var validator = "CAFF_Processor.exe";

            var logger = new LoggerConfiguration().WriteTo.Console().CreateLogger();

            services.AddTransient<ILogger, Logger>((x) => logger);

            services.AddCaffProcessor(
                x => { x.Validator = validator; },
                y => { y.ShouldUploadToAzure = false; y.DirectoryPath = generator; },
                z => { z.GeneratorDir = generator; },
                cfg);

            var provider = services.BuildServiceProvider();


            var service = provider.GetRequiredService<ICaffService>();
            var data = provider.GetRequiredService<IDataService>();
            var payment = provider.GetRequiredService<IPaymentService>();
            var options = provider.GetRequiredService<IOptions<CaffValidatorOptions>>();

            options.Value.Validator.Should().Be(validator);
        }

        private IConfiguration getConfig()
        {
            Dictionary<string, string> config = new()
            {
                { "ConnectionStrings:DefaultConnection" , "asd" },
            };
            return new ConfigurationBuilder().AddInMemoryCollection(config).Build();
        }
    }
}
