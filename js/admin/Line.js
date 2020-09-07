class Line extends Tool {
    constructor(){
        super(...arguments);
    }

    onmousedown(e){
        let [x, y] = this.getXY(e);
        
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.lineWidth = this.editor.lineWidth;
        this.ctx.strokeStyle = this.editor.styleColor;
        this.ctx.beginPath();
        this.ctx.moveTo(x, y);
    }

    onmousemove(e){
        let [x, y] = this.getXY(e);
        this.ctx.lineTo(x, y);
        this.ctx.stroke();
    }

    onmouseup(){       
        let url = this.canvas.toDataURL("image/png");
        this.page.addImage(url, 0, 0);
        
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.update();
    }
}