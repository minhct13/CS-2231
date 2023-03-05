import { createSlice } from "@reduxjs/toolkit";

const Lesson = createSlice({
  name: "lesson",
  initialState: {
    data: [],
    topic: [],
    current: 0,
  },
  reducers: {
    getState(state) {
      return state;
    },
    saveState(state, { payload }) {
      return { ...state, ...payload };
    }
  }
})

export default Lesson
