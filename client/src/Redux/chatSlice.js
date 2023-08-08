import { createAsyncThunk ,createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
const {VITE_URL} = import.meta.env;

const initialState = {
  isMinimized: false,
  error:"",
  message:"",
  selectedUser:{},
  listChats:[],
  listMessages:[],
}

const setListChats = createAsyncThunk("chat/setListChats", async (user_id) => {
  try {
    const promise = (await axios.get(`${VITE_URL}/api/v1/chatroom/conversations/${user_id}`, { withCredentials:"include"})).data
    return promise;
  } catch (error) {
    console.error(error);
    throw error;
  }

})
// const setListMessages = createAsyncThunk("chat/setListMessages", async(id) =>{
//   try {
//     const {data} = await axios.get(`${VITE_URL}/api/v1/chatroom/chat/${id}/messages`, { withCredentials:"include"})
//     data.messages.reverse();
//     console.log("DATA: ", data)
//     return data;
//   } catch (error) {
//     return error;
//   }
// })

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setIsMinimized: (state, action) => {
      state.isMinimized = action.payload;;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setMessage: (state, action) => {
      state.message = action.payload;
    },
    setSelectedUser: (state, action) => {
      const {id, isGroup} = action.payload;
      state.selectedUser = state.listChats.filter(chat => (chat.id === id && chat.isGroup === isGroup))[0];
      //state.selectedUser = action.payload;
    },
    setListMessages: (state, action) => {
      state.listMessages = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
    .addCase(setListChats.pending, (state) => {
      state.listChats = [];
    })
    .addCase(setListChats.fulfilled, (state, action) => {
      state.listChats = action.payload;
    })
    // .addCase(setListMessages.pending, (state) => {
    //   console.log("cargando...");
    // })
    // .addCase(setListMessages.fulfilled, (state, action) => {
    //   state.listMessages = action.payload;
    // })
  }
})

export {setListChats};
export const { setIsMinimized, setError, setMessage, setSelectedUser, setListMessages } = chatSlice.actions;
export default chatSlice.reducer;

export const selectSelectedUser = (state) => state.chat.selectedUser;
export const selectListChats = (state) => state.chat.listChats;
export const selectListMessages = (state) => state.chat.listMessages;
export const selectIsMinimized = (state) => state.chat.isMinimized;
export const selectError = (state) => state.chat.error;
export const selectMessage = (state) => state.chat.message;