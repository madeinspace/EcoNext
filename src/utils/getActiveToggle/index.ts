const getActiveToggle = (toggles, toggleKey, defaultValue = null) => {
  const toggle = (toggles || []).find(({ key }) => key === toggleKey);

  if (!toggle) return defaultValue;

  const {
    active: { Label },
  } = toggle;

  return Label || '';
};

export default getActiveToggle;
