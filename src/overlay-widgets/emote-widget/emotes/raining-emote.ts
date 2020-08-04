import { RenderableObject, Vector2 } from './emote-interfaces';

export class RainingEmote extends RenderableObject {
    opacity: number = 1;
    angularVelocityDegrees: number = 0;
    degreesRotation: number = 0;
    imageSrc: string[] = [];
    htmlElement: JQuery<HTMLElement>;
    position: Vector2 = new Vector2();
    velocity: Vector2 = new Vector2();
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

    calculateNextMoveFrame(dt: number): Vector2 {
        return new Vector2(this.position.x + this.velocity.x, this.position.y + this.velocity.y);
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
}
