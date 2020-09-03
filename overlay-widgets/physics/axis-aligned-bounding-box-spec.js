"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("jasmine");
const tree_math_1 = require("./tree-math");
const axis_aligned_bounding_box_1 = require("./axis-aligned-bounding-box");
describe('AABB Spec', () => {
    let testAABB;
    beforeEach(() => {
    });
    it('returns true if the minkowski difference finds a collision', () => {
        const testWidth = new tree_math_1.Vector2(10, 10);
        testAABB = new axis_aligned_bounding_box_1.AABB(new tree_math_1.Vector2(3, 3), testWidth);
        const otherAABB = new axis_aligned_bounding_box_1.AABB(new tree_math_1.Vector2(5, 5), testWidth);
        const actualResult = otherAABB.isCollidingWith(testAABB, 0);
        expect(actualResult).toBe(true);
    });
    it('returns false if the minkowski difference does not find a collision', () => {
        const testWidth = new tree_math_1.Vector2(10, 10);
        testAABB = new axis_aligned_bounding_box_1.AABB(new tree_math_1.Vector2(0, 0), testWidth);
        const otherAABB = new axis_aligned_bounding_box_1.AABB(new tree_math_1.Vector2(25, 25), testWidth);
        const actualResult = testAABB.isCollidingWith(otherAABB, 0);
        expect(actualResult).toBe(false);
    });
    it('returns true if the AABBs with high velocities are colliding next frame', () => {
        const testWidth = new tree_math_1.Vector2(10, 10);
        // a velocity that will surely be a collision
        const movingVelocity = new tree_math_1.Vector2(0, 100);
        const movingAABB = new axis_aligned_bounding_box_1.AABB(new tree_math_1.Vector2(5, 0), testWidth, movingVelocity);
        const floorAABB = new axis_aligned_bounding_box_1.AABB(new tree_math_1.Vector2(0, 25), testWidth);
        const actualResult = movingAABB.isCollidingWith(floorAABB, 1);
        expect(actualResult).toBe(true);
    });
    it('returns false if the AABBs with low velocities are not colliding next frame', () => {
        const testWidth = new tree_math_1.Vector2(1, 1);
        // a velocity that will surely be a collision
        const movingVelocity = new tree_math_1.Vector2(0, 0.001);
        const movingAABB = new axis_aligned_bounding_box_1.AABB(new tree_math_1.Vector2(5, 0), testWidth, movingVelocity);
        const floorAABB = new axis_aligned_bounding_box_1.AABB(new tree_math_1.Vector2(100, 100), testWidth);
        const actualResult = movingAABB.isCollidingWith(floorAABB, 1);
        expect(actualResult).toBe(false);
    });
});
