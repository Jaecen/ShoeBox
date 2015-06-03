using System;
using System.Collections.Generic;
using System.Linq;

namespace ShoeBox.Web.Api
{
	public class CardData
	{
		readonly Dictionary<string, SetInfo> Sets;
		readonly Dictionary<string, CardInfo> Cards;
		readonly Dictionary<Tuple<string, string>, PrintingInfo> Printings;
		readonly List<HashSet<string>> Splits;
		readonly List<HashSet<long>> Variations;

		public CardData(
			Dictionary<string, SetInfo> sets,
			Dictionary<string, CardInfo> cards,
			Dictionary<Tuple<string, string>, PrintingInfo> printings,
			List<HashSet<string>> splits,
			List<HashSet<long>> variations)
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

		public IEnumerable<Tuple<CardInfo, PrintingInfo, SetInfo>> GetPrintingsForSet(string setName)
		{
			var set = Sets[setName];

			return Printings
				.Where(printing => printing.Key.Item1 == setName)
				.Join(
					Cards,
					printing => printing.Key.Item2,
					card => card.Key,
					(printing, card) => Tuple.Create(card.Value, printing.Value, set));
		}

		public IEnumerable<Tuple<CardInfo, PrintingInfo, SetInfo>> GetPrintingsForCard(string cardName)
		{
			var card = Cards[cardName];

			return Printings
				.Where(printing => printing.Key.Item2 == cardName)
				.Join(
					Sets,
					printing => printing.Key.Item1,
					set => set.Key,
					(printing, set) => Tuple.Create(card, printing.Value, set.Value));
		}

		public IEnumerable<PrintingInfo> GetVariationsOfPrinting(string setName, string cardName)
		{
			var printing = Printings[Tuple.Create(setName, cardName)];

			return Variations
				.Where(variationGroup => printing.Multiverseid.HasValue)
				.Where(variationGroup => variationGroup.Contains(printing.Multiverseid.Value))
				.SelectMany(variationGroup => variationGroup
					.SelectMany(multiverseId => Printings
						.Values
						.Where(variedPrinting => variedPrinting.Multiverseid == multiverseId)));
		}

		public IEnumerable<CardInfo> GetSplitsOfCard(string cardName)
		{
			return Splits
				.Where(splitGroup => splitGroup.Contains(cardName))
				.SelectMany(splitGroup => splitGroup
				.Select(splitCardName => Cards[cardName]));
		}
	}
}
