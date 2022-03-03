class Platform {
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

class Door {
    constructor(game, x, y, width, height, levelHeight, closed = true, key = null) {
        Object.assign(this, { game, x, width, height, levelHeight, closed, key });

        this.y = PARAMS.CANVAS_HEIGHT/PARAMS.BLOCKWIDTH - (this.levelHeight - y);

        this.spritesheet = ASSET_MANAGER.getAsset("./door_block.png");

        this.updateBB();
    };

    updateBB() {
        this.lastBB = this.BB;
        if (this.closed) {
            this.BB = new BoundingBox(this.x * PARAMS.BLOCKWIDTH, this.y * PARAMS.BLOCKWIDTH, this.width * PARAMS.BLOCKWIDTH, this.height * PARAMS.BLOCKWIDTH);
        } else {
            this.BB = null;
        }
    }

    update() {
        this.updateBB();
    };

    draw(ctx) {

        if (this.closed) {
            let wBrickCount = this.width;
            let hBrickCount = this.height;
            for (var i = 0; i < wBrickCount; i++) {
                for (var j = 0; j < hBrickCount; j++) {
                    ctx.drawImage(this.spritesheet, 0,0, 362, 362, (this.x + i) * PARAMS.BLOCKWIDTH - this.game.camera.x, (this.y + j)*PARAMS.BLOCKWIDTH - this.game.camera.y, PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH);
                }
            }
        } 

        if (PARAMS.DEBUG) {
            if (this.BB != null) {
                ctx.strokeStyle = 'Red';
                ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y - this.game.camera.y, this.BB.width, this.BB.height);
            }
        }

    };
};

class LockedDoor {
    constructor(game, x, y, levelHeight, closed = true, key = null) {
        Object.assign(this, { game, x, levelHeight, closed, key });

        this.y = PARAMS.CANVAS_HEIGHT/PARAMS.BLOCKWIDTH - (this.levelHeight - y);

        this.width = 2;
        this.height = 4;

        this.spritesheet = ASSET_MANAGER.getAsset("./locked_door.png");

        this.openBB = new BoundingBox((this.x - 1) * PARAMS.BLOCKWIDTH, (this.y - 1)* PARAMS.BLOCKWIDTH, (this.width + 2)* PARAMS.BLOCKWIDTH, (this.height + 2) * PARAMS.BLOCKWIDTH);

        this.updateBB();
    };

    updateBB() {
        this.lastBB = this.BB;
        if (this.closed) {
            this.BB = new BoundingBox(this.x * PARAMS.BLOCKWIDTH, this.y * PARAMS.BLOCKWIDTH, this.width * PARAMS.BLOCKWIDTH, this.height * PARAMS.BLOCKWIDTH);
        } else {
            this.BB = null;
        }
    }

    update() {
        this.updateBB();

        var that = this;
        this.game.entities.forEach(function (entity) {
            if(entity.BB && that.openBB.collide(entity.BB)) {
                if(entity.interact && that.closed && entity.hasKey) {
                    if (that.key && entity.key === that.key) {
                        that.closed = false;
                        entity.key = null;
                        entity.hasKey = false;
                        that.game.camera.textBox = true;
                        that.game.camera.message = "It's unlocked!";
                    } else {
                        that.game.camera.textBox = true;
                        that.game.camera.message = "This key doesn't fit.";
                    }
                } else if (entity.interact && that.closed && !entity.hasKey) {
                    that.game.camera.textBox = true;
                    that.game.camera.message = "I need a key to unlock this door.";
                }
            }
        });

    };

    draw(ctx) {

        if (this.closed) {
            ctx.drawImage(this.spritesheet, 0,0, 64, 128, this.x* PARAMS.BLOCKWIDTH - this.game.camera.x, this.y*PARAMS.BLOCKWIDTH - this.game.camera.y, 64, 128);
        } 

        if (PARAMS.DEBUG) {
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x- this.game.camera.x, this.BB.y - this.game.camera.y, this.BB.width, this.BB.height);
            
            ctx.strokeStyle = 'Green';
            ctx.strokeRect(this.openBB.x- this.game.camera.x, this.openBB.y - this.game.camera.y, this.openBB.width, this.openBB.height);
        }

    };
};