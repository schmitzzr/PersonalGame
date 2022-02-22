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
        this.crawl = false;
        this.interact = false;
        this.doublejump = false;

        this.velocity = { x: 0, y: 0 };
        this.fallAcc = 562.5;

        this.vOffset = 8;
        this.hOffset = 24;
        this.idleClock = 0;

        this.caught = false;

        this.stayCrawling = false;

        this.spritesheet = ASSET_MANAGER.getAsset("./spritesheet.png");

        this.updateBB();

        // ninja's animations
        this.animations = [];
        this.loadAnimations();
    };

    loadAnimations() {
        for (var i = 0; i < 5; i++) {  // 5 states
            this.animations.push([]);
            for (var j = 0; j < 2; j++) {  // two directions
                this.animations[i].push([]);
            }
        }
        
        // idle look up -> state = 0
        this.animations[0][0] = new Animator(this.spritesheet, 0, 640, 80, 80, 7, 0.2, 0, false, true);

        this.animations[0][1] = new Animator(this.spritesheet, 1520, 640, 80, 80, 7, 0.2, 0, true, true);

        // walking -> state = 1
        this.animations[1][0] = new Animator(this.spritesheet, 80, 0, 80, 80, 8, 0.1, 0, false, true);

        this.animations[1][1] = new Animator(this.spritesheet, 1360, 0, 80, 80, 8, 0.1, 0, true, true);
        
        // crawling -> state = 2
        this.animations[2][0] = new Animator(this.spritesheet, 400, 80, 80, 80, 7, 0.1, 0, false, true);

        this.animations[2][1] = new Animator(this.spritesheet, 1120, 80, 80, 80, 7, 0.1, 0, true, true);

        // idle jump because no animation yet -> state = 3
        this.animations[3][0] = new Animator(this.spritesheet, 560, 320, 80, 80, 1, 0.1, 0, false, true); // facing = 0

        this.animations[3][1] = new Animator(this.spritesheet, 1440, 320, 80, 80, 1, 0.1, 0, true, true); // facing = 1


        // dead -> state = 4
        this.animations[4][0] = new Animator(this.spritesheet, 880, 720, 80, 80, 1, 0.1, 0, false, true);

        this.animations[4][1] = new Animator(this.spritesheet, 1120, 720, 80, 80, 1, 0.1, 0, false, true);
        
        
    };

    updateBB() {

        this.lastBB = this.BB;
        
        if (this.state == 2) {
            this.BB = new BoundingBox(this.x + this.hOffset, this.y + this.vOffset + PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH) //32x32 hitbox
        } else { 
            this.BB = new BoundingBox(this.x + this.hOffset, this.y + this.vOffset, PARAMS.BLOCKWIDTH, 2*PARAMS.BLOCKWIDTH); //32x64 hitbox
        }
    };


    update() {

        const V_OFFSET = this.vOffset;
        const H_OFFSET = this.hOffset;

        this.left = (this.game.keys["a"] || this.game.keys["ArrowLeft"]);
        this.right = (this.game.keys["d"] || this.game.keys["ArrowRight"]);
        this.jump = this.game.keys["w"] ||  this.game.keys[" "] || this.game.keys["ArrowUp"];
        this.crawl = (this.game.keys["s"] || this.game.keys["S"] || this.game.keys["ArrowDown"]);
        this.interact = (this.game.keys["e"] || this.game.keys["E"]);

        const TICK = this.game.clockTick;

        const MIN_WALK = 25;
        const MAX_WALK = 250;
        const MAX_CRAWL = 60;

        const ACC_WALK = 750;

        const ACC_CRAWL = 37.5;
        const DEC_REL = 2000;

        const STOP_FALL = 2200;
        const WALK_FALL = 2100;


        const MAX_FALL = 900;

        if(this.caught) {
            this.velocity.x = 0;
        } else {
            if(this.state < 3) {
                
                if (Math.abs(this.velocity.x) < MIN_WALK) {
                    this.velocity.x = 0;
                    //this.state = 0;
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
                            if (this.crawl) {
                                this.velocity.x += ACC_CRAWL * TICK;
                            } else this.velocity.x += ACC_WALK * TICK; 
                        } else this.velocity.x -= DEC_REL * TICK;
                    }
                    if (this.facing == 1) {
                        if (this.left && !this.right) { // walking right
                            if (this.crawl) {
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
        }

        this.velocity.y += this.fallAcc * TICK; 


        // max speed calculation
        if (this.velocity.y >= MAX_FALL) this.velocity.y = MAX_FALL;
        if (this.velocity.y <= -MAX_FALL) this.velocity.y = -MAX_FALL;

        if (this.velocity.x >= MAX_CRAWL && (this.crawl || this.stayCrawling)) this.velocity.x = MAX_CRAWL;
        if (this.velocity.x <= -MAX_CRAWL && (this.crawl || this.stayCrawling)) this.velocity.x = -MAX_CRAWL;
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
                        that.y = entity.BB.top - V_OFFSET - 2*PARAMS.BLOCKWIDTH;
                        that.velocity.y = 0;

                        if(that.state === 3) that.state = 0; // set state to idle
                        that.updateBB();
                    }
                    else if (( entity instanceof Platform) // hit side
                        && (((that.lastBB.left) >= entity.BB.right) || ((that.lastBB.right) >= entity.BB.left))) { // was below last tick                     
                        if (that.velocity.x < 0) that.x = entity.BB.right - H_OFFSET; // move out of collision
                        else if (that.velocity.x >= 0) that.x = entity.BB.left - H_OFFSET - PARAMS.BLOCKWIDTH; // move out of collision
                        that.velocity.x = 0;
                    }
                }
                else if (that.velocity.y <= 0) { // jumping or walking
                    if ((entity instanceof Platform) // hit ceiling
                        && ((that.lastBB.top) >= entity.BB.bottom)) { // was below last tick                     
                        that.velocity.y = 0;
                        that.y = entity.BB.bottom - V_OFFSET;

                    }
                    else if ((entity instanceof Platform) // hit side
                        && (((that.lastBB.left) >= entity.BB.right) || ((that.lastBB.right) >= entity.BB.left))) { // was below last tick                     
                        if (that.velocity.x < 0) that.x = entity.BB.right - H_OFFSET; // move out of collision
                        else if (that.velocity.x >= 0) that.x = entity.BB.left - H_OFFSET - PARAMS.BLOCKWIDTH; // move out of collision
                        that.velocity.x = 0;
                    }
                }
                if (entity instanceof Light) { // hit light
                    that.caught = true;
                    console.log("caught status:", that.caught);
                }
                if ((entity instanceof Border) // hit side of canvas
                    && (((that.lastBB.left) >= entity.BB.right) || ((that.lastBB.right) >= entity.BB.left))) { // was below last tick                     
                    if (that.velocity.x < 0) that.x = entity.BB.right - H_OFFSET; // move out of collision
                    else if (that.velocity.x >= 0) that.x = entity.BB.left - H_OFFSET - PARAMS.BLOCKWIDTH; // move out of collision
                    that.velocity.x = 0;
                }
            }
        });

        if (!this.crawl && this.state === 2) {
            this.state = 1;
            this.updateBB();
            this.stayCrawling = false;

            this.game.entities.forEach(function (entity) {
                if ((entity instanceof Platform)
                    && (entity.BB && that.BB.collide(entity.BB))) {
                    that.state = 2;
                    that.stayCrawling = true;
                } 
            });
        } 

        // update state
        if (this.state !== 3) {
            if (this.crawl || this.stayCrawling) this.state = 2;
            else if (Math.abs(this.velocity.x) >= MIN_WALK) this.state = 1;
            else if (this.caught) this.state = 4;
            else this.state = 0;
        } 

        // update direction
        if (this.velocity.x < 0) this.facing = 1;
        if (this.velocity.x > 0) this.facing = 0;

        //console.log("y =", this.y);

    };
    
    draw(ctx) {
        this.animations[this.state][this.facing].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y - this.game.camera.y, 1);
        if (PARAMS.DEBUG) {
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y -this.game.camera.y, this.BB.width, this.BB.height);
        }
    };

};


