class SceneManager {
    constructor(game) {
        this.game = game;
        this.game.camera = this; //direct reference in game engine. //grab main or camera if needed. 
        this.y = 0;

        //might be better for main character... //main character properties. 
        this.score = 0;
        this.coins = 0;
        this.lives = 3;

        this.ninja = new Ninja(game, 25, 0);
        //this.cointAnimation = new Animator(ASSET_MANAGER.getAsset("..."), 0, 160, 8, 8, 4, 0.2, 0, false);

        this.loadLevelOne(PARAMS.BLOCKWIDTH);
    };

    //addCoin() {}
    //clearEntities();
    loadLevelOne(y) { //less important is loaded first, then mains. 
        this.y = 0;
        

        this.game.addEntity(new Platform(this.game, 10*PARAMS.BLOCKWIDTH, 16*PARAMS.BLOCKWIDTH, 3 * PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH));
        this.game.addEntity(new Platform(this.game, 400, 400, 3 * PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH));

        this.game.addEntity(new Platform(this.game, 8*PARAMS.BLOCKWIDTH, 22*PARAMS.BLOCKWIDTH, 3 * PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH));
        // this.game.addEntity(new Platform(this.game, 400, 700, 100, 24));
        // this.game.addEntity(new Platform(this.game, 300, 600, 100, 24));
        // this.game.addEntity(new Platform(this.game, 400, 600, 100, 24));
        // this.game.addEntity(new Platform(this.game, 300, 200, 100, 24));
        // this.game.addEntity(new Platform(this.game, 100, 100, 100, 24));
        // this.game.addEntity(new Platform(this.game, 200, -100, 100, 24));
        this.game.addEntity(new Border(this.game, 0, -PARAMS.CANVAS_HEIGHT, PARAMS.BLOCKWIDTH, PARAMS.CANVAS_HEIGHT * 2));
        this.game.addEntity(new Border(this.game, PARAMS.CANVAS_WIDTH - PARAMS.BLOCKWIDTH, -PARAMS.CANVAS_HEIGHT, PARAMS.BLOCKWIDTH, PARAMS.CANVAS_HEIGHT * 2));

	    this.game.addEntity(new Ground(this.game, 0, 750, PARAMS.CANVAS_WIDTH));

        this.game.addEntity(this.ninja);
	    //this.game.addEntity(new Background(this.game, 0, 0));

        
        //this.ninja.x = x;
        this.ninja.y = y;
    };

    update() { //I want the screen to follow the ninja up and down 
        
        let midpoint = PARAMS.CANVAS_HEIGHT / 2; 

        this.y = this.ninja.y - midpoint - 3 * PARAMS.BLOCKWIDTH;

    };

    draw(ctx){

    }; //should draw all of the stores, world numbers, text drawing stuff. 
};