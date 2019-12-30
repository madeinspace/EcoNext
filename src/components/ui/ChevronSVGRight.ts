export default (svgcol?): string => {
  const fillColor = svgcol || 'white';
  return `<svg xmlns='http://www.w3.org/2000/svg' version='1.1' width='17' height='17' viewBox='0 0 640 640' fill='${fillColor}' ><path d='M418.934 244.354v65.939h65.939v263.787h-329.702v-263.787h65.939v-65.939h-131.903v395.647h461.586v-395.647zM287.053 125.978v316.176h65.939v-316.176l75.498 75.814 46.827-46.827-155.286-154.965-155.286 154.965 46.827 46.827z' /></svg>`;
};
