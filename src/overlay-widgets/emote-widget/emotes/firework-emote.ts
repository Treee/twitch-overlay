import { RenderableObject, Vector2 } from './emote-interfaces';

export class FireworkEmote extends RenderableObject {

    accelerate(dt: number): void {
        // move the emote up along the y axis
        this.acceleration.y += dt;

        // when the velocity changes we are at the epoch of the curve, set lifespan to close to 0 so emote explodes
        if (this.velocity.y > 0) {
            this.lifespan = 0.1;
        }
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