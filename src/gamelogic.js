function gamelogic(){
	var cellarr;//记录棋盘数据
	var playercardqueuearr;//玩家手牌队列
	var playercardhandarr;//玩家手牌数量
	var gamecard=new Array("1","2","3","4","5","6","7","8","9","A","B","C","D","E","F","G","H","I","★","♣","♥","♦","♠","☀","▲","●","■","♂");
	var turn=0;
	var playernums=0;
	this.init=function(nums){
		turn=0;
		playernums=nums;
		cellarr=new Array();
		playercardqueuearr=new Array();
		playercardhandarr=new Array();
		for(var i=0;i<9;i++){
			cellarr[i]=new Array();
			for(var j=0;j<9;j++){
				cellarr[i][j]=new cellblock();
			
			}
		}
		for(i=0;i<=nums;i++){
			playercardqueuearr[i]=gamecard.slice(0);
			playercardqueuearr[i].sort(randomsort);
			playercardhandarr[i]=new Array();
			playercardhandarr[i].push(
				playercardqueuearr[i].shift(),
				playercardqueuearr[i].shift(),
				playercardqueuearr[i].shift(),
				playercardqueuearr[i].shift(),
				playercardqueuearr[i].shift()
			);	
			//console.log(playercardqueuearr[i]);
			//console.log(playercardhandarr[i]);
		}
		
		
	};
	this.getplayercard=function(player){
		return 	playercardqueuearr[player-1];
	};
	this.putblock=function(player,symbol,x,y){
		cellarr[x][y].player=player;
		cellarr[x][y].blocker=symbol;
		console.log(cellarr[x][y]);
	};
	this.calcBlocksNums=function(player){
		var scorelist=new Array();
		var blockarr=new Array();
		var k=0;
		var l=0;
		for(var i=0;i<9;i++){
			for(var j=0;j<9;j++){
				if(i==0){
					if(j==0){
						if(cellarr[j][i].player==player){
							scorelist[k]=new Array();
							scorelist[k].push(j+i*9);
							blockarr[j+i*9]=k;
							l++;
						}					
					}
					else{
						if(cellarr[j][i].player==player){
							if(cellarr[j-1][i].player==player){
								var p = blockarr[j-1+i*9];
								scorelist[p].push(j+i*9);
								blockarr[j+i*9]=p;
							}
							else{
								k++;
								scorelist[k]=new Array();
								scorelist[k].push(j+i*9);
								blockarr[j+i*9]=k;
								l++;
							}
						}
					}
				}
				else if(j==0){
					if(cellarr[j][i].player==player){
						if(cellarr[j][i-1].player==player){
							scorelist[blockarr[j+(i-1)*9]].push(j+i*9);
							blockarr[j+i*9]=blockarr[j+(i-1)*9];
						}
						else{
							k++;
							scorelist[k]=new Array();
							scorelist[k].push(j+i*9);
							blockarr[j+i*9]=k;
						}
					}
				}else{
					if(cellarr[j][i].player==player){
						if(cellarr[j-1][i].player==player){
							if(cellarr[j][i-1].player==player){
								if(blockarr[j-1+i*9]==blockarr[j+(i-1)*9]){
									var p = blockarr[j-1+i*9];
									scorelist[p].push(j+i*9);
									blockarr[j+i*9]=p;
								}
								else{
									var p = blockarr[j-1+i*9];
									var q = blockarr[j+(i-1)*9]
									for(var t=0;t<scorelist[q].length;t++){
										blockarr[scorelist[q][t]]=p;
									}
									scorelist[p]=scorelist[p].concat(scorelist[q]);
									scorelist[q]=new Array();
									scorelist[p].push(j+i*9);
									blockarr[j+i*9]=p;
									l--;
								}	
							}else{
								var p = blockarr[j-1+i*9];
								scorelist[p].push(j+i*9);
								blockarr[j+i*9]=p;
							}	
						}else if(cellarr[j][i-1].player==player){
							var p = blockarr[j+(i-1)*9];
							scorelist[p].push(j+i*9);
							blockarr[j+i*9]=p;
						}
						else{
							k++;
							scorelist[k]=new Array();
							scorelist[k].push(j+i*9);
							blockarr[j+i*9]=k;
							l++;
						}
					}
				}
			}
		}
		return l;
	};
	this.getallscore=function(){
		var score= new Array();
		for(var i=1;i<=playernums;i++){
			score[i]=this.calcBlocksNums(i);
			
		
		}
		return score;
	}
	
	
}
function cellblock(){
	this.player=0;
	this.blocker="";

}
function randomsort(a, b) {
return Math.random()>.5 ? -1 : 1;//用Math.random()函数生成0~1之间的随机数与0.5比较，返回-1或1
}
