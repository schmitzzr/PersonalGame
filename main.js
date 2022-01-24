const gameEngine = new GameEngine();
const CANVAS_WIDTH = 1024;
const CANVAS_HEIGHT = 768;

const ASSET_MANAGER = new AssetManager();

ASSET_MANAGER.queueDownload("./JapanBackground.jpg");
ASSET_MANAGER.queueDownload("./spritesheet.png");
ASSET_MANAGER.queueDownload("./grass_block.png");
ASSET_MANAGER.queueDownload("./platforms.png");



ASSET_MANAGER.downloadAll(() => {
	
	PARAMS.BLOCKWIDTH = PARAMS.BITWIDTH * PARAMS.SCALE;

	const canvas = document.getElementById("gameWorld");
	const ctx = canvas.getContext("2d");
	ctx.imageSmoothingEnabled = false;

	// loads from front to back
	new SceneManager(gameEngine);

	gameEngine.init(ctx);

	gameEngine.start();
});
