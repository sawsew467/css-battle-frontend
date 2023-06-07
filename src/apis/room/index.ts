import axiosClient from "../../utils/axiosClient/index";

export const END_POINT = {
  CREATE: "/create",
  JOIN: "/join",
  CHANGE_STATUS: "/update-status",
  START: "/start",
  SUBMIT: "/submit",
  FINISH: "/finish",
  CHECK: "/check",
  RESULT: "/result-board"
};

export const createNewRoom = (access_token: string | null) => {
  return axiosClient.post(`/room` + END_POINT.CREATE, {
    headers: { Authorization: `Bearer ${access_token}` },
  });
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const joinInRoom = (payload: any, access_token: string | null) => {
  return axiosClient.post(`/room/${payload}` + END_POINT.JOIN, {
    headers: { Authorization: `Bearer ${access_token}` },
  });
};

export const changeParticipantStatus = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload: any,
  access_token: string | null
) => {
  return axiosClient.post(
    `/room/${payload.roomCode}` + END_POINT.CHANGE_STATUS,
    {
      status: payload.status,
    },
    {
      headers: { Authorization: `Bearer ${access_token}` },
    }
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const startGame = (payload: any, access_token: string | null) => {
  return axiosClient.post(
    `/room/${payload.roomCode}` + END_POINT.START,
    {
      ...payload.options,
    },
    {
      headers: { Authorization: `Bearer ${access_token}` },
    }
  );
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const submitQuestion = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload: any,
  roomCode: string,
  access_token: string | null
) => {
  return axiosClient.post(
    `/room/${roomCode}` + END_POINT.SUBMIT,
    {
      ...payload,
    },
    {
      headers: { Authorization: `Bearer ${access_token}` },
    }
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const finnishGame = (roomCode: any, access_token: string | null) => {
  return axiosClient.post(
    `/room/${roomCode}` + END_POINT.FINISH,
    {
      roomCode: roomCode,
    },
    {
      headers: { Authorization: `Bearer ${access_token}` },
    }
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const compareResult = (payload: any, access_token: string | null) => {
  return axiosClient.post(
    `/room` + END_POINT.CHECK,
    {
      ...payload,
    },
    {
      headers: { Authorization: `Bearer ${access_token}` },
    }
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getResultBoard = (roomCode: any, access_token: string | null) => {
  return axiosClient.post(
    `/room/${roomCode}` + END_POINT.RESULT,
    {
      headers: { Authorization: `Bearer ${access_token}` },
    }
  );
};