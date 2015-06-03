using System.Collections.Generic;

namespace ShoeBox.Web.Api
{
	public interface ITerm
	{
	}

	public class ComparisonTerm : ITerm
	{
		public string Field;
		public string Op;
		public string Val;

		public ComparisonTerm(string field, string op, string val)
		{
			Field = field;
			Op = op;
			Val = val;
		}
	}

	public class GroupTerm : ITerm
	{
		public bool All;
		public readonly IEnumerable<ITerm> Terms;

		public GroupTerm(bool all, IEnumerable<ITerm> terms)
		{
			All = all;
			Terms = terms;
		}
	}
}
