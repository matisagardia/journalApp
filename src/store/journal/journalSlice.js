import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isSaving: false,
    messageSaved: '',
    notes: [],
    active: {
        id: '',
        title: '',
        body: '',
        date: 1234,
        imageUrls: []
    }
}

export const journalSlice = createSlice({
  name: 'journal',
  initialState,
  reducers: {
    savingNewNote: (state) => {
        state.isSaving = true;
    },
    addNewEmptyNote: (state, action) => {
        state.notes.push(action.payload);
        state.isSaving = false;
    },
    setActiveNote: (state, action) => {
        state.active = action.payload
        state.messageSaved = '';
    },
    setNotes: (state, action) => {
        state.notes = (action.payload);
    },
    setSaving: (state) => {
        state.isSaving = true;
        state.messageSaved = '';
    },
    noteUpdated: (state, action) => {
        state.isSaving = false;
        state.notes = state.notes.map(note => {

            if(note.id === action.payload.id) {
                return action.payload;
            }

            return note;
        });

        state.messageSaved = `${action.payload.title} has been updated.`

    },
    setPhotosToActiveNote: (state, action) => {
        state.active.imageUrls = [...state.active.imageUrls, ...action.payload];
        state.isSaving = false;
    },
    deleteNoteById: (state, action) => {
        state.active = null;
        state.notes = state.notes.filter(note => (note.id !== action.payload));
    },

    clearNotesAtLogout: (state) => {
        state.isSaving = false;
        state.messageSaved = '';
        state.notes = [];
        state.active = null;
    }
  }
});

export const {
        savingNewNote,
        addNewEmptyNote,
        setActiveNote,
        setNotes,
        setSaving,
        noteUpdated,
        deleteNoteById,
        setPhotosToActiveNote,
        clearNotesAtLogout
            } = journalSlice.actions;

