using System;

namespace ShoeBox.Web.Api
{
	public class SerializedSet
	{
		public string name
		{ get; set; }

		public string code
		{ get; set; }

		public string gathererCode
		{ get; set; }

		public string oldCode
		{ get; set; }

		public string magicCardsInfoCode
		{ get; set; }

		public DateTime releaseDate
		{ get; set; }

		public string border
		{ get; set; }

		public string type
		{ get; set; }

		public string block
		{ get; set; }

		public bool onlineOnly
		{ get; set; }

		public SerializedCard[] cards
		{ get; set; }
	}
}
