class Light {
    constructor(game, x, y, height, levelHeight, on) {
        Object.assign(this, { game, x, height, levelHeight, on});

        this.width = 3;

        this.y = PARAMS.CANVAS_HEIGHT/PARAMS.BLOCKWIDTH - (this.levelHeight - y);

        this.spritesheet = ASSET_MANAGER.getAsset("./spotlight.png");

        this.BB = new BoundingBox((this.x + 0.5)* PARAMS.BLOCKWIDTH, this.y * PARAMS.BLOCKWIDTH, (this.width - 1) * PARAMS.BLOCKWIDTH, this.height * PARAMS.BLOCKWIDTH);
    };

    update() {
    };

    draw(ctx) {

        if (this.on)
            ctx.drawImage(this.spritesheet, 0, 0, 96, 216, 
                this.x * PARAMS.BLOCKWIDTH - this.game.camera.x, this.y*PARAMS.BLOCKWIDTH - this.game.camera.y,
                this.width * PARAMS.BLOCKWIDTH, this.height * PARAMS.BLOCKWIDTH);
        else 
            ctx.drawImage(this.spritesheet, 96, 0, 96, 216, 
                this.x * PARAMS.BLOCKWIDTH - this.game.camera.x, this.y*PARAMS.BLOCKWIDTH - this.game.camera.y,
                this.width * PARAMS.BLOCKWIDTH, this.height * PARAMS.BLOCKWIDTH);
        if (PARAMS.DEBUG) {
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y - this.game.camera.y, this.BB.width, this.BB.height);
        }
    };
};

class Laser {
    constructor(game, x, y, length, levelHeight, vertical, on, flicker = false) {
        Object.assign(this, { game, x, length, levelHeight, vertical, on, flicker});

        this.y = PARAMS.CANVAS_HEIGHT/PARAMS.BLOCKWIDTH - (this.levelHeight - y);
        
        this.flickerTimer = 0;

        this.spritesheet = ASSET_MANAGER.getAsset("./laser.png");

        if (this.vertical) {
            this.BB = new BoundingBox(this.x * PARAMS.BLOCKWIDTH + 12, this.y * PARAMS.BLOCKWIDTH, 8, this.length * PARAMS.BLOCKWIDTH);
        } else {
            this.BB = new BoundingBox(this.x * PARAMS.BLOCKWIDTH, this.y * PARAMS.BLOCKWIDTH + 12, this.length * PARAMS.BLOCKWIDTH, 8);
        }
    };

    update() {
        if (this.flicker) {
            this.flickerTimer += this.game.clockTick;

            if (this.flickerTimer > 2) {
                this.flickerTimer = 0;
                this.on = !this.on;
            }
        }
    };

    draw(ctx) {

        if (this.on) {
            if (this.vertical) {
                for (var i = 0; i < this.length; i++) {
                    ctx.drawImage(this.spritesheet, 0, 0, 31, 32, 
                        this.x * PARAMS.BLOCKWIDTH - this.game.camera.x, (this.y + i)*PARAMS.BLOCKWIDTH - this.game.camera.y, 
                        PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH);
                }
            } else {
                for (var i = 0; i < this.length; i++) {
                    ctx.drawImage(this.spritesheet, 32, 0, 32, 31, 
                        (this.x + i)* PARAMS.BLOCKWIDTH - this.game.camera.x, this.y*PARAMS.BLOCKWIDTH - this.game.camera.y, 
                        PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH);
                }
            }
        }
        
        if (PARAMS.DEBUG) {
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y - this.game.camera.y, this.BB.width, this.BB.height);
        }
    };
};

class Key {
    constructor(game, x, y, levelHeight, code) {
        Object.assign(this, { game, x, levelHeight, code });

        this.y = PARAMS.CANVAS_HEIGHT/PARAMS.BLOCKWIDTH - (this.levelHeight - y);

        this.spritesheet = ASSET_MANAGER.getAsset("./key.png");

        this.BB = new BoundingBox(this.x * PARAMS.BLOCKWIDTH, this.y * PARAMS.BLOCKWIDTH, 64, 64);
    };

    update() {

    };

    draw(ctx) {

        ctx.drawImage(this.spritesheet, 0,0, 256, 256, 
            this.x * PARAMS.BLOCKWIDTH - this.game.camera.x, this.y * PARAMS.BLOCKWIDTH - this.game.camera.y, 
            64, 64);

    };
};

class Lever {
    constructor(game, x, y, width, height, levelHeight) {
        Object.assign(this, { game, x, width, height, levelHeight });

        this.y = PARAMS.CANVAS_HEIGHT/PARAMS.BLOCKWIDTH - (this.levelHeight - y);

        this.spritesheet = ASSET_MANAGER.getAsset("./iron_block.png");

        this.BB = new BoundingBox(this.x * PARAMS.BLOCKWIDTH, this.y * PARAMS.BLOCKWIDTH, this.width * PARAMS.BLOCKWIDTH, this.height * PARAMS.BLOCKWIDTH);
    };

    update() {
    };

    draw(ctx) {

        let wBrickCount = this.width;
        let hBrickCount = this.height;
        for (var i = 0; i < wBrickCount; i++) {
            for (var j = 0; j < hBrickCount; j++) {
                ctx.drawImage(this.spritesheet, 0,0, 362, 362, (this.x + i) * PARAMS.BLOCKWIDTH - this.game.camera.x, (this.y + j)*PARAMS.BLOCKWIDTH - this.game.camera.y, PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH);
            }
        }
        if (PARAMS.DEBUG) {
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x- this.game.camera.x, this.BB.y - this.game.camera.y, this.BB.width, this.BB.height);
        }


        // ctx.drawImage(this.spritesheet, 48,228, 300,72, this.x, this.y - this.game.camera.y, this.width * PARAMS.BLOCKWIDTH, this.height);
        // if (PARAMS.DEBUG) {
        //     ctx.strokeStyle = 'Red';
        //     ctx.strokeRect(this.BB.x, this.BB.y - this.game.camera.y, this.BB.width, this.BB.height);
        // }
    };
};
