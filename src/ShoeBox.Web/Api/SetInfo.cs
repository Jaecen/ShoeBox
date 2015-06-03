using System;

namespace ShoeBox.Web.Api
{
	public class SetInfo
	{
		public readonly string Name;
		public readonly string Code;
		public readonly string GathererCode;
		public readonly DateTime ReleaseDate;
		public readonly string Border;
		public readonly string Type;
		public readonly string Block;

		public SetInfo(
			string name,
			string code,
			string gathererCode,
			DateTime releaseDate,
			string border,
			string type,
			string block)
		{
			Name = name;
			Code = code;
			GathererCode = gathererCode;
			ReleaseDate = releaseDate;
			Border = border;
			Type = type;
			Block = block;
		}
	}
}
