namespace ShoeBox.Web.Api
{
	public class PrintingInfo
	{
		public readonly string Rarity;
		public readonly string Flavor;
		public readonly string Artist;
		public readonly string Number;
		public readonly long? Multiverseid;
		public readonly string ImageName;
		public readonly string Watermark;
		public readonly string Border;
		public readonly bool Timeshifted;
		public readonly string Source;

		public PrintingInfo(
			string rarity,
			string flavor,
			string artist,
			string number,
			long? multiverseid,
			string imageName,
			string watermark,
			string border,
			bool timeshifted,
			string source)
		{
			Rarity = rarity;
			Flavor = flavor;
			Artist = artist;
			Number = number;
			Multiverseid = multiverseid;
			ImageName = imageName;
			Watermark = watermark;
			Border = border;
			Timeshifted = timeshifted;
			Source = source;
		}
	}
}
