using System;
using System.Collections.Generic;
using System.Linq;

namespace ShoeBox.Web.Api.Services
{
	public class CardSearch
	{
		readonly CardData CardData;

		public CardSearch(CardData cardData)
		{
			CardData = cardData;
		}

		public IEnumerable<string> GetSetNames()
		{
			return CardData
				.GetSets()
				.Select(set => set.Name)
				.OrderBy(setName => setName);
		}

		public IEnumerable<string> GetCardNamesForSet(string setName)
		{
			return CardData
				.GetPrintingsForSet(setName)
				.Select(printing => printing.Item1.Name)
				.OrderBy(cardName => cardName)
				.Distinct();
		}

		public IEnumerable<SerializedCard> Filter(ITerm query)
		{
			var executableQuery = BuildQueryPlan(query);
			var queryResult = executableQuery(CardData);

			throw new NotImplementedException();
		}

		Func<CardData, IEnumerable<object>> BuildQueryPlan(ITerm query)
		{
			var operators = new Dictionary<string, Func<string, string, bool>>
			{
				{ "=", (fieldVal, val) => StringComparer.CurrentCultureIgnoreCase.Equals(fieldVal, val) },
			};

			throw new NotImplementedException();
		}
	}
}
