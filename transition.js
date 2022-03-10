class TransitionScreen {
    constructor(game, level, gameOver) {
        Object.assign(this, { game, level, gameOver });

        this.elapsed = 0;
    };

    update() {
        this.elapsed += this.game.clockTick;

        if (this.elapsed > 2) this.game.camera.loadLevel(this.level, false, this.gameOver);
    };

    draw(ctx) {
        ctx.fillStyle = "Black";
        ctx.fillRect(0, 0, PARAMS.CANVAS_WIDTH, PARAMS.CANVAS_HEIGHT);
        ctx.textAlign = "center";

        ctx.font = PARAMS.BLOCKWIDTH + 'px "Press Start 2P"';
        ctx.fillStyle = "White";

        
        if (this.gameOver) {
            ctx.fillText("GAME OVER", 16 * PARAMS.BLOCKWIDTH, 16 * PARAMS.BLOCKWIDTH);
        } else {
            ctx.fillText("LEVEL " + this.level, 16* PARAMS.BLOCKWIDTH, 10* PARAMS.BLOCKWIDTH);
            ctx.fillText(this.game.camera.levelLabel, 16 * PARAMS.BLOCKWIDTH, 13 * PARAMS.BLOCKWIDTH);
            ctx.drawImage(ASSET_MANAGER.getAsset("./spritesheet.png"), 0, 880, 80, 80, 14 * PARAMS.BLOCKWIDTH, 14 * PARAMS.BLOCKWIDTH, 4*PARAMS.BLOCKWIDTH, 4*PARAMS.BLOCKWIDTH);
        }
    };
};

class WinningScreen {
    constructor(game, time) {
        Object.assign(this, {game, time});
    };

    update() {
    };

    draw(ctx) {
        ctx.fillStyle = "Black";
        ctx.fillRect(0, 0, PARAMS.CANVAS_WIDTH, PARAMS.CANVAS_HEIGHT);
        ctx.textAlign = "center";
        
        ctx.font = PARAMS.BLOCKWIDTH * 1.5 + 'px "Press Start 2P"';
        ctx.fillStyle = "White";

        ctx.fillText("YOU WON!", 16* PARAMS.BLOCKWIDTH, 10 * PARAMS.BLOCKWIDTH);

        ctx.font = PARAMS.BLOCKWIDTH * 0.75 + 'px "Press Start 2P"';

        ctx.fillText("TIME", 16* PARAMS.BLOCKWIDTH, 14 * PARAMS.BLOCKWIDTH);

        ctx.font = PARAMS.BLOCKWIDTH + 'px "Press Start 2P"';
        ctx.fillText(this.timerCalc(this.time), 16* PARAMS.BLOCKWIDTH, 15.5 * PARAMS.BLOCKWIDTH);

    };

    timerCalc(seconds) {
        let minutes = Math.floor(seconds / 60);
        seconds = Math.floor(seconds % 60);
        if (seconds < 10) {
            seconds = '0' + seconds;
        }
        
        return minutes + ":" + seconds;
    };
};