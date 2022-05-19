import {
	AfterViewInit,
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	ElementRef,
	EventEmitter,
	Input,
	OnInit,
	Output,
	Renderer2,
	ViewChild
} from '@angular/core';
import { fromEvent, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { LinkDragService } from 'src/app/link-dnd/LinkDragService';
import { Link } from 'src/app/links/model/Link';
import { SvgPathBuilder } from 'src/app/links/path-creator/SvgPathBuilder';

@Component({
	selector: 'app-link-container',
	templateUrl: './LinkContainerComponent.html',
	styleUrls: ['./LinkContainerComponent.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class LinkContainerComponent implements OnInit, AfterViewInit {

	private static readonly MOUSE_OFFSET = 6;

	@ViewChild('dragLineElement')
	readonly dragLineElement: ElementRef;

	@Input()
	links: Array<Link> = [];

	@Output()
	linkRendered = new EventEmitter<void>();

	isDragging: boolean;

	private destroyMouseOver$: Subject<void> = new Subject<void>();
	private offsetPointX: number;
	private offsetPointY: number;
	private startPointX: number;
	private startPointY: number;

	constructor(
		private readonly renderer: Renderer2,
		private readonly linkDragService: LinkDragService,
		private readonly changeDetectorRef: ChangeDetectorRef,
		private readonly elementRef: ElementRef
	) {
	}

	ngOnInit() {
		this.setHostOffsetPoints();
		this.observeDragging();
	}

	ngAfterViewInit() {
		this.linkRendered.emit();
	}

	trackByFn(index: number, link: Link): number {
		return link.getId();
	}

	private observeDragging(): void {
		this.linkDragService.selectDragging()
			.pipe(
				// this.takeUntilDestroy()
			)
			.subscribe((isDragging: boolean) => {
				this.isDragging = isDragging;

				if (this.isDragging) {
					this.observeMouseOver();
				} else {
					this.destroyMouseOver$.next();
				}

				this.changeDetectorRef.detectChanges();
			});
	}

	private observeMouseOver(): void {
		let isFirst: boolean = true;

		fromEvent<MouseEvent>(window, 'mousemove')
			.pipe(
				takeUntil(this.destroyMouseOver$)
				// this.takeUntilDestroy()
			)
			.subscribe((event: MouseEvent) => {
				if (isFirst) {
					const endpointElement = event.target as HTMLElement;

					this.calculateStartPoints(endpointElement);
					isFirst = false;
				}

				const x = event.clientX - this.offsetPointX;
				const y = event.clientY - this.offsetPointY;
				const lastLineY = y > this.startPointY ? y - LinkContainerComponent.MOUSE_OFFSET : y + LinkContainerComponent.MOUSE_OFFSET;

				const path = new SvgPathBuilder()
					.moveTo({x: this.startPointX, y: this.startPointY})
					.lineWithBezierQuadraticCurves(
						[
								{x: this.startPointX, y: this.startPointY},
								{x: x, y: this.startPointY},
								{x: x, y: lastLineY}
						],
						10
					).build()

				this.renderer.setAttribute(this.dragLineElement.nativeElement, 'd', path);
			});
	}

	private setHostOffsetPoints(): void {
		const hostClientRect = (this.elementRef.nativeElement as HTMLElement).getBoundingClientRect();

		this.offsetPointX = hostClientRect.x;
		this.offsetPointY = hostClientRect.y;
	}

	private calculateStartPoints(element: HTMLElement): void {
		const endpointClientRect = element.getBoundingClientRect();

		this.startPointX = (endpointClientRect.x + endpointClientRect.width / 2) - this.offsetPointX;
		this.startPointY = (endpointClientRect.y + endpointClientRect.height / 2) - this.offsetPointY;
	}
}
