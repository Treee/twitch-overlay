import { RenderableObject, Vector2 } from './emote-interfaces';

export class WavyEmote extends RenderableObject {
    opacity: number = 1;
    angularVelocityDegrees: number = 0;
    degreesRotation: number = 0;
    imageSrc: string[];
    htmlElement: JQuery<HTMLElement>;
    position: Vector2 = new Vector2();
    velocity: Vector2 = new Vector2();
    movementTheta: number = 0;
    movementToggle: boolean = true;
    lifespan: number = 0;

    constructor(size: Vector2, imageSrcs: string[]) {
        super();
        this.imageSrc = imageSrcs;
        this.htmlElement = super.createHtmlElements('emote', imageSrcs, size);
    }

    initializeProperties(position: Vector2, velocity: Vector2, lifespan: number, angularVelocity: number) {
        this.position = position;
        this.velocity = velocity;
        this.lifespan = lifespan;
        this.angularVelocityDegrees = angularVelocity;
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
        if (this.movementToggle) {
            this.movementTheta += dt;
        } else {
            this.movementTheta -= dt;
        }
        if (this.movementTheta > 1 || this.movementTheta < -1) {
            this.movementToggle = !this.movementToggle;
        }
        const x = this.position.x + (this.velocity.x * Math.cos(this.movementTheta));
        const y = this.position.y + (this.velocity.y * Math.sin(this.movementTheta));
        return new Vector2(x, y);
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