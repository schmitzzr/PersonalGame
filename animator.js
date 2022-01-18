class Animator {
    constructor(spritesheet, xStart, yStart, width, height, frameCount, frameDuration) {
        Object.assign(this, { spritesheet, xStart, yStart, width, height, frameCount, frameDuration });
        
        this.elapsedTime = 0;
        this.totalTime = frameCount * frameDuration;
    };

    drawFrame(tick, ctx, x, y, scale) {

        this.elapsedTime += tick;

        if (this.elapsedTime > this.totalTime) this.elapsedTime -= this.totalTime;
        const frame = this.currentFrame();

        ctx.drawImage(this.spritesheet,
            this.xStart + this.width * frame, this.yStart, //source x and source y
            this.width, this.height, //source width and source height
            x, y, //destination x and destination y
            this.width*scale, this.height*scale) // destination width and destination height
    };

    currentFrame() {
        return Math.floor(this.elapsedTime / this.frameDuration);
    };

    isDone() {
        return (this.elapsedTime >= this.totalTime);
    };
}