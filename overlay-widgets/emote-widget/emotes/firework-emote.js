"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const emote_interfaces_1 = require("./emote-interfaces");
class FireworkEmote extends emote_interfaces_1.RenderableObject {
    accelerate(dt) {
        // move the emote up along the y axis
        this.acceleration.y += dt;
        // when the velocity changes we are at the epoch of the curve, set lifespan to close to 0 so emote explodes
        if (this.velocity.y > 0) {
            this.lifespan /= 2;
        }
        this.velocity = new emote_interfaces_1.Vector2(this.velocity.x + (this.acceleration.x * dt), this.velocity.y + (this.acceleration.y * dt));
        // console.log(`Accel: ${this.acceleration} Current: ${this.velocity}`);
    }
    calculateNextMoveFrame(dt) {
        this.accelerate(dt);
        return super.calculateNextMoveFrame(dt);
    }
    modifyOpacity(dt) {
        this.opacity -= dt * 2;
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
exports.FireworkEmote = FireworkEmote;
