import { PageContext } from '../context';
import { useContext } from 'react';

// Custom hook
const useEntityText = key => {
  const { entities } = useContext(PageContext);

  if (!entities) return null;

  const data = entities.find(({ Title }) => Title === key);

  if (!data) return null;

  const { Text } = data;

  if (!Text) return null;

  return Text;
};

export default useEntityText;
