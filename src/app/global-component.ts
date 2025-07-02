export const GlobalComponent = {
  // Api Calling
  API_URL: "https://api-node.themesbrand.website/",
  headerToken: { Authorization: `Bearer ${sessionStorage.getItem("token")}` },

  // Auth Api
  // AUTH_API: "https://api-node.themesbrand.website/auth/",
  // AUTH_API: "http://192.168.22.2:8090/",
  AUTH_API: "https://localhost:7117/api/",
};
