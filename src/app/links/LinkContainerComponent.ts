import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Link } from 'src/app/links/model/Link';

@Component({
	selector: 'app-link-container',
	templateUrl: './LinkContainerComponent.svg',
	styleUrls: ['./LinkContainerComponent.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class LinkContainerComponent {

	@Input()
	links: Array<Link> = [];



	trackByFn(index: number, link: Link): number {
		return link.getId();
	}

}
