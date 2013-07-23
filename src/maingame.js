//
var mainScene = cc.Scene.extend({
	onEnter:function () {
		this._super();
		var layer = new gamescene();
		layer.init();
		this.addChild(layer);
	}
});
//设置整个棋盘的背景（白色条纹）
var backSprite = cc.Sprite.extend({
    size:null,
    ctor:function (size) {
        this._super();
        this.size=size;
        this.setContentSize(size);
        //this.setTextureRect(cc.rect(0,0,size.height.size.weight))
        
    },
    draw:function () {
        cc.renderContext.fillStyle = "rgba(255,255,255,255)";
        cc.renderContext.strokeStyle = "rgba(255,255,255,255)";
		cc.renderContext.lineWidth = 2;
        for(var i=0;i<10;i++){
        	cc.drawingUtil.drawLine(cc.p(this.size.width/11-1,this.size.height-this.size.width/11*(i+1)),cc.p(this.size.width/11*10+1,this.size.height-this.size.width/11*(i+1)));
        	cc.drawingUtil.drawLine(cc.p(this.size.width/11*(i+1),this.size.height-this.size.width/11-1),cc.p(this.size.width/11*(i+1),this.size.height-this.size.width/11*10+1));
        
        }
    },
    
});
var scorelayer= cc.Layer.extend({
	size:null,
	player:0,
	score:null,
	blocks:null,
	ctor:function(size,player){
		this._super();
		this.size=size;
		this.setContentSize(size);
		this.player=player;
		var colorlayer=cc.LayerColor.create(get_player_color(player),size.height*0.4,size.height*0.4);
		this.addChild(colorlayer);
		colorlayer.setPosition(cc.p(10,size.height*0.6-10));
		var blockslabel=cc.LabelTTF.create("blocks","Black",fontsize*0.5);
		blockslabel.setColor(get_player_color(player));
		this.addChild(blockslabel);
		blockslabel.setPosition(size.width*0.55,size.height*0.75);
		var scorelabel=cc.LabelTTF.create("score","Black",fontsize*0.5);
		scorelabel.setColor(get_player_color(player));
		this.addChild(scorelabel);
		scorelabel.setPosition(size.width*0.55,size.height*0.55);
		this.score=cc.LabelTTF.create(0,"Black",fontsize*0.55);
		this.score.setColor(get_player_color(player));
		this.addChild(this.score);
		this.score.setPosition(size.width*0.85,size.height*0.55);
		this.blocks=cc.LabelTTF.create(0,"Black",fontsize*0.55);
		this.blocks.setColor(get_player_color(player));
		this.addChild(this.blocks);
		this.blocks.setPosition(size.width*0.85,size.height*0.75);
	},
	setblock:function(num){
		this.blocks.setString(num);
	},
	setscore:function(num){
		this.score.setString(num);
	},
	draw:function(){
		cc.renderContext.fillStyle = "rgba(255,255,255,255)";
        cc.renderContext.strokeStyle = "rgba(255,255,255,255)";
		cc.renderContext.lineWidth = 1;
		cc.drawingUtil.drawLine(cc.p(5,5),cc.p(5,this.size.height-5));
		cc.drawingUtil.drawLine(cc.p(5,this.size.height-5),cc.p(this.size.width-5,this.size.height-5));
		cc.drawingUtil.drawLine(cc.p(this.size.width-5,this.size.height-5),cc.p(this.size.width-5,5));
		cc.drawingUtil.drawLine(cc.p(this.size.width-5,5),cc.p(5,5));
		
	
	}
	
	


});
function get_player_color(player){
	return cc.c4b(colorr[player],colorg[player],colorb[player],255);
	


}

		
var blocksprite = cc.Sprite.extend({
	label:null,
	colorlayer:null,
	ctor:function(labelstr,colornum,size){
		this._super();
		//this.setAnchorPoint(cc.p(0.5,0.5));
		this.colorlayer = cc.LayerColor.create(get_player_color(colornum),size.width/11-5,size.width/11-5);
		//this.colorlayer = cc.LayerColor.create(cc.c4b(0,0,0,255),size.width/11-10,size.width/11-10);
		
		//this.colorlayer.setAnchorPoint(cc.p(1,1));
		this.label=cc.LabelTTF.create(labelstr,"Black",fontsize);
		this.label.setPosition((size.width/11-5)/2,(size.width/11-5)/2);
		if(colornum>0){
			this.label.setColor(cc.c4b(0,0,0,255));
		}else{
			this.label.setColor(cc.c4b(255,255,255,255));
		}
		this.addChild(this.label,10);
		this.addChild(this.colorlayer,-1);
		
	},
	setcolor:function(colornum){
		this.colorlayer.setColor(get_player_color(colornum));
		if(colornum>0){
			this.label.setColor(cc.c4b(0,0,0,255));
		}else{
			this.label.setColor(cc.c4b(255,255,255,255));
		}
	},
	setstring:function(labelstr){
		this.label.setString(labelstr);
	
	}
});
var cellitem= cc.MenuItemSprite.extend({
	x:0,
	y:0,
	player:0,
	sprite:null,
	labelstr:"",
	selectedeffect1:null,
	selectedeffect2:null,
	
	isselected:false,
	ctor:function(labelstr,size,x,y){
		this._super;
		this.x=x;
		this.y=y;
		this.setAnchorPoint(cc.p(0.5,0.5));
		this.sprite=new blocksprite(labelstr,0,size);
		this.setNormalImage(this.sprite);
		this.setEnabled(true);
		this.setContentSize(this.sprite.colorlayer.getContentSize());
		this.labelstr=labelstr;
		//console.log(this.rect());
	},
	changeicon:function(player,labelstr){
		this.sprite.setcolor(player);
		this.sprite.setstring(labelstr);
		this.player=player;
		this.labelstr=labelstr;
	
	},
	setselected:function(){
		if(this.isselected){
			
		}else{
			//console.log(1);
			this.selectedeffect1= cc.ParticleSystem.create("resources/selected.plist");
			this.selectedeffect1.setShapeType(cc.PARTICLE_STAR_SHAPE);
			this.sprite.addChild(this.selectedeffect1,100);
			var size =this.sprite.colorlayer.getContentSize();
			console.log(size);
			this.selectedeffect1.setPosition(cc.p(0,0));
			this.selectedeffect1.runAction(
				cc.RepeatForever.create(
					cc.Sequence.create(
						cc.MoveTo.create(0.5,cc.p(0,size.height)),
						cc.MoveTo.create(0.5,cc.p(size.width,size.height)),
						cc.MoveTo.create(0.5,cc.p(size.width,0)),
						cc.MoveTo.create(0.5,cc.p(0,0))
					)
				)
			);
			this.selectedeffect2= cc.ParticleSystem.create("resources/selected.plist");
			this.selectedeffect2.setShapeType(cc.PARTICLE_STAR_SHAPE);
			this.sprite.addChild(this.selectedeffect2,100);
			this.selectedeffect2.setPosition(cc.p(size.width,size.height));
			this.selectedeffect2.runAction(
				cc.RepeatForever.create(
					cc.Sequence.create(
						cc.MoveTo.create(0.5,cc.p(size.width,0)),
						cc.MoveTo.create(0.5,cc.p(0,0)),
						cc.MoveTo.create(0.5,cc.p(0,size.height)),
						cc.MoveTo.create(0.5,cc.p(size.width,size.height))
						
					)
				)
			);
			this.isselected=!this.isselected;
		}
	},
	unsetselected:function(){
		if(this.isselected){
			this.selectedeffect1.removeFromParent(true);
			this.selectedeffect2.removeFromParent(true);
			this.isselected=!this.isselected;
		}else{
			
		}
	}	
	



});
var gamescene =cc.Layer.extend({
	backgroud:null,
	cover:null,
	castle:null,
	logo:null,
	menu:null,
	cardmenu:null,
	board:null,
	scorelayers:null,
	myblockscard:null,
	remainblocks:null,
	game:null,
	labplayerscore:null,
	playernums:0,
	playerorder:0,
	handcards:null,
	init:function (playnums) {
		var selfPointer = this;
		//////////////////////////////
		// 1. super init first
		this._super();
		this.playernums=playnums;
		//this.setAnchorPoint(cc.PointMake(0.5,0.5));
		this.removeAllChildren(true);
		/////////////////////////////
		// 2. add a menu item with "X" image, which is clicked to quit the program
		//	you may modify it.
		// ask director the window size
		this.game=new gamelogic();
		this.game.init(playnums)
		this.menu=cc.Menu.create();
		var size = cc.Director.getInstance().getWinSize();
		var boardsize=cc.size(size.width*0.8,size.width*0.8);
		//绘制棋盘
		this.board = cc.Layer.create();
		this.board.setAnchorPoint(cc.p(0.5,0.5));
		this.board.setContentSize(boardsize);
		this.backgroud = new backSprite(boardsize);
		this.backgroud.setAnchorPoint(cc.p(0.5,0.5));
		this.board.setPosition(size.width/2-boardsize.width/2,size.height*0.9-boardsize.height);
		labeltop=new Array();
		labelleft=new Array();
		labelright=new Array();
		labelbottom=new Array();
		this.scorelayers=new Array();
		this.board.addChild(this.backgroud,0);
		this.addChild(this.board);
		for(var i=0;i<9;i++){
			labeltop[i]=cc.LabelTTF.create(i+1, "Black", fontsize);
			this.board.addChild(labeltop[i]);
			labeltop[i].setPosition(cc.p(boardsize.width/22*(i*2+3),boardsize.height-boardsize.width/22));
			labelbottom[i]=cc.LabelTTF.create(i+1, "Arial", fontsize);
			this.board.addChild(labelbottom[i]);
			labelbottom[i].setPosition(cc.p(boardsize.width/22*(i*2+3),boardsize.height-boardsize.width/22*21));
			labelleft[i]=cc.LabelTTF.create(labeltext[i], "Arial", fontsize);
			this.board.addChild(labelleft[i]);
			labelleft[i].setPosition(cc.p(boardsize.width/22,boardsize.height-boardsize.width/22*(i*2+3)));
			labelright[i]=cc.LabelTTF.create(labeltext[i], "Arial", fontsize);
			this.board.addChild(labelright[i]);
			labelright[i].setPosition(cc.p(boardsize.width/22*21,boardsize.height-boardsize.width/22*(i*2+3)));
		}
		//绘制和生成棋盘单元格
		var cell=new Array();
		for(var i=0;i<9;i++){
			cell[i]=new Array();
			for(var j=0;j<9;j++){
				var celltype=Math.floor(i/3)+Math.floor(j/3)*3;
				cell[i][j]=new cellitem(labelsymbolcover[celltype],boardsize,i,j);
				this.menu.addChild(cell[i][j]);
				cell[i][j].setPosition(cc.p(boardsize.width/22*(i*2+3),boardsize.height-boardsize.width/22*(j*2+3)));
				cell[i][j].setTarget(cell[i][j]);
				cell[i][j].setCallback(
					function()
					{
						
						this.changeicon(Math.floor(Math.random()*5)+1,labelsymbol[Math.floor(Math.random()*9)]);
						var parent=this.getParent().getParent().getParent();
						console.log(parent);
						parent.game.putblock(this.player,this.labelstr,this.x,this.y);
						parent.refreshscore();
						return;
					 });
			}
		
		}
		this.board.addChild(this.menu);
		//绘制自己的手牌区域
		
		this.myblockscard=new Array();
		var playerUI=cc.Layer.create();
		this.playerorder=this.game.getplayercolor(1);
		console.log(this.playerorder);
		this.handcards=this.game.getplayercard(this.playerorder);
		
		this.cardmenu=cc.Menu.create();
		this.cardmenu.setPosition(cc.p(0,0));
		playerUI.addChild(this.cardmenu);
		this.cardmenu.setAnchorPoint(cc.p(0,0));
		for(var i=0;i<5;i++){
			
			this.myblockscard[i]=new cellitem(this.handcards[i],cc.size(size.width*0.9,size.height*0.9));
			this.myblockscard[i].changeicon(this.playerorder,this.myblockscard[i].labelstr);
			this.cardmenu.addChild(this.myblockscard[i]);
			this.myblockscard[i].setPosition(cc.p(size.width/22*(i*2+7),size.height*0.3));
			this.myblockscard[i].setTarget(this.myblockscard[i]);
			this.myblockscard[i].setCallback(
				function(){
					var par=this.getParent().getParent().getParent();
					for(var i=0;i<5;i++){
						par.myblockscard[i].unsetselected();
					}
					this.setselected();
					
					return;
					
				});
			
			
		
		}
		var remaincard=23;
		this.remainblocks=cc.LabelTTF.create("■×"+remaincard, "Black", fontsize);
		this.remainblocks.setColor(get_player_color(this.playerorder));
		playerUI.addChild(this.remainblocks);
		this.remainblocks.setPosition(cc.p(size.width/2,size.height*0.2));
		this.labplayerscore=cc.LabelTTF.create("score:0", "Black", fontsize);
		this.labplayerscore.setColor(get_player_color(this.playerorder));
		playerUI.addChild(this.labplayerscore);
		this.labplayerscore.setPosition(cc.p(size.width/2,size.height*0.1));
		
		this.addChild(playerUI);
		
		//绘制其他玩家分数区域
		var j=0;
		var playerorder=new Array();
		for(var i=2;i<=playnums;i++){
			playerorder[i]=this.game.getplayercolor(i);
			this.scorelayers[i]=new scorelayer(cc.size(size.width*0.25,size.height*0.1),playerorder[i]);
			this.addChild(this.scorelayers[i],100);
			this.scorelayers[i].setPosition(cc.p(j*size.width*0.25,size.height*0.9));
			j++;
			
		
		
		}
		this.menu.setPosition(0,0);
		this.menu.setEnabled(true);
		this.backgroud.setPosition(cc.p(0, 0));
		this.adjustSizeForWindow();
		window.addEventListener("resize", function (event) {
            selfPointer.adjustSizeForWindow();
        });
        return true;
	},
	//刷新分数版
	refreshscore:function(){
		var score=this.game.getallscore();
		console.log(score);
		for(var i=1;i<=this.playernums;i++){
			if(i==1){
				this.labplayerscore.setString("score:"+score[this.game.getplayercolor(i)]);
			}else{
				this.scorelayers[i].setscore(score[this.game.getplayercolor(i)]);
				this.scorelayers[i].setblock(score[this.game.getplayercolor(i)]);
			}
		
		
		}
	
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