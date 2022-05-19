import { Point } from 'src/app/links/model/Point';

export class SvgPathBuilder {
	private svgPathCommands: SvgPathCommand[] = [];

	moveTo(point: Point) {
		this.svgPathCommands.push(
			new SvgPathCommand('M', point.x, point.y)
		)

		return this;
	}

	lineTo(point: Point) {
		this.svgPathCommands.push(
			new SvgPathCommand('L', point.x, point.y)
		)

		return this;
	}

	bezierQuadratic(controlPoint: Point, endPoint: Point) {
		this.svgPathCommands.push(
			new SvgPathCommand('Q', controlPoint.x, controlPoint.y, endPoint.x, endPoint.y)
		)

		return this;
	}

	polyLine(points: Point[]) {
		points.forEach((point) => this.lineTo(point));

		return this;
	}

	lineWithBezierQuadraticCurves(points: Point[], maxCurveStrength: number) {
		if(points.length < 3) return this.polyLine(points);

		for (let i = 0; i < points.length - 2; i++) {
			const middleToFirstVector = new Vector2D(points[i + 1], points[i]);
			const middleToThirdVector = new Vector2D(points[i + 1], points[i + 2])

			if (middleToFirstVector.isParallelTo(middleToThirdVector)) {
				this.lineTo(points[i + 1]);
			} else {
				const curveStrength = Math.min(
					middleToFirstVector.length / 2,
					middleToThirdVector.length / 2,
					maxCurveStrength
				)

				const middleToFirstUnitVector = middleToFirstVector.unit();
				const middleToThirdUnitVector = middleToThirdVector.unit();

				const pointBeforeBend = {
					x: points[i + 1].x + middleToFirstUnitVector.x * curveStrength,
					y: points[i + 1].y + middleToFirstUnitVector.y * curveStrength
				}
				this.lineTo(pointBeforeBend);

				const pointAfterBend = {
					x: points[i + 1].x + middleToThirdUnitVector.x * curveStrength,
					y: points[i + 1].y + middleToThirdUnitVector.y * curveStrength
				}

				this.bezierQuadratic(points[i+1], pointAfterBend);
			}
		}

		this.lineTo(points[points.length - 1]);

		return this;
	}

	build(): string {
		return this.svgPathCommands.map(command => command.stringify()).join(' ');
	}
}

class SvgPathCommand {
	private readonly svgCommandArgs: number[];

	constructor(
		private readonly svgCommandName: string,
		...svgCommandArgs: number[]
	) {
		this.svgCommandArgs = svgCommandArgs;
	}

	stringify(): string {
		return this.svgCommandName + ' ' + this.svgCommandArgs.join(' ');
	}
}

class Vector2D {
	readonly x: number;
	readonly y: number;
	readonly length: number

	constructor(p1: Point, p2: Point) {
		this.x = p2.x - p1.x;
		this.y = p2.y - p1.y;
		this.length = Math.sqrt(this.x ** 2 + this.y ** 2);
	}

	unit(): { x: number, y: number } {
		return { x: this.x / this.length, y: this.y / this.length }
	}

	isParallelTo(vector: Vector2D): boolean {
		return this.x * vector.y === vector.x * this.y;
	}
}

