export enum LinkTypeKey {
	SS = 'START_TO_START',
	SE = 'START_TO_END',
	ES = 'END_TO_START',
	EE = 'END_TO_END'
}

export enum LinkAnchor {
	START,
	END,
}

export class LinkType {
	static readonly SS = new LinkType(LinkTypeKey.SS, LinkAnchor.START, LinkAnchor.START);
	static readonly SE = new LinkType(LinkTypeKey.SE, LinkAnchor.START, LinkAnchor.END);
	static readonly ES = new LinkType(LinkTypeKey.ES, LinkAnchor.END, LinkAnchor.START);
	static readonly EE = new LinkType(LinkTypeKey.EE, LinkAnchor.END, LinkAnchor.END);

	private constructor(
		public readonly key: LinkTypeKey,
		public readonly start: LinkAnchor,
		public readonly end: LinkAnchor
	) {
	}
}