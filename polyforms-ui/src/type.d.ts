export interface APIResponse<T> {
  data: T;
  error: string;
  errors: any[];
  ok: boolean;
}

export interface Form {
  id: string | null;
  title: string;
  description: string;
  fields: Field[];
  lastOpenedAt: Date;
  allowResponse: boolean;
  responseLimit: number;
}

export interface Field {
  id?: number | null;
  title: string;
  fieldType: string;
  options: string[];
  required: boolean;
  responseEntries?: ResponseEntry[];
}

interface FieldState {
  id: number;
  value: string; // For TEXT, DATE, SINGLE_CHOICE
  values: string[]; // For MULTI_CHOICE
}

export interface ResponseEntry {
  id: string;
  value: string;
  values: string[];
  field: Field;
}

export interface PageableResponse<T> {
  content: T;
  pageable: Pageable;
  last: boolean;
  totalElements: number;
  totalPages: number;
  first: boolean;
  size: number;
  number: number;
  sort: Sort;
  numberOfElements: number;
  empty: boolean;
}

export interface Pageable {
  pageNumber: number;
  pageSize: number;
  sort: Sort;
  offset: number;
  paged: boolean;
  unpaged: boolean;
}

export interface Sort {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}

export interface Submission {
  id: string;
  submittedAt: Date;
  form: null;
  responseEntries: ResponseEntry[];
}

export interface FieldSummary {
  field: Field;
  values?: Values[];
}
interface Values {
  value: string;
  count: number;
}
