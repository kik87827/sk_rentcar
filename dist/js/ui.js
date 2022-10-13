commonLayout();


function menuRock(item) {
  let itemObj = document.querySelector(item);
  if (itemObj !== null) {
    itemObj.classList.add("active");
  }
}

function commonLayout() {
  let bodyDOM = document.querySelector("body");
  bodyDOM.style.minWidth = (1920 - getScrollBarWidth()) + "px";
}
var dataTableFunc = {
  bindEvent() {
    addDynamicEventListener(document.body, 'click', '.fold_item', function(e) {
      e.preventDefault();

      let thisObj = e.target;
      let thisObjParent = thisObj.closest(".depth_one");
      let thisObjParentTarget = thisObjParent.nextElementSibling;

      if (thisObj.classList.contains(".fold_item")) {
        thisObj.classList.toggle("active");
      } else {
        thisObj.closest(".fold_item").classList.toggle("active");
      }
      thisObjParentTarget.classList.toggle("active");

    }, false);
    addDynamicEventListener(document.body, 'click', '[name="total_check"]', function(e) {
      let etarget = e.target;
      let etargetParent = etarget.closest(".data_table_wrap");
      let etargetBody = etargetParent.querySelector(".tbody_table_wrap");
      let etargetBodycheck = etargetBody.querySelectorAll(".design_check");
      etargetBodycheck.forEach((element) => {
        element.checked = etarget.checked;
      })
    }, false);
  },
  drawCallBack(target) {
    var targetObj = document.querySelector(target);
    if (targetObj === null) {
      return;
    }
    var thisHeadwrap = targetObj.querySelector(".thead_table_wrap");
    var thisBodywrap = targetObj.querySelector(".tbody_table_wrap");
    var thisFootwrap = targetObj.querySelector(".tfoot_table_wrap");
    var optionRow = parseInt(targetObj.getAttribute("data-row"));
    var getPosDom = thisBodywrap.querySelectorAll("tr:not(.depth_two)")[optionRow];
    if (getPosDom !== undefined) {
      thisBodywrap.style.maxHeight = getPosDom.offsetTop + "px";
      thisHeadwrap.style.paddingRight = getScrollBarWidth() + "px";
      thisFootwrap.style.paddingRight = getScrollBarWidth() + "px";
    }
    // console.log(target);
  }
}
// function dataTableFunc(){
//     let data_table_wrap = document.querySelectorAll(".data_table_wrap");
//     addDynamicEventListener(document.body, 'click', '.fold_item', function(e) {
//         e.preventDefault();

//         let thisObj = e.target;
//         let thisObjParent = thisObj.closest(".depth_one");
//         let thisObjParentTarget = thisObjParent.nextElementSibling;

//         if(thisObj.classList.contains(".fold_item")){
//             thisObj.classList.toggle("active");
//         }else{
//             thisObj.closest(".fold_item").classList.toggle("active");
//         }
//         thisObjParentTarget.classList.toggle("active");

//     },false);
//     data_table_wrap.forEach((element) => {
//         let thisTbwrap = element;
//         let thisHeadwrap = thisTbwrap.querySelector(".thead_table_wrap");
//         let thisBodywrap = thisTbwrap.querySelector(".tbody_table_wrap");
//         let thisFootwrap = thisTbwrap.querySelector(".tfoot_table_wrap");
//         let thisTotalCheck = thisHeadwrap.querySelector("[name='total_check']");
//         let thisBodyCheck = thisTbwrap.querySelectorAll(".design_check");
//         let optionRow = parseInt(thisTbwrap.getAttribute("data-row"));
//         let getPosDom = thisBodywrap.querySelectorAll("tr:not(.depth_two)")[optionRow];
//         if(getPosDom !== undefined){
//             thisBodywrap.style.maxHeight = getPosDom.offsetTop + "px";
//             thisHeadwrap.style.paddingRight = getScrollBarWidth() + "px";
//             thisFootwrap.style.paddingRight = getScrollBarWidth() + "px";
//         }

//         thisTotalCheck.addEventListener("click",(e)=>{
//             thisBodyCheck.forEach((element)=>{
//                 element.checked = thisTotalCheck.checked;
//             })
//         });
//     });
// }


function dynamicTab() {
  addDynamicEventListener(document.body, 'click', '[data-formTarget]', function(e) {
    tabRadioAction(e.target);
  });

  addDynamicEventListener(document.body, 'click', '.bartab_menu , .cont_tabmenu', function(e) {
    e.preventDefault();
    tabAction(e.target);
  });

  function tabAction(target) {
    let thisTab = target;
    let thisTabLi = thisTab.closest("li");
    let thisTabTarget = thisTab.getAttribute("href");
    let thisTabTargetDom = document.querySelector(thisTabTarget);
    let thisTabParent = thisTab.closest("[data-targetGroup]");
    let thisTabParentNot = siblings(thisTabLi);
    let thisTargetGroup = thisTabParent.getAttribute("data-targetGroup");
    let thisTargetGroupDom = document.querySelector(thisTargetGroup);
    let thisTargetGroupCont = [].slice.call(thisTargetGroupDom.children);
    thisTargetGroupCont.forEach((element) => {
      element.classList.remove("active");
    });
    thisTabTargetDom.classList.add("active");


    thisTabParentNot.forEach((element) => {
      element.classList.remove("active");
    });
    thisTabLi.classList.add("active");
  }

  function tabRadioAction(target) {
    let thisTab = target;
    let thisTabLi = thisTab.closest("li");
    let thisTabTarget = thisTab.getAttribute("data-formTarget");
    let thisTabTargetDom = document.querySelector(thisTabTarget);
    let thisTabParent = thisTab.closest("[data-formGroup]");
    let thisTabParentNot = siblings(thisTabLi);
    let thisTargetGroup = thisTabParent.getAttribute("data-formGroup");
    let thisTargetGroupDom = document.querySelector(thisTargetGroup);
    let thisTargetGroupCont = thisTargetGroupDom !== undefined ? [].slice.call(thisTargetGroupDom.children) : null;

    if (thisTab.disabled) {
      return;
    }
    thisTargetGroupCont.forEach((element) => {
      element.classList.remove("active");
    });
    thisTabTargetDom.classList.add("active");


    thisTabParentNot.forEach((element) => {
      element.classList.remove("active");
    });
    thisTabLi.classList.add("active");
  }
}

function siblings(t) {
  var children = t.parentElement.children;
  var tempArr = [];

  for (var i = 0; i < children.length; i++) {
    tempArr.push(children[i]);
  }

  return tempArr.filter(function(e) {
    return e != t;
  });
}

function getScrollBarWidth() {
  let outerDivitem = document.createElement('div');
  let innerDivitem = document.createElement('div');
  let getWidth = 0;
  outerDivitem.setAttribute("style", `width: 100px; overflow:scroll; height:100px;outline:1px solid red`)
  document.body.append(outerDivitem);
  outerDivitem.append(innerDivitem);
  innerDivitem.setAttribute("style", `width: 100%;height:110%;`)
  getWidth = innerDivitem.getBoundingClientRect().width;
  outerDivitem.remove();
  return 100 - getWidth;
};

let layerPopup = {
  show(option) {
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

    if (target_obj === null) {
      return;
    }
    target_dom = document.querySelector(option.target);

    modal.forEach((element) => {
      element.classList.remove("active");
    })
    target_dom.classList.add("active");
    setTimeout(() => {
      target_dom.classList.add("motion");
    }, 30);
    setTimeout(() => {
      if ("openCallback" in option) {
        option.openCallback();
      }
    }, 530);

    target_dom.style.minWidth = (1920 - getScrollBarWidth()) + "px";
    app_wrap.style.zIndex = "0";
    app_wrap.appendChild(target_dom);
    heightcheck();
    if (target_dom.classList.contains("fulltype")) {
      fullpop_titlow = target_dom.querySelector(".fullpop_titlow");
      fullpop_contlow = target_dom.querySelector(".fullpop_contlow");
      fullpop_item = target_dom.querySelector(".fullpop_item");
    }

    function heightcheck() {
      if (touchIs) {
        domBody.setAttribute("data-scr", window.pageYOffset);
        domBody.style.marginTop = -window.pageYOffset + "px";
        scrollValue = window.pageYOffset;
        domHtml.classList.add("touchDis");
      }
    }
  },
  hide(option) {
    var touchIs = "ontouchstart" in window,
      target_obj = option.target,
      target_dom = null,
      app_wrap = document.querySelector("#app");

    var domHtml = document.querySelector("html");
    var domBody = document.querySelector("body");

    console.log(1)
    if (target_obj !== null || target_obj.length > 0) {
      target_dom = document.querySelectorAll(option.target);
      target_dom.forEach((element) => {
        element.classList.remove("motion");
        setTimeout(() => {
          element.classList.remove("active");
        }, 530);
      })
      app_wrap.style.removeProperty('z-index')
      domBody.classList.remove("touchDis");
      scrollEnd();
      if ("closeCallback" in option) {
        option.closeCallback();
      }

      function scrollEnd() {
        if (touchIs) {
          domHtml.classList.remove("touchDis");
          domBody.style.marginTop = 0;
          window.scrollTo(0, parseInt(objThis.domBody.getAttribute("data-scr")));
        }
      }
    }
  },
  bindEvent() {
    var objThis = this;
    addDynamicEventListener(document.body, 'click', '.btn_layerclose , .closetrigger , .fullpop_dim', function(e) {
      let thisObj = e.target;
      let thisObjParent = thisObj.closest(".dimlayer_z");
      e.preventDefault();
      objThis.hide({
        target: "." + thisObjParent.classList[0]
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

DesignModal.prototype.initShow = function(option) {
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
  this.domBody.style.marginTop = -window.pageYOffset + "px";
  this.domHtml.classList.add("touchDis");
  this.design_modal_wrap = document.querySelector(".design_modal_wrap");
  this.closetrigger = document.querySelectorAll(".close_dmtrigger");
  this.design_modal_wrap.classList.add("active");
  setTimeout(function() {
    objThis.design_modal_wrap.classList.add("motion");
  }, 30);
  this.bindEvent(option);
}
DesignModal.prototype.removeHide = function() {
  var objThis = this;
  this.design_modal_wrap.classList.remove("motion");
  setTimeout(function() {
    objThis.design_modal_wrap.classList.remove("active");
    document.querySelector(".design_modal_insert_wrap").remove();
    objThis.design_modal_wrap.remove();
    objThis.domHtml.classList.remove("touchDis");
    objThis.domBody.style.marginTop = 0;

    window.scrollTo(0, Number(objThis.domBody.getAttribute("data-scr")));
  }, 530);
}
DesignModal.prototype.bindEvent = function(option) {
  var objThis = this;
  for (var i = 0; i < this.closetrigger.length; i++) {
    this.closetrigger[i].addEventListener("click", function() {
      objThis.removeHide();
    }, false);
  }
  if (this.btn_dmsmidentify !== null) {
    this.btn_dmsmidentify.addEventListener("click", function() {
      if (option.identify_callback !== undefined) {
        option.identify_callback();
      }
    }, false);
  }
  if (this.btn_dmsmcancel !== null) {
    this.btn_dmsmcancel.addEventListener("click", function() {
      if (option.cancel_callback !== undefined) {
        option.cancel_callback();
      }
    }, false);
  }
}

function callDimLayer(option) {
  const d_layer_call = document.querySelectorAll(".d_layer_call");
  const appwrap = document.querySelector("#app");
  let dim_layer_wrap = document.querySelector(".dim_layer_wrap");
  d_layer_call.forEach((element) => {
    // action(element);
    element.addEventListener("click", (e) => {
      let thisObj = e.currentTarget;
      action(thisObj);
    });
  });

  function action(target) {
    let d_parent = target.closest(".d_parent");
    let dim_pos_wrap = dim_layer_wrap.querySelector(".dim_pos_wrap");
    d_parent.classList.add("call_open");
    dim_layer_wrap.classList.add("active");
    dim_pos_wrap.setAttribute("style", `top:${d_parent.getBoundingClientRect().top + d_parent.getBoundingClientRect().height + 10}px;left:${d_parent.getBoundingClientRect().left}px`)
    $('input.date_range_input').trigger("focus");
  }
  // 달력
  $('input.date_range_input').daterangepicker({
    autoUpdateInput: false,
    showDropdowns: true,
    locale: {
      format: 'YYYY-MM-DD',
      "daysOfWeek": ["일", "월", "화", "수", "목", "금", "토"],
      "monthNames": ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"],
      cancelLabel: '취소',
      applyLabel: '적용'
    }
  });
  $("input.date_range_input").on('apply.daterangepicker', function(ev, picker) {
    $(this).val(picker.startDate.format('YYYY-MM-DD') + ' ~ ' + picker.endDate.format('YYYY-MM-DD'));
  });
  $("input.date_range_input").on('hide.daterangepicker', function(ev, picker) {
    $(".choice_date_box").text(picker.startDate.format('YYYY-MM-DD') + ' ~ ' + picker.endDate.format('YYYY-MM-DD'));
    $(".dim_layer_wrap").removeClass("active").css({
      top: '',
      left: ''
    });
    if ("hideCallback" in option) {
      option.hideCallback();
    }
  });
}


function singleCalendar(option) {
  $(option.target).daterangepicker({
    autoUpdateInput: true,
    showDropdowns: true,
    singleDatePicker: true,
    locale: {
      format: 'YYYY년 MM월 DD일',
      "daysOfWeek": ["일", "월", "화", "수", "목", "금", "토"],
      "monthNames": ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"],
      cancelLabel: '취소',
      applyLabel: '적용'
    }
  });
  $(option.target).on('apply.daterangepicker', function(ev, picker) {

  });
  $(option.target).on('hide.daterangepicker', function(ev, picker) {
    if ("hideCallback" in option) {
      option.hideCallback();
    }
  });
}