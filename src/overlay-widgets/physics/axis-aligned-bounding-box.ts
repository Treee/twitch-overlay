import { Vector2 } from "./tree-math";

export class AABB {
    center: Vector2;
    extents: Vector2;
    velocity: Vector2;
    acceleration: Vector2;

    constructor(center: Vector2, extents: Vector2, velocity: Vector2 = new Vector2(), acceleration: Vector2 = new Vector2()) {
        this.center = center;
        this.extents = extents;
        this.velocity = velocity;
        this.acceleration = acceleration;
    }

    isMoving() {
        return this.velocity.values[0] !== 0 || this.velocity.values[1] !== 0;
    }

    min(): Vector2 {
        return new Vector2(this.center.values[0] - this.extents.values[0], this.center.values[1] - this.extents.values[1]);
    }

    max(): Vector2 {
        return new Vector2(this.center.values[0] + this.extents.values[0], this.center.values[1] + this.extents.values[1]);
    }

    size(): Vector2 {
        return new Vector2(this.extents.values[0] * 2, this.extents.values[1] * 2);
    }

    minkowskiDifference(other: AABB): AABB {
        const topLeft = this.min().subtract(other.max());
        const fullSize = this.size().add(other.size());

        return new AABB(topLeft.add(fullSize.divideScalar(2)), fullSize.divideScalar(2));
    }

    isCollidingWith(other: AABB, dt: number): boolean {
        const difference = this.minkowskiDifference(other);
        let colliding = false;
        const min = difference.min();
        const max = difference.max();
        let rvRayIntersection: Vector2 | null = null;
        // console.log(`dt:${dt} velocityA:${this.velocity.print()} velocityB:${other.velocity.print()}`);
        let rvRay: Vector2 = this.velocity.subtract(other.velocity).multiplyScalar(dt);
        // this checks if the AABBs are currently colliding (static)
        if (min.values[0] <= 0 && max.values[0] >= 0 && min.values[1] <= 0 && max.values[1] >= 0) {
            colliding = true;
            // console.log(`minx:${min.values[0]} minY:${max.values[0]} maxX:${min.values[1]} maxY:${max.values[1]}`);
        } else if (this.isMoving() || other.isMoving()) { // this checks quickly moving AABBs
            // https://blog.hamaluik.ca/posts/swept-aabb-collision-using-minkowski-difference/
            // see if there WILL be a collision
            const intersectFraction = this.getRayIntersectionFraction(new Vector2(), rvRay);
            if (intersectFraction) {
                // yup, there WILL be a collision this frame
                rvRayIntersection = rvRay.multiplyScalar(intersectFraction);

                // move the boxes appropriately
                // this.center = this.center.add(this.velocity.multiplyScalar(dt).multiplyScalar(intersectFraction));
                // other.center = other.center.add(other.velocity.multiplyScalar(dt).multiplyScalar(intersectFraction));
                colliding = true;

                // zero out the normal of the collision
                // var nrvRay = rvRay.normalize();
                // var tangent = new Vector2(-nrvRay.values[1], nrvRay.values[0]);
                // this.velocity = tangent.multiplyScalar(this.velocity.dot(tangent));
                // other.velocity = tangent.multiplyScalar(tangent.dot(other.velocity));
            }
        }

        return colliding;
    }

    getRayIntersectionFraction(origin: Vector2, direction: Vector2): number | null {
        var end = origin.add(direction);
        // console.log(`origin: ${origin.print()} direction: ${direction.print()} end: ${end.print()}`);
        const min = this.min();
        const max = this.max();

        // check each face of a square
        var minT = this.checkEdge(null, origin, end, new Vector2(min.values[0], min.values[1]), new Vector2(min.values[0], max.values[1]));
        minT = this.checkEdge(minT, origin, end, new Vector2(min.values[0], max.values[1]), new Vector2(max.values[0], max.values[1]));
        minT = this.checkEdge(minT, origin, end, new Vector2(max.values[0], max.values[1]), new Vector2(max.values[0], min.values[1]));
        minT = this.checkEdge(minT, origin, end, new Vector2(max.values[0], min.values[1]), new Vector2(min.values[0], min.values[1]));
        // ok, now we should have found the fractional component along the ray where we collided
        return minT;
    }

    checkEdge(minT: number | null, origin: Vector2, end: Vector2, originB: Vector2, endB: Vector2): number | null {
        let x = this.getRayIntersectionFractionOfFirstRay(origin, end, originB, endB);
        // console.log(`minT:${minT} x:${x}`);
        // if minT is null and x is something
        if (!minT && x) {
            // console.log('minT is null so default accept a good value');
            minT = x;
        } else if (x && minT && x < minT) {
            // console.log('we found a fraction that is closer to the collision');
            minT = x;
        }
        return minT;
    }

    // taken from https://github.com/pgkelley4/line-segments-intersect/blob/master/js/line-segments-intersect.js
    // returns the point where they intersect (if they intersect)
    // returns null if they don't intersect
    getRayIntersectionFractionOfFirstRay(originA: Vector2, endA: Vector2, originB: Vector2, endB: Vector2): number | null {
        var r = endA.subtract(originA);
        var s = endB.subtract(originB);

        var numerator: number = originB.subtract(originA).crossProduct(r);
        var denominator: number = r.crossProduct(s);

        // console.log(`checking intersection between startA:${originA.print()} endA:${endA.print()} startB:${originB.print()} endB:${endB.print()}`)
        if (numerator === 0 && denominator === 0) {
            // the lines are co-linear
            // check if they overlap
        	/*return	((originB.x - originA.x < 0) != (originB.x - endA.x < 0) != (endB.x - originA.x < 0) != (endB.x - endA.x < 0)) || 
            ((originB.y - originA.y < 0) != (originB.y - endA.y < 0) != (endB.y - originA.y < 0) != (endB.y - endA.y < 0));*/
            return null;
        }
        if (denominator === 0) {
            // lines are parallel
            return null;
        }

        var u: number = numerator / denominator;
        var t: number = originB.subtract(originA).crossProduct(s) / denominator;
        if ((t >= 0) && (t <= 1) && (u >= 0) && (u <= 1)) {
            // console.log(`==========> t: ${t} u: ${u}`);
            // console.log('=============> collision!!!');
            //return originA + (r * t);
            return t;
        }
        return null;
    }
}