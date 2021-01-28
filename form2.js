class Form2 {
    constructor() {
        player.getreadyplayers();

        //logo
        this.logo = createSprite(400,250);
        this.logo.addImage(logoImg);
        this.logo.scale = 1;
        
        // play button
        this.playbutton = createImg("Gui/pre-play.png");
        this.playbutton.position(displayWidth / 2 + 350, displayHeight - 150);
        this.playbutton.size(100, 100);

        
    }
    display() {
        background(backGui);
        this.playbutton.mousePressed(() => {
            readyplayers += 1;
            player.updatereadyplayers(readyplayers);
        })
        drawSprites();
    }
    hide() {
        this.logo.visible = false;
        this.playbutton.hide();
    }
}