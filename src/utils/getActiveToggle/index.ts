const getActiveToggle = (filterToggles, toggleKey, defaultValue = null) => {
  const toggle = (filterToggles || []).find(({ key }) => key === toggleKey);
  if (!toggle) return defaultValue;
  const {
    active: { Label },
  } = toggle;

  return Label || '';
};

export default getActiveToggle;
