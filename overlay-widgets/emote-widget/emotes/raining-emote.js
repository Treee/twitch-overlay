"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const emote_interfaces_1 = require("./emote-interfaces");
class RainingEmote extends emote_interfaces_1.RenderableObject {
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
exports.RainingEmote = RainingEmote;
