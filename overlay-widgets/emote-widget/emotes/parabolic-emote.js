"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const emote_interfaces_1 = require("./emote-interfaces");
class ParabolicEmote extends emote_interfaces_1.RenderableObject {
    constructor() {
        super(...arguments);
        this.accelerationModifier = 1;
    }
    accelerate(dt) {
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
        this.velocity = new emote_interfaces_1.Vector2(this.velocity.x + (this.acceleration.x * dt), this.velocity.y + (this.acceleration.y * dt));
        // console.log(`Accel: ${this.acceleration} Current: ${this.velocity}`);
    }
    calculateNextMoveFrame(dt) {
        this.accelerate(dt);
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
exports.ParabolicEmote = ParabolicEmote;
