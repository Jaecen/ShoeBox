using System;
using System.Collections.Generic;
using System.Linq;

namespace ShoeBox.Web.Api
{
	public class CardData
	{
		readonly Dictionary<string, SetInfo> Sets;
		readonly Dictionary<string, CardInfo> Cards;
		readonly Dictionary<long, PrintingInfo> Printings;
		readonly List<HashSet<string>> Splits;
		readonly Dictionary<Tuple<string, string>, HashSet<long>> Variations;

		public CardData(
			Dictionary<string, SetInfo> sets,
			Dictionary<string, CardInfo> cards,
			Dictionary<long, PrintingInfo> printings,
			List<HashSet<string>> splits,
			Dictionary<Tuple<string, string>, HashSet<long>> variations)
		{
			Sets = sets;
			Cards = cards;
			Printings = printings;
			Splits = splits;
			Variations = variations;
		}

		public IEnumerable<CardInfo> GetCards()
		{
			return Cards.Values;
		}

		public IEnumerable<SetInfo> GetSets()
		{
			return Sets.Values;
		}

		public IEnumerable<CardDetail> GetCardDetails()
		{
			return Variations
				.SelectMany(variationGroup => variationGroup
					.Value
					.Select(variation => new CardDetail(
						card: Cards[variationGroup.Key.Item2], 
						printing: Printings[variation], 
						set: Sets[variationGroup.Key.Item1])));
		}
	}
}
