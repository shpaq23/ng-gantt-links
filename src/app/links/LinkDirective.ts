import { Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChanges } from '@angular/core';
import { Link } from 'src/app/links/model/Link';
import { createPath } from 'src/app/links/path-creator/createPath';

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
		this.renderer.setAttribute(this.elementRef.nativeElement, 'd', createPath(this.link));
	}
}

