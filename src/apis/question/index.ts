import axiosClient from "../../utils/axiosClient/index";

export const END_POINT = {
  GET_ALL: "/questions",
  ADD: "/questions",
  DELETE: "/questions",
};

interface Question {
  imageUrl: string;
  colors: string[];
  difficulty: "easy" | "medium" | "hard";
}

export const addOneQuestion = (
  playload: Question,
  access_token: string | null
) => {
  return axiosClient.post(
    END_POINT.ADD,
    {
      ...playload,
    },
    {
      headers: { Authorization: `Bearer ${access_token}` },
    }
  );
};

export const getAllQuestion = (access_token: string | null) => {
  return axiosClient.get(END_POINT.GET_ALL, {
    headers: { Authorization: `Bearer ${access_token}` },
  });
};

export const deleteOneQuestion = (id: string, access_token: string | null) => {
  return axiosClient.delete(`${END_POINT.DELETE}/${id}`, {
    headers: { Authorization: `Bearer ${access_token}` },
  });
};
