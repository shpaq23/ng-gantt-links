import {
	AfterViewInit,
	ChangeDetectionStrategy,
	Component,
	ElementRef,
	EventEmitter,
	Input,
	NgZone,
	OnChanges,
	Output,
	Renderer2,
	SimpleChanges,
	ViewChild
} from '@angular/core';
import { animationFrameScheduler, fromEvent } from 'rxjs';
import { switchMap, takeUntil, throttleTime } from 'rxjs/operators';
import { LinkDragData } from 'src/app/link-dnd/LinkDragData';
import { LinkAnchor } from 'src/app/links/model/LinkType';

@Component({
	selector: 'app-bar',
	templateUrl: './BarComponent.html',
	styleUrls: ['./BarComponent.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class BarComponent implements OnChanges, AfterViewInit {

	@ViewChild('wrapper')
	wrapperElement: ElementRef;

	@Input()
	summary: string;

	@Input()
	y: number = 0;

	@Input()
	id: number;

	@Output()
	positionChanged = new EventEmitter<DOMRect>();

	linkDragStartData: LinkDragData;
	linkDragEndData: LinkDragData;

	readonly LinkAnchor = LinkAnchor;

	constructor(
		private readonly elementRef: ElementRef,
		private readonly renderer2: Renderer2,
		private readonly ngZone: NgZone
	) {
	}

	ngOnChanges(changes: SimpleChanges) {
		if (changes.id && changes.id.currentValue) {
			this.linkDragStartData = new LinkDragData<number>(this.id, LinkAnchor.START);
			this.linkDragEndData = new LinkDragData<number>(this.id, LinkAnchor.END);
		}
	}

	ngAfterViewInit() {
		this.setPosition(0);
		this.ngZone.runOutsideAngular(() => this.dragAndDrop());
	}

	private dragAndDrop(): void {
		fromEvent<MouseEvent>(this.wrapperElement.nativeElement, 'mousedown')
			.pipe(
				switchMap(() => {
					return fromEvent<MouseEvent>(document, 'mousemove')
						.pipe(
							throttleTime(0, animationFrameScheduler),
							takeUntil(fromEvent(document, 'mouseup'))
						);
				})
			).subscribe((event) => {
			this.setPosition(event.clientX);
			this.positionChanged.emit(this.elementRef.nativeElement.getBoundingClientRect());
		});
	}

	private setPosition(x: number): void {
		const el = this.elementRef.nativeElement;
		this.renderer2.setStyle(el, 'transform', `translateX(${x}px) translateY(${this.y}px)`);
	}
}
