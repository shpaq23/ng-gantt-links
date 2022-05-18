// export enum LinkType {
// 	SS = 'START_TO_START',
// 	SE = 'START_TO_END',
// 	ES = 'END_TO_START',
// 	EE = 'END_TO_END'
// }

export enum LinkAnchor {
	START,
	END,
}

export class LinkType {
	static readonly SS = new LinkType('SS', LinkAnchor.START, LinkAnchor.START);
	static readonly SE = new LinkType('SE', LinkAnchor.START, LinkAnchor.END);
	static readonly ES = new LinkType('ES', LinkAnchor.END, LinkAnchor.START);
	static readonly EE = new LinkType('EE', LinkAnchor.END, LinkAnchor.END);

	private constructor(
		private readonly key: string,
		public readonly start: LinkAnchor,
		public readonly end: LinkAnchor
	) {
	}

	isSameType(otherLinkType: LinkType) {
		return this.key === otherLinkType.key;
	}
}