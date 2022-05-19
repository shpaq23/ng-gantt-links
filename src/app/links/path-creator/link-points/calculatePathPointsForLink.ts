import { Link } from 'src/app/links/model/Link';
import { Point } from 'src/app/links/model/Point';
import { LinkTypeKey } from 'src/app/links/model/LinkType';
import { calcEE } from 'src/app/links/path-creator/link-points/ee';
import { calcSS } from 'src/app/links/path-creator/link-points/ss';
import { calcSE } from 'src/app/links/path-creator/link-points/se';
import { calcES } from 'src/app/links/path-creator/link-points/es';

export function calculatePoints(link: Link): Point[] {
	let points: Point[] = [];

	switch (link.getType().key) {
		case LinkTypeKey.EE:
			points = calcEE(link);
			break;

		case LinkTypeKey.SS:
			points = calcSS(link);
			break;

		case LinkTypeKey.SE:
			points = calcSE(link);
			break;

		case LinkTypeKey.ES:
			points = calcES(link);
			break;
	}

	return points;
}