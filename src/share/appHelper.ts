export const getLocalStorage = () =>
    JSON.parse(localStorage.getItem("react-ui") || "{}") as Record<string, any>;
  
  export const setLocalStorage = (key: string, value: any) => {
    const storage = getLocalStorage();
    storage[key] = value;
  
    return localStorage.setItem("react-ui", JSON.stringify(storage));
  };