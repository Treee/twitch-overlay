import "jasmine"
import { Vector2 } from './tree-math';
import { AABB } from "./axis-aligned-bounding-box";

describe('AABB Spec', () => {

    let testAABB: AABB;

    beforeEach(() => {

    });

    it('returns true if the minkowski difference finds a collision', () => {
        const testWidth = new Vector2(10, 10);
        testAABB = new AABB(new Vector2(3, 3), testWidth);

        const otherAABB = new AABB(new Vector2(5, 5), testWidth);

        const actualResult = otherAABB.isCollidingWith(testAABB, 0);
        expect(actualResult).toBe(true);
    });

    it('returns false if the minkowski difference does not find a collision', () => {
        const testWidth = new Vector2(10, 10);
        testAABB = new AABB(new Vector2(0, 0), testWidth);

        const otherAABB = new AABB(new Vector2(25, 25), testWidth);

        const actualResult = testAABB.isCollidingWith(otherAABB, 0);
        expect(actualResult).toBe(false);
    });

    it('returns true if the AABBs with high velocities are colliding next frame', () => {
        const testWidth = new Vector2(10, 10);
        // a velocity that will surely be a collision
        const movingVelocity = new Vector2(0, 100);
        const movingAABB = new AABB(new Vector2(5, 0), testWidth, movingVelocity);

        const floorAABB = new AABB(new Vector2(0, 25), testWidth);

        const actualResult = movingAABB.isCollidingWith(floorAABB, 1);
        expect(actualResult).toBe(true);
    });

    it('returns false if the AABBs with low velocities are not colliding next frame', () => {
        const testWidth = new Vector2(1, 1);
        // a velocity that will surely be a collision
        const movingVelocity = new Vector2(0, 0.001);
        const movingAABB = new AABB(new Vector2(5, 0), testWidth, movingVelocity);

        const floorAABB = new AABB(new Vector2(100, 100), testWidth);

        const actualResult = movingAABB.isCollidingWith(floorAABB, 1);
        expect(actualResult).toBe(false);
    });

});