export const logout = (navigate: any) => {
  sessionStorage.clear();
  navigate("/sies/login/");
};

export const isLoggedIn = (isLogged?: boolean) => {
  const hasCredentials = !!sessionStorage.getItem("credentials");
  const hasApiToken = !!sessionStorage.getItem("apiToken");

  return hasCredentials || isLogged || hasApiToken;
};
