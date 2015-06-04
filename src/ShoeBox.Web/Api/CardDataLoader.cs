using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using Newtonsoft.Json;

namespace ShoeBox.Web.Api
{
	public class CardDataLoader
	{
		readonly JsonSerializer Serializer;

		public CardDataLoader()
		{
			Serializer = new JsonSerializer();
		}

		public CardData LoadCardData(string allSetsArrayPath)
		{
			var allSetsArray = LoadAllSetsArray(allSetsArrayPath)
				.Where(set => !set.onlineOnly);

			var sets = new Dictionary<string, SetInfo>();
			var cards = new Dictionary<string, CardInfo>();
			var printings = new Dictionary<long, PrintingInfo>();
			var splits = new List<HashSet<string>>();
			var variations = new Dictionary<Tuple<string, string>, HashSet<long>>();


			foreach(var inSet in allSetsArray)
			{
				var outSet = new SetInfo(
					name: inSet.name,
					code: inSet.code,
					gathererCode: inSet.gathererCode,
					releaseDate: inSet.releaseDate,
					border: inSet.border,
					type: inSet.type,
					block: inSet.block);

				sets.Add(outSet.Name, outSet);

				foreach(var inCard in inSet.cards)
				{
					if(!cards.ContainsKey(inCard.name))
						cards.Add(
							inCard.name,
							new CardInfo(
								layout: inCard.layout,
								name: inCard.name,
								manaCost: inCard.manaCost,
								cmc: inCard.cmc,
								colors: inCard.colors,
								type: inCard.type,
								supertypes: inCard.supertypes,
								types: inCard.types,
								subtypes: inCard.subtypes,
								text: inCard.text,
								power: inCard.power,
								toughness: inCard.toughness,
								loyalty: inCard.loyalty,
								reserved: inCard.reserved,
								legalities: inCard.legalities));

					var outCard = cards[inCard.name];

					if(inCard.names != null && inCard.names.Any())
					{
						var hasDefinedSplits = splits
							.Where(split => split.Contains(inCard.name))
							.Any();

						if(!hasDefinedSplits)
							splits.Add(new HashSet<string>(inCard.names));
					}

					var outPrinting = new PrintingInfo(
						rarity: inCard.rarity,
						flavor: inCard.flavor,
						artist: inCard.artist,
						number: inCard.number,
						multiverseid: inCard.multiverseid,
						imageName: inCard.imageName,
						watermark: inCard.watermark,
						border: inCard.border,
						timeshifted: inCard.timeshifted,
						source: inCard.source);


					if(inCard.multiverseid.HasValue)
					{
						if(!printings.ContainsKey(inCard.multiverseid.Value))
							printings.Add(outPrinting.Multiverseid.Value, outPrinting);

						var variationKey = Tuple.Create(outSet.Name, outCard.Name);
						if(!variations.ContainsKey(variationKey))
							variations[variationKey] = new HashSet<long>();

						variations[variationKey].Add(outPrinting.Multiverseid.Value);
					}
				}
			}

			return new CardData(
				sets,
				cards,
				printings,
				splits,
				variations);
		}

		IEnumerable<SerializedSet> LoadAllSetsArray(string allSetsArrayPath)
		{
			using(var stream = new FileStream(allSetsArrayPath, FileMode.Open)) // @"D:\Downloads\AllSetsArray-x.json"
			using(var textReader = new StreamReader(stream))
			using(var jsonReader = new JsonTextReader(textReader))
				return Serializer.Deserialize<SerializedSet[]>(jsonReader);
		}
	}
}
