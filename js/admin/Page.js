class Page {
    constructor(){
        this.$root = $("<div class='page'></div>");
    }

    get outerHTML(){
        return this.$root[0].outerHTML;
    }

    addItem(elem, x, y){
        elem.id = "item_" + new Date().getTime();
        elem.classList.add("page__item");
        elem.style.left = x + "px";
        elem.style.top = y + "px";
        this.$root.append( elem );
        return elem.id;
    }

    removeItem(id){
        this.$root.find("#" + id).remove();
    }

    addImage(url, x, y){
        let id = "item_" + new Date().getTime();
        this.$root.append(`<img id="${id}" src="${url}" class="page__item" style="left: ${x}px; top: ${y}px;">`);
        return id;
    }

    addVideo(url, x, y){
        let id = "item_" + new Date().getTime();
        let video = document.createElement("video");
        video.src = url;
        video.onloadedmetadata = () => {
            this.$root.append(`<div id="${id}" class="page__video" style="left: ${x}px; top: ${y}px;">
                                    <video src="${url}"></video>
                                    <input type="range" min="0" max="${ parseInt( video.duration ) }" step="1" value="0">
                                    <button>재생</button>
                                </div>`);
        };
        this.$root.append(`<script>
                                (()=>{
                                    let box = document.querySelector("#${id}");
                                    if(!box) return;

                                    let button = box.querySelector("button");
                                    let input = box.querySelector("input");
                                    let video = box.querySelector("video");
                                    button.innerText = "재생";
                                    video.pause();

                                    video.addEventListener("timeupdate", e => {
                                        input.value = parseInt(e.target.currentTime);
                                    });

                                    video.addEventListener("ended", e => {
                                        video.pause();
                                        input.value = 0;
                                        button.innerText = "재생";
                                    });

                                    button.addEventListener("click", e => {
                                        console.log(video.paused);
                                        if(video.paused){
                                            video.play();
                                            e.currentTarget.innerText = "일시정지";
                                        } else {
                                            video.pause();
                                            e.currentTarget.innerText = "재생";
                                        }
                                    });
                            
                                    input.addEventListener("input", e => {
                                        video.currentTime = e.target.value;
                                    });
                                })();
                            </script>`);
        return id;
    }
}