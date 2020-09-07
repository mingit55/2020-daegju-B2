class Circle extends Tool {
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

        let radius = Math.sqrt( Math.pow(x - dx, 2) + Math.pow(y - dy, 2) );

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.beginPath();
        this.ctx.arc(dx, dy, radius, 0, Math.PI * 2);
        this.ctx.stroke();
    }

    onmouseup(){
        let url = this.canvas.toDataURL("image/png");
        this.page.addImage(url, 0, 0);

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.update();
    }
}