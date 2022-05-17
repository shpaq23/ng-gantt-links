import { Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChanges } from '@angular/core';
import { Link } from 'src/app/links/model/Link';

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
		return `${this.link.getStart().x},${this.link.getStart().y} ${this.link.getEnd().x},${this.link.getEnd().y}`
	}


}
