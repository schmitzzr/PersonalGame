class SceneManager {
    constructor(game) {
        this.game = game;
        this.game.camera = this; //direct reference in game engine. //grab main or camera if needed. 
        this.y = 0;
        this.x = 0;

        //might be better for main character... //main character properties. 
        this.score = 0;
        this.lives = 3;

        this.title = true;
        this.level = null;
        this.levelLabel = null;

        this.ninja = new Ninja(game, 25, PARAMS.CANVAS_HEIGHT);

        this.levelLoaded = false;

        //this.loadLevelOne(3 * PARAMS.BLOCKWIDTH, 3 * PARAMS.BLOCKWIDTH, false, true);

    };

    clearEntities() {
        this.game.entities.forEach(function (entity) {
            entity.removeFromWorld = true;
        });
    }

    loadLevel(level, x, y, transition, title) {
        this.title = title;
        this.clearEntities();
        switch(level) {
            case 1: 
                this.levelLabel = "BREAKING AND ENTERING";
                break;
            default: this.levelLabel = "UNTITLED";
        }

        if (transition) {
            this.game.addEntity(new TransitionScreen(this.game, level, x, y, title));
        } else {
            switch(level) {
                case 1: 
                    this.loadLevelOne(x, y, title);
                    break;
                default: this.loadLevelOne(x, y, title);
            }
        }
        
        
    }

    loadLevelOne(x, y, title) { //less important is loaded first, then mains. 
        
        this.title = title;
        this.clearEntities();
        //this.x = 0;

        const LEVEL_ONE_HEIGHT = PARAMS.BLOCKWIDTH;
        const LEVEL_ONE_WIDTH = PARAMS.BLOCKWIDTH * 4;

        //music
        if (!this.ninja.caught) ASSET_MANAGER.playAsset("./music/HighClassHeist.mp3");
        else {
            ASSET_MANAGER.pauseBackgroundMusic();
            ASSET_MANAGER.playAsset("./music/LastCall.mp3");
        }

        //borders
        this.game.addEntity(new Platform(this.game, 0, 0, LEVEL_ONE_WIDTH, 1, LEVEL_ONE_HEIGHT));
        this.game.addEntity(new Platform(this.game, 0, 15, LEVEL_ONE_WIDTH, 2, LEVEL_ONE_HEIGHT));
        this.game.addEntity(new Platform(this.game, 0, 31, LEVEL_ONE_WIDTH, 1, LEVEL_ONE_HEIGHT));
        this.game.addEntity(new Platform(this.game, 0, 0, 1, LEVEL_ONE_HEIGHT, LEVEL_ONE_HEIGHT));
        this.game.addEntity(new Platform(this.game, LEVEL_ONE_WIDTH - 1, 0, 1, LEVEL_ONE_HEIGHT, LEVEL_ONE_HEIGHT));

        //platforms
        this.game.addEntity(new Platform(this.game, 1, 10, 1, 1, LEVEL_ONE_HEIGHT));
        this.game.addEntity(new Platform(this.game, 5, 1, 14, 1, LEVEL_ONE_HEIGHT));
        this.game.addEntity(new Platform(this.game, 11, 2, 2, 1, LEVEL_ONE_HEIGHT));
        this.game.addEntity(new Platform(this.game, 4, 4, 16, 1, LEVEL_ONE_HEIGHT));
        
        //lights
        this.game.addEntity(new Light(this.game, 7, 5, 10, LEVEL_ONE_HEIGHT));
        this.game.addEntity(new Light(this.game, 14, 5, 10, LEVEL_ONE_HEIGHT));


        
        // borders
        //this.game.addEntity(new Border(this.game, 0, PARAMS.CANVAS_HEIGHT - LEVEL_HEIGHT, PARAMS.BLOCKWIDTH, LEVEL_HEIGHT));
        //this.game.addEntity(new Border(this.game, PARAMS.CANVAS_WIDTH - PARAMS.BLOCKWIDTH, PARAMS.CANVAS_HEIGHT - LEVEL_HEIGHT, PARAMS.BLOCKWIDTH, LEVEL_HEIGHT));

	    this.game.addEntity(new Ground(this.game, 0, PARAMS.CANVAS_HEIGHT, PARAMS.CANVAS_WIDTH));

        this.ninja.x = x;
        this.ninja.y = y;
        this.game.addEntity(this.ninja);
	    //this.game.addEntity(new Background(this.game, 0, 0));

        //this.game.addEntity(new Background(this.game, 0, 0, LEVEL_ONE_WIDTH, LEVEL_ONE_HEIGHT, LEVEL_ONE_HEIGHT));
        this.game.addEntity(new MainBackground(this.game, 0, 0, LEVEL_ONE_WIDTH, LEVEL_ONE_HEIGHT, LEVEL_ONE_HEIGHT));
        this.game.addEntity(new DistantBackground(this.game, 0, 0, LEVEL_ONE_HEIGHT));
    };

    updateAudio() {
        var mute = document.getElementById("mute").checked;
        var volume = document.getElementById("volume").value;

        ASSET_MANAGER.muteAudio(mute);
        ASSET_MANAGER.adjustVolume(volume);

    };

    update() { //I want the screen to follow the ninja up and down 

        if (this.game.gamepad != null && this.game.gamepad.buttons[8].pressed && this.menuButtonTimer > this.menuButtonCooldown) {
            if (document.getElementById("debug").checked) {
                document.getElementById("debug").checked = false;
            } else {
                document.getElementById("debug").checked = true;
            }
            this.menuButtonTimer = 0;
        }

        // Gamepad control of debug
        if (this.game.gamepad != null && this.game.gamepad.buttons[9].pressed && this.menuButtonTimer > this.menuButtonCooldown) {
            if (document.getElementById("mute").checked) {
                document.getElementById("mute").checked = false;
            } else {
                document.getElementById("mute").checked = true;
            }
            this.menuButtonTimer = 0;
        }

        // Gamepad control of volume slider
        if (this.game.gamepad != null && Math.abs(this.game.gamepad.axes[2]) > 0.3 && this.menuButtonTimer > this.menuButtonCooldown) {
            if (this.game.gamepad.axes[2] > 0.3) {
                document.getElementById("volume").value = parseFloat(document.getElementById("volume").value, 10) + 0.05;
            } 
            if (this.game.gamepad.axes[2] < -0.3) {
                document.getElementById("volume").value -= 0.05;
            }
            this.menuButtonTimer = 0;
        } 

        this.updateAudio();
        PARAMS.DEBUG = document.getElementById("debug").checked;

        if (this.game.click && this.game.click.y > 14 * PARAMS.BLOCKWIDTH && this.game.click.y < 14.5 * PARAMS.BLOCKWIDTH) {
            this.title = false;
            if (!this.levelLoaded) {
                this.levelLoaded = true;
                this.ninja = new Ninja(this.game, 3*PARAMS.BLOCKWDITH, 3*PARAMS.BLOCKWIDTH);
                this.loadLevel(1, 3 * PARAMS.BLOCKWIDTH, 3 * PARAMS.BLOCKWIDTH, true, false);
            }
        }

        let midpoint = {x : PARAMS.CANVAS_WIDTH / 2, y: PARAMS.CANVAS_HEIGHT / 2};

        this.y = this.ninja.y - midpoint.y - 3 * PARAMS.BLOCKWIDTH;
        this.x = this.ninja.x - midpoint.y + 4 * PARAMS.BLOCKWIDTH;

    };

    draw(ctx){
        ctx.font = PARAMS.BLOCKWIDTH + 'px "Press Start 2P"';
        ctx.fillStyle = "Black";
        
        if(this.title) {
            ctx.drawImage(ASSET_MANAGER.getAsset("./title_screen.png"), 0, 0, 1024, 768);
            if ((this.game.mouse && this.game.mouse.y > 14 * PARAMS.BLOCKWIDTH && this.game.mouse.y < 14.5 * PARAMS.BLOCKWIDTH)) {
                ctx.fillStyle = "Blue";
                ctx.fillText("START", 14 * PARAMS.BLOCKWIDTH, 14.5*PARAMS.BLOCKWIDTH);
            }
            ctx.fillText("START", 14 * PARAMS.BLOCKWIDTH, 14.5*PARAMS.BLOCKWIDTH);
        }
    }; 
};