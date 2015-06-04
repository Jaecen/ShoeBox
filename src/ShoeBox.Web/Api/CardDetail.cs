namespace ShoeBox.Web.Api
{
	public class CardDetail
	{
		public readonly CardInfo Card;
		public readonly PrintingInfo Printing;
		public readonly SetInfo Set;

		public CardDetail(CardInfo card, PrintingInfo printing, SetInfo set)
		{
			Card = card;
			Printing = printing;
			Set = set;
		}
	}
}
