import { Directive, ElementRef, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { fromEvent, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { LinkDragData } from 'src/app/link-dnd/LinkDragData';
import { LinkDragService } from 'src/app/link-dnd/LinkDragService';

@Directive({
	selector: '[linkDrop][linkDropData]'
})
export class LinkDragEndDirective implements OnChanges, OnInit {
	@Input('linkDropData')
	data: LinkDragData;

	@Input('linkDropReadonly')
	readonly: boolean = false;

	private readonly destroyEvents$: Subject<void> = new Subject<void>();
	private readonly destroyMouseUpEvent$: Subject<void> = new Subject<void>();

	constructor(
		private readonly elementRef: ElementRef,
		private readonly service: LinkDragService
	) {
	}

	ngOnChanges(changes: SimpleChanges) {
		if (changes.readonly && !changes.readonly.firstChange) {
			this.resolveEvents();
		}
	}

	ngOnInit() {
		this.resolveEvents();
	}

	private resolveEvents(): void {
		this.destroyEvents();

		if (!this.readonly) {
			this.observeDragging();
		}
	}

	private observeDragging(): void {
		this.service.selectDragging()
			.pipe(
				takeUntil(this.destroyEvents$)
				// this.takeUntilDestroy()
			)
			.subscribe((dragging: boolean) => {
				if (dragging) {
					this.observeMouseUp();
				} else {
					this.destroyMouseUpEvent$.next();
				}
			});
	}

	private observeMouseUp(): void {
		fromEvent(this.elementRef.nativeElement, 'mouseup')
			.pipe(
				takeUntil(this.destroyMouseUpEvent$),
				takeUntil(this.destroyEvents$)
				// this.takeUntilDestroy()
			)
			.subscribe(() => {
				this.service.endDrag(this.data);
			});
	}

	private destroyEvents(): void {
		this.destroyEvents$.next();
	}
}
