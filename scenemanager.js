class SceneManager {
    constructor(game) {
        this.game = game;
        this.game.camera = this; //direct reference in game engine. //grab main or camera if needed. 
        this.y = 0;
        this.x = 0;

        //might be better for main character... //main character properties. 
        this.score = 0;
        this.coins = 0;
        this.lives = 3;

        this.ninja = new Ninja(game, 25, PARAMS.CANVAS_HEIGHT);
        //this.cointAnimation = new Animator(ASSET_MANAGER.getAsset("..."), 0, 160, 8, 8, 4, 0.2, 0, false);

        this.loadLevelOne();
    };

    //addCoin() {}
    //clearEntities();
    loadLevelOne() { //less important is loaded first, then mains. 
        
        const LEVEL_HEIGHT = 32 * PARAMS.BLOCKWIDTH;
        const LEVEL_WIDTH = 128 * PARAMS.BLOCKWIDTH;
        const LEVEL_ONE_HEIGHT = 32;
        const LEVEL_ONE_WIDTH = 128;


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

        this.game.addEntity(this.ninja);
        this.ninja.x = 3*PARAMS.BLOCKWIDTH;
        this.ninja.y = 3*PARAMS.BLOCKWIDTH;
	    //this.game.addEntity(new Background(this.game, 0, 0));

        this.game.addEntity(new Background(this.game, 0, 0, LEVEL_ONE_WIDTH, LEVEL_ONE_HEIGHT, LEVEL_ONE_HEIGHT));
    };

    update() { //I want the screen to follow the ninja up and down 
        
        let midpoint = {x : PARAMS.CANVAS_WIDTH / 2, y: PARAMS.CANVAS_HEIGHT / 2};

        this.y = this.ninja.y - midpoint.y - 4 * PARAMS.BLOCKWIDTH;
        this.x = this.ninja.x - midpoint.y + 4 * PARAMS.BLOCKWIDTH;

    };

    draw(ctx){

    }; //should draw all of the stores, world numbers, text drawing stuff. 
};