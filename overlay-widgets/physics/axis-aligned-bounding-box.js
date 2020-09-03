"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tree_math_1 = require("./tree-math");
class AABB {
    constructor(center, extents, velocity = new tree_math_1.Vector2(), acceleration = new tree_math_1.Vector2()) {
        this.center = center;
        this.extents = extents;
        this.velocity = velocity;
        this.acceleration = acceleration;
    }
    isMoving() {
        return this.velocity.values[0] !== 0 || this.velocity.values[1] !== 0;
    }
    min() {
        return new tree_math_1.Vector2(this.center.values[0] - this.extents.values[0], this.center.values[1] - this.extents.values[1]);
    }
    max() {
        return new tree_math_1.Vector2(this.center.values[0] + this.extents.values[0], this.center.values[1] + this.extents.values[1]);
    }
    size() {
        return new tree_math_1.Vector2(this.extents.values[0] * 2, this.extents.values[1] * 2);
    }
    minkowskiDifference(other) {
        const topLeft = this.min().subtract(other.max());
        const fullSize = this.size().add(other.size());
        return new AABB(topLeft.add(fullSize.divideScalar(2)), fullSize.divideScalar(2));
    }
    isCollidingWith(other, dt) {
        const difference = this.minkowskiDifference(other);
        let colliding = false;
        const min = difference.min();
        const max = difference.max();
        let rvRayIntersection = null;
        // console.log(`dt:${dt} velocityA:${this.velocity.print()} velocityB:${other.velocity.print()}`);
        let rvRay = this.velocity.subtract(other.velocity).multiplyScalar(dt);
        // this checks if the AABBs are currently colliding (static)
        if (min.values[0] <= 0 && max.values[0] >= 0 && min.values[1] <= 0 && max.values[1] >= 0) {
            colliding = true;
            // console.log(`minx:${min.values[0]} minY:${max.values[0]} maxX:${min.values[1]} maxY:${max.values[1]}`);
        }
        else if (this.isMoving() || other.isMoving()) { // this checks quickly moving AABBs
            // https://blog.hamaluik.ca/posts/swept-aabb-collision-using-minkowski-difference/
            // see if there WILL be a collision
            const intersectFraction = this.getRayIntersectionFraction(new tree_math_1.Vector2(), rvRay);
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
    getRayIntersectionFraction(origin, direction) {
        var end = origin.add(direction);
        // console.log(`origin: ${origin.print()} direction: ${direction.print()} end: ${end.print()}`);
        const min = this.min();
        const max = this.max();
        // check each face of a square
        var minT = this.checkEdge(null, origin, end, new tree_math_1.Vector2(min.values[0], min.values[1]), new tree_math_1.Vector2(min.values[0], max.values[1]));
        minT = this.checkEdge(minT, origin, end, new tree_math_1.Vector2(min.values[0], max.values[1]), new tree_math_1.Vector2(max.values[0], max.values[1]));
        minT = this.checkEdge(minT, origin, end, new tree_math_1.Vector2(max.values[0], max.values[1]), new tree_math_1.Vector2(max.values[0], min.values[1]));
        minT = this.checkEdge(minT, origin, end, new tree_math_1.Vector2(max.values[0], min.values[1]), new tree_math_1.Vector2(min.values[0], min.values[1]));
        // ok, now we should have found the fractional component along the ray where we collided
        return minT;
    }
    checkEdge(minT, origin, end, originB, endB) {
        let x = this.getRayIntersectionFractionOfFirstRay(origin, end, originB, endB);
        // console.log(`minT:${minT} x:${x}`);
        // if minT is null and x is something
        if (!minT && x) {
            // console.log('minT is null so default accept a good value');
            minT = x;
        }
        else if (x && minT && x < minT) {
            // console.log('we found a fraction that is closer to the collision');
            minT = x;
        }
        return minT;
    }
    // taken from https://github.com/pgkelley4/line-segments-intersect/blob/master/js/line-segments-intersect.js
    // returns the point where they intersect (if they intersect)
    // returns null if they don't intersect
    getRayIntersectionFractionOfFirstRay(originA, endA, originB, endB) {
        var r = endA.subtract(originA);
        var s = endB.subtract(originB);
        var numerator = originB.subtract(originA).crossProduct(r);
        var denominator = r.crossProduct(s);
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
        var u = numerator / denominator;
        var t = originB.subtract(originA).crossProduct(s) / denominator;
        if ((t >= 0) && (t <= 1) && (u >= 0) && (u <= 1)) {
            // console.log(`==========> t: ${t} u: ${u}`);
            // console.log('=============> collision!!!');
            //return originA + (r * t);
            return t;
        }
        return null;
    }
}
exports.AABB = AABB;
