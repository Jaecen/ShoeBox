using System.Collections.Generic;

namespace ShoeBox.Web.Api
{
	public class CardInfo
	{
		public readonly string Layout;
		public readonly string Name;
		public readonly string ManaCost;
		public readonly decimal Cmc;
		public readonly IEnumerable<string> Colors;
		public readonly string Type;
		public readonly IEnumerable<string> Supertypes;
		public readonly IEnumerable<string> Types;
		public readonly IEnumerable<string> Subtypes;
		public readonly string Text;
		public readonly string Power;
		public readonly string Toughness;
		public readonly int? Loyalty;
		public readonly bool Reserved;
		public readonly IReadOnlyDictionary<string, string> Legalities;

		public CardInfo(
			string layout,
			string name,
			string manaCost,
			decimal cmc,
			IEnumerable<string> colors,
			string type,
			IEnumerable<string> supertypes,
			IEnumerable<string> types,
			IEnumerable<string> subtypes,
			string text,
			string power,
			string toughness,
			int? loyalty,
			bool reserved,
			IReadOnlyDictionary<string, string> legalities)
		{
			Layout = layout;
			Name = name;
			ManaCost = manaCost;
			Cmc = cmc;
			Colors = colors;
			Type = type;
			Supertypes = supertypes;
			Types = types;
			Subtypes = subtypes;
			Text = text;
			Power = power;
			Toughness = toughness;
			Loyalty = loyalty;
			Reserved = reserved;
			Legalities = legalities;
		}
	}
}
