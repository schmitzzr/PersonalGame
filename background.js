class Background {
    constructor(game, x, y) {
        Object.assign(this, {game, x, y});

        this.spritesheet = ASSET_MANAGER.getAsset("./JapanBackground.jpg");
        
    };

    update() {
    };

    drawMinimap(ctx, mmX, mmY) {
    };

    draw(ctx) {
        ctx.drawImage(this.spritesheet, 0, 0, 1600, 1200, this.x, this.y - this.game.camera.y, CANVAS_WIDTH, CANVAS_HEIGHT);
    };
};

