using Microsoft.AspNet.Mvc;

namespace ShoeBox.Web.Api
{
	[Route("[controller]")]
	public class CardsController : Controller
	{
		public IActionResult Get()
		{
			return new ObjectResult(new[]
			{
				new
				{
					name = "Card the First"
				},
				new
				{
					name = "Second Card"
				},
				new
				{
					name = "Three"
				},
			});
		}
	}
}
