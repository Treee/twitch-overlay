import { RenderableObject, Movable, Rotatable, Hideable, Vector2 } from './emote-interfaces';

export class RainingEmote extends RenderableObject implements Movable, Rotatable, Hideable {
    opacity: number = 1;
    angularVelocityDegrees: number = 0;
    degreesRotation: number = 0;
    imageSrc: string[];
    htmlElement: JQuery<HTMLElement>;
    position: Vector2;
    velocity: Vector2;
    lifespan: number;

    constructor(position: Vector2 = new Vector2(), velocity: Vector2 = new Vector2(), lifespan: number = 0, size: Vector2, imageSrcs: string[], angularVelocity: number) {
        super();
        this.position = position;
        this.velocity = velocity;
        this.lifespan = lifespan;
        this.imageSrc = imageSrcs;
        this.angularVelocityDegrees = angularVelocity;
        this.htmlElement = super.createHtmlElements('emote', imageSrcs, size);
        this.translate(position.x, position.y);
    }

    translate(x: number, y: number): string {
        return `translate(${x}px, ${y}px)`;
    }

    rotate(degrees: number): string {
        return `rotate(${degrees}deg)`;
    }

    applyTransform() {
        const translation = this.translate(this.position.x, this.position.y);
        const rotation = this.rotate(this.degreesRotation);
        this.htmlElement.css('transform', `${translation} ${rotation}`);
        this.htmlElement.css('opacity', `${this.opacity}`);
    }

    calculateNextMoveFrame(dt: number): Vector2 {
        return new Vector2(this.position.x + this.velocity.x, this.position.y + this.velocity.y);
    }

    calculateNextRotationFrame(dt: number): number {
        let nextRotation = this.degreesRotation + this.angularVelocityDegrees
        if (nextRotation > 360) {
            nextRotation = nextRotation - 360;
        }
        return nextRotation;
    }

    isHidden(): boolean {
        return this.lifespan < 0
    }

    modifyOpacity(dt: number): void {
        this.opacity -= dt;
    }

    doUpdate(dt: number): void {
        this.lifespan -= dt;
        if (!this.isHidden()) {
            this.position = this.calculateNextMoveFrame(dt);
            this.degreesRotation = this.calculateNextRotationFrame(dt);
        }
        if (this.lifespan < 1) {
            this.modifyOpacity(dt);
        }
    }

    draw(): void {
        this.applyTransform();
    }

}