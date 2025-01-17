import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import noteService from './noteService'
import { extractErrorMessage } from '../../utils'

const initialState = {
  notes: [],
  isError: false,
  isSuccess: false,
  message: '',
}

// get user ticket notes
export const getNotes = createAsyncThunk('notes/getAll', async (ticketId, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token
    return await noteService.getNotes(ticketId, token)
  } catch (error) {
    console.log(error)
    return thunkAPI.rejectWithValue(extractErrorMessage(error))
  }
})

// create new note
export const createNote = createAsyncThunk(
  'notes/create',
  async ({ noteText, ticketId }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await noteService.createNote(noteText, ticketId, token)
    } catch (error) {
      console.log(error)
      return thunkAPI.rejectWithValue(extractErrorMessage(error))
    }
  }
)

const noteSlice = createSlice({
  name: 'note',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },

  extraReducers: (builder) => {
    builder
      .addCase(getNotes.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getNotes.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.notes = action.payload
      })
      .addCase(getNotes.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })

      // create note
      .addCase(createNote.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createNote.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.notes.push(action.payload)
      })
      .addCase(createNote.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset } = noteSlice

export default noteSlice.reducer
