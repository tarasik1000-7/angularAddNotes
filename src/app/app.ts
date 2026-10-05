import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface Note {
  title: string;
  text: string;
}

@Component({
  selector: 'app-root',
  imports: [FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  title = '';
  text = '';

  notes: Note[] = [];

  constructor() {
    this.loadNotes();
  }

  addNote() {
    if (!this.title.trim() || !this.text.trim()) {
      return;
    }

    const newNote: Note = {
      title: this.title,
      text: this.text
    };

    this.notes.push(newNote);

    this.saveNotes();

    this.title = '';
    this.text = '';
  }

  deleteNote(index: number) {
    this.notes.splice(index, 1);

    this.saveNotes();
  }

  saveNotes() {
    localStorage.setItem('notes', JSON.stringify(this.notes));
  }

  loadNotes() {
    const savedNotes = localStorage.getItem('notes');

    if (savedNotes) {
      this.notes = JSON.parse(savedNotes);
    }
  }
}