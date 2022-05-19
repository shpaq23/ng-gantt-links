import { Link } from 'src/app/links/model/Link';
import { SvgPathBuilder } from 'src/app/links/path-creator/SvgPathBuilder';
import { calculatePoints } from 'src/app/links/path-creator/link-points/calculatePathPointsForLink';

export function createPath(link: Link): string {
	const points = calculatePoints(link);

	const [firstPoint, ...restPoints] = points;
	const svgPath = new SvgPathBuilder(firstPoint);

	if(!link.curveStrength) {
		svgPath.polyLine(restPoints);
	} else {
		svgPath.polylineWithQuadraticBezierCorners(firstPoint, points, link.curveStrength);
	}

	return svgPath.build();
}
