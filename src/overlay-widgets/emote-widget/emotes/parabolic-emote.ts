import { RenderableObject, Vector2 } from './emote-interfaces';

export class ParabolicEmote extends RenderableObject {

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
    isBouncy: boolean = false;
    canvasHeight: number = 1080;

    constructor(size: Vector2, imageSrcs: string[]) {
        super();
        this.imageSrc = imageSrcs;
        this.htmlElement = super.createHtmlElements('emote', imageSrcs, size);
    }

    initializeProperties(position: Vector2, velocity: Vector2, lifespan: number, angularVelocity: number, isBouncy: boolean, canvasHeight: number) {
        this.position = position;
        this.velocity = velocity;
        this.lifespan = lifespan;
        this.angularVelocityDegrees = angularVelocity;
        this.isBouncy = isBouncy;
        this.canvasHeight = canvasHeight;
        this.translate(position.x, position.y);
    }

    accelerate(dt: number): void {
        if (this.isBouncy && this.position.y > this.canvasHeight) {
            this.velocity.y = this.velocity.y * -1;
        }
        // this.acceleration.x -= dt;
        this.acceleration.y += dt;
        this.velocity = new Vector2(this.velocity.x + (this.acceleration.x * dt), this.velocity.y + (this.acceleration.y * dt));
        // console.log(`Accel: ${this.acceleration} Current: ${this.velocity}`);
    }

    calculateNextMoveFrame(dt: number): Vector2 {
        this.accelerate(dt);
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