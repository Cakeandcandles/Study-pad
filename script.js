let noteNumber = parseInt(localStorage.getItem('noteNumber')) || 1;
let currentNote = parseInt(localStorage.getItem('currentNote')) || 1;

const noteArea = document.getElementById('notes');
const header = document.getElementById('header');
const oldNotesContainer = document.getElementById('old-notes');


function loadNote(num) {
    const note = localStorage.getItem(`note${num}`) || "";
    noteArea.value = note;
    header.textContent = `Note ${num}`;
    currentNote = num;
    localStorage.setItem('currentNote', num);
}

function saveNote() {
    localStorage.setItem(`note${currentNote}`, noteArea.value);
}

function createNoteButton(num) {
    const btn = document.createElement('button');
    btn.textContent = `Note ${num}`;
    btn.style.padding = '12px';
    btn.style.border = 'none';
    btn.style.borderRadius = '8px';
    btn.style.background = '#fff';
    btn.style.cursor = 'pointer';
    btn.style.fontSize = '1rem';
    btn.style.boxShadow = '0 1px 4px rgba(0,0,0,0.1)';
    btn.style.transition = 'background 0.2s';
    btn.addEventListener('click', () => {
        saveNote();
        loadNote(num);
    });
    btn.addEventListener('mouseover', () => {
        btn.style.background = '#e2c275';
    });
    btn.addEventListener('mouseout', () => {
        btn.style.background = '#fff';
    });
    oldNotesContainer.appendChild(btn);
}

function loadAllNoteButtons() {
    for (let i = 1; i <= noteNumber; i++) {
        createNoteButton(i);
    }
}

document.getElementById('save-btn').addEventListener('click', (e) => {
    e.preventDefault();
    saveNote();
});

document.getElementById('new-note').addEventListener('click', () => {
    saveNote();
    noteNumber++;
    localStorage.setItem('noteNumber', noteNumber);
    createNoteButton(noteNumber);
    loadNote(noteNumber);
    noteArea.value = ""; 
});


loadAllNoteButtons();
loadNote(currentNote);

// This is the timer stuff

let timerDuration = 30 * 60; // 30 minutes in seconds
let timerRemaining = timerDuration;
let timerInterval = null;
let isRunning = false;

function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

function startPauseTimer() {
    const button = document.getElementById('timer-toggle');
    const display = document.getElementById('time');

    if (isRunning) {
        // Pause the timer
        clearInterval(timerInterval);
        isRunning = false;
        button.textContent = 'Start Timer';
    } else {
        // Start the timer
        isRunning = true;
        button.textContent = 'Pause Timer';
        timerInterval = setInterval(() => {
            if (timerRemaining <= 0) {
                clearInterval(timerInterval);
                display.textContent = 'Time\'s up!';
                button.textContent = 'Start Timer';
                isRunning = false;
                timerRemaining = timerDuration;
            } else {
                timerRemaining--;
                display.textContent = formatTime(timerRemaining);
            }
        }, 1000);
    }
}

document.getElementById('timer-toggle').addEventListener('click', startPauseTimer);