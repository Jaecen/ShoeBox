using System.Collections.Generic;
using System.IO;
using Microsoft.AspNet.Builder;
using Microsoft.Framework.DependencyInjection;
using Newtonsoft.Json;
using ShoeBox.Web.Api;

namespace ShoeBox.Web
{
	public class Startup
	{
		// For more information on how to configure your application, visit http://go.microsoft.com/fwlink/?LinkID=398940
		public void ConfigureServices(IServiceCollection services)
		{
			var cardDataLoader = new CardDataLoader();
			var cardData = cardDataLoader.LoadCardData(@"D:\Downloads\AllSetsArray-x.json");

			services
				.AddSingleton(c => new Api.Services.CardSearch(cardData))
				.AddMvc();
		}

		public void Configure(IApplicationBuilder app)
		{
			app.UseMvc();
		}
	}
}
