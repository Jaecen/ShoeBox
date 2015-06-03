using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.Mvc;
using Microsoft.AspNet.Mvc.ModelBinding;
using Newtonsoft.Json.Linq;
using ShoeBox.Web.Api.Services;

namespace ShoeBox.Web.Api.Controllers
{
	[Route("[controller]")]
	public class CardsController : Controller
	{
		readonly CardSearch CardSearch;

		public CardsController(CardSearch cardSearch)
		{
			CardSearch = cardSearch;
		}

		public IActionResult Get([FromQuery]Filter filter)
		{
			return new ObjectResult(filter);
		}

		[ModelBinder(BinderType = typeof(FilterModelBinder))]
		public class Filter
		{
			public readonly ITerm Query;

			public Filter(ITerm query)
			{
				Query = query;
			}
		}

		public class FilterModelBinder : IModelBinder
		{
			public async Task<ModelBindingResult> BindModelAsync(ModelBindingContext bindingContext)
			{
				if(!await bindingContext.ValueProvider.ContainsPrefixAsync(bindingContext.ModelName))
					return new ModelBindingResult(
						null,
						bindingContext.ModelName,
						false);

				var value = await bindingContext
					.ValueProvider
					.GetValueAsync(bindingContext.ModelName);

				if(String.IsNullOrEmpty(value.AttemptedValue))
					return new ModelBindingResult(
						null,
						bindingContext.ModelName,
						false);

				var segments = JArray
					.Parse(value.AttemptedValue)
					.Cast<JArray>()
					.GetEnumerator();

				var query = Build(segments, 1)
					.FirstOrDefault();

				if(query == null)
					return new ModelBindingResult(
						null,
						bindingContext.ModelName,
						false);

				return new ModelBindingResult(
					new Filter(query),
					bindingContext.ModelName,
					true);
			}

			IEnumerable<ITerm> Build(IEnumerator<JArray> segments, int count)
			{
				if(count == 0 || !segments.MoveNext())
					return Enumerable.Empty<ITerm>();

				var segment = segments.Current;
				if(segment.Count != 3)  // Malformed
					return Enumerable.Empty<ITerm>();

				var term = (string)segment[0] == "!group"
					? (ITerm)(new GroupTerm(
						all: (string)segment[1] == "all",
						terms: Build(segments, (int?)segment[2] ?? 0).ToArray()))
					: (ITerm)(new ComparisonTerm(
						field: (string)segment[0],
						op: (string)segment[1],
						val: (string)segment[2]));

				return
					new[] { term }
					.Concat(Build(segments, count - 1));
			}
		}
	}
}
