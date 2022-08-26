var MyDictionary = {
  init: function() {
    this.WORDS = [];

    this.pnlAddWord = $('#addWord');
    this.btnAdd = $('#btnAdd');
    this.btnAddWord = $('#btnAddWord');
    this.txtKeyword = $('#keyword');

    this.initEvents();  
    this.loadWords();  
  },
  initEvents : function() {
    this.btnAdd.click(MyDictionary.showAddPanel);
    this.txtKeyword.keyup(MyDictionary.keywordChanged);
    this.btnAddWord.click(MyDictionary.insertNewWord);
  },
  showAddPanel: function() {
    MyDictionary.pnlAddWord.show();        
  },
  keywordChanged: function() { 

  },
  isEmpty : function() {
    if(!$('#keyword').val()) {
      return true;
    } else {
      return false;
    }
  },
  getWordIndexIfExists: function() {
    if(MyDictionary.WORDS === undefined) {
      return -1;
    }
    let value = MyDictionary.txtKeyword.val();
    for(let i =0 ; i < MyDictionary.WORDS.length;i++) {
      if(MyDictionary.WORDS[i].word == value) {        
        return i;
      }
    }
    return -1;
  },
  insertNewWord: function() {            
    MyDictionary.txtKeyword.val(MyDictionary.txtKeyword.val().trim());
    
    if(! MyDictionary.isEmpty()){
      let itemIndexIfExists = MyDictionary.getWordIndexIfExists();

      let word = $('#keyword').val();
      let means = $('#txtaAddWord').val();

      if(itemIndexIfExists == -1) {
        if(MyDictionary.WORDS === undefined) {
          MyDictionary.WORDS = [];
        }
        //Insert a new word        
        MyDictionary.WORDS.push({ word:word , means:means });    
        MyDictionary.saveChanges();    
      }
      else
      {        
        //Update existing word
        MyDictionary.WORDS[itemIndexIfExists].means = means;
        MyDictionary.saveChanges();  
      }
    }
    else {
        alert('Word can\'t be empty');
    }    
    
  },
  saveChanges: function() {       
    browser.storage.local.set({
      WORDS: MyDictionary.WORDS
    });    
  },
  loadWords: function() {
    browser.storage.local.get("WORDS").then((words)=> {
      MyDictionary.WORDS = words.WORDS;
    });

    
  }
};

$(document).ready(()=> { 
  MyDictionary.init();    
});


