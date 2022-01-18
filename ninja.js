class Ninja {
    constructor(game) {
        this.game = game;
        this.animator = new Animator(ASSET_MANAGER.getAsset("./spritesheet.png"), 80, 0, 80, 80, 8, 0.1);  // 8 total frames

        this.x = 0;
        this.y = 688;
        this.speed = 80;
    };

    update() {
        this.x += this.speed * this.game.clockTick;
    };

    draw(ctx) {
        this.animator.drawFrame(this.game.clockTick, ctx, this.x, this.y, 1);
    };

}

class NinjaCrouch {
    constructor(game) {
        this.game = game;
        this.animator = new Animator(ASSET_MANAGER.getAsset("./spritesheet.png"), 400, 80, 80, 80, 7, 0.1);  // 5 total frames

        this.x = 0;
        this.y = 60;
        this.speed = 20;
    };

    update() {
        this.x += this.speed * this.game.clockTick;
    };

    draw(ctx) {
        this.animator.drawFrame(this.game.clockTick, ctx, this.x, this.y, 2);
    };

}

class NinjaLookUp {
    constructor(game) {
        this.game = game;
        this.animator = new Animator(ASSET_MANAGER.getAsset("./spritesheet.png"), 0, 640, 80, 80, 7, 0.1);  // 7 total frames

        this.x = 300;
        this.y = 300;
        this.speed = 0;
    };

    update() {
        this.x += this.speed * this.game.clockTick;
    };

    draw(ctx) {
        this.animator.drawFrame(this.game.clockTick, ctx, this.x, this.y, 1);
    };

}

