class SceneManager {
    constructor(game) {
        this.game = game;
        this.game.camera = this; //direct reference in game engine. //grab main or camera if needed. 
        this.y = 0;

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
        
        this.game.addEntity(new Platform(this.game, 13*PARAMS.BLOCKWIDTH, PARAMS.CANVAS_HEIGHT - 7*PARAMS.BLOCKWIDTH, 5 * PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH));
        this.game.addEntity(new Platform(this.game, 21*PARAMS.BLOCKWIDTH, PARAMS.CANVAS_HEIGHT - 11*PARAMS.BLOCKWIDTH, 10 * PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH));
        this.game.addEntity(new Platform(this.game, 24*PARAMS.BLOCKWIDTH, PARAMS.CANVAS_HEIGHT - 18*PARAMS.BLOCKWIDTH, 2 * PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH));
        this.game.addEntity(new Platform(this.game, 1*PARAMS.BLOCKWIDTH, PARAMS.CANVAS_HEIGHT - 23*PARAMS.BLOCKWIDTH, 20 * PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH));
        this.game.addEntity(new Platform(this.game, 19*PARAMS.BLOCKWIDTH, PARAMS.CANVAS_HEIGHT - 35*PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH, 11 * PARAMS.BLOCKWIDTH));
        this.game.addEntity(new Platform(this.game, 9*PARAMS.BLOCKWIDTH, PARAMS.CANVAS_HEIGHT - 30*PARAMS.BLOCKWIDTH, 2 * PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH));
        this.game.addEntity(new Platform(this.game, 19*PARAMS.BLOCKWIDTH, PARAMS.CANVAS_HEIGHT - 36*PARAMS.BLOCKWIDTH, 12 * PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH));


        
        // borders
        this.game.addEntity(new Border(this.game, 0, -PARAMS.CANVAS_HEIGHT, PARAMS.BLOCKWIDTH, PARAMS.CANVAS_HEIGHT * 2));
        this.game.addEntity(new Border(this.game, PARAMS.CANVAS_WIDTH - PARAMS.BLOCKWIDTH, -PARAMS.CANVAS_HEIGHT, PARAMS.BLOCKWIDTH, PARAMS.CANVAS_HEIGHT * 2));

	    this.game.addEntity(new Ground(this.game, 0, PARAMS.CANVAS_HEIGHT, PARAMS.CANVAS_WIDTH));

        this.game.addEntity(this.ninja);
	    //this.game.addEntity(new Background(this.game, 0, 0));

        
        this.ninja.y = PARAMS.CANVAS_HEIGHT - 5*PARAMS.BLOCKWIDTH;
    };

    update() { //I want the screen to follow the ninja up and down 
        
        let midpoint = PARAMS.CANVAS_HEIGHT / 2; 

        this.y = this.ninja.y - midpoint - 4 * PARAMS.BLOCKWIDTH;

    };

    draw(ctx){

    }; //should draw all of the stores, world numbers, text drawing stuff. 
};