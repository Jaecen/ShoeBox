using System.Collections.Generic;

namespace ShoeBox.Web.Api
{
	public class SerializedCard
	{
		public string name
		{ get; set; }

		public string[] names
		{ get; set; }

		public string manaCost
		{ get; set; }

		public decimal cmc
		{ get; set; }

		public string[] colors
		{ get; set; }

		public string type
		{ get; set; }

		public string[] supertypes
		{ get; set; }

		public string[] types
		{ get; set; }

		public string[] subtypes
		{ get; set; }

		public string rarity
		{ get; set; }

		public string text
		{ get; set; }

		public string flavor
		{ get; set; }

		public string artist
		{ get; set; }

		public string number
		{ get; set; }

		public string power
		{ get; set; }

		public string toughness
		{ get; set; }

		public int? loyalty
		{ get; set; }

		public string layout
		{ get; set; }

		public long? multiverseid
		{ get; set; }

		public string imageName
		{ get; set; }

		public bool reserved
		{ get; set; }

		public Dictionary<string, string> legalities
		{ get; set; }

		public string source
		{ get; set; }

		public long[] variations
		{ get; set; }

		public string watermark
		{ get; set; }

		public string border
		{ get; set; }

		public bool timeshifted
		{ get; set; }

	}
}
