var MyDictionary = {
  init: function() {
    this.WORDS = [];

    this.btnAdd = $('#btnAdd');
    this.btnAddWord = $('#btnAddWord');    
    this.txtKeyword = $('#keyword');  
    this.lstWords = $('#lstWords');
    this.btnSaveChanges = $('#btnSaveChanges');

    this.selectedWordHeader = $('#selectedWordHeader');
    this.selectedWordMeaning= $('#selectedWordMeaning');

    this.initEvents();  
    this.loadWords();  
  },
  initEvents : function() {
    this.btnAdd.click(MyDictionary.insertNewWord);
    this.txtKeyword.keyup(MyDictionary.keywordChanged);

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
      let means = '';

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
        alert('Word already exists. Select to change it, or remove');
      }
    }
    else {
        alert('Word can\'t be empty');
    }    
    
  },
  updateWord: function(word) {
    let index = MyDictionary.getWordIndex(word);        
    if(index > -1) {
      // Update existing word
      let means = QUILL.root.innerHTML;       
      MyDictionary.WORDS[index].means = means;                
      MyDictionary.saveChanges();  
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
  },
  clearForm: function() {
    MyDictionary.txtKeyword.val('');    
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
    MyDictionary.lstWords.append('<li class="wordContainer" tabindex="-1"> <a href="#" tabindex="-1" id="wrd'+id+'" class="list-group-item list-group-item-action wordLink">'+word+'</a> <div id="btnRemoveWord'+id+'" class="btn btn-sm btn-warning wordRemoveButton">X</div> </li>');
    $('#wrd'+id).unbind();
    $('#wrd'+id).click(()=>{ MyDictionary.showMeaning(word); })
    $('#btnRemoveWord'+id).unbind();
    $('#btnRemoveWord'+id).click(()=>{ MyDictionary.removeWord(id);})
  },
  showMeaning: function(word) {    
    let wordIndex = MyDictionary.getWordIndex(word);        
    MyDictionary.selectedWordHeader.html(word);
    if(wordIndex > -1) {
      // MyDictionary.selectedWordMeaning.html(MyDictionary.WORDS[wordIndex].means);
      // QUILL.setText(MyDictionary.WORDS[wordIndex].means);
      const data = QUILL.clipboard.convert(MyDictionary.WORDS[wordIndex].means); 
      QUILL.setContents(data, 'silent');

      MyDictionary.btnSaveChanges.unbind();
      MyDictionary.btnSaveChanges.click(()=> { MyDictionary.updateWord(word) });

    } else {
      // MyDictionary.selectedWordMeaning.html('Word not exists');
      QUILL.setText('Word not exists');  
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

let QUILL = new Quill('#selectedWordMeaning', {
    theme: 'snow'
});
