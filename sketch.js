var database, player, box, game, input, save, reset;

var playImg, settingImg, infoImg, backGui, boxImg, Font, acceptImg, matchbackground, ground, logoImg, treasure, treasurel, treasure1, treasure2;
var healthbarimg, healthbarback1, healthbarback2, healthbar1, healthbar2, restartbutton, player1name , player2name;
var player1idle, player1attack, player1die, player1jump, player1run, player1runleft, player1idleleft, player1attackleft, player1jumpleft;
var player2idle, player2attack, player2die, player2jump, player2run, player2runleft, player2idleleft, player2jumpleft, timer1, timer2;

var allPlayers, player1, player2, form2, players;

var names = [];
var playercount = 0;
var gamestate = 0;
var readyplayers = 0;
var player1health = 100;
var player2health = 100;
var player1face = "right";
var player2face = "right";

function preload() {
    logoImg = loadImage("Gui/logo.png");
    backGui = loadImage("Gui/background1.png");
    boxImg = loadImage("Gui/paused.png");
    acceptImg = loadImage("Gui/accept.png");
    matchbackground = loadImage("backgroud/back.png");

    //player1 animation
    player1idle = loadAnimation("characters/1/idle1.png", "characters/1/idle2.png", "characters/1/idle3.png", "characters/1/idle4.png",
        "characters/1/idle5.png", "characters/1/idle6.png", "characters/1/idle7.png");

    player1idleleft = loadAnimation("characters/1/idle1l.png", "characters/1/idle2l.png", "characters/1/idle3l.png", "characters/1/idle4l.png",
        "characters/1/idle5l.png", "characters/1/idle6l.png", "characters/1/idle7l.png");

    player1run = loadAnimation("characters/1/run1.png", "characters/1/run2.png", "characters/1/run3.png", "characters/1/run4.png",
        "characters/1/run5.png", "characters/1/run6.png", "characters/1/run7.png");

    player1runleft = loadAnimation("characters/1/run1l.png", "characters/1/run2l.png", "characters/1/run3l.png", "characters/1/run4l.png",
        "characters/1/run5l.png", "characters/1/run6l.png", "characters/1/run7l.png");

    player1attack = loadAnimation("characters/1/attack1.png", "characters/1/attack2.png", "characters/1/attack3.png", "characters/1/attack4.png",
        "characters/1/attack5.png", "characters/1/attack6.png", "characters/1/attack7.png");

    player1attackleft = loadAnimation("characters/1/attack1l.png", "characters/1/attack2l.png", "characters/1/attack3l.png", "characters/1/attack4l.png",
        "characters/1/attack5l.png", "characters/1/attack6l.png", "characters/1/attack7l.png");

    player1die = loadAnimation("characters/1/die1.png", "characters/1/die2.png", "characters/1/die3.png", "characters/1/die4.png",
        "characters/1/die5.png");

    player1jump = loadAnimation("characters/1/jump1.png", "characters/1/jump2.png", "characters/1/jump3.png", "characters/1/jump4.png",
        "characters/1/jump5.png", "characters/1/jump6.png");

    player1jumpleft = loadAnimation("characters/1/jump1l.png", "characters/1/jump2l.png", "characters/1/jump3l.png", "characters/1/jump4l.png",
        "characters/1/jump5l.png", "characters/1/jump6l.png")

    //player2 animations
    player2idle = loadAnimation("characters/3/idle1.png", "characters/3/idle2.png", "characters/3/idle3.png", "characters/3/idle4.png",
        "characters/3/idle5.png", "characters/3/idle6.png", "characters/3/idle7.png");

    player2idleleft = loadAnimation("characters/3/idle1l.png", "characters/3/idle2l.png", "characters/3/idle3l.png", "characters/3/idle4l.png",
        "characters/3/idle5l.png", "characters/3/idle6l.png", "characters/3/idle7l.png")

    player2run = loadAnimation("characters/3/run1.png", "characters/3/run2.png", "characters/3/run3.png", "characters/3/run4.png",
        "characters/3/run5.png", "characters/3/run6.png", "characters/3/run7.png");

    player2runleft = loadAnimation("characters/3/run1l.png", "characters/3/run2l.png", "characters/3/run3l.png", "characters/3/run4l.png",
        "characters/3/run5l.png", "characters/3/run6l.png", "characters/3/run7l.png")

    player2attack = loadAnimation("characters/3/attack1.png", "characters/3/attack2.png", "characters/3/attack3.png", "characters/3/attack4.png",
        "characters/3/attack5.png", "characters/3/attack6.png", "characters/3/attack7.png");

    player2attackleft = loadAnimation("characters/3/attack1l.png", "characters/3/attack2l.png", "characters/3/attack3l.png", "characters/3/attack4l.png",
        "characters/3/attack5l.png", "characters/3/attack6l.png", "characters/3/attack7l.png");

    player2die = loadAnimation("characters/3/die1.png", "characters/3/die2.png", "characters/3/die3.png", "characters/3/die4.png",
        "characters/3/die5.png", "characters/3/die6.png", "characters/3/die7.png");

    player2jump = loadAnimation("characters/3/jump1.png", "characters/3/jump2.png", "characters/3/jump3.png",
        "characters/3/jump4.png", "characters/3/jump5.png", "characters/3/jump6.png");

    player2jumpleft = loadAnimation("characters/3/jump1l.png", "characters/3/jump2l.png", "characters/3/jump3l.png",
        "characters/3/jump4l.png", "characters/3/jump5l.png", "characters/3/jump6l.png");

}
function setup() {
    createCanvas(displayWidth, displayHeight);

    //database
    database = firebase.database();

    //restart
    restartbutton = createImg("Gui/home.png");
    restartbutton.position(displayWidth + 225 , 75);
    restartbutton.size(75,75);

    //ground
    ground = createSprite(displayWidth / 2, displayHeight - 10, displayWidth, 20);
    ground.visible = false;

    //players
    player1 = createSprite(displayWidth, displayHeight);
    player1.addAnimation("1", player1idle);
    player1.addAnimation("2", player1idleleft);
    player1.addAnimation("3", player1run);
    player1.addAnimation("4", player1runleft);
    player1.addAnimation("6", player1attack);
    player1.addAnimation("7", player1attackleft);
    player1.addAnimation("8", player1die);
    player1.addAnimation("9", player1jump);
    player1.addAnimation("10", player1jumpleft);
    player1.scale = 0.25;
    player1.visible = false;
    player1.debug = true;
    player1.setCollider("rectangle", 0, 0, 800, 1000);


    player2 = createSprite(displayWidth, displayHeight);
    player2.addAnimation("6", player2idle);
    player2.addAnimation("7", player2idleleft);
    player2.addAnimation("8", player2run);
    player2.addAnimation("9", player2runleft);
    player2.addAnimation("11", player2attack);
    player2.addAnimation("12", player2attackleft);
    player2.addAnimation("13", player2die);
    player2.addAnimation("14", player2jump);
    player2.addAnimation("15", player2jumpleft);
    player2.scale = 0.25;
    player2.visible = false;
    player2.debug = true;
    player2.setCollider("rectangle", 0, 0, 800, 1000);

    //player
    player = new Player();

    //game object
    game = new Game();
    game.getstate();
    game.preStart();
    
}
function draw() {
    player.getplayername();
    
    restartbutton.mousePressed(() =>{
        game.reset();
    })

    if (readyplayers === 2) {
        game.updatestate(2);
    }
    if (gamestate == 2) {
        game.play();
    }
    if (player1health < 0) {
        player1.changeAnimation("8");
        alert(player2name + " Won!");
        game.end();
    }
    if (player2health < 0) {
        player2.changeAnimation("13");
        alert(player1name + " Won!")
        game.end();
    }
}
function keyReleased() {
    if (player.index === 1 && keyCode === 39) {
        player1.changeAnimation("1");
        player1face = "right";
    }
    if (player.index === 2 && keyCode == 39) {
        player2.changeAnimation("6");
        player2face = "right"
    }
    if (player.index === 1 && keyCode == 37) {
        player1.changeAnimation("2");
        player1face = "left";
    }
    if (player.index === 2 && keyCode == 37) {
        player2.changeAnimation("7");
        player2face = "left"
    }
    if (player.index === 1 && keyCode == 65 && player1face == "right") {
        player1.changeAnimation("1");
    }
    if (player.index === 2 && keyCode == 65 && player2face == "right") {
        player2.changeAnimation("6");
    }
    if (player.index === 1 && keyCode == 65 && player1face == "left") {
        player1.changeAnimation("2");
    }
    if (player.index === 2 && keyCode == 65 && player2face == "left") {
        player2.changeAnimation("7");
    }

    if (player.index === 1 && keyCode == 32 && player1face == "right") {
        player1.changeAnimation("1");
    }
    if (player.index === 2 && keyCode == 32 && player2face == "right") {
        player2.changeAnimation("6");
    }
    if (player.index === 1 && keyCode == 32 && player1face == "left") {
        player1.changeAnimation("2");
    }
    if (player.index === 2 && keyCode == 32 && player2face == "left") {
        player2.changeAnimation("7");
    }

    return false;
}