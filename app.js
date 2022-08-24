const PANEL_DIV_ID = '__MY_DICTIONARY_MAIN_PANEL__';
const panelDivHTML = '<div id="'+PANEL_DIV_ID+'">TT</div>';
const panelDivCSS = {
  'display':'block' ,
  'position':'fixed' ,
  'z-index':'99999' ,
  'background':'#123456' ,
  'opacity':'0.8' ,
  'width':'300px' ,
  'height':'100vh' ,
  'top':'0px' ,
  'right':'0px' 
};
var Panel = {  
  init: function() {     
    this.mainDiv =  document.createElement('div');
    

    this.panelDiv = document.createElement('div');
    this.panelDiv.id = PANEL_DIV_ID;
    this.mainDiv.appendChild(this.panelDiv);

    this.panelDiv = $('#'+PANEL_DIV_ID);
    this.panelDiv.css(panelDivCSS);
    this.panelDiv.html("GGG");

    document.body.appendChild(this.mainDiv);
  },
  show: function() {},
  hide: function() {}
}

// var SelectedWord = {
//   showSelection: function() {
//     alert('ok');
//   },
//   getSelection : function(e) {
//     var focused_window = document.commandDispatcher.focusedWindow;
//     var sel_text = content.getSelection();
//     alert(sel_text);

//     //return sel_text.toString();  
//   }
// }

// window.addEventListener("select", function(e) { SelectedWord.showSelection(); }, false);
console.log('LOADED');
Panel.init();

// document.addEventListener("mouseup", function(event) {
//   if(event.ctrlKey) {
//   var text = window.getSelection().toString();
//   alert(text);

//   }
// }, false);

// const div1 = document.createElement('div');
// div1.innerHTML = `<div style="display:block; position:fixed; z-index:99999; background:#123456; opacity:0.8; width:300px; height:100vh; top:0px; right:0px; ">Last element</div>`;


// // ✅ Insert element as last in body
// document.body.appendChild(div1);