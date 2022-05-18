import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { LinkDragData } from 'src/app/link-dnd/LinkDragData';

@Injectable()
export class LinkDragService<T = unknown> {
	private startData: LinkDragData<T> | null;
	private endData: LinkDragData<T> | null;

	private readonly isDragging$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

	cancel(): void {
		this.startData = null;
		this.endData = null;
		this.isDragging$.next(false);
	}

	startDrag(data: LinkDragData<T>): void {
		console.log('Start drag', data);
		this.startData = data;
		this.isDragging$.next(true);
	}

	endDrag(data: LinkDragData<T>): void {
		console.log('End drag', data);
		this.endData = data;
		this.isDragging$.next(false);
	}

	selectDragData(): Observable<[LinkDragData<T>, LinkDragData<T>]> {
		return this.isDragging$.asObservable()
				   .pipe(
					   filter((dragging: boolean) => !dragging && !!this.startData && !!this.endData),
					   map(() => [this.startData, this.endData] as [LinkDragData<T>, LinkDragData<T>])
				   );
	}

	selectDragging(): Observable<boolean> {
		return this.isDragging$.asObservable();
	}
}
