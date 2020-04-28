export class Vector2 {
    x: number;
    y: number;

    constructor(x: number = 0, y: number = 0) {
        this.x = x;
        this.y = y;
    }

    toString(): string {
        return `(${this.x},${this.y})`;
    }
}

export interface Movable {
    position: Vector2;
    velocity: Vector2;

    translate(x: number, y: number): void;

    calculateNextMoveFrame(dt: number): Vector2;

}

export interface Rotatable {
    degreesRotation: number;
    angularVelocityDegrees: number;

    rotate(degrees: number): void;

    calculateNextRotationFrame(dt: number): number;

}

export interface Hideable {
    lifespan: number;
    opacity: number; // between 0 and 1

    isHidden(): boolean;
    modifyOpacity(dt: number): void;
}

export interface Acceleratable {
    acceleration: Vector2;

    accelerate(dt: number): void;
}

export abstract class RenderableObject {
    htmlElement?: JQuery<HTMLElement>;
    imageSrc?: string[];

    constructor() { }

    createHtmlElements(cssClass: string, imageUrls: string[], size: Vector2): JQuery<HTMLElement> {
        throw new Error('createHtmlElements is not implemented in abstract class RenderableObject');
    }

    createHtmlElement(cssClass: string, imageSrc: string, size: Vector2): JQuery<HTMLElement> {
        throw new Error('createHtmlElement is not implemented in abstract class RenderableObject');
    }

    doUpdate(dt: number): void {
        throw new Error('doUpdate is not implemented in abstract class RenderableObject');
    }

    draw(): void {
        throw new Error('draw is not implemented in abstract class RenderableObject');
    }
}