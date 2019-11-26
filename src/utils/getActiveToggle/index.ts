const getActiveToggle = (toggles, toggleKey, defaultValue = null) => {
  const { active } = toggles.find(({ key }) => key === toggleKey);

  if (!active) return defaultValue;

  const { Label } = active;

  return Label || '';
};

export default getActiveToggle;
