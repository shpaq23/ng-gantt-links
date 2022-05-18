import { LinkAnchor } from 'src/app/links/model/LinkType';

export class LinkDragData<T = unknown> {
	constructor(
		private readonly data: T,
		private readonly anchor: LinkAnchor
	) {
	}

	getData(): T {
		return this.data;
	}

	getAnchor(): LinkAnchor {
		return this.anchor;
	}
}
