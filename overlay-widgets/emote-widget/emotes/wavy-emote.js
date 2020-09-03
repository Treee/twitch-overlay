"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const emote_interfaces_1 = require("./emote-interfaces");
const math_helper_1 = require("../../../helpers/math-helper");
class WavyEmote extends emote_interfaces_1.RenderableObject {
    constructor() {
        super(...arguments);
        this.movementTheta = 0;
        this.randomAmplitude = math_helper_1.randomNumberBetween(2, 5);
    }
    calculateNextMoveFrame(dt) {
        this.movementTheta += dt;
        this.velocity.y = this.randomAmplitude * Math.sin(this.movementTheta);
        return super.calculateNextMoveFrame(dt);
    }
    doUpdate(dt) {
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
exports.WavyEmote = WavyEmote;
