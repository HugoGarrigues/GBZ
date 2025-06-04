import type { DataProvider } from "@refinedev/core";

const API_URL = "http://localhost:3000";

export const dataProvider: DataProvider = {
  getOne: async ({ resource, id }) => {
    const response = await fetch(`${API_URL}/${resource}/${id}`);
    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }
    const data = await response.json();
    return {
      data,
    };
  },

  update: async ({ resource, id, variables }) => {
    const response = await fetch(`${API_URL}/${resource}/${id}`, {
      method: "PATCH",
      body: JSON.stringify(variables),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status < 200 || response.status > 299) throw response;

    const data = await response.json();

    return { data };
  },

  getList: async ({ resource }) => {
    const response = await fetch(`${API_URL}/${resource}`);
  
    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }
  
    const data = await response.json();
  
    return {
      data,
      total: data.length, 
    };
  },

  create: async ({ resource, variables }) => {
    const response = await fetch(`${API_URL}/${resource}`, {
      method: "POST",
      body: JSON.stringify(variables),
      headers: {
        "Content-Type": "application/json",
      },
    });
  
    if (!response.ok) throw new Error(`Erreur HTTP: ${response.status}`);
  
    const data = await response.json();
    return { data };
  },
  
  
  deleteOne: () => {
    throw new Error("Not implemented");
  },
  getApiUrl: () => API_URL,
};
