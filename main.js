let noteArea = document.querySelector(".note-area");
let title = document.querySelector(".title");
let textArea = document.querySelector(".textarea");
let notes = document.querySelector(".notes");
let note = document.querySelector(".note");




const hideNoteArea = () =>{
    textArea.style = "display: none";
    noteArea.classList.remove("note-now");
}
const getNotesFromStorage = ()=>{
    let oldNote;
    if(localStorage.getItem("notes") === null){
        oldNote=[];
    } else{
        oldNote = JSON.parse(localStorage.getItem("notes"));
    } oldNote.forEach(note => {
        notes.innerHTML += `
        <div class="note" id="note">
        <h3 class="title-text" id="title-text">${note[0]}</h3>
        <p class="note-blog">${note[1]}</p>
        <i class="fa fa-trash"></i>
    </div>
        
        `
    });
}
const deleteFromStorage = (deletedNote) =>{
    let oldNote;
    if(localStorage.getItem("notes") === null){
        oldNote=[];
    } else{
        oldNote = JSON.parse(localStorage.getItem("notes"));

}
oldNote.map((note, index)=>{
    if(note[0] == deletedNote.children[0].textContenet.trim()  && note[1] == deletedNote.children[1].textContenet.trim() ){
        oldNote.splice(index,1);
        return oldNote;
        

        
    }

});
    localStorage.setItem("notes", JSON.stringify(oldNote));
  
}

document.addEventListener("DOMContentLoaded", getNotesFromStorage);

const addNote = (t, n) =>{
    notes.innerHTML += `
    <div class="note" id="note">
    <h3 class="title-text" id="title-text">${t}</h3>
    <p class="note-blog">${n}</p>
    <i class="fa fa-trash"></i>
</div>
    
    `
    title.value = ""; textArea.value = "";
}

const addNoteToLocalStorage = (note)=>{
    if(note.length <0){
        return;
    }
    

    let oldNote;
    if(localStorage.getItem("notes") === null){
        oldNote=[];
    } else{
        oldNote = JSON.parse(localStorage.getItem("notes"));
    }
    oldNote.push(note);
    localStorage.setItem("notes", JSON.stringify(oldNote));

}

noteArea.addEventListener("click", () => {
    textArea.style = "display: block";
    noteArea.classList.add("note-now");
    title.setAttribute("placeholder","Title");
    title.style = "font-size:20px";
});

document.addEventListener("click", (event) =>{
    let isClicked = noteArea.contains(event.target);

    if (!isClicked){
        hideNoteArea();

        if(title.value.length === 0 && textArea.value.length === 0){
            return;
        }else{
            addNoteToLocalStorage([title.value, textArea.value]);
            addNote(title.value, textArea.value);


        }
       

    }
    
    

});

document.addEventListener("mouseover", (event) =>{
    if(event.target.classList.contains("note")){

        event.target.querySelector("i").classList.add("show");

    }

    

});

document.addEventListener("mouseout", (event) =>{
    if(event.target.classList.contains("note")){

        event.target.querySelector("i").classList.remove("show");
    }

    });

 document.addEventListener("click", (event)=>{
     if(event.target.classList.contains("fa-trash")){
         event.target.parentElement.remove();
         deleteFromStorage(event.target.parentElement);
     }
 })   