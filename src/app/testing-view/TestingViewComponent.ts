import { ChangeDetectionStrategy, Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { Link } from 'src/app/links/model/Link';
import { LinkType } from 'src/app/links/model/LinkType';
import { Point } from 'src/app/links/model/Point';

interface BarInterface {
	summary: string,
	y: number
}

@Component({
	selector: 'app-testing-view',
	templateUrl: './TestingViewComponent.html',
	styles: [`
		:host {
			z-index: 1000;
			display: block;
			width: 100%;
			position: relative;
		}
	`],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class TestingViewComponent implements OnInit {

	links: Array<Link> = [];

	bars: Array<BarInterface> = [];

	private linkGenerationEnd: number;

	private readonly containerHeight: number = 15000 * 32;

	private readonly numberOfLinks = 7500;

	constructor(private readonly renderer: Renderer2,
				private readonly elementRef: ElementRef) {
	}

	ngOnInit() {
		this.generateBars();
		this.setContainerHeight();
		this.generateLinks();
	}

	onLinkRendered(): void {
		const linkRendered = performance.now();
		console.info(`${this.numberOfLinks} LINKS Rendered IN`, linkRendered - this.linkGenerationEnd, 'ms');
	}


	private generateLinks(): void {
		const generationStart = performance.now();
		for (let i = 1; i < this.numberOfLinks; i++) {
			const startEndpoint: Point = {
				x: 200,
				y: i * 20
			};

			const endEndpoint: Point = {
				x: 200,
				y: i * 20 + 40
			};
			const link = new Link(i, LinkType.EE, startEndpoint, endEndpoint, 41);
			this.links.push(link);
		}
		this.linkGenerationEnd = performance.now();
		console.info(`${this.numberOfLinks} LINKS GENERATED IN`, this.linkGenerationEnd - generationStart, 'ms');
	}

	private generateBars(): void {
		for (let i = 0; i < 10; i++) {
			const bar: BarInterface = {
				summary: `Bar Summary ${i}`,
				y: i * 40
			};
			this.bars.push(bar);
		}
	}

	private setContainerHeight(): void {
		this.renderer.setAttribute(this.elementRef.nativeElement, 'style', `height: ${this.containerHeight}px`);
	}


}
