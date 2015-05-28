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
				"c1", "c2"
			});
		}
	}
}
