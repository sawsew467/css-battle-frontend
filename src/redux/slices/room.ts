import { createSlice } from "@reduxjs/toolkit";

export interface RoomIState {
  paticipant: {
    avatarUrl: string;
    id: string;
    points: [];
    role: string;
    status: "WAITING" | "READY" | "FINISHED";
    total: number;
    username: string;
  } | null;
  paticipants: RoomIState["paticipant"][];
  room: {
    createdAt: string;
    deletedAt: string;
    id: string;
    participants: RoomIState["paticipants"];
    roomCode: string;
    status: "OPEN" | "CLOSED" | "PROGRESS";
    updatedAt: string;
  };
  question: {
    colors: string[];
    difficulty: string;
    id: string;
    imageUrl: string;
    createdAt: string;
    updatedAt: string;
    deleteAt: string;
  };
  roundResult: {
    point: number;
    time: number;
    username: string;
  }[];
  summary: {
    totalPoints: number;
    totalTime: number;
    username: string;
  }[];
  init: {
    room: RoomIState["room"];
    status: "OPEN" | "PROGRESS" | "CLOSED";
    questionList: RoomIState["question"][];
    questionIndex: number;
    timer: number;
    isPlaying: boolean;
    leaderboard: RoomIState["roundResult"][];
    summary: RoomIState["summary"];
  };
}

const initialState: RoomIState["init"] = {
  room: {
    createdAt: "",
    deletedAt: "",
    id: "",
    participants: [],
    roomCode: "",
    status: "CLOSED",
    updatedAt: "",
  },
  status: "OPEN",
  questionList: [],
  questionIndex: -1,
  timer: 600,
  isPlaying: false,
  leaderboard: [],
  summary: []
};

export const roomSlice = createSlice({
  name: "room",
  initialState,
  reducers: {
    update: (state, action) => {
      state.room = action.payload;
    },
    changeStatus: (state, action) => {
      state.status = action.payload;
    },
    updateQuestionList: (state, action) => {
      state.questionList = action.payload;
    },
    resetTimer: (state) => {
      state.timer = 600;
    },
    decreaseTimer: (state, action) => {
      state.timer = action.payload;
    },
    increaseQuestionIndex: (state) => {
      state.questionIndex++;
    },
    changeIsPlaying: (state, action) => {
      state.isPlaying = action.payload;
    },
    updateLeaderboard: (state, action) => {
      state.leaderboard = action.payload;
    },
    updateSummary: (state, action) => {
      state.summary = action.payload;
    },

  },
});

// Action creators are generated for each case reducer function
export const {
  update,
  changeStatus,
  updateQuestionList,
  decreaseTimer,
  resetTimer,
  increaseQuestionIndex,
  changeIsPlaying,
  updateLeaderboard,
  updateSummary
} = roomSlice.actions;

export default roomSlice.reducer;
