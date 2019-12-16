import { useRouter } from 'next/router';

const redirectTo = (destination, { res = null, status = null } = {}) => {
  const router = useRouter();
  if (res) {
    res.writeHead(status || 302, { Location: destination });
    res.end();
  } else {
    if (destination[0] === '/' && destination[1] !== '/') {
      router.push(destination);
    } else {
      window.location = destination;
    }
  }
};
export default redirectTo;
