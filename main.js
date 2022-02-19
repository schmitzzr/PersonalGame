const gameEngine = new GameEngine();
const CANVAS_WIDTH = 1024;
const CANVAS_HEIGHT = 768;

const ASSET_MANAGER = new AssetManager();

ASSET_MANAGER.queueDownload("./JapanBackground.jpg");
ASSET_MANAGER.queueDownload("./spritesheet.png");
ASSET_MANAGER.queueDownload("./grass_block.png");
ASSET_MANAGER.queueDownload("./platforms.png");
ASSET_MANAGER.queueDownload("./platform_block.png");
ASSET_MANAGER.queueDownload("./iron_block.png");
ASSET_MANAGER.queueDownload("./background_block.png");
ASSET_MANAGER.queueDownload("./metal_background.jpg");
ASSET_MANAGER.queueDownload("./city_background.png");
ASSET_MANAGER.queueDownload("./spotlight.png");
ASSET_MANAGER.queueDownload("./title_screen.png");

// music
ASSET_MANAGER.queueDownload("./music/HighClassHeist.mp3");


ASSET_MANAGER.downloadAll(() => {
	
	ASSET_MANAGER.autoRepeat("./music/HighClassHeist.mp3");

	PARAMS.BLOCKWIDTH = PARAMS.BITWIDTH * PARAMS.SCALE;

	const canvas = document.getElementById("gameWorld");
	const ctx = canvas.getContext("2d");
	ctx.imageSmoothingEnabled = true;

	PARAMS.CANVAS_WIDTH = canvas.clientWidth;
	PARAMS.CANVAS_HEIGHT = canvas.clientHeight;

	gameEngine.init(ctx);

	// loads from front to back
	new SceneManager(gameEngine);

	gameEngine.start();
});
