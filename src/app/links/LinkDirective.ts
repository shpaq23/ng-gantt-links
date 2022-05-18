import { Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChanges } from '@angular/core';
import { Link } from 'src/app/links/model/Link';
import { LinkType } from 'src/app/links/model/LinkType';

@Directive({
	selector: 'polyline[appLink]'
})
export class LinkDirective implements OnChanges {

	@Input()
	link: Link;

	constructor(
		private readonly renderer: Renderer2,
		private readonly elementRef: ElementRef
	) {
	}

	ngOnChanges(changes: SimpleChanges) {
		this.setPoints();
	}

	private setPoints(): void {
		this.renderer.setAttribute(this.elementRef.nativeElement, 'points', this.calculatePoints());
		this.renderer.setAttribute(this.elementRef.nativeElement, 'style', 'fill:white;stroke:red;stroke-width:4');
	}

	private calculatePoints(): string {
		const start: Point = [this.link.getStart().x, this.link.getStart().y];
		const end: Point = [this.link.getEnd().x, this.link.getEnd().y];

		const points: Point[] = [start];

		if(this.link.getType().isSameType(LinkType.EE)) {
			// po prawej
			const maxX = Math.max(start[0] + this.link.xMargin, end[0] + this.link.xMargin)
			points.push([maxX, start[1]], [maxX, end[1]]);
		} else if (this.link.getType().isSameType(LinkType.SS)) {
			// po lewej
			const minX = Math.min(start[0] - this.link.xMargin, end[0] - this.link.xMargin)
			points.push([minX, start[1]], [minX, end[1]]);
		} else if (
			(this.link.getType().isSameType(LinkType.SE) && start[0] - this.link.xMargin < end[0] + this.link.xMargin) ||
			(this.link.getType().isSameType(LinkType.ES) && start[0] + this.link.xMargin > end[0] - this.link.xMargin)
		) {
			// zawijas
			const startHigher = start[1] < end[1];
			const [startMargin, endMargin]: [Point, Point] = this.link.getType().isSameType(LinkType.SE)
				? [[start[0] - this.link.xMargin, start[1]], [end[0] + this.link.xMargin, end[1]]]
				: [[start[0] + this.link.xMargin, start[1]], [end[0] - this.link.xMargin, end[1]]]

			points.push(startMargin);

			if(startHigher) {
				points.push(
					[startMargin[0], startMargin[1] + this.link.yMargin],
					[endMargin[0], startMargin[1] + this.link.yMargin]
				)
			} else {
				points.push(
					[startMargin[0], endMargin[1] + this.link.yMargin],
					[endMargin[0], endMargin[1] + this.link.yMargin]
				)
			}

			points.push(endMargin);
		} else {
			// mid point
			const xMidPoint = (start[0] + end[0]) / 2;

			points.push(
				[xMidPoint, start[1]],
				[xMidPoint, end[1]]
			)
		}


		points.push(end);
		return this.pointsToAttribute(points);
	}

	private pointsToAttribute(points: Point[]): string {
		return points.map(point => point.join(',')).join(' ')
	}
}

type Point = [number, number];