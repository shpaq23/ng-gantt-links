import { AfterViewInit, ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Link } from 'src/app/links/model/Link';

@Component({
	selector: 'app-link-container',
	templateUrl: './LinkContainerComponent.svg',
	styleUrls: ['./LinkContainerComponent.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class LinkContainerComponent implements AfterViewInit {

	@Input()
	links: Array<Link> = [];

	@Output()
	linkRendered = new EventEmitter<void>();


	trackByFn(index: number, link: Link): number {
		return link.getId();
	}

	ngAfterViewInit() {
		this.linkRendered.emit();
	}
}
