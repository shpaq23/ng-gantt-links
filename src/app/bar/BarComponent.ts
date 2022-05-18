import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, NgZone, Output, Renderer2, ViewChild } from '@angular/core';
import { animationFrameScheduler, fromEvent } from 'rxjs';
import { switchMap, takeUntil, throttleTime } from 'rxjs/operators';

@Component({
	selector: 'app-bar',
	templateUrl: './BarComponent.html',
	styleUrls: ['./BarComponent.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class BarComponent implements AfterViewInit {

	@ViewChild('wrapper')
	wrapperElement: ElementRef;

	@Input()
	summary: string;

	@Input()
	y: number = 0;

	@Output()
	positionChanged = new EventEmitter<DOMRect>();

	constructor(
		private readonly elementRef: ElementRef,
		private readonly renderer2: Renderer2,
		private readonly ngZone: NgZone
	) {
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
