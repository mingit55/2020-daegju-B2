class Rect extends Tool {
    constructor(){
        super(...arguments);
    }

    onmousedown(e){
        if(this.isDown) return;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.strokeStyle = this.editor.styleColor;
        this.ctx.lineWidth = this.editor.lineWidth;
        this.downXY = this.getXY(e);
        this.isDown = true;
    }

    onmousemove(e){
        if(!this.isDown) return;
        let [x, y] = this.getXY(e);
        let [dx, dy] = this.downXY;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.strokeRect(dx, dy, x - dx, y - dy);
    }

    onmouseup(e){
        if(!this.isDown) return;
        let url = this.canvas.toDataURL("image/png");
        this.page.addImage(url, 0, 0);
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.update();
        this.isDown = false;
    }
}