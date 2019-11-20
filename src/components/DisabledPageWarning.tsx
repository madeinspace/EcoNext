const DisabledPageWarning = ({ client }) => {
  return (
    <>
      <h1>{client.LongName}</h1>
      <p>The page you requested is not available at this stage.</p>
      <p>
        This dataset is available in the full version economy.id. Please contact
        .id for more information on (+61) 3 94172205
      </p>
    </>
  );
};

export default DisabledPageWarning;
