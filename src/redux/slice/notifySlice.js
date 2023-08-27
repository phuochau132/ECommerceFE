import { createSlice } from '@reduxjs/toolkit'
const initialState = {
  title: '',
  content: '',
  color:''
}
const NotifySlice = createSlice({
    name: 'notify',
    initialState,
    reducers: {
      addNotify: (state, action) => {
        let stateNew = action.payload
        state.title = stateNew.title
        state.content = stateNew.content
        state.color = stateNew.color

      },
      removeNotify: (state, action) =>{
        state.title = ''
        state.content = ''
        state.color = ''
      }
    }
  })
  
export const { addNotify, removeNotify } = NotifySlice.actions

export default NotifySlice.reducer
