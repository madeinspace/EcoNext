import productionPages from './productionPages';
import developmentPages from './developmentPages';

export const isNextPage = (handle: string) => {
  const availablePages = process.env.DEV_PAGES_ENABLED === 'true' ? developmentPages : productionPages;
  return availablePages.indexOf(handle) >= 0;
};

export default async (handle: string) => {
  if (!isNextPage(handle)) {
    throw Error(`The ${handle}/page/index.tsx layout file is missing`);
  }

  // Lazy loading and code splitting here
  const pageData = await import(`./${handle}`);
  const pageLayout = await import(`./${handle}/page`);
  pageData.layout = pageLayout;

  return pageData;
};
