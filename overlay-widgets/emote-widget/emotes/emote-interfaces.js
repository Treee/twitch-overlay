"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Vector2 {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }
    toString() {
        return `(${this.x},${this.y})`;
    }
}
exports.Vector2 = Vector2;
class RenderableObject {
    constructor(imageSrcs, size) {
        this.emoteCodes = [];
        this.isMovable = false;
        this.position = new Vector2();
        this.velocity = new Vector2();
        this.isRotateable = false;
        this.degreesRotation = 0;
        this.angularVelocityDegrees = 0;
        this.isAcceleratable = false;
        this.acceleration = new Vector2();
        this.isHideable = true;
        this.opacity = 1;
        this.lifespan = 0;
        this.isBouncy = false;
        this.canvasHeight = 1080;
        this.canvasWidth = 1920;
        this.isFirework = false;
        this.isExploded = false;
        this.imageSrc = imageSrcs;
        this.htmlElement = this.createHtmlElements('emote', imageSrcs, size);
    }
    initializeRenderable(objectProperties) {
        this.emoteCodes = objectProperties.emoteCodes;
        this.isMovable = objectProperties.isMoveable;
        this.position = objectProperties.position;
        this.velocity = objectProperties.velocity;
        this.isRotateable = objectProperties.isRotateable;
        this.degreesRotation = objectProperties.degreesRotation;
        this.angularVelocityDegrees = objectProperties.angularVelocityDegrees;
        this.isAcceleratable = objectProperties.isAcceleratable;
        this.acceleration = objectProperties.acceleration;
        this.isHideable = objectProperties.isHideable;
        this.opacity = objectProperties.opacity;
        this.lifespan = objectProperties.lifespan;
        this.isBouncy = objectProperties.isBouncy;
        this.canvasHeight = objectProperties.canvasHeight;
        this.canvasWidth = objectProperties.canvasWidth;
        this.isFirework = objectProperties.isFirework;
        this.isExploded = objectProperties.isExploded;
        this.applyTransform();
    }
    createHtmlElements(cssClass, imageUrls, size) {
        if (imageUrls.length > 1) {
            const element = $('<div></div>').addClass('grouped-emote');
            element.height(`${size.y}px`);
            element.width(`${size.x * imageUrls.length}px`);
            imageUrls.forEach((imageUrl) => {
                element.append(this.createHtmlElement('grouped-emote-icon', imageUrl, size));
            });
            return element;
        }
        else {
            return this.createHtmlElement(cssClass, imageUrls[0], size);
        }
    }
    createHtmlElement(cssClass, imageSrc, size) {
        const element = $('<div></div>').addClass(cssClass);
        element.width(`${size.x}px`);
        element.height(`${size.y}px`);
        element.css('background', `url("${imageSrc}")`);
        return element;
    }
    translate(x, y) {
        return `translate(${x}px, ${y}px)`;
    }
    rotate(degrees) {
        return `rotate(${degrees}deg)`;
    }
    applyTransform() {
        if (this.htmlElement) {
            const translation = this.translate(this.position.x, this.position.y);
            const rotation = this.rotate(this.degreesRotation);
            this.htmlElement.css('transform', `${translation} ${rotation}`);
            this.htmlElement.css('opacity', `${this.opacity}`);
        }
    }
    // default behavior is to move linearly based on the velocity
    calculateNextMoveFrame(dt) {
        return new Vector2(this.position.x + this.velocity.x, this.position.y + this.velocity.y);
    }
    // default behavior is to rotate around the center point
    calculateNextRotationFrame(dt) {
        let nextRotation = this.degreesRotation + this.angularVelocityDegrees;
        if (nextRotation > 360) {
            nextRotation = nextRotation - 360;
        }
        return nextRotation;
    }
    isHidden() {
        return this.lifespan < 0;
    }
    modifyOpacity(dt) {
        this.opacity -= dt;
    }
    doUpdate(dt) {
        throw new Error('doUpdate is not implemented in abstract class RenderableObject');
    }
    draw() {
        this.applyTransform();
    }
    cleanUp() {
        if (this.lifespan < 0) {
            this.htmlElement.remove();
        }
    }
}
exports.RenderableObject = RenderableObject;
