"use server";

import { fetchHelper } from "@/lib/fetchHelper";
import { APIResponse, Field, FieldSummary, PageableResponse, Submission } from "@/type";

export const getResponseQuestions = async (formId: string) => {
  const res = await fetchHelper(process.env.API_URL + `/api/v1/forms/${formId}/response/questions`, {
    method: "GET",
  });

  const processed: APIResponse<Field[]> = await res.json();
  return processed;
};

export const getResponseSingle = async (formId: string, page = 0) => {
  const res = await fetchHelper(process.env.API_URL + `/api/v1/forms/${formId}/response/single?page=${page}&size=1`, {
    method: "GET",
  });

  const processed: APIResponse<PageableResponse<Submission[]>> = await res.json();
  return processed;
};

export const getResponseSummary = async (formId: string) => {
  const res = await fetchHelper(process.env.API_URL + `/api/v1/forms/${formId}/response/summary`, {
    method: "GET",
  });

  const processed: APIResponse<FieldSummary[]> = await res.json();
  return processed;
};
