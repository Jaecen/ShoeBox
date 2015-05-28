using Microsoft.AspNet.Mvc;

namespace ShoeBox.Web.Api
{
	[Route("[controller]")]
	public class SetsController : Controller
	{
		public IActionResult Get()
		{
			return new ObjectResult(new[]
			{
				"s1", "s2"
			});
		}
	}
}
