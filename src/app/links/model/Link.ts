import { LinkType } from 'src/app/links/model/LinkType';
import { Point } from 'src/app/links/model/Point';

export class Link {
	readonly yWrapDistance: number;

	constructor(
		private readonly id: number,
		private readonly type: LinkType,
		private readonly start: Point,
		private readonly end: Point,
		private readonly barHeight: number,
		public readonly xMargin: number = 20,
		private readonly yMargin: number = 10,
	) {
		this.yWrapDistance = barHeight / 2 + yMargin
	}

	getId(): number {
		return this.id;
	}

	getType(): LinkType {
		return this.type;
	}

	getStart(): Point {
		return this.start;
	}

	getEnd(): Point {
		return this.end;
	}
}

