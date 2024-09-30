const board = document.querySelector('.board');
const addNoteButton = document.getElementById('addNote');

addNoteButton.addEventListener('click', () => {
    const note = document.createElement('div');
    note.classList.add('note');

    const textElement = document.createElement('div');

    textElement.classList.add('note-text'); 
    textElement.contentEditable = true;
    textElement.setAttribute('placeholder', 'Escribe tu nota aquí');

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('delete-button');
    deleteButton.innerHTML = 'x';

    deleteButton.addEventListener('click', () => {    
        board.removeChild(note);
        saveNotes();
    });

    note.appendChild(textElement);
    note.appendChild(deleteButton);
    board.prepend(note);

    // Focus when note is created
    textElement.focus(); 
    
    
    saveNotes();
});




const deleteAllNotesButton = document.getElementById('deleteAllNotes');

deleteAllNotesButton.addEventListener('click', () => {

    const confirmation = window.confirm('¿Estás seguro de que deseas eliminar todas las notas?');

    if(confirmation){
        const notes = document.querySelectorAll('.note');
        notes.forEach((note) => {
            board.removeChild(note);
        });
    }

    // Clear localstorage
    localStorage.removeItem('notes');
});


// Load notes from localstorage
function loadNotes() {
    const notes = localStorage.getItem('notes');
    if (notes) {
        board.innerHTML = notes;
    }
}

// Save notes on localstorage
function saveNotes() {
    const notes = board.innerHTML;
    localStorage.setItem('notes', notes);
}

//Load notes at start
loadNotes();



//CHANGE LANGUAGE

// Objeto con las traducciones
const translations = {
    en: {
        title: "Note Board",
        addNote: "Add note",
        deleteAllNotes: "Delete all notes",
        languageButton: "ES"
    },
    es: {
        title: "Tablón de Notas",
        addNote: "Añadir nota",
        deleteAllNotes: "Borrar todas las notas",
        languageButton: "EN"
    }
};

let currentLanguage = 'en';

function changeLanguage() {
    currentLanguage = currentLanguage === 'en' ? 'es' : 'en';
    updateTexts();
}

function updateTexts() {
    document.getElementById('title').textContent = translations[currentLanguage].title;
    document.getElementById('addNote').textContent = translations[currentLanguage].addNote;
    document.getElementById('deleteAllNotes').textContent = translations[currentLanguage].deleteAllNotes;
    
    const buttonContent = `<i class="fa-solid fa-globe"></i> ${translations[currentLanguage].languageButton}`;
    document.querySelector('#changeLanguage .button-content').innerHTML = buttonContent;
    
    document.documentElement.lang = currentLanguage;
}

document.getElementById('changeLanguage').addEventListener('click', changeLanguage);

document.addEventListener('DOMContentLoaded', updateTexts);