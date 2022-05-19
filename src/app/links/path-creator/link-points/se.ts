import { Link } from 'src/app/links/model/Link';
import { Point } from 'src/app/links/model/Point';

export function calcSE(link: Link): Point[] {
	const start = link.getStart();
	const end = link.getEnd();

	if(start.x - link.xMargin < end.x + link.xMargin) {
		const horizontalLineY = Math.min(start.y, end.y) + link.yWrapDistance;

		return [
			start,
			{ x: start.x - link.xMargin, y: start.y },
			{ x: start.x - link.xMargin, y: horizontalLineY},
			{ x: end.x + link.xMargin, y: horizontalLineY},
			{ x: end.x + link.xMargin, y: end.y },
			end
		]
	} else {
		const midPointX = (start.x + end.x) / 2;

		return [
			start,
			{x: midPointX, y: start.y},
			{x: midPointX, y: end.y},
			end
		]
	}
}