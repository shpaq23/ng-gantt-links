import { Directive, ElementRef, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { fromEvent, Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { LinkDragData } from 'src/app/link-dnd/LinkDragData';
import { LinkDragService } from 'src/app/link-dnd/LinkDragService';

@Directive({
	selector: '[linkDrag][linkDragData]'
})
export class LinkDragStartDirective implements OnChanges, OnInit {
	@Input('linkDragData')
	data: LinkDragData;

	@Input('linkDragReadonly')
	readonly: boolean = false;

	private readonly destroyEvents$: Subject<void> = new Subject<void>();

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
			this.observeMouseDown();
		}
	}

	private observeMouseDown(): void {
		fromEvent(this.elementRef.nativeElement, 'mousedown')
			.pipe(
				takeUntil(this.destroyEvents$)
				// this.takeUntilDestroy()
			)
			.subscribe(() => {
				this.service.startDrag(this.data);
				this.observeMouseUp();
			});
	}

	private observeMouseUp(): void {
		fromEvent(window, 'mouseup')
			.pipe(
				take(1),
				takeUntil(this.destroyEvents$)
				// this.takeUntilDestroy()
			)
			.subscribe(() => {
				this.service.cancel();
			});
	}

	private destroyEvents(): void {
		this.destroyEvents$.next();
	}
}
