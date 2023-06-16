import { createSlice } from "@reduxjs/toolkit";

export interface RoomIState {
  player: {
    avatarUrl: string;
    id: string;
    points: [];
    role: string;
    status: "WAITING" | "READY" | "FINISHED";
    total: number;
    username: string;
  } | null;
  players: RoomIState["player"][];
  room: {
    createdAt: string;
    deletedAt: string;
    id: string;
    playerHostId: string;
    players: RoomIState["players"];
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
    point: number;
    time: number;
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
    htmlCode: string;
  };
}

const initialState: RoomIState["init"] = {
  room: {
    createdAt: "",
    deletedAt: "",
    id: "",
    playerHostId: "",
    players: [],
    roomCode: "",
    status: "CLOSED",
    updatedAt: "",
  },
  status: "OPEN",
  questionList: [],
  questionIndex: -1,
  timer: 1200,
  isPlaying: false,
  leaderboard: [],
  summary: [],
  htmlCode: `<body>
  <div></div>
</body>
<style>
  body {
    margin: 0;
    width: 400px;
    height: 300px;
    background: #1A090D;
  }
  div {
    width: 200px;
    height: 200px;
    background: #ACE894;
  }
</style>`,
};

export const roomSlice = createSlice({
  name: "room",
  initialState,
  reducers: {
    resetRoom: (state) => {
      state.room.players = [];
      state.questionIndex = -1;
      state.questionList = [];
      state.status = "OPEN";
      state.leaderboard = [];
      state.isPlaying = false;
      state.timer = 1200;
    },
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
      state.timer = 1200;
    },
    decreaseTimer: (state, action) => {
      state.timer = action.payload;
    },
    increaseQuestionIndex: (state) => {
      state.questionIndex++;
      state.htmlCode = `<body>
  <div></div>
</body>
<style>
  body {
    margin: 0;
    width: 400px;
    height: 300px;
    background: #1A090D;
  }
  div {
    width: 200px;
    height: 200px;
    background: #ACE894;
  }
</style>`;
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
    setHtmlCode: (state, action) => {
      state.htmlCode = action.payload;
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
  updateSummary,
  setHtmlCode,
  resetRoom,
} = roomSlice.actions;

export default roomSlice.reducer;
