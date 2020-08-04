export class Vector2 {
    x: number;
    y: number;

    constructor(x: number = 0, y: number = 0) {
        this.x = x;
        this.y = y;
    }

    toString(): string {
        return `(${this.x},${this.y})`;
    }
}

export class RenderableObject {
    htmlElement: JQuery<HTMLElement>;
    imageSrc: string[];

    emoteCodes: string[] = [];

    isMovable: boolean = false;
    position: Vector2 = new Vector2();
    velocity: Vector2 = new Vector2();

    isRotateable: boolean = false;
    degreesRotation: number = 0;
    angularVelocityDegrees: number = 0;

    isAcceleratable: boolean = false;
    acceleration: Vector2 = new Vector2();

    isHideable: boolean = true;
    opacity: number = 1;
    lifespan: number = 0;

    isBouncy: boolean = false;
    canvasHeight: number = 1080;
    canvasWidth: number = 1920;

    isFirework: boolean = false;
    isExploded: boolean = false;

    constructor(imageSrcs: string[], size: Vector2) {
        this.imageSrc = imageSrcs;
        this.htmlElement = this.createHtmlElements('emote', imageSrcs, size);
    }

    initializeRenderable(objectProperties: any) {
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
        this.translate(this.position.x, this.position.y);
    }

    createHtmlElements(cssClass: string, imageUrls: string[], size: Vector2): JQuery<HTMLElement> {
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

    createHtmlElement(cssClass: string, imageSrc: string, size: Vector2): JQuery<HTMLElement> {
        const element = $('<div></div>').addClass(cssClass);
        element.width(`${size.x}px`);
        element.height(`${size.y}px`);
        element.css('background', `url("${imageSrc}")`);
        return element;
    }

    translate(x: number, y: number): string {
        return `translate(${x}px, ${y}px)`;
    }

    // accelerate(dt: number): void {
    //     if (this.isBouncy && this.position.y > this.canvasHeight) {
    //         this.velocity.y = this.velocity.y * -1;
    //     }
    //     // this.acceleration.x -= dt;
    //     this.acceleration.y += dt;
    //     this.velocity = new Vector2(this.velocity.x + (this.acceleration.x * dt), this.velocity.y + (this.acceleration.y * dt));
    //     // console.log(`Accel: ${this.acceleration} Current: ${this.velocity}`);
    // }

    rotate(degrees: number): string {
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
    calculateNextMoveFrame(dt: number): Vector2 {
        return new Vector2(this.position.x + this.velocity.x, this.position.y + this.velocity.y);
    }

    // default behavior is to rotate around the center point
    calculateNextRotationFrame(dt: number): number {
        let nextRotation = this.degreesRotation + this.angularVelocityDegrees
        if (nextRotation > 360) {
            nextRotation = nextRotation - 360;
        }
        return nextRotation;
    }

    isHidden(): boolean {
        return this.lifespan < 0
    }

    modifyOpacity(dt: number): void {
        this.opacity -= dt;
    }

    doUpdate(dt: number): void {
        throw new Error('doUpdate is not implemented in abstract class RenderableObject');
    }

    draw(): void {
        this.applyTransform();
    }
}