var bird, birdImg;
var bgImg;
var ground, groundImg, invisground;
var Vpillar, Hpillar, VpillarImg, HpillarImg;
var VpillarGroup, HpillarGroup;
var play = 1;
var end = 0;
var gameState = play;
var gameOver, restart;
var gameOverImg, restartImg;
var score = 0;


function preload(){
    birdImg = loadImage ("images/bird.png");
    bgImg = loadImage ("images/bg.png");
    groundImg = loadImage ("images/ground.png");
    VpillarImg = loadImage ("images/pipeSouth.png");
    HpillarImg = loadImage ("images/pipeNorth1.png");
    gameOverImg = loadImage ("images/gameover.png");
    restartImg = loadImage ("images/restart.png");
}

function setup(){
    var canvas = createCanvas (800, 800);
    bird = createSprite (50, 400, 20, 20);
    bird.addImage (birdImg);
    bird.scale = 1.5;

    ground = createSprite (800, 750, 2000, 30);
    ground.addImage (groundImg);
    ground.x = ground.width /2;
    ground.velocityX = -5;

    VpillarGroup = new Group();
    HpillarGroup = new Group();

    gameOver = createSprite (300, 350);
    gameOver.addImage (gameOverImg);
    restart = createSprite (550, 350);
    restart.scale = 0.3;
    restart.addImage (restartImg);
    gameOver.visible = false;
    restart.visible = false;

}

function draw(){
    background (bgImg);
    text ("Score : " + score, 100, 400);

    if (gameState === play){
        if (frameCount %60 === 0){
            score = score +1;
        }
        if (ground.x < 200){
            ground.x = ground.width /2;
        }
        if (keyDown ("space")){
            bird.velocityY = -10;
        }

        bird.velocityY = bird.velocityY +0.8;

        spawnVpillars();
        spawnHpillars();

        if (VpillarGroup.isTouching (bird) || HpillarGroup.isTouching (bird)){
            gameState = end;
        }
    }
    else if (gameState === end){
        gameOver.visible = true;
        restart.visible = true;
        ground.velocityX = 0;
        bird.VelocityY = 0;
        VpillarGroup.setVelocityXEach (0);
        HpillarGroup.setVelocityXEach (0);
        VpillarGroup.setLifetimeEach (-1);
        HpillarGroup.setLifetimeEach (-1);
        if (mousePressedOver (restart)){
            reset();
        }
    }

    bird.collide (ground);

    spawnVpillars();
    spawnHpillars();
    drawSprites();
}

function spawnVpillars(){
    if (frameCount %60 === 0){
        Vpillar = createSprite (800, 600, 30, 10);
        Vpillar.addImage (VpillarImg);
        Vpillar.scale = 0.8;
        Vpillar.velocityX = -5;
        Vpillar.lifetime = 900;
        VpillarGroup.add (Vpillar);
    }
}

function spawnHpillars(){
    if (frameCount %60 === 0){
        Hpillar = createSprite (800, 150, 30, 20);
        Hpillar.addImage (HpillarImg);
        Hpillar.scale = 0.8;
        Hpillar.velocityX = -5;
        Hpillar.lifetime = 900;
        HpillarGroup.add (Hpillar);
    }
}

function reset(){
    gameState = play;
    gameOver.visible = false;
    restart.visible = false;
    VpillarGroup.destroyEach();
    HpillarGroup.destroyEach();
    score = 0;
}