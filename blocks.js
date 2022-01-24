class Ground {
    constructor(game, x, y, w) {
        Object.assign(this, { game, x, y, w });

        this.spritesheet = ASSET_MANAGER.getAsset("./grass_block.png");

        this.BB = new BoundingBox(this.x, this.y, this.w, PARAMS.BLOCKWIDTH * 2);
        this.leftBB = new BoundingBox(this.x, this.y, PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH * 2);
        this.rightBB = new BoundingBox(this.x + this.w - PARAMS.BLOCKWIDTH, this.y, PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH * 2);
    };

    update() {
    };

    draw(ctx) {
        let brickCount = this.w / PARAMS.BLOCKWIDTH;
        for (var i = 0; i < brickCount; i++) {
            ctx.drawImage(this.spritesheet, 0,0, 835,835, this.x + i*PARAMS.BLOCKWIDTH, this.y, PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH);
        }
        if (PARAMS.DEBUG) {
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x, this.BB.y, this.BB.width, this.BB.height);
        }
    };
};

class Platform {
    constructor(game, x, y, w) {
        Object.assign(this, { game, x, y, w });

        this.height = this.w * 0.24

        this.spritesheet = ASSET_MANAGER.getAsset("./platforms.png");

        this.BB = new BoundingBox(this.x, this.y, this.w, this.height);
        this.leftBB = new BoundingBox(this.x, this.y, 1, 36);
        this.rightBB = new BoundingBox(this.x + this.w, this.y, 1, 36);
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


class PassThroughPlatform {
    constructor(game, x, y, w) {
        Object.assign(this, { game, x, y, w });

        this.height = this.w * 0.24

        this.spritesheet = ASSET_MANAGER.getAsset("./platforms.png");

        this.BB = new BoundingBox(this.x, this.y, this.w, this.height);
        this.leftBB = new BoundingBox(this.x, this.y, 1, 36);
        this.rightBB = new BoundingBox(this.x + this.w, this.y, 1, 36);
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