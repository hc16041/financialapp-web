import { environment } from "../environments/environment";

/**
 * Punto único de configuración de API para toda la app.
 * Usa environment.apiBase para distinguir dev/prod en build time.
 */
const apiBase = environment.apiBase || "https://api.194.163.182.246.nip.io/api/";

export const GlobalComponent = {
  API_URL: apiBase,
  AUTH_API: apiBase,
};
