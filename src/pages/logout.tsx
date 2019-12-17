const Logout = () => null;

Logout.getInitialProps = async ({ res, req }) => {
  console.log('Logout res, req: ', req.session.id);
  return {};
};

export default Logout;
