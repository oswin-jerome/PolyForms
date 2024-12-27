"use server";

import { fetchHelper } from "@/lib/fetchHelper";
import { APIResponse, Field, FieldState, Form } from "@/type";

export const createForm = async () => {
  const res = await fetchHelper(process.env.API_URL + "/api/v1/forms", {
    method: "POST",
    body: JSON.stringify({
      title: "Untitled",
      description: "Description",
    }),
  });

  const processed: APIResponse<Form> = await res.json();
  return processed;
};

export const getForms = async () => {
  const res = await fetchHelper(process.env.API_URL + "/api/v1/forms", {
    method: "GET",
  });

  const processed: APIResponse<Form[]> = await res.json();
  return processed;
};
export const getForm = async (formId: string) => {
  const res = await fetchHelper(process.env.API_URL + "/api/v1/forms/" + formId, {
    method: "GET",
  });

  const processed: APIResponse<Form> = await res.json();
  return processed;
};

export const createFormField = async (formId: string, field: Field) => {
  const res = await fetchHelper(process.env.API_URL + `/api/v1/forms/${formId}/fields`, {
    method: "POST",
    body: JSON.stringify(field),
  });

  const processed: APIResponse<Field> = await res.json();
  return processed;
};

export const updateFrom = async (formId: string, data: Object) => {
  console.log(data);
  const res = await fetchHelper(process.env.API_URL + `/api/v1/forms/${formId}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });

  const processed: APIResponse<Field> = await res.json();
  console.log(processed);
  return processed;
};

export const createSubmission = async (formId: string, fields: FieldState[]) => {
  const res = await fetchHelper(process.env.API_URL + "/api/v1/public/forms/" + formId, {
    method: "POST",
    body: JSON.stringify(fields),
  });

  const processed: APIResponse<Form> = await res.json();
  console.log(processed.data);
  return processed;
};
