/**
 * Stores the History Query in the Local Storage
 * @param {String} search
 */
export const addHistory = (search) => {
  const historyquery = localStorage.getItem("history");
  if (search.length !== 0) {
    if (historyquery === null) {
      const queries = [];
      queries.push(search);
      localStorage.setItem("history", JSON.stringify(queries));
    } else {
      const queries = Array.from(JSON.parse(historyquery));
      queries.push(search);
      localStorage.setItem("history", JSON.stringify(queries));
    }
  }
};

/**
 * Array of History Query
 * @returns 0 if no History or Array of ITEMS if History is Present
 */
export const getHistory = () => {
  try {
    const queries = localStorage.getItem("history");
    if (queries === null) {
      return 0;
    }
    return Array.from(JSON.parse(queries));
  } catch (Error) {
    localStorage.removeItem("history");
  }
};

/**
 * Removes the Given Query from the History
 * @param {String} query
 */
export const removeHistory = (query) => {
  const queries = localStorage.getItem("history");
  const history_array = Array.from(JSON.parse(queries));
  const q = history_array.filter((val) => val !== query);
  localStorage.setItem("history", JSON.stringify(q));
};
