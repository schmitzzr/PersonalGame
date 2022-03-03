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

        this.game.ninja = new Ninja(game, 0, 0);

        this.levelLoaded = false;
        this.stopwatch = false;
        this.timer = 0;

        //this.loadLevelOne(3 * PARAMS.BLOCKWIDTH, 3 * PARAMS.BLOCKWIDTH, false, true);

        this.textBox = false;
        this.message = null;
        this.textBoxTimer = 0;

        this.deathTimer = 0;

        this.gameOver = false;

    };

    clearEntities() {
        this.game.entities.forEach(function (entity) {
            entity.removeFromWorld = true;
        });
    }

    loadLevel(level, transition, title) {
        this.title = title;
        this.clearEntities();
        switch(level) {
            case 1: 
                this.levelLabel = "BREAKING AND ENTERING";
                break;
            default: this.levelLabel = "UNTITLED";
        }

        if (transition) {
            this.game.addEntity(new TransitionScreen(this.game, level, false));
        } else {
            switch(level) {
                case 1: 
                    this.loadLevelOne();
                    this.stopwatch = true;
                    break;
                default: this.loadLevelOne();
            }
        }
        
        
    }

    loadLevelOne() { //less important is loaded first, then mains. 
        
        this.clearEntities();
        //this.x = 0;

        //this.game.addEntity(new TextBox(this.game, "needKey"));

        const LEVEL_ONE_HEIGHT = PARAMS.BLOCKWIDTH;
        const LEVEL_ONE_WIDTH = PARAMS.BLOCKWIDTH * 4;

        //music
        ASSET_MANAGER.playAsset("./music/HighClassHeist.mp3");

        //borders
        this.game.addEntity(new Platform(this.game, 0, 0, LEVEL_ONE_WIDTH, 1, LEVEL_ONE_HEIGHT));
        this.game.addEntity(new Platform(this.game, 0, 15, 11, 2, LEVEL_ONE_HEIGHT));
        this.game.addEntity(new Platform(this.game, 13, 15, LEVEL_ONE_WIDTH - 13, 2, LEVEL_ONE_HEIGHT));
        this.game.addEntity(new Platform(this.game, 0, 31, LEVEL_ONE_WIDTH, 1, LEVEL_ONE_HEIGHT));
        this.game.addEntity(new Platform(this.game, 0, 0, 1, LEVEL_ONE_HEIGHT, LEVEL_ONE_HEIGHT));
        this.game.addEntity(new Platform(this.game, LEVEL_ONE_WIDTH - 1, 0, 1, LEVEL_ONE_HEIGHT, LEVEL_ONE_HEIGHT));
        this.game.addEntity(new Platform(this.game, 25, 1, 2, 26, LEVEL_ONE_HEIGHT));

        //platforms
        this.game.addEntity(new Platform(this.game, 1, 10, 1, 1, LEVEL_ONE_HEIGHT));
        this.game.addEntity(new Platform(this.game, 5, 1, 14, 1, LEVEL_ONE_HEIGHT));
        this.game.addEntity(new Platform(this.game, 11, 2, 2, 1, LEVEL_ONE_HEIGHT));
        this.game.addEntity(new Platform(this.game, 4, 4, 16, 1, LEVEL_ONE_HEIGHT));

        this.game.addEntity(new Platform(this.game, 10, 17, 1, 10, LEVEL_ONE_HEIGHT));
        this.game.addEntity(new Platform(this.game, 13, 17, 1, 10, LEVEL_ONE_HEIGHT));
        this.game.addEntity(new Platform(this.game, 8, 26, 2, 1, LEVEL_ONE_HEIGHT));
        this.game.addEntity(new Platform(this.game, 1, 21, 5, 1, LEVEL_ONE_HEIGHT));
        this.game.addEntity(new Platform(this.game, 14, 21, 1, 1, LEVEL_ONE_HEIGHT));
        this.game.addEntity(new Platform(this.game, 14, 26, 3, 1, LEVEL_ONE_HEIGHT));


        var trapdoor = new Door(this.game, 11, 15, 2, 1, LEVEL_ONE_HEIGHT, true);
        this.game.addEntity(trapdoor);
        
        //lasers
        this.game.addEntity(new Laser(this.game, 1, 26, 7, LEVEL_ONE_HEIGHT, false, true, true));
        this.game.addEntity(new Laser(this.game, 5, 17, 4, LEVEL_ONE_HEIGHT, true, false, true));

        var laser1 = new Laser(this.game, 15, 21, 10, LEVEL_ONE_HEIGHT, false, true, false);
        var laser2 = new Laser(this.game, 17, 26, 8, LEVEL_ONE_HEIGHT, false, true, false);

        this.game.addEntity(laser1);
        this.game.addEntity(laser2);

        //lights

        var light1 = new Light(this.game, 7, 5, 10, LEVEL_ONE_HEIGHT, true);
        var light2 = new Light(this.game, 14, 5, 10, LEVEL_ONE_HEIGHT, true);

        this.game.addEntity(light1);
        this.game.addEntity(light2);

        this.game.addEntity(new Key(this.game, 14, 18, LEVEL_ONE_HEIGHT, "firstdoor"));
        this.game.addEntity(new LockedDoor(this.game, 25, 27, LEVEL_ONE_HEIGHT, true, "firstdoor"));


        
        // borders
        //this.game.addEntity(new Border(this.game, 0, PARAMS.CANVAS_HEIGHT - LEVEL_HEIGHT, PARAMS.BLOCKWIDTH, LEVEL_HEIGHT));
        //this.game.addEntity(new Border(this.game, PARAMS.CANVAS_WIDTH - PARAMS.BLOCKWIDTH, PARAMS.CANVAS_HEIGHT - LEVEL_HEIGHT, PARAMS.BLOCKWIDTH, LEVEL_HEIGHT));

        this.game.addEntity(new Ninja(this.game, 3*PARAMS.BLOCKWIDTH, 3 * PARAMS.BLOCKWIDTH));
	    
        this.game.addEntity(new Button(this.game, 23, 12, LEVEL_ONE_HEIGHT, true, light1, light2, trapdoor));
        this.game.addEntity(new Button(this.game, 2, 18, LEVEL_ONE_HEIGHT, true, laser1, laser2));

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
                //his.game.ninja = new Ninja(this.game, 3*PARAMS.BLOCKWDITH, 3*PARAMS.BLOCKWIDTH);
                this.loadLevel(1, 3 * PARAMS.BLOCKWIDTH, 3 * PARAMS.BLOCKWIDTH, true, false);
            }
        }

        if (this.textBox) {
            this.textBoxTimer += this.game.clockTick;
            if (this.textBoxTimer > 2.5) {
                this.textBox = false;
                this.textBoxTimer = 0;
                this.message = null;
            }
        }

        if(this.stopwatch) {
            this.timer += this.game.clockTick;
        }

        if (this.game.ninja.caught) {
            ASSET_MANAGER.pauseBackgroundMusic();
            this.deathTimer += this.game.clockTick;
            if (this.deathTimer > 3) {
                this.levelLoaded = true;
                this.gameOver = false;
                this.game.ninja.caught = false;
                this.timer = 0;
                this.loadLevel(1, true, false);
            }
        }

        let midpoint = {x : PARAMS.CANVAS_WIDTH / 2, y: PARAMS.CANVAS_HEIGHT / 2};

        this.y = this.game.ninja.y - midpoint.y - 3 * PARAMS.BLOCKWIDTH;
        this.x = this.game.ninja.x - midpoint.y + 4 * PARAMS.BLOCKWIDTH;

    };

    draw(ctx){
        ctx.font = PARAMS.BLOCKWIDTH + 'px "Press Start 2P"';
        ctx.textAlign = "center";
        ctx.fillStyle = "Black";
        
        if(this.title) {
            ctx.drawImage(ASSET_MANAGER.getAsset("./title_screen.png"), 0, 0, 1024, 768);
            if ((this.game.mouse && this.game.mouse.y > 14 * PARAMS.BLOCKWIDTH && this.game.mouse.y < 14.5 * PARAMS.BLOCKWIDTH)) {
                ctx.fillStyle = "Blue";
                ctx.fillText("START", 16 * PARAMS.BLOCKWIDTH, 14.5*PARAMS.BLOCKWIDTH);
            }
            ctx.fillText("START", 16 * PARAMS.BLOCKWIDTH, 14.5*PARAMS.BLOCKWIDTH);
        } else {
            ctx.font = PARAMS.BLOCKWIDTH * 2/3 + 'px "Press Start 2P"';
            ctx.fillText(this.timerCalc(this.timer), 16 * PARAMS.BLOCKWIDTH, 1 * PARAMS.BLOCKWIDTH);
        }

        if (!this.title && this.textBox) {
            ctx.drawImage(ASSET_MANAGER.getAsset("./text_box.png"), 0, 0, 550, 150, 237, 600, 550, 150);

            ctx.fillStyle = "black";
            ctx.font = PARAMS.BLOCKWIDTH * 0.4 + 'px "Press Start 2P"';

            ctx.fillText(this.message, 16 * PARAMS.BLOCKWIDTH, 675);
        }


        if(this.gameOver){
            ctx.textAlign = "center";
            ctx.font = PARAMS.BLOCKWIDTH + 'px "Press Start 2P"';
            ctx.fillStyle = "red";
            ctx.fillText("YOU'VE BEEN CAUGHT!", 16 * PARAMS.BLOCKWIDTH, 12*PARAMS.BLOCKWIDTH);
        }
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