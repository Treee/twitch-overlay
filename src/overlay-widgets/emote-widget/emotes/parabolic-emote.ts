import { RenderableObject, Vector2 } from './emote-interfaces';

export class ParabolicEmote extends RenderableObject {

    accelerationModifier: number = 1;

    accelerate(dt: number): void {
        if (this.isBouncy && this.position.y > this.canvasHeight) {
            this.velocity.y = this.velocity.y * -1;
            this.accelerationModifier *= 1.5;
        }
        if (this.isBouncy && (this.position.x > this.canvasWidth || this.position.x < 0)) {
            this.velocity.x = this.velocity.x * -1;
            this.accelerationModifier *= 1.5;
        }
        // this.acceleration.x -= dt;
        this.acceleration.y += dt * this.accelerationModifier;
        this.velocity = new Vector2(this.velocity.x + (this.acceleration.x * dt), this.velocity.y + (this.acceleration.y * dt));
        // console.log(`Accel: ${this.acceleration} Current: ${this.velocity}`);
    }

    calculateNextMoveFrame(dt: number): Vector2 {
        this.accelerate(dt);
        return super.calculateNextMoveFrame(dt);
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