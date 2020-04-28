export enum ClockDirection {
    // clockwise, counter clockwise
    CW, CCW
}

export class Vector2 {
    values: number[];
    constructor(x: number = 0, y: number = 0) {
        this.values = [x, y];
    }

    add(other: Vector2): Vector2 {
        return new Vector2((this.values[0] + other.values[0]), (this.values[1] + other.values[1]));
    }

    subtract(other: Vector2): Vector2 {
        return new Vector2((this.values[0] - other.values[0]), (this.values[1] - other.values[1]));
    }

    magnitude(): number {
        return Math.sqrt((this.values[0] * this.values[0]) + (this.values[1] * this.values[1]));
    }

    multiplyScalar(scalar: number): Vector2 {
        return new Vector2(this.values[0] * scalar, this.values[1] * scalar);
    }

    divideScalar(scalar: number): Vector2 {
        if (scalar === 0) {
            throw new Error('Cannont divide by 0');
        }
        return new Vector2(this.values[0] / scalar, this.values[1] / scalar);
    }

    normalize(): Vector2 {
        const magnitude = this.magnitude();
        if (magnitude > 0) {
            return new Vector2(this.values[0] / magnitude, this.values[1] / magnitude);
        } else {
            throw new Error('Cannot normalize a vector with 0 magnitude.');
        }
    }

    normal(direction: ClockDirection): Vector2 {
        if (direction === ClockDirection.CW) {
            return new Vector2(this.values[1], -this.values[0]);
        } else if (direction === ClockDirection.CCW) {
            return new Vector2(-this.values[1], this.values[0]);
        } else {
            throw new Error('Cannot return normal');
        }
    }

    dot(other: Vector2): number {
        const aNorm = this.normalize();
        const oNorm = other.normalize();
        // console.log(`(${aNorm.values[0]}, ${aNorm.values[1]}) dot (${oNorm.values[0]}, ${oNorm.values[1]})`);
        return ((aNorm.values[0] * oNorm.values[0]) + (aNorm.values[1] * oNorm.values[1]));
    }

    crossProduct(other: Vector2): number {
        const aNorm = this.normalize();
        const oNorm = other.normalize();
        return ((aNorm.values[0] * oNorm.values[1]) - (aNorm.values[1] * oNorm.values[0]));
    }

    angleBetween(other: Vector2): number {
        return (Math.acos(this.dot(other)) * (180 / Math.PI));
    }

    print(): string {
        return `[${this.values[0]}, ${this.values[1]}]`;
    }

    checkBoundaries(aVec: Vector2, listOfBoundaries: Vector2[]) {
        const collidedSides: Vector2[] = [];
        let colliding = false;
        listOfBoundaries.forEach((boundary: Vector2) => {
            // console.log(boundary, aVec.dot(boundary));
            if (aVec.dot(boundary) < 0) {
                colliding = true;
                collidedSides.push(boundary);
            }
        });
        return { colliding: colliding, collidedSides: collidedSides };
    }
}