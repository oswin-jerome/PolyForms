"use server";

import { fetchHelper } from "@/lib/fetchHelper";
import { APIResponse, Field } from "@/type";
import { assert } from "console";

export const updateField = async (formId: string, field: Field) => {
  assert(field.id != null || field.id != undefined, "Passed field doesn't have an ID");
  console.log(field);
  const res = await fetchHelper(process.env.API_URL + `/api/v1/forms/${formId}/fields/${field.id}`, {
    method: "PUT",
    body: JSON.stringify(field),
  });

  const processed: APIResponse<Field> = await res.json();
  console.log(processed);
  return processed;
};

export const reorder = async (formId: string, field: Field[]) => {
  const res = await fetchHelper(process.env.API_URL + `/api/v1/forms/${formId}/fields/reorder`, {
    method: "PATCH",
    body: JSON.stringify(field),
  });

  const processed: APIResponse<Field> = await res.json();
  console.log(processed);
  return processed;
};

export const deleteField = async (formId: string, fieldId: number) => {
  const res = await fetchHelper(process.env.API_URL + `/api/v1/forms/${formId}/fields/${fieldId}`, {
    method: "DELETE",
  });

  const processed: APIResponse<String> = await res.json();
  console.log(processed);
  return processed;
};
