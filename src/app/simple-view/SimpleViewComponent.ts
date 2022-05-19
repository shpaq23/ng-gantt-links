import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Link } from 'src/app/links/model/Link';
import { LinkAnchor, LinkType } from 'src/app/links/model/LinkType';
import { Point } from 'src/app/links/model/Point';

@Component({
	selector: 'app-simple-view',
	templateUrl: './SimpleViewComponent.html',
	styles: [`
		:host {
			z-index: 1000;
			display: block;
			height: 100%;
			width: 100%;
			position: relative;
		}
	`],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SimpleViewComponent implements OnInit, AfterViewInit {

	@ViewChild('linkContainerComponent', { read: ElementRef })
	linkContainerComponent: ElementRef;

	@ViewChild('bar1', { static: true, read: ElementRef })
	bar1ElementRef: ElementRef;

	@ViewChild('bar2', { static: true, read: ElementRef })
	bar2ElementRef: ElementRef;

	@ViewChild('bar3', { static: true, read: ElementRef })
	bar3ElementRef: ElementRef;

	@ViewChild('bar4', { static: true, read: ElementRef })
	bar4ElementRef: ElementRef;

	@ViewChild('bar5', { static: true, read: ElementRef })
	bar5ElementRef: ElementRef;

	@ViewChild('bar6', { static: true, read: ElementRef })
	bar6ElementRef: ElementRef;

	@ViewChild('bar7', { static: true, read: ElementRef })
	bar7ElementRef: ElementRef;

	@ViewChild('bar8', { static: true, read: ElementRef })
	bar8ElementRef: ElementRef;


	links: Array<Link> = [];

	bar1DomRect: DOMRect;
	bar2DomRect: DOMRect;
	bar3DomRect: DOMRect;
	bar4DomRect: DOMRect;
	bar5DomRect: DOMRect;
	bar6DomRect: DOMRect;
	bar7DomRect: DOMRect;
	bar8DomRect: DOMRect;

	private offsetPointX: number;
	private offsetPointY: number;

	constructor(
		private readonly changeDetectorRef: ChangeDetectorRef
	) {
	}

	ngOnInit() {
	}

	ngAfterViewInit(): void {
		this.setHostOffsetPoints();

		setTimeout(() => {
			this.bar1DomRect = this.bar1ElementRef.nativeElement.getBoundingClientRect();
			this.bar2DomRect = this.bar2ElementRef.nativeElement.getBoundingClientRect();
			this.bar3DomRect = this.bar3ElementRef.nativeElement.getBoundingClientRect();
			this.bar4DomRect = this.bar4ElementRef.nativeElement.getBoundingClientRect();
			this.bar5DomRect = this.bar5ElementRef.nativeElement.getBoundingClientRect();
			this.bar6DomRect = this.bar6ElementRef.nativeElement.getBoundingClientRect();
			this.bar7DomRect = this.bar7ElementRef.nativeElement.getBoundingClientRect();
			this.bar8DomRect = this.bar8ElementRef.nativeElement.getBoundingClientRect();
			// console.log(this.bar1DomRect);
			// console.log(this.bar2DomRect);
			// console.log(this.bar3DomRect);
			// console.log(this.bar4DomRect);
			// console.log(this.bar5DomRect);
			// console.log(this.bar6DomRect);
			// console.log(this.bar7DomRect);
			// console.log(this.bar8DomRect);
			this.recalculateLinks();
		});
	}

	onBar1PositionChanged(event: DOMRect): void {
		this.bar1DomRect = event;
		this.recalculateLinks();
	}

	onBar2PositionChanged(event: DOMRect): void {
		this.bar2DomRect = event;
		this.recalculateLinks();
	}

	onBar3PositionChanged(event: DOMRect): void {
		this.bar3DomRect = event;
		this.recalculateLinks();
	}

	onBar4PositionChanged(event: DOMRect): void {
		this.bar4DomRect = event;
		this.recalculateLinks();
	}

	onBar5PositionChanged(event: DOMRect): void {
		this.bar5DomRect = event;
		this.recalculateLinks();
	}

	onBar6PositionChanged(event: DOMRect): void {
		this.bar6DomRect = event;
		this.recalculateLinks();
	}

	onBar7PositionChanged(event: DOMRect): void {
		this.bar7DomRect = event;
		this.recalculateLinks();
	}

	onBar8PositionChanged(event: DOMRect): void {
		this.bar8DomRect = event;
		this.recalculateLinks();
	}

	private recalculateLinks(): void {
		this.links = [
			this.createLink(this.bar1DomRect, this.bar2DomRect, LinkType.EE, 1),
			this.createLink(this.bar3DomRect, this.bar4DomRect, LinkType.ES, 2),
			this.createLink(this.bar5DomRect, this.bar6DomRect, LinkType.SE, 3),
			this.createLink(this.bar7DomRect, this.bar8DomRect, LinkType.SS, 4)
		];
		this.changeDetectorRef.detectChanges();
	}

	private createLink(bar1: DOMRect, bar2: DOMRect, type: LinkType, id: number): Link {
		const linkStart: Point = {
			x: ((type.start === LinkAnchor.START) ? bar1.x : bar1.x + bar1.width) - this.offsetPointX,
			y: (bar1.y + bar1.height / 2) - this.offsetPointY
		};
		const linkEnd: Point = {
			x: ((type.end === LinkAnchor.END) ? bar2.x + bar2.width : bar2.x) - this.offsetPointX,
			y: (bar2.y + bar2.height / 2) - this.offsetPointY
		};
		return new Link(id, type, linkStart, linkEnd, bar1.height);
	}

	private setHostOffsetPoints(): void {
		const hostClientRect = (this.linkContainerComponent.nativeElement as HTMLElement).getBoundingClientRect();

		this.offsetPointX = hostClientRect.x;
		this.offsetPointY = hostClientRect.y;
	}
}
