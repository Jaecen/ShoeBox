using System.Collections.Generic;
using System.IO;
using Microsoft.AspNet.Builder;
using Microsoft.AspNet;
using Microsoft.AspNet.Mvc;
using Microsoft.AspNet.Http;
using Microsoft.Framework.DependencyInjection;
using Newtonsoft.Json;

namespace ShoeBox.Web
{
	public class Startup
	{
		// For more information on how to configure your application, visit http://go.microsoft.com/fwlink/?LinkID=398940
		public void ConfigureServices(IServiceCollection services)
		{
			var serializedSets = LoadSerializedSets();

			services
				.AddSingleton(c => new Services.CardSearch(serializedSets))
				.AddMvc();
		}

		public void Configure(IApplicationBuilder app)
		{
			app
				.UseMvc();
		}

		IEnumerable<SerializedSet> LoadSerializedSets()
		{
			var serializer = new JsonSerializer();

			using(var stream = new FileStream(@"D:\Downloads\AllSetsArray-x.json", FileMode.Open))
			using(var textReader = new StreamReader(stream))
			using(var jsonReader = new JsonTextReader(textReader))
				return serializer.Deserialize<SerializedSet[]>(jsonReader);
		}
	}
}
