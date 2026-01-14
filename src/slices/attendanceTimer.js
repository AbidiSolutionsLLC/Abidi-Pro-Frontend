import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../axios";

export const checkInNow = createAsyncThunk(
  'employee/checkin',
  async (_, { rejectWithValue, getState }) => {  
    try {
      const response = await api.post('/timetrackers/check-in', {}, {  
        withCredentials: true
      });
      
      console.log("Check-in response:", response.data);
      return response.data;
    } catch (err) {
      const errorData = err.response?.data;
      console.log("Check-in error:", errorData);
      
      return rejectWithValue({
        message: errorData?.message || "Check-in failed",
        status: err.response?.status,
        autoClosed: errorData?.autoClosed
      });
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
      
      console.log("Check-out response:", response.data);
      return response.data;
    } catch (err) {
      const errorData = err.response?.data;
      console.log("Check-out error:", errorData);
      
      return rejectWithValue({
        message: errorData?.message || "Check-out failed",
        status: err.response?.status
      });
    }
  }
);

// Add a thunk to get today's status
export const getTodayStatus = createAsyncThunk(
  'employee/getTodayStatus',
  async (_, { rejectWithValue, getState }) => {
    try {
      const state = getState();
      const userId = state.auth?.user?.id;
      
      if (!userId) {
        return rejectWithValue({ message: "User not authenticated" });
      }
      
      const response = await api.get(`/timetrackers/daily-log/${userId}`);
      return response.data;
    } catch (err) {
      const errorData = err.response?.data;
      return rejectWithValue({
        message: errorData?.message || "Failed to get today's status",
        status: err.response?.status
      });
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
            // Show success message if auto-closed previous session
            if (action.payload.autoClosed) {
              console.log("Previous session was auto-closed");
            }
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