import { Link } from 'src/app/links/model/Link';
import { SvgPathBuilder } from 'src/app/links/path-creator/SvgPathBuilder';
import { calculatePoints } from 'src/app/links/path-creator/link-points/calculatePathPointsForLink';

export function createPath(link: Link): string {
	const points = calculatePoints(link);

	const svgPath = new SvgPathBuilder();
	svgPath.moveTo(points[0]);

	if(!link.curveStrength) {
		svgPath.polyLine(points);
	} else {
		svgPath.lineWithBezierQuadraticCurves(points, link.curveStrength);
	}

	return svgPath.build();
}
