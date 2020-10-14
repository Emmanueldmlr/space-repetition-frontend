export const baseUrl = 'http://localhost:1200/api/';

export const item = "XscOe3Nc0ttKWpN4CY5U";
export const sessionItem = "xWuCYwVStF"

export const token = localStorage.getItem(item);


export const header = () => {
    const requestOption = {
      headers: {
        Authorization: "Bearer ".concat(token),
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    };
    return requestOption
}