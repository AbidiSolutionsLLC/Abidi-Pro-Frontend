import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../axios";

export const checkInNow = createAsyncThunk(
  'employee/checkin',
  async (_, { rejectWithValue }) => {  
    try {
      const response = await api.post('/timetrackers/check-in', {}, {  
        withCredentials: true
      });
      console.log(response.data,"success from api slice")
      return response.data;
    } catch (err) {
        console.log(err.response.data,"error from api")
      return rejectWithValue(err.response?.data || "checkInn failed");
    }
  }
);

export const checkOutNow = createAsyncThunk(
  'employee/checkout',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.post('/timetrackers/check-out', {}, {
        withCredentials: true
      });
      console.log(response.data,"success from api slice")
      return response.data;
    } catch (err) {
         console.log(err.response.data,"error from api")
      return rejectWithValue(err.response?.data || "checkOut failed");
    }
  }
);

const attendanceTimerSlice = createSlice({
    name: 'employee',
    initialState: {
        checkInn: null,
        checkOut: null,
        loading: false,
        error: null,
    },
    reducers: {
      setError(state, action) {
        state.error = action.payload;
      },
      resetCheckIn(state) {
        state.checkInn = null;
      }
    },
    extraReducers: (builder) => {
        builder
          .addCase(checkInNow.pending, (state) => {
            state.loading = true;
          })
          .addCase(checkInNow.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null;
            state.checkInn = action.payload;
            state.checkOut = null; // Reset checkout on new checkin
          })
          .addCase(checkInNow.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = false;
          })
          .addCase(checkOutNow.pending, (state) => {
            state.loading = true;
          })
          .addCase(checkOutNow.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null;
            state.checkOut = action.payload;
            state.checkInn = null; // This should reset the checkin
          })
          .addCase(checkOutNow.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = false;
          });
    }
});

export const { setError, resetCheckIn } = attendanceTimerSlice.actions;
export default attendanceTimerSlice.reducer;