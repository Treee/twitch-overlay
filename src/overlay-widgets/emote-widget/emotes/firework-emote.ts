import { RenderableObject, Vector2 } from './emote-interfaces';

export class FireworkEmote extends RenderableObject {

    code: string = '';
    opacity: number = 1;
    angularVelocityDegrees: number = 0;
    degreesRotation: number = 0;
    imageSrc: string[];
    htmlElement: JQuery<HTMLElement>;
    position: Vector2 = new Vector2();
    velocity: Vector2 = new Vector2();
    acceleration: Vector2 = new Vector2(0, -1);
    lifespan: number = 0;
    isExploded: boolean = false;

    constructor(size: Vector2, imageSrcs: string[]) {
        super();
        this.imageSrc = imageSrcs;
        this.htmlElement = super.createHtmlElements('emote', imageSrcs, size);
    }

    initializeProperties(position: Vector2, velocity: Vector2, lifespan: number, angularVelocity: number, emoteCode: string) {
        this.position = position;
        this.velocity = velocity;
        this.lifespan = lifespan;
        this.angularVelocityDegrees = angularVelocity;
        this.code = emoteCode;
        this.translate(position.x, position.y);
    }

    accelerate(dt: number): void {
        // this.acceleration.x -= dt;
        this.acceleration.y += dt;
        this.velocity = new Vector2(this.velocity.x + (this.acceleration.x * dt), this.velocity.y + (this.acceleration.y * dt));
        // console.log(`Accel: ${this.acceleration} Current: ${this.velocity}`);
    }

    calculateNextMoveFrame(dt: number): Vector2 {
        this.accelerate(dt);
        return super.calculateNextMoveFrame(dt);
    }

    modifyOpacity(dt: number): void {
        this.opacity -= dt * 2;
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