import { RenderableObject, Vector2 } from './emote-interfaces';

export class WavyEmote extends RenderableObject {

    movementTheta: number = 0;
    movementToggle: boolean = true;

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