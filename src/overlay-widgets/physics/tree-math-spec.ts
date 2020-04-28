import "jasmine"
import { Vector2, ClockDirection } from './tree-math';

describe('Tree Math Spec', () => {

    let testVec2: Vector2;

    beforeEach(() => {

    });

    it('has an array of values representing x and y', () => {
        const expectedX = 42;
        const expectedY = 58;
        testVec2 = new Vector2(expectedX, expectedY);
        expect(testVec2.values).toEqual([expectedX, expectedY]);
    });

    it('adds two vectors together', () => {
        const expectedAX = 42;
        const expectedAY = 58;
        const expectedBX = 3;
        const expectedBY = 9;
        let aVec = new Vector2(expectedAX, expectedAY);
        let bVec = new Vector2(expectedBX, expectedBY);

        const actualResult = aVec.add(bVec);

        const expectedResult = new Vector2(expectedAX + expectedBX, expectedAY + expectedBY);

        expect(actualResult.values).toEqual(expectedResult.values);
    });

    it('subtracts one vector from another', () => {
        const expectedAX = 42;
        const expectedAY = 58;
        const expectedBX = 3;
        const expectedBY = 9;
        let aVec = new Vector2(expectedAX, expectedAY);
        let bVec = new Vector2(expectedBX, expectedBY);

        const actualResult = aVec.subtract(bVec);

        const expectedResult = new Vector2(expectedAX - expectedBX, expectedAY - expectedBY);

        expect(actualResult.values).toEqual(expectedResult.values);
    });

    it('subtracts one vector from another, proving not commutative', () => {
        const expectedAX = 42;
        const expectedAY = 58;
        const expectedBX = 3;
        const expectedBY = 9;
        let aVec = new Vector2(expectedAX, expectedAY);
        let bVec = new Vector2(expectedBX, expectedBY);

        const actualResult = bVec.subtract(aVec);

        const expectedResult = new Vector2(expectedBX - expectedAX, expectedBY - expectedAY);

        expect(actualResult.values).toEqual(expectedResult.values);
    });

    it('returns the magnitude of a vector', () => {
        testVec2 = new Vector2(3, 4);
        const expectedMagnitude = Math.sqrt((testVec2.values[0] * testVec2.values[0]) + (testVec2.values[1] * testVec2.values[1]));
        const actualMagnitude = testVec2.magnitude();
        expect(actualMagnitude).toEqual(expectedMagnitude);
    });

    describe('normalizing a vector', () => {
        it('normalizes a unit vector', () => {
            testVec2 = new Vector2(1, 1);
            const expectedNormalize = new Vector2(0.7071067811865475, 0.7071067811865475);
            const actualNormalized = testVec2.normalize();
            expect(actualNormalized).toEqual(expectedNormalize);
        });

        it('normalizes a negative unit vector', () => {
            testVec2 = new Vector2(-1, 1);
            const expectedNormalize = new Vector2(-0.7071067811865475, 0.7071067811865475);
            const actualNormalized = testVec2.normalize();
            expect(actualNormalized).toEqual(expectedNormalize);
        });

        it('normalizes a non unit vector', () => {
            testVec2 = new Vector2(1523, 600);
            const mag = testVec2.magnitude();
            const expectedNormalize = new Vector2(testVec2.values[0] / mag, testVec2.values[1] / mag);
            const actualNormalized = testVec2.normalize();
            expect(actualNormalized).toEqual(expectedNormalize);
        });

        it('normalizes a negative non unit vector', () => {
            testVec2 = new Vector2(-1523, -600);
            const mag = testVec2.magnitude();
            const expectedNormalize = new Vector2(testVec2.values[0] / mag, testVec2.values[1] / mag);
            const actualNormalized = testVec2.normalize();
            expect(actualNormalized).toEqual(expectedNormalize);
        });

        it('wont attempt to normalized a vector with a magnitude of 0 or less', () => {
            testVec2 = new Vector2(0, 0);
            expect(() => { testVec2.normalize() }).toThrow(new Error('Cannot normalize a vector with 0 magnitude.'));
        });

        it('gives the clockwise normal to a vector', () => {
            const aVec = new Vector2(1, 0);
            const clockWiseNormal = aVec.normal(ClockDirection.CW);
            expect(clockWiseNormal).toEqual(new Vector2(0, -1));
        });

        it('gives the counterclockwise normal to a vector', () => {
            const aVec = new Vector2(1, 0);
            const counterClockwiseNormal = aVec.normal(ClockDirection.CCW);
            expect(counterClockwiseNormal).toEqual(new Vector2(-0, 1));
        });
    });

    describe('dot product', () => {
        it('returns negative if 2 vectors are pointing away', () => {
            const aVec = new Vector2(2, 21);
            const bVec = new Vector2(-23, -25);
            const actualDot = aVec.dot(bVec);

            expect(actualDot).toBeLessThan(0);
        });

        it('returns 0 if 2 vectors are perpendicular', () => {
            const aVec = new Vector2(17, 17);
            const bVec = new Vector2(-17, 17);
            const actualDot = aVec.dot(bVec);

            expect(actualDot).toEqual(0);
        });

        it('returns positive if 2 vectors are pointing the same direction', () => {
            const aVec = new Vector2(16, 12);
            const bVec = new Vector2(42, 13);
            const actualDot = aVec.dot(bVec);

            expect(actualDot).toBeGreaterThan(0);
        });

        it('finds the angle between two vectors', () => {
            const aVec = new Vector2(1, 1);
            const bVec = new Vector2(-1, 1);
            const actualAngle = aVec.angleBetween(bVec);

            expect(actualAngle).toEqual(90);
        });

    });

    describe('collision shortcut checks', () => {
        // it('will not collide with a north wall', () => {
        //     testVec2 = new Vector2();
        //     const position = new Vector2(50, 100);
        //     const boundaries = [
        //         new Vector2(0, -1)
        //     ];
        //     const actualResult = testVec2.checkBoundaries(position, boundaries);
        //     expect(actualResult.colliding).toBe(false);
        // });

        // it('will collide with a north wall', () => {
        //     const position = new Vector2(50, -100);
        //     const north = new Vector2(1, 0);
        //     const boundaries = [
        //         north.normal(ClockDirection.CCW)
        //     ];
        //     const actualResult = testVec2.checkBoundaries(position, boundaries);
        //     expect(actualResult.colliding).toBe(true);
        // });

        // it('will not collide with a south wall', () => {
        //     const position = new Vector2(50, 100);
        //     const south = new Vector2(1, 0);
        //     const boundaries = [
        //         south.normal(ClockDirection.CCW)
        //     ];
        //     const actualResult = testVec2.checkBoundaries(position, boundaries);
        //     expect(actualResult.colliding).toBe(false);
        // });

        // it('will collide with a south wall', () => {
        //     const position = new Vector2(50, -100);
        //     const south = new Vector2(1, 0);
        //     const boundaries = [
        //         south.normal(ClockDirection.CCW)
        //     ];
        //     const actualResult = testVec2.checkBoundaries(position, boundaries);
        //     expect(actualResult.colliding).toBe(true);
        // });

        // it('checks if a point can be intersected', () => {
        //     const northWall = new Vector2(0, 50);
        //     testVec2 = new Vector2(25, 49);
        //     testVec2.intersectsWith(testVec2.add(new Vector2(0, 5)), northWall, northWall.add(new Vector2(50, 0)));
        // });


        // it('checks if a point is not intersecting', () => {
        //     const northWall = new Vector2(0, 50);
        //     const northWallEnd = new Vector2(50, 50);
        //     testVec2 = new Vector2(25, 25);
        //     testVec2.intersectsWith(testVec2.add(new Vector2(0, 5)), northWall, northWallEnd);
        // });
    });
});