/**
 * Custom Hook for setting the title of the Webpage for a particular Routes.
 *
 * @param {String} title
 * @returns title that setted for the page.
 */
export const useTitle = (title) => {
  document.title = `${title} - Bloogo`;
  return title;
};
