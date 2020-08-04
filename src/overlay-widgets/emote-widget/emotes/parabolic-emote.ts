import { RenderableObject, Vector2 } from './emote-interfaces';

export class ParabolicEmote extends RenderableObject {

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