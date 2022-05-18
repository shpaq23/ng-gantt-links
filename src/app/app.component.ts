import { ApplicationRef, ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { filter } from 'rxjs/operators';
import { Event, NavigationEnd, Router } from '@angular/router';

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
		private readonly applicationRef: ApplicationRef
	) {
	}

	ngOnInit() {
		this.router.events.pipe(
			filter((event: Event) => {
				return event instanceof NavigationEnd;
			})
		).subscribe(() => {
			this.applicationRef.tick();
		});
	}

}

