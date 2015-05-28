using System.Collections.Generic;
using System.Linq;

namespace ShoeBox.Web.Services
{
	class CardSearch
	{
		readonly IEnumerable<SerializedSet> Sets;

		public CardSearch(IEnumerable<SerializedSet> sets)
		{
			Sets = sets;
		}

		public IEnumerable<string> GetSetNames()
		{
			return Sets
				.Select(set => set.name)
				.OrderBy(name => name)
				.Distinct();
		}

		public IEnumerable<string> GetCardNamesForSet(string setName)
		{
			return Sets
				.Where(set => set.name == setName)
				.SelectMany(set => set
					.cards
					.Select(card => card.name))
				.OrderBy(name => name)
				.Distinct();
		}
	}
}
