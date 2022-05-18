import { Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChanges } from '@angular/core';
import { Link } from 'src/app/links/model/Link';
import { LinkTypeKey } from 'src/app/links/model/LinkType';
import { Point } from 'src/app/links/model/Point';
import { calcEE } from 'src/app/links/calculations/ee';
import { calcSE } from 'src/app/links/calculations/se';
import { calcSS } from 'src/app/links/calculations/ss';
import { calcES } from 'src/app/links/calculations/es';

@Directive({
	selector: 'path[appLink]'
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
		this.renderer.setAttribute(this.elementRef.nativeElement, 'd', this.calculatePoints());
		this.renderer.setAttribute(this.elementRef.nativeElement, 'style', 'fill:white;stroke:red;stroke-width:4');
	}

	private calculatePoints(): string {
		let points: Point[] = [];

		switch (this.link.getType().key) {
			case LinkTypeKey.EE:
				points = calcEE(this.link);
				break;

			case LinkTypeKey.SS:
				points = calcSS(this.link);
				break;

			case LinkTypeKey.SE:
				points = calcSE(this.link);
				break;

			case LinkTypeKey.ES:
				points = calcES(this.link);
				break;
		}

		return this.pointsToAttribute(points);
	}

	private pointsToAttribute(points: Point[]): string {
		return points.map((point, i) => `${i? 'L' : 'M'}${point.x},${point.y}`).join(' ');
	}
}

