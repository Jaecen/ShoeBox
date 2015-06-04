using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;

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

		public IEnumerable<CardDetail> Filter(ITerm query)
		{
			var executableQuery = BuildQueryPlan(query);
			var queryResult = executableQuery(CardData);

			return queryResult;
		}

		Func<CardData, IEnumerable<CardDetail>> BuildQueryPlan(ITerm query)
		{
			var cardDetail = Expression.Parameter(
				typeof(CardDetail),
				"card");

			var queryDelegate = Expression
				.Lambda<Func<CardDetail, bool>>(
					BuildTermExpression(query, cardDetail),
					cardDetail)
				.Compile();

			return cardData => cardData
				.GetCardDetails()
				.Where(queryDelegate);
		}

		Expression BuildTermExpression(ITerm term, Expression cardDetail)
		{
			if(term is ComparisonTerm)
				return BuildComparisonExpression((ComparisonTerm)term, cardDetail);

			if(term is GroupTerm)
				return BuildBooleanExpression(((GroupTerm)term).All, ((GroupTerm)term).Terms, cardDetail);

			throw new NotImplementedException("Cannot build term expression for unsupported term type " + term.GetType().FullName);
		}

		Expression BuildComparisonExpression(ComparisonTerm term, Expression cardDetail)
		{
			return BuildOpExpression(
				op: term.Op,
				field: BuildFieldExpression(term.Field, cardDetail),
				val: BuildValExpression(term.Val));
		}

		Expression BuildOpExpression(string op, Expression field, Expression val)
		{
			if(op == "=")
				return Expression.Equal(field, val);

			if(op == "!=")
				return Expression.NotEqual(field, val);

			throw new NotImplementedException("Cannot build op expression for unsupported op " + op);
		}

		Expression BuildFieldExpression(string field, Expression cardDetail)
		{
			var card = Expression.Field(cardDetail, "Card");
			var printing = Expression.Field(cardDetail, "Printing");
			var set = Expression.Field(cardDetail, "Set");

			if(field == "name")
				return Expression.Field(card, "Name");

			if(field == "text")
				return Expression.Field(card, "Text");

			if(field == "cmc")
				return Expression.Field(card, "Cmc");

			throw new NotImplementedException("Cannot build field expression for unsupported field " + field);
		}

		Expression BuildValExpression(string val)
		{
			return Expression.Constant(val);
		}

		Expression BuildBooleanExpression(bool all, IEnumerable<ITerm> terms, Expression cardDetail)
		{
			if(!terms.Any())
				return Expression.Constant(all);

			return all
				? Expression.AndAlso(BuildTermExpression(terms.First(), cardDetail), BuildBooleanExpression(all, terms.Skip(1), cardDetail))
				: Expression.OrElse(BuildTermExpression(terms.First(), cardDetail), BuildBooleanExpression(all, terms.Skip(1), cardDetail));
		}
	}
}
