

function menuRock(item){
    let itemObj = document.querySelector(item);
    if(itemObj !== null){
        itemObj.classList.add("active");
    } 
}

let layerPopup = {
    show(option){
        var touchIs = "ontouchstart" in window,
			modal = document.querySelectorAll(".dimlayer_z"),
			target_obj = option.target,
			target_dom = null,
			app_wrap = document.querySelector("#app"),
			fullpop_item = null,
			fullpop_titlow = null,
			fullpop_contlow = null;

        
        var domHtml = document.querySelector("html");
        var domBody = document.querySelector("body");
       
        if(target_obj !== null){
            target_dom = document.querySelector(option.target);
        }
        
        modal.forEach((element)=>{
            element.classList.remove("active");
        })
        target_dom.classList.add("active");
        setTimeout(()=>{
            target_dom.classList.add("motion");
        },30);
        setTimeout(()=>{
            if("openCallback" in option){
                option.openCallback();
            }
        },530);
        
        
        app_wrap.style.zIndex = "0";
        app_wrap.appendChild(target_dom);
        heightcheck();
        if(target_dom.classList.contains("fulltype")){
            fullpop_titlow = target_dom.querySelector(".fullpop_titlow");
            fullpop_contlow = target_dom.querySelector(".fullpop_contlow");
            fullpop_item = target_dom.querySelector(".fullpop_item");
        }
       
        function heightcheck(){
            if(touchIs){
                domBody.setAttribute("data-scr", window.pageYOffset);
                domBody.style.marginTop = -window.pageYOffset+"px";
                scrollValue = window.pageYOffset;
                domHtml.classList.add("touchDis");
            }
        }
    },
    hide(option){
        var touchIs = "ontouchstart" in window,
            target_obj = option.target,
			target_dom = null,
            app_wrap = document.querySelector("#app");
        
        var domHtml = document.querySelector("html");
        var domBody = document.querySelector("body");

        console.log(1)
        if(target_obj !== null || target_obj.length>0){
            target_dom = document.querySelectorAll(option.target);
            target_dom.forEach((element)=>{
                element.classList.remove("motion");
                setTimeout(()=>{
                    element.classList.remove("active");
                },530);
            })
            app_wrap.style.removeProperty('z-index')
            domBody.classList.remove("touchDis");
            scrollEnd();
            if("closeCallback" in option){
                option.closeCallback();
            }
            function scrollEnd(){
                if(touchIs){
                    domHtml.classList.remove("touchDis");
                    domBody.style.marginTop = 0;
                    window.scrollTo(0, parseInt(objThis.domBody.getAttribute("data-scr")));
                }
            }
        }
    },
    bindEvent(){
        var objThis = this;
        addDynamicEventListener(document.body, 'click', '.btn_layerclose , .closetrigger , .fullpop_dim', function (e) {
            let thisObj = e.target;
            let thisObjParent = thisObj.closest(".dimlayer_z");
            e.preventDefault();
            objThis.hide({
                target : "."+thisObjParent.classList[0]
            });
        });
    }
}

layerPopup.bindEvent();



function DesignModal(option) {
    this.message = option.message;
    this.domHtml = document.querySelector("html");
    this.domBody = document.querySelector("body");
    this.pagewrap = document.querySelector("#app");
    this.design_modal_wrap = null;
    this.btn_dmsmidentify = null;
    this.btn_dmsmcancel = null;
    this.duration = option.duration !== undefined ? option.duration : 400;

    this.initShow(option);
}

DesignModal.prototype.initShow = function (option) {
    var innerPublish = '';
	var objThis = this;
    innerPublish += "<div class='design_modal_wrap'>";
    innerPublish += "  <div class='bg_design_modal'></div>";
    innerPublish += "  <div class='design_modal_tb'>";
    innerPublish += "      <div class='design_modal_td'>";
    innerPublish += "          <div class='design_modal'>";
    innerPublish += "              <div class='design_modal_cont_w'><div class='design_modal_text'></div></div>";
    innerPublish += "              <div class='btn_dmsm_wrap'>";
    innerPublish += "                  <a href='javascript:;' class='btn_dmsm close_dmtrigger btn_dmsmidentify'>확인</a>";
    if (option.type === "confirm") {
        innerPublish += "              <a href='javascript:;' class='btn_dmsm close_dmtrigger btn_dmsmcancel'>취소</a>";
    }
    innerPublish += "              </div>";
    innerPublish += "          </div>";
    innerPublish += "      </div>";
    innerPublish += "  </div>";
    innerPublish += "</div>";
    this.modalparent = document.createElement('div');
    this.pagewrap.appendChild(this.modalparent);
    this.modalparent.classList.add("design_modal_insert_wrap");
    this.modalparent.innerHTML = innerPublish;

    if (option.type === "confirm" || option.type === "alert") {
        this.design_modal_text = document.querySelector(".design_modal_text");
        this.btn_dmsmidentify = document.querySelector(".btn_dmsmidentify");
        this.design_modal_text.innerHTML = option.message;
    }
    if (option.type === "confirm") {
        this.btn_dmsmcancel = document.querySelector(".btn_dmsmcancel");
    }
    this.pagewrap.style.zIndex = 0;
    this.domBody.setAttribute("data-scr", window.pageYOffset);
    this.domBody.style.marginTop = -window.pageYOffset+"px";
    this.domHtml.classList.add("touchDis");
    this.design_modal_wrap = document.querySelector(".design_modal_wrap");
    this.closetrigger = document.querySelectorAll(".close_dmtrigger");
	this.design_modal_wrap.classList.add("active");
	setTimeout(function(){
		objThis.design_modal_wrap.classList.add("motion");
	},30);
    this.bindEvent(option);
}
DesignModal.prototype.removeHide = function () {
	var objThis = this;
	this.design_modal_wrap.classList.remove("motion");
	setTimeout(function(){
		objThis.design_modal_wrap.classList.remove("active");
    	document.querySelector(".design_modal_insert_wrap").remove();
		objThis.design_modal_wrap.remove();
		objThis.domHtml.classList.remove("touchDis");
		objThis.domBody.style.marginTop = 0;
		
		window.scrollTo(0, Number(objThis.domBody.getAttribute("data-scr")));
	},530);
}
DesignModal.prototype.bindEvent = function (option) {
    var objThis = this;
    for (var i = 0; i < this.closetrigger.length; i++) {
        this.closetrigger[i].addEventListener("click", function () {
            objThis.removeHide();
        }, false);
    }
    if (this.btn_dmsmidentify !== null) {
        this.btn_dmsmidentify.addEventListener("click", function () {
            if (option.identify_callback !== undefined) {
                option.identify_callback();
            }
        }, false);
    }
    if (this.btn_dmsmcancel !== null) {
        this.btn_dmsmcancel.addEventListener("click", function () {
            if (option.cancel_callback !== undefined) {
                option.cancel_callback();
            }
        }, false);
    }
}