let cvs = document.getElementById("pong");
let ctx = cvs.getContext("2d");

function drawRect(x,y,w,h,c){
	ctx.fillStyle = c;
	ctx.fillRect(x,y,w,h);
	ctx.fill();
}

function drawNet(){
	for(let i=0;i<cvs.height;i+=15){
		drawRect(net.x,net.y+i,net.w,net.h,net.color)
	}
}

function drawCircle(x,y,r,c){
	ctx.fillStyle = c;
	ctx.beginPath();
	ctx.arc(x,y,r,0,360,false);
	ctx.closePath();
	ctx.fill();
}

function drawText(text,x,y,c){
	ctx.fillStyle = c;
	ctx.font = "30px fantasy";
	ctx.fillText(text,x,y)
}

function resetBall(){
	ball.x=cvs.width/2;
	ball.y=cvs.height/2;
}

function collision(b,p){
	p.top = p.y;
	p.bottom = p.y+p.height;
	p.left = p.x;
	p.right = p.x+p.width;

	b.top = b.y-b.r;
	b.bottom = b.y+b.r;
	b.left = b.x-b.r;
	b.right = b.x+b.r;

	return b.top<p.bottom && b.bottom>p.top && b.left<p.right && b.right>p.left;
}

function render(){
	drawRect(0,0,600,400,"black");
	drawRect(b1.x,b1.y,b1.w,b1.h,b1.color);
	drawRect(b2.x,b2.y,b2.w,b2.h,b2.color);
	drawNet();
	drawCircle(ball.x,ball.y,ball.r,ball.color);
	drawText(b1.score,cvs.width/4,50,"white");
	drawText(b2.score,cvs.width/4*3,50,"white");
}

function update(){
	b1.y= ball.y;
	b2.y=ball.y;
	ball.x+=ball.velocityX;
	ball.y+=ball.velocityY;
	let player = (ball.x<cvs.width/2)? b1 : b2;
	
	if(collision(ball,player)){
		console.log(true)
	}
	if(ball.y>cvs.height || ball.y<0){
		ball.velocityY=-ball.velocityY;
	}
	if(ball.x>cvs.width){
		b1.score+=1;
		resetBall();
	}else if(ball.x<0) {
		b2.score+=1;
		resetBall();
	}
}

function game(){
	update();
	render();
}

const ball = {
	x:cvs.width/2,
	y:cvs.height/2,
	r:20,
	color:"white",
	velocityX:10,
	velocityY:10,
}

const b1 = {
	x:0,
	y:cvs.height/2-50,
	w:10,
	h:100,
	color:"white",
	score:0,
}

const b2 = {
	x:cvs.width-10,
	y:cvs.height/2-50,
	w:10,
	h:100,
	color:"white",
	score:0,
}

const net = {
	x:cvs.width/2-1,
	y:0,
	w:2,
	h:10,
	color:"white",
}

let fps = 50;

setInterval(game, 1000/fps);