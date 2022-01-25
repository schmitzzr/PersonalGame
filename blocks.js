class Ground {
    constructor(game, x, y, width) {
        Object.assign(this, { game, x, y, width });

        this.spritesheet = ASSET_MANAGER.getAsset("./grass_block.png");

        this.BB = new BoundingBox(this.x, this.y, this.width, PARAMS.BLOCKWIDTH);
        this.leftBB = new BoundingBox(this.x, this.y, PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH * 2);
        this.rightBB = new BoundingBox(this.x + this.width - PARAMS.BLOCKWIDTH, this.y, PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH * 2);
    };

    update() {
    };

    draw(ctx) {
        let brickCount = this.width / PARAMS.BLOCKWIDTH;
        for (var i = 0; i < brickCount; i++) {
            ctx.drawImage(this.spritesheet, 0,0, 835,835, this.x + i*PARAMS.BLOCKWIDTH, this.y - this.game.camera.y, PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH);
        }
        if (PARAMS.DEBUG) {
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x, this.BB.y - this.game.camera.y, this.BB.width, this.BB.height);
        }
    };
};

class Border {
    constructor(game, x, y, width, height) {
        Object.assign(this, { game, x, y, width, height });

        this.spritesheet = ASSET_MANAGER.getAsset("./iron_block.png");

        this.BB = new BoundingBox(this.x, this.y, this.width, this.height);
        this.leftBB = new BoundingBox(this.x, this.y, PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH * 2);
        this.rightBB = new BoundingBox(this.x + this.width - PARAMS.BLOCKWIDTH, this.y, PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH * 2);
    };

    update() {
    };

    draw(ctx) {
        let brickCount = this.height / PARAMS.BLOCKWIDTH;
        for (var i = 0; i < brickCount; i++) {
            ctx.drawImage(this.spritesheet, 0,0, 362,362, this.x, this.y + + i*PARAMS.BLOCKWIDTH - this.game.camera.y, PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH);
        }
        if (PARAMS.DEBUG) {
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x, this.BB.y - this.game.camera.y, this.BB.width, this.BB.height);
        }
    };
};

class Platform {
    constructor(game, x, y, width, height) {
        Object.assign(this, { game, x, y, width, height });

        this.spritesheet = ASSET_MANAGER.getAsset("./iron_block.png");

        this.BB = new BoundingBox(this.x, this.y, this.width, this.height);
        // this.leftBB = new BoundingBox(this.x, this.y, this.w, this.height);
        // this.rightBB = new BoundingBox(this.x + this.w, this.w, this.height);
        // this.topBB = new BoundingBox(this.x, this.y, this.w, this.height);
    };

    update() {
    };

    draw(ctx) {

        let wBrickCount = this.width / PARAMS.BLOCKWIDTH;
        let hBrickCount = this.height / PARAMS.BLOCKWIDTH;
        for (var i = 0; i < wBrickCount; i++) {
            for (var j = 0; j < hBrickCount; j++) {
                ctx.drawImage(this.spritesheet, 0,0, 362, 362, this.x + i*PARAMS.BLOCKWIDTH, this.y + j*PARAMS.BLOCKWIDTH - this.game.camera.y, PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH);
            }
        }
        if (PARAMS.DEBUG) {
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x, this.BB.y - this.game.camera.y, this.BB.width, this.BB.height);
        }


        // ctx.drawImage(this.spritesheet, 48,228, 300,72, this.x, this.y - this.game.camera.y, this.width * PARAMS.BLOCKWIDTH, this.height);
        // if (PARAMS.DEBUG) {
        //     ctx.strokeStyle = 'Red';
        //     ctx.strokeRect(this.BB.x, this.BB.y - this.game.camera.y, this.BB.width, this.BB.height);
        // }
    };
};


class PassThroughPlatform {
    constructor(game, x, y, w) {
        Object.assign(this, { game, x, y, w });

        this.height = this.w * 0.24

        this.spritesheet = ASSET_MANAGER.getAsset("./platforms.png");

        this.BB = new BoundingBox(this.x, this.y, this.w, this.height);
        this.leftBB = new BoundingBox(this.x, this.y, this.w, this.height);
        this.rightBB = new BoundingBox(this.x + this.w, this.w, this.height);
    };

    update() {
    };

    draw(ctx) {
        ctx.drawImage(this.spritesheet, 48,228, 300,72, this.x, this.y, this.w, this.height);
        if (PARAMS.DEBUG) {
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x, this.BB.y, this.BB.width, this.BB.height);
        }
    };
};