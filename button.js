class Button {
    constructor(game, x, y, levelHeight, on, link1, link2 = null, link3 = null, link4 = null) {
        Object.assign(this, { game, x, levelHeight, on, link1, link2, link3, link4 });

        this.y = PARAMS.CANVAS_HEIGHT/PARAMS.BLOCKWIDTH - (this.levelHeight - y);

        this.width = 48;
        this.height = 48;

        this.timeout = false;
        this.countdown = 0;

        this.spritesheet = ASSET_MANAGER.getAsset("./button.png");

        this.BB = new BoundingBox(this.x * PARAMS.BLOCKWIDTH, this.y * PARAMS.BLOCKWIDTH, this.width, this.height);

    };

    update() {

        const links = [this.link1, this.link2, this.link3, this.link4];
        
        if (this.countdown == 0) {
            this.timeout = false;
        } else {
            this.timeout = true;
            this.countdown -= 1;
        }

        var that = this;

        links.forEach(function(link) {
            if (link != null) {
                if (that.on) {
                    if (link instanceof Light) {
                        link.on = true;
                    } else if (link instanceof Door) {
                        link.closed = true;
                    } else if (link instanceof Laser) {
                        link.flicker = false;
                    }
                } else {
                    if (link instanceof Light) {
                        link.on = false;
                    } else if (link instanceof Door) {
                        link.closed = false;
                    } else if (link instanceof Laser) {
                        link.flicker = true;
                    }
                }
            }          
        });

        this.game.entities.forEach(function (entity) {
            if(entity.BB && that.BB.collide(entity.BB)) {
                if(entity.interact && !that.timeout) {
                    that.on = !that.on;
                    that.countdown = 50;
                }
            }
        });


    };

    draw(ctx) {

        if (this.on) {
            ctx.drawImage(this.spritesheet, 32, 0, 32, 32, 
                this.x * PARAMS.BLOCKWIDTH - this.game.camera.x, this.y *PARAMS.BLOCKWIDTH - this.game.camera.y, 
                this.width, this.height);
        } else {
            ctx.drawImage(this.spritesheet, 0, 0, 32, 32, 
                this.x * PARAMS.BLOCKWIDTH - this.game.camera.x, this.y *PARAMS.BLOCKWIDTH - this.game.camera.y, 
                this.width, this.height);
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