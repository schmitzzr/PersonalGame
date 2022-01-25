class Ninja {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y });
        //this.animator = new Animator(ASSET_MANAGER.getAsset("./spritesheet.png"), 80, 0, 80, 80, 8, 0.1);  // 8 total frames

        this.speed = 50;

        this.facing = 0;
        this.state = 0; // 0 = idle (looking up and down), 1 = walking, 2 = crawling, 3 = jumping

        this.left = false;
        this.right = false;
        this.jump = false;
        this.doublejump = false;

        this.velocity = { x: 0, y: 0 };
        this.fallAcc = 562.5;

        this.updateBB();

        // ninja's animations
        this.animations = [];
        this.loadAnimations();

    };

    loadAnimations() {
        for (var i = 0; i < 4; i++) {  // 4 states
            this.animations.push([]);
            for (var j = 0; j < 2; j++) {  // two directions
                this.animations[i].push([]);
            }
        }
        
        // idle look up -> state = 0
        this.animations[0][0] = new Animator(ASSET_MANAGER.getAsset("./spritesheet.png"), 0, 640, 80, 80, 7, 0.2, 0, false, true);

        // walking -> state = 1
        this.animations[1][0] = new Animator(ASSET_MANAGER.getAsset("./spritesheet.png"), 80, 0, 80, 80, 8, 0.1, 0, false, true);
        
        // crawling -> state = 2
        this.animations[2][0] = new Animator(ASSET_MANAGER.getAsset("./spritesheet.png"), 400, 80, 80, 80, 7, 0.1, 0, false, true);

        // idle jump because no animation yet -> state = 3
        this.animations[3][0] = new Animator(ASSET_MANAGER.getAsset("./spritesheet.png"), 560, 320, 80, 80, 1, 0.1, 0, false, true);

        // idle jump because no animation yet -> state = 3, facing = 1
        this.animations[3][1] = new Animator(ASSET_MANAGER.getAsset("./spritesheet.png"), 1520, 320, 80, 80, 1, 0.1, 0, false, true);

        // idle look up -> state = 0, facing = 1
        this.animations[0][1] = new Animator(ASSET_MANAGER.getAsset("./spritesheet.png"), 1520, 640, 80, 80, 7, 0.2, 0, true, true);

        // walking left -> state = 1, facing = 1
        this.animations[1][1] = new Animator(ASSET_MANAGER.getAsset("./spritesheet.png"), 1360, 0, 80, 80, 8, 0.1, 0, true, true);

        // crawling left -> state = 2, facing = 1
        this.animations[2][1] = new Animator(ASSET_MANAGER.getAsset("./spritesheet.png"), 1120, 80, 80, 80, 7, 0.1, 0, true, true);
        
    };

    updateBB() {
        this.lastBB = this.BB;
        
        if (this.state == 2) {
            this.BB = new BoundingBox(this.x + 20, this.y + 36, 40, 36)
        } else { 
            this.BB = new BoundingBox(this.x + 30, this.y + 10, 20, 62);   
        }
    };


    update() {

        this.left = (this.game.keys["a"] || this.game.keys["ArrowLeft"]);
        this.right = (this.game.keys["d"] || this.game.keys["ArrowRight"]);
        this.jump = this.game.keys["w"] ||  this.game.keys[" "] || this.game.keys["ArrowUp"];

        const TICK = this.game.clockTick;

        const MIN_WALK = 25;
        const MAX_WALK = 500;
        const MAX_CRAWL = 25;
        //const MAX_RUN = 153.75;
        const ACC_WALK = 250;
        //const ACC_RUN = 200.390625;
        const ACC_CRAWL = 37.5;
        const DEC_REL = 1000;
        const DEC_SKID = 365.625;
        const MIN_SKID = 33.75;

        const STOP_FALL = 1575;
        const WALK_FALL = 1800;
        //const RUN_FALL = 2025;
        //const STOP_FALL_A = 450;
        //const WALK_FALL_A = 421.875;
        //const RUN_FALL_A = 562.5;

        const MAX_FALL = 1000;

        if(this.state != 3) {
            
            if (Math.abs(this.velocity.x) < MIN_WALK) {
                this.velocity.x = 0;
                this.state = 0;
                if (this.left) {
                    this.velocity.x -= MIN_WALK;
                }
                if (this.right) {
                    this.velocity.x += MIN_WALK;
                }
            }

            else if (Math.abs(this.velocity.x) >= MIN_WALK) {
                if (this.facing == 0) {
                    if (this.right && !this.left) { // walking right
                        if (this.game.keys["s"]) {
                            this.velocity.x += ACC_CRAWL * TICK;
                        } else this.velocity.x += ACC_WALK * TICK; 
                    } else this.velocity.x -= DEC_REL * TICK;
                }
                if (this.facing == 1) {
                    if (this.left && !this.right) { // walking right
                        if (this.game.keys["s"]) {
                            this.velocity.x -= ACC_CRAWL * TICK;
                        } else this.velocity.x -= ACC_WALK * TICK;
                    } else this.velocity.x += DEC_REL * TICK;
                }
            }

            if (this.jump) {
                if (Math.abs(this.velocity.x) < 16) {
                    this.velocity.y = -1200;
                    this.fallAcc = STOP_FALL;
                }
                else {
                    this.velocity.y = -1200;
                    this.fallAcc = WALK_FALL;
                }
                this.doublejump = true;
                this.state = 3;
            }
            
        } else {
            if (this.right && !this.left) {
                this.velocity.x += ACC_WALK * TICK;
            } else if (this.left && !this.right) {
                this.velocity.x -= ACC_WALK * TICK;
            } else {
                // do nothing
            }
        }

        this.velocity.y += this.fallAcc * TICK; 


        // max speed calculation
        if (this.velocity.y >= MAX_FALL) this.velocity.y = MAX_FALL;
        if (this.velocity.y <= -MAX_FALL) this.velocity.y = -MAX_FALL;

        if (this.velocity.x >= MAX_CRAWL && this.game.keys["s"]) this.velocity.x = MAX_CRAWL;
        if (this.velocity.x <= -MAX_CRAWL && this.game.keys["s"]) this.velocity.x = -MAX_CRAWL;
        if (this.velocity.x >= MAX_WALK) this.velocity.x = MAX_WALK;
        if (this.velocity.x <= -MAX_WALK) this.velocity.x = -MAX_WALK;

        //update position
        this.x += this.velocity.x * TICK * PARAMS.SCALE;
        this.y += this.velocity.y * TICK * PARAMS.SCALE;

        this.updateBB();

        // collision
        var that = this;
        this.game.entities.forEach(function (entity) {
            if (entity.BB && that.BB.collide(entity.BB)) {
                if (that.velocity.y > 0) { // falling
                    if ((entity instanceof Ground || entity instanceof Platform ) // landing
                        && (that.lastBB.bottom) <= entity.BB.top) { // was above last tick
                        that.y = entity.BB.top - 72;
                        that.velocity.y === 0;

                        if(that.state === 3) that.state = 0; // set state to idle
                        that.updateBB();
                    }
                    else if ((entity instanceof Border || entity instanceof Platform) // hit side
                        && (((that.lastBB.left) >= entity.BB.right) || ((that.lastBB.right) >= entity.BB.left))) { // was below last tick                     
                        that.velocity.x = 0;
                    }
                }
                if (that.velocity.y <= 0) { // jumping or walking
                    if ((entity instanceof Platform) // hit ceiling
                        && ((that.lastBB.top) >= entity.BB.bottom)) { // was below last tick                     
                        that.velocity.y = 0;
                    }
                    else if ((entity instanceof Platform || entity instanceof Border) // hit side
                        && (((that.lastBB.left) >= entity.BB.right) || ((that.lastBB.right) >= entity.BB.left))) { // was below last tick                     
                        that.velocity.x = 0;
                    }
                }
            }
        });

        // update state
        if (this.state !== 3) {
            if (this.game.keys["s"]) this.state = 2;
            else if (Math.abs(this.velocity.x) >= MIN_WALK) this.state = 1;
            else this.state = 0;
        } else {

        }

        // update direction
        if (this.velocity.x < 0) this.facing = 1;
        if (this.velocity.x > 0) this.facing = 0;

        //console.log("y =", this.y);

    };
    
    draw(ctx) {
        this.animations[this.state][this.facing].drawFrame(this.game.clockTick, ctx, this.x, this.y - this.game.camera.y, 1);
        if (PARAMS.DEBUG) {
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x, this.BB.y -this.game.camera.y, this.BB.width, this.BB.height);
        }
    };

};


