/* #region imports*/
import fetchAllClients from '../../utils/fetchAllClients';

const fetchClients = async () => {
  const allClients = await fetchAllClients();
  return allClients;
};

export default fetchClients;
