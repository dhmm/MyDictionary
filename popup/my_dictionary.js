var MyDictionary = {
  init: function() {
    this.WORDS = [];

    this.pnlAddWord = $('#addWord');
    this.btnAdd = $('#btnAdd');
    this.btnAddWord = $('#btnAddWord');
    this.txtKeyword = $('#keyword');
    this.txtaAddWord = $('#txtaAddWord');
    this.lstWords = $('#lstWords');

    this.selectedWordHeader = $('#selectedWordHeader');
    this.selectedWordMeaning= $('#selectedWordMeaning');

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
  hideAddPanel: function() {
    MyDictionary.pnlAddWord.hide();        
  },
  keywordChanged: function() { 
    var filter = MyDictionary.txtKeyword.val();
    MyDictionary.showWordsInList(filter);
  },
  isEmpty : function() {
    if(!$('#keyword').val()) {
      return true;
    } else {
      return false;
    }
  },
  getWordIndex: function (word) {
    if(MyDictionary.WORDS === undefined) {
      return -1;
    }
    for(let i =0 ; i < MyDictionary.WORDS.length;i++) {
      if(MyDictionary.WORDS[i].word == word) {        
        return i;
      }
    }
    return -1;
  },
  getKeywordWordIndexIfExists: function() {    
    let value = MyDictionary.txtKeyword.val();
    return MyDictionary.getWordIndex(value);
  },
  insertNewWord: function() {            
    MyDictionary.txtKeyword.val(MyDictionary.txtKeyword.val().trim());
    
    if(! MyDictionary.isEmpty()){
      let itemIndexIfExists = MyDictionary.getKeywordWordIndexIfExists();

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
        MyDictionary.showMeaning(word)
      }
    }
    else {
        alert('Word can\'t be empty');
    }    
    
  },
  saveChanges: function() {       
    browser.storage.local.set({
      WORDS: MyDictionary.WORDS
    })
    .then(()=>{
      MyDictionary.loadWords();
    });
    MyDictionary.clearForm();
    MyDictionary.hideAddPanel();
    
  },
  clearForm: function() {
    MyDictionary.txtKeyword.val('');
    MyDictionary.txtaAddWord.val('');
  },
  loadWords: function() {
    MyDictionary.WORDS = [];
    browser.storage.local.get("WORDS").then((words)=> {
      MyDictionary.WORDS = words.WORDS;
    }).then(()=>{
      MyDictionary.showWordsInList();
    });

    
  },
  showWordsInList: function(filter ='') {
    MyDictionary.lstWords.html('');
    if(MyDictionary.WORDS === undefined ) {
      return;
    }
    let index = 0;
    for(var i=0;i<MyDictionary.WORDS.length;i++) {
      let word = MyDictionary.WORDS[i].word;
      if(word.includes(filter)) {
        MyDictionary.appendWordTolist(index,word);
        index++;
      }
    }    
  },
  appendWordTolist(id, word) {
    MyDictionary.lstWords.append('<li class="wordContainer"> <a href="#" id="wrd'+id+'" class="list-group-item list-group-item-action wordLink">'+word+'</a> <div id="btnRemoveWord'+id+'" class="btn btn-sm btn-warning wordRemoveButton">X</div> </li>');
    $('#wrd'+id).click(()=>{ MyDictionary.showMeaning(word) })
    $('#btnRemoveWord'+id).click(()=>{ MyDictionary.removeWord(id) })
  },
  showMeaning: function(word) {    
    let wordIndex = MyDictionary.getWordIndex(word);        
    MyDictionary.selectedWordHeader.html(word);
    if(wordIndex > -1) {
      MyDictionary.selectedWordMeaning.html(MyDictionary.WORDS[wordIndex].means);
      
    } else {
      MyDictionary.selectedWordMeaning.html('Word not exists');
    }
  },
  removeWord(id) {
    MyDictionary.WORDS.splice(id,1);
    MyDictionary.saveChanges();    
  },
};

$(document).ready(()=> { 
  MyDictionary.init();    
});


