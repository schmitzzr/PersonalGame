class TextBox {
    constructor(game, message) {
        Object.assign(this, { game, message });

        this.spritesheet = ASSET_MANAGER.getAsset("./text_box.png");

        this.timer = 0;

    };

    update() {
        this.timer += this.game.clockTick;
        if (this.timer > 3) {
            this.removeFromWorld = true;
        }
    };

    draw(ctx) {

        ctx.drawImage(this.spritesheet, 0, 0, 550, 150, 237, 600, 550, 150);

        ctx.fillStyle = "black";
        ctx.font = PARAMS.BLOCKWIDTH * 0.4 + 'px "Press Start 2P"';
        ctx.textAlign = "center";

        if (this.message === "needKey") {
            ctx.fillText("I need a key to unlock this door.", 16 * PARAMS.BLOCKWIDTH, 675);
        }

    };
};