import productionPages from './productionPages';
import developmentPages from './developmentPages';
// Lazy loading and code splitting here
const fetchPageData = async (handle: string) => await import(`./${handle}`);

export const isNextPage = (handle: string) => {
  const availablePages = process.env.DEV_PAGES_ENABLED === 'true' ? developmentPages : productionPages;
  return availablePages.indexOf(handle) >= 0;
};

export default async (handle: string) => {
  if (!isNextPage(handle)) return null;

  const pageData = await fetchPageData(handle);

  return pageData;
};
