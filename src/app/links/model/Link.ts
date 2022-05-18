import { LinkType } from 'src/app/links/model/LinkType';
import { LinkEndpoint } from 'src/app/links/model/LinkEndpoint';

export class Link {

	constructor(
		private readonly id: number,
		private readonly type: LinkType,
		private readonly start: LinkEndpoint,
		private readonly end: LinkEndpoint,
		private readonly layout: number,
		public readonly xMargin: number = 20,
		public readonly yMargin: number = 25,
	) {
	}

	getId(): number {
		return this.id;
	}

	getType(): LinkType {
		return this.type;
	}

	getStart(): LinkEndpoint {
		return this.start;
	}

	getEnd(): LinkEndpoint {
		return this.end;
	}

	getLayout(): number {
		return this.layout;
	}

}

