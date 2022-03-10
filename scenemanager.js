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
        this.checkpoint = {x: 3 * PARAMS.BLOCKWIDTH, y: 3 * PARAMS.BLOCKWIDTH, time: 0};

        this.levelLoaded = false;
        this.stopwatch = false;
        this.timer = this.checkpoint.time;

        //this.loadLevelOne(3 * PARAMS.BLOCKWIDTH, 3 * PARAMS.BLOCKWIDTH, false, true);
        this.winningMusic = true;

        this.textBox = false;
        this.message = null;
        this.textBoxTimer = 0;

        this.deathTimer = 0;

        this.checkpointReached = true;
        this.checkpointTimer = 0;

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
                    this.timer = this.checkpoint.time;
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
        const LEVEL_ONE_WIDTH = 58;

        //music
        ASSET_MANAGER.playAsset("./music/HighClassHeist.mp3");

        //borders
        this.game.addEntity(new Platform(this.game, 0, 0, LEVEL_ONE_WIDTH, 1, LEVEL_ONE_HEIGHT));
        this.game.addEntity(new Platform(this.game, 0, 15, 11, 2, LEVEL_ONE_HEIGHT));
        this.game.addEntity(new Platform(this.game, 13, 15, LEVEL_ONE_WIDTH - 19, 2, LEVEL_ONE_HEIGHT));
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
        this.game.addEntity(new Platform(this.game, 27, 24, 17, 1, LEVEL_ONE_HEIGHT));
        this.game.addEntity(new Platform(this.game, 29, 17, 1, 6, LEVEL_ONE_HEIGHT));
        this.game.addEntity(new Platform(this.game, 41, 17, 1, 6, LEVEL_ONE_HEIGHT));
        this.game.addEntity(new Platform(this.game, 52, 15, 1, 14, LEVEL_ONE_HEIGHT));
        this.game.addEntity(new Platform(this.game, 55, 26, 1, 1, LEVEL_ONE_HEIGHT));
        this.game.addEntity(new Platform(this.game, 55, 21, 1, 1, LEVEL_ONE_HEIGHT));
        this.game.addEntity(new Platform(this.game, 55, 16, 1, 1, LEVEL_ONE_HEIGHT));
        this.game.addEntity(new Platform(this.game, 45, 27, 2, 1, LEVEL_ONE_HEIGHT));
        
        this.game.addEntity(new Platform(this.game, 56, 1, 2, 30, LEVEL_ONE_HEIGHT));


        var trapdoor = new Door(this.game, 11, 15, 2, 1, LEVEL_ONE_HEIGHT, true);
        this.game.addEntity(trapdoor);

        //checkpoints
        this.game.addEntity(new Checkpoint(this.game, 11, 17, LEVEL_ONE_HEIGHT)); // first fall
        this.game.addEntity(new Checkpoint(this.game, 27, 27, LEVEL_ONE_HEIGHT)); // just after first locked door
        this.game.addEntity(new Checkpoint(this.game, 54, 12, LEVEL_ONE_HEIGHT)); // just after second locked door
        
        //lasers
        this.game.addEntity(new Laser(this.game, 1, 26, 7, LEVEL_ONE_HEIGHT, false, true, true));
        this.game.addEntity(new Laser(this.game, 5, 17, 4, LEVEL_ONE_HEIGHT, true, false, true));
        this.game.addEntity(new Laser(this.game, 32, 17, 14, LEVEL_ONE_HEIGHT, true, true, true));
        this.game.addEntity(new Laser(this.game, 35, 17, 14, LEVEL_ONE_HEIGHT, true, false, true));
        this.game.addEntity(new Laser(this.game, 38, 17, 14, LEVEL_ONE_HEIGHT, true, true, true));
        this.game.addEntity(new Laser(this.game, 53, 28, 3, LEVEL_ONE_HEIGHT, false, true, true));

        var laser1 = new Laser(this.game, 15, 21, 10, LEVEL_ONE_HEIGHT, false, true, false);
        var laser2 = new Laser(this.game, 17, 26, 8, LEVEL_ONE_HEIGHT, false, true, false);
        var laser3 = new Laser(this.game, 30, 22, 11, LEVEL_ONE_HEIGHT, false, true, false);
        
        this.game.addEntity(laser1);
        this.game.addEntity(laser2);
        this.game.addEntity(laser3);

        var endLaser1 = new Laser(this.game, 36, 1, 14, LEVEL_ONE_HEIGHT, true, true, false);  // 2, 3, 6 go to endButton1
        var endLaser2 = new Laser(this.game, 37, 1, 14, LEVEL_ONE_HEIGHT, true, true, false);  // 4 goes to endButton2
        var endLaser3 = new Laser(this.game, 38, 1, 14, LEVEL_ONE_HEIGHT, true, true, false);  // 1, 5 goes to endButton3
        var endLaser4 = new Laser(this.game, 39, 1, 14, LEVEL_ONE_HEIGHT, true, true, false);
        var endLaser5 = new Laser(this.game, 40, 1, 14, LEVEL_ONE_HEIGHT, true, true, false);
        var endLaser6 = new Laser(this.game, 41, 1, 14, LEVEL_ONE_HEIGHT, true, true, false);

        this.game.addEntity(endLaser1);
        this.game.addEntity(endLaser2);
        this.game.addEntity(endLaser3);
        this.game.addEntity(endLaser4);
        this.game.addEntity(endLaser5);
        this.game.addEntity(endLaser6);


        //lights

        var light1 = new Light(this.game, 7, 5, 10, LEVEL_ONE_HEIGHT, true);
        var light2 = new Light(this.game, 14, 5, 10, LEVEL_ONE_HEIGHT, true);
        var light3 = new Light(this.game, 47, 17, 14, LEVEL_ONE_HEIGHT, true);

        this.game.addEntity(light1);
        this.game.addEntity(light2);
        this.game.addEntity(light3);

        this.game.addEntity(new Key(this.game, 14, 18, LEVEL_ONE_HEIGHT, "firstdoor"));
        this.game.addEntity(new Key(this.game, 33, 18, LEVEL_ONE_HEIGHT, "seconddoor"));


        this.game.addEntity(new LockedDoor(this.game, 25, 27, LEVEL_ONE_HEIGHT, true, "firstdoor"));
        this.game.addEntity(new LockedDoor(this.game, 53, 22, LEVEL_ONE_HEIGHT, true, "seconddoor"));


        
        // borders
        //this.game.addEntity(new Border(this.game, 0, PARAMS.CANVAS_HEIGHT - LEVEL_HEIGHT, PARAMS.BLOCKWIDTH, LEVEL_HEIGHT));
        //this.game.addEntity(new Border(this.game, PARAMS.CANVAS_WIDTH - PARAMS.BLOCKWIDTH, PARAMS.CANVAS_HEIGHT - LEVEL_HEIGHT, PARAMS.BLOCKWIDTH, LEVEL_HEIGHT));

        this.game.addEntity(new Ninja(this.game, this.checkpoint.x, this.checkpoint.y));
	    
        //buttons
        this.game.addEntity(new Button(this.game, 23, 12, LEVEL_ONE_HEIGHT, true, light1, light2, trapdoor));
        this.game.addEntity(new Button(this.game, 2, 18, LEVEL_ONE_HEIGHT, true, laser1, laser2));
        this.game.addEntity(new Button(this.game, 27, 19, LEVEL_ONE_HEIGHT, true, laser3, light3));

        this.game.addEntity(new Button(this.game, 45, 9, LEVEL_ONE_HEIGHT, false, null));
        this.game.addEntity(new Button(this.game, 48, 9, LEVEL_ONE_HEIGHT, true, endLaser2, endLaser3, endLaser6)); //endButton1
        this.game.addEntity(new Button(this.game, 51, 9, LEVEL_ONE_HEIGHT, false, null));
        this.game.addEntity(new Button(this.game, 45, 12, LEVEL_ONE_HEIGHT, true, endLaser4)); //endButton2
        this.game.addEntity(new Button(this.game, 48, 12, LEVEL_ONE_HEIGHT, false, endLaser1, endLaser5)); //endButton3
        this.game.addEntity(new Button(this.game, 51, 12, LEVEL_ONE_HEIGHT, true, null));

        this.game.addEntity(new Money(this.game, 29, 11, LEVEL_ONE_HEIGHT));

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

        if (this.title) {
            if (this.game.click && this.game.click.y > 14 * PARAMS.BLOCKWIDTH && this.game.click.y < 14.5 * PARAMS.BLOCKWIDTH) {
                this.title = false;
                if (!this.levelLoaded) {
                    this.levelLoaded = true;
                    this.checkpoint.x = 3 * PARAMS.BLOCKWIDTH;
                    this.checkpoint.y = 3 * PARAMS.BLOCKWIDTH;
                    this.checkpoint.time = 0;
                    //his.game.ninja = new Ninja(this.game, 3*PARAMS.BLOCKWDITH, 3*PARAMS.BLOCKWIDTH);
                    this.loadLevel(1, true, false);
                }
            }
        } else if (this.win) {
            ASSET_MANAGER.pauseBackgroundMusic();
            this.clearEntities();
            this.game.addEntity(new WinningScreen(this.game, this.timer));
            if ((this.game.click && this.game.click.y > 21 * PARAMS.BLOCKWIDTH && this.game.click.y < 22 * PARAMS.BLOCKWIDTH)) {
                this.checkpoint = {x: 3 * PARAMS.BLOCKWIDTH, y: 3 * PARAMS.BLOCKWIDTH, time: 0};
                this.win = false;
                this.title = true;
                this.levelLoaded = false;
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

        if (this.checkpointReached) {
            this.checkpointTimer += this.game.clockTick;
            if (this.checkpointTimer > 2.5) {
                this.checkpointReached = false;
                this.checkpointTimer = 0;
            }
        }

        if(this.stopwatch && !this.win) {
            this.timer += this.game.clockTick;
        }

        if (this.game.ninja.caught) {
            ASSET_MANAGER.pauseBackgroundMusic();
            this.deathTimer += this.game.clockTick;
            this.stopwatch = false;
            if (this.deathTimer > 3) {
                this.levelLoaded = true;
                this.gameOver = false;
                //this.game.ninja.caught = false;
                this.deathTimer = 0;
                this.loadLevel(1, true, false);
            }
        }

        let midpoint = {x : PARAMS.CANVAS_WIDTH / 2, y: PARAMS.CANVAS_HEIGHT / 2};

        this.y = this.game.ninja.y - midpoint.y - 3 * PARAMS.BLOCKWIDTH;
        this.x = this.game.ninja.x - midpoint.x + 4 * PARAMS.BLOCKWIDTH;

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
        } else if (!this.title && this.win) {           
            ctx.font = PARAMS.BLOCKWIDTH * 0.75 + 'px "Press Start 2P"';
            
            if ((this.game.mouse && this.game.mouse.y > 21 * PARAMS.BLOCKWIDTH && this.game.mouse.y < 22 * PARAMS.BLOCKWIDTH)) {
                ctx.fillStyle = "red";
                ctx.fillText("RETURN TO MAIN MENU", 16 * PARAMS.BLOCKWIDTH, 22*PARAMS.BLOCKWIDTH);
            } else  {
                ctx.fillStyle = "white";
                ctx.fillText("RETURN TO MAIN MENU", 16 * PARAMS.BLOCKWIDTH, 22*PARAMS.BLOCKWIDTH);
            }

        } else {
            ctx.fillStyle = "black";
            ctx.font = PARAMS.BLOCKWIDTH * 2/3 + 'px "Press Start 2P"';
            ctx.fillText(this.timerCalc(this.timer), 16 * PARAMS.BLOCKWIDTH, 1 * PARAMS.BLOCKWIDTH);
        }

        if (!this.title && this.textBox) {
            ctx.drawImage(ASSET_MANAGER.getAsset("./text_box.png"), 0, 0, 550, 150, 237, 600, 550, 150);

            ctx.fillStyle = "black";
            ctx.font = PARAMS.BLOCKWIDTH * 0.4 + 'px "Press Start 2P"';

            ctx.fillText(this.message, 16 * PARAMS.BLOCKWIDTH, 675);
        }

        if (!this.title && this.checkpointReached) {
            ctx.fillStyle = "black";
            ctx.font = PARAMS.BLOCKWIDTH * 0.4 + 'px "Press Start 2P"';

            ctx.fillText("Checkpoint reached", 16 * PARAMS.BLOCKWIDTH, 2*PARAMS.BLOCKWIDTH);
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