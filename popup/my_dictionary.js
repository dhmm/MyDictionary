var MyDictionary = {
  init: function() {
    this.pnlAddWord = $('#addWord');
    this.btnAdd = $('#btnAdd');
    this.btnAddWord = $('#btnAddWord');
    this.txtKeyword = $('#keyword');

    this.initEvents();    
  },
  initEvents : function() {
    this.btnAdd.click(MyDictionary.add);
    this.txtKeyword.keyup(MyDictionary.keywordChanged);
    this.btnAddWord.click(MyDictionary.addWord);
  },
  add: function() {
    MyDictionary.pnlAddWord.show();        
  },
  keywordChanged: function() {    
  },
  addWord: function() {
    MyDictionary.pnlAddWord.hide();    
  }
};

$(document).ready(()=> { 
  MyDictionary.init();
});


