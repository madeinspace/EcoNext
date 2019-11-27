import { Context } from '../context';
import { useContext } from 'react';

const useEntityText = key => {
  const { entities } = useContext(Context);

  if (!entities) return null;

  const data = entities.find(({ Title }) => Title === key);

  if (!data) return null;

  const { Text } = data;

  if (!Text) return null;

  return Text;
};

export default useEntityText;
