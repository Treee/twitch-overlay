"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ClockDirection;
(function (ClockDirection) {
    // clockwise, counter clockwise
    ClockDirection[ClockDirection["CW"] = 0] = "CW";
    ClockDirection[ClockDirection["CCW"] = 1] = "CCW";
})(ClockDirection = exports.ClockDirection || (exports.ClockDirection = {}));
class Vector2 {
    constructor(x = 0, y = 0) {
        this.values = [x, y];
    }
    add(other) {
        return new Vector2((this.values[0] + other.values[0]), (this.values[1] + other.values[1]));
    }
    subtract(other) {
        return new Vector2((this.values[0] - other.values[0]), (this.values[1] - other.values[1]));
    }
    magnitude() {
        return Math.sqrt((this.values[0] * this.values[0]) + (this.values[1] * this.values[1]));
    }
    multiplyScalar(scalar) {
        return new Vector2(this.values[0] * scalar, this.values[1] * scalar);
    }
    divideScalar(scalar) {
        if (scalar === 0) {
            throw new Error('Cannont divide by 0');
        }
        return new Vector2(this.values[0] / scalar, this.values[1] / scalar);
    }
    normalize() {
        const magnitude = this.magnitude();
        if (magnitude > 0) {
            return new Vector2(this.values[0] / magnitude, this.values[1] / magnitude);
        }
        else {
            throw new Error('Cannot normalize a vector with 0 magnitude.');
        }
    }
    normal(direction) {
        if (direction === ClockDirection.CW) {
            return new Vector2(this.values[1], -this.values[0]);
        }
        else if (direction === ClockDirection.CCW) {
            return new Vector2(-this.values[1], this.values[0]);
        }
        else {
            throw new Error('Cannot return normal');
        }
    }
    dot(other) {
        const aNorm = this.normalize();
        const oNorm = other.normalize();
        // console.log(`(${aNorm.values[0]}, ${aNorm.values[1]}) dot (${oNorm.values[0]}, ${oNorm.values[1]})`);
        return ((aNorm.values[0] * oNorm.values[0]) + (aNorm.values[1] * oNorm.values[1]));
    }
    crossProduct(other) {
        const aNorm = this.normalize();
        const oNorm = other.normalize();
        return ((aNorm.values[0] * oNorm.values[1]) - (aNorm.values[1] * oNorm.values[0]));
    }
    angleBetween(other) {
        return (Math.acos(this.dot(other)) * (180 / Math.PI));
    }
    print() {
        return `[${this.values[0]}, ${this.values[1]}]`;
    }
    checkBoundaries(aVec, listOfBoundaries) {
        const collidedSides = [];
        let colliding = false;
        listOfBoundaries.forEach((boundary) => {
            // console.log(boundary, aVec.dot(boundary));
            if (aVec.dot(boundary) < 0) {
                colliding = true;
                collidedSides.push(boundary);
            }
        });
        return { colliding: colliding, collidedSides: collidedSides };
    }
}
exports.Vector2 = Vector2;
