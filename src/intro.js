var introScene = cc.Scene.extend({
	onEnter:function () {
		this._super();
		var layer = new introscene();
		layer.init();
		this.addChild(layer);
	}
});
var introscene =cc.Layer.extend({
	title:null,
	menu:null,
	start:null,
	init:function () {
		var selfPointer = this;
		//////////////////////////////
		// 1. super init first
		this._super();
		this.setAnchorPoint(cc.PointMake(0.5,0.5));
		this.removeAllChildren(true);
		/////////////////////////////
		// 2. add a menu item with "X" image, which is clicked to quit the program
		//	you may modify it.
		// ask director the window size
		var size = cc.Director.getInstance().getWinSize();
		this.title=cc.LabelTTF.create("BLOCKERS", "Black", 65);
		this.addChild(this.title);
		this.title.setPosition(cc.p(size.width/2,size.height*0.75));
		var startlabel= cc.LabelTTF.create("start", "Black", 40);
		this.start=cc.MenuItemLabel.create(
				startlabel,
				function(){
					this.removeAllChildren(true);
					mainScene=cc.Scene.create();
					var layer = new gamescene();
					layer.init();
					mainScene.addChild(layer);
					cc.Director.getInstance().pushScene(mainScene);
				
				},
				this
		);
		this.menu =cc.Menu.create(this.start);
		this.addChild(this.menu);
		this.adjustSizeForWindow();
		window.addEventListener("resize", function (event) {
            selfPointer.adjustSizeForWindow();
        });
        return true;
	},
	adjustSizeForWindow:function () {
		var margin = document.documentElement.clientWidth - document.body.clientWidth;
		if (document.documentElement.clientWidth < cc.originalCanvasSize.width) {
			cc.canvas.width = cc.originalCanvasSize.width;
		} else {
			cc.canvas.width = document.documentElement.clientWidth - margin;
		}
		if (document.documentElement.clientHeight < cc.originalCanvasSize.height) {
			cc.canvas.height = cc.originalCanvasSize.height;
		} else {
			cc.canvas.height = document.documentElement.clientHeight - margin;
		}

		var xScale = cc.canvas.width / cc.originalCanvasSize.width;
		var yScale = cc.canvas.height / cc.originalCanvasSize.height;
		if (xScale > yScale) {
			xScale = yScale;
		}
		cc.canvas.width = cc.originalCanvasSize.width * xScale;
		cc.canvas.height = cc.originalCanvasSize.height * xScale;
		var parentDiv = document.getElementById("Cocos2dGameContainer");
		if (parentDiv) {
			parentDiv.style.width = cc.canvas.width + "px";
			parentDiv.style.height = cc.canvas.height + "px";
		}
		cc.renderContext.translate(0, cc.canvas.height);
		cc.renderContext.scale(xScale, xScale);
		cc.Director.getInstance().setContentScaleFactor(xScale);
		//cc.canvas.webkitRequestFullScreen();
	},
	





});