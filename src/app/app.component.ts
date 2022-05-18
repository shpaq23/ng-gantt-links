import { ApplicationRef, ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Event, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { LinkDragService } from 'src/app/link-dnd/LinkDragService';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
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
export class AppComponent implements OnInit {


	constructor(
		private readonly router: Router,
		private readonly applicationRef: ApplicationRef,
		private readonly linkDragService: LinkDragService<number>
	) {
	}

	ngOnInit() {
		this.observeLinkDragData();
		this.router.events.pipe(
			filter((event: Event) => {
				return event instanceof NavigationEnd;
			})
		).subscribe(() => {
			this.applicationRef.tick();
		});
	}

	private observeLinkDragData(): void {
		this.linkDragService.selectDragData()
			.pipe(
				// this.takeUntilDestroy()
			)
			.subscribe(([startData, endData]) => {
				console.log(startData, endData);
			});
	}

}

