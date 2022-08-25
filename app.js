const PANEL_DIV_ID = '__MY_DICTIONARY_MAIN_PANEL__';
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
console.log('LOADED');
Panel.init();