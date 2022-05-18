import { Link } from 'src/app/links/model/Link';
import { Point } from 'src/app/links/model/Point';

export function calcSS(link: Link): Point[] {
	const start = link.getStart();
	const end = link.getEnd();

	const minX = Math.min(start.x - link.xMargin, end.x - link.xMargin)

	return [
		start,
		{x: minX, y: start.y},
		{x: minX, y: end.y},
		end
	]
}