export const GlobalComponent = {
  // Api Calling
  API_URL: "https://api-node.themesbrand.website/",
  headerToken: { Authorization: `Bearer ${sessionStorage.getItem("token")}` },

  // Auth Api
  // AUTH_API: "https://api-node.themesbrand.website/auth/",
  AUTH_API: "http://194.163.182.246:8090/api/",
  //AUTH_API: "https://localhost:7117/api/",
};
