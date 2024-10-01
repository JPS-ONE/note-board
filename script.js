const board = document.querySelector('.board');
const addNoteButton = document.getElementById('addNote');

function createNote(content = '') {
    const note = document.createElement('div');
    note.classList.add('note');

    const textElement = document.createElement('div');
    textElement.classList.add('note-text');
    textElement.contentEditable = true;
    textElement.setAttribute('placeholder', 'Escribe tu nota aquí');
    textElement.textContent = content;

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('delete-button');
    deleteButton.innerHTML = 'x';

    deleteButton.addEventListener('click', () => {
        board.removeChild(note);
        saveNotes(); 
    });

    // Update the note content on input event
    textElement.addEventListener('input', saveNotes);

    note.appendChild(textElement);
    note.appendChild(deleteButton);

    board.appendChild(note);

    textElement.focus(); //Focus on the new note
    
}

function saveNotes() {
    const notes = [];
    document.querySelectorAll('.note-text').forEach(note => {
        notes.push(note.textContent);
    });
    localStorage.setItem('notes', JSON.stringify(notes));
}

function loadNotes() {
    const notes = JSON.parse(localStorage.getItem('notes'));
    if (notes && Array.isArray(notes)) {
        // Clear the board before loading notes
        board.innerHTML = '';

        notes.forEach(noteContent => {
            createNote(noteContent);
        });
    }
}

addNoteButton.addEventListener('click', () => {
    createNote();
    saveNotes();
});

const deleteAllNotesButton = document.getElementById('deleteAllNotes');
deleteAllNotesButton.addEventListener('click', () => {
    const confirmation = window.confirm('¿Estás seguro de que deseas eliminar todas las notas?');
    if (confirmation) {
        board.innerHTML = '';
        localStorage.removeItem('notes');
    }
});


document.addEventListener('DOMContentLoaded', loadNotes);


// Language change functionality

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
    saveLanguage(); 
}

function saveLanguage() {
    localStorage.setItem('language', currentLanguage);
}

function loadLanguage() {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
        currentLanguage = savedLanguage;
    } else {
        currentLanguage = 'en';
    }
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

document.addEventListener('DOMContentLoaded', () => {
    loadLanguage();
    updateTexts();
});

