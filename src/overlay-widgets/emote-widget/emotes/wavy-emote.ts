import { RenderableObject, Vector2 } from './emote-interfaces';
import { randomNumberBetween } from '../../../helpers/math-helper';

export class WavyEmote extends RenderableObject {

    movementTheta: number = 0;
    randomAmplitude: number = randomNumberBetween(2, 5);

    calculateNextMoveFrame(dt: number): Vector2 {
        this.movementTheta += dt;

        this.velocity.y = this.randomAmplitude * Math.sin(this.movementTheta);
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