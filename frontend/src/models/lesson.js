import { createSlice, current } from "@reduxjs/toolkit";

const Lesson = createSlice({
  name: "lesson",
  initialState: {
    data: [],
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
