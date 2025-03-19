import { Method } from "axios";

export interface IAPIRequest {
  method: Method;
  url: string;
  data?: object;
  headers?: object;
  formData?: boolean;
  uploadProgress?: object;
  timeout?: number;
}
