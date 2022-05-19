import { Link } from 'src/app/links/model/Link';
import { Point } from 'src/app/links/model/Point';

export function calcEE(link: Link): Point[] {
	const start = link.getStart();
	const end = link.getEnd();

	const maxX = Math.max(start.x + link.xMargin, end.x + link.xMargin)

	return [
		start,
		{x: maxX, y: start.y},
		{x: maxX, y: end.y},
		end
	]
}
