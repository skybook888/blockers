var mainScene = cc.Scene.extend({
	onEnter:function () {
		this._super();
		var layer = new gamescene();
		layer.init();
		this.addChild(layer);
	}
});
//
var backSprite = cc.Sprite.extend({
    size:null,
    ctor:function (size) {
        this._super();
        this.size=size;
        
    },
    draw:function () {
        cc.renderContext.fillStyle = "rgba(255,255,255,5)";
        cc.renderContext.strokeStyle = "rgba(255,255,255,5)";
		cc.renderContext.lineWidth = 4;
        for(var i=0;i<10;i++){
        	cc.drawingUtil.drawLine(cc.p(this.size.width/11-2,this.size.height-this.size.width/11*(i+1)),cc.p(this.size.width/11*10+2,this.size.height-this.size.width/11*(i+1)));
        	cc.drawingUtil.drawLine(cc.p(this.size.width/11*(i+1),this.size.height-this.size.width/11-2),cc.p(this.size.width/11*(i+1),this.size.height-this.size.width/11*10+2));
        
        }
    },
    
});
var cellitem= cc.MenuItemSprite.extend({
	player:0,
	colorlayer:null,
	label:null,
	sprite:null,
	ctor:function(labelstr){
		this._super;
		var size = cc.Director.getInstance().getWinSize();
		this.setAnchorPoint(cc.p(0.5,0.5));
		this.sprite=new cc.Sprite();
		this.sprite.setAnchorPoint(cc.p(0.5,0.5));
		this.colorlayer = cc.LayerColor.create(cc.c4b(0,0,0,255),size.width/11-10,size.width/11-10);
		//this.colorlayer.setAnchorPoint(cc.p(1,1));
		this.label=cc.LabelTTF.create(labelstr,"Batang",45);
		this.label.setPosition((size.width/11-10)/2,(size.width/11-10)/2);
		this.sprite.addChild(this.label,10);
		this.sprite.addChild(this.colorlayer,-1);
		//this.label.addChild(this.colorlayer,-1);
		this.colorlayer.setPosition(0,0);
		this.setNormalImage(this.sprite);
		this.setEnabled(true);
		this.setContentSize(this.colorlayer.getContentSize());
		console.log(this.rect());
	},
	changeicon:function(player,labelstr){
		var colorr=new Array(0,255,255,0,255,0,0);
		var colorg=new Array(0,0,255,255,0,0,255);
		var colorb=new Array(0,255,0,255,0,255,0);
		this.colorlayer.setColor(cc.c4b(colorr[player],colorg[player],colorb[player],255));
		this.colorlayer.draw();
		if(player>0)this.label.setColor(cc.c4b(0,0,0,255));
		this.label.setString(labelstr);
	
	}
	



});
var gamescene =cc.Layer.extend({
	backgroud:null,
	cover:null,
	castle:null,
	logo:null,
	menu:null,
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
		this.menu=cc.Menu.create();
		var size = cc.Director.getInstance().getWinSize();
		var lazyLayer = new cc.LazyLayer();
		this.addChild(lazyLayer);
		this.backgroud = new backSprite(size);
		labeltop=new Array();
		labelleft=new Array();
		labelright=new Array();
		labelbottom=new Array();
		labeltext=new Array("A","B","C","D","E","F","G","H","I");
		labelsymbol=new Array("★","♣","♥","♦","♠","☀","▲","●","⚑");
		labelsymbolcover=new Array("☆","♧","♡","♢","♤","☼","△","○","⚐");
		
		this.addChild(this.backgroud,0);
		for(var i=0;i<9;i++){
			labeltop[i]=cc.LabelTTF.create(i+1, "Black", 45);
			this.addChild(labeltop[i]);
			labeltop[i].setPosition(cc.p(size.width/22*(i*2+3),size.height-size.width/22));
			labelbottom[i]=cc.LabelTTF.create(i+1, "Arial", 45);
			this.addChild(labelbottom[i]);
			labelbottom[i].setPosition(cc.p(size.width/22*(i*2+3),size.height-size.width/22*21));
			labelleft[i]=cc.LabelTTF.create(labeltext[i], "Arial", 45);
			this.addChild(labelleft[i]);
			labelleft[i].setPosition(cc.p(size.width/22,size.height-size.width/22*(i*2+3)));
			labelright[i]=cc.LabelTTF.create(labeltext[i], "Arial", 45);
			this.addChild(labelright[i]);
			labelright[i].setPosition(cc.p(size.width/22*21,size.height-size.width/22*(i*2+3)));
			
		
		}
		var cell=new Array();
		for(var i=0;i<9;i++){
			cell[i]=new Array();
			for(var j=0;j<9;j++){
				var celltype=Math.floor(i/3)+Math.floor(j/3)*3;
				cell[i][j]=new cellitem(labelsymbolcover[celltype]);
				this.menu.addChild(cell[i][j]);
				cell[i][j].setPosition(cc.p(size.width/22*(i*2+3),size.height-size.width/22*(j*2+3)));
				cell[i][j].setTarget(cell[i][j]);
				cell[i][j].setCallback(
					function()
					{
						console.log(true);
						this.changeicon(Math.floor(Math.random()*5)+1,labelsymbol[Math.floor(Math.random()*9)]);
					 });
			}
		
		}
		this.addChild(this.menu);
		this.menu.setPosition(0,0);
		this.menu.setEnabled(true);
		this.backgroud.setPosition(cc.p(0, 0));
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
function handleFiles(files) {
    if (files.length) {
        var file = files[0];
        var txt;
        var reader = new FileReader();
        if (/text\/\w+/.test(file.type)) {
            reader.onload = function() {
                txt=this.result;
                //$('<pre>' + this.result + '</pre>').appendTo('body');
            }
            reader.readAsText(file);
        }
        return txt;
        
    }
}