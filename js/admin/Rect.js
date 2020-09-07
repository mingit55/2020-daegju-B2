class Rect extends Tool {
    constructor(){
        super(...arguments);
    }

    onmousedown(e){
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.strokeStyle = this.editor.styleColor;
        this.ctx.lineWidth = this.editor.lineWidth;
        this.downXY = this.getXY(e);
    }

    onmousemove(e){
        let [x, y] = this.getXY(e);
        let [dx, dy] = this.downXY;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.strokeRect(dx, dy, x - dx, y - dy);
    }

    onmouseup(e){
        let url = this.canvas.toDataURL("image/png");
        this.page.addImage(url, 0, 0);
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.update();
    }
}