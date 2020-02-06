export const ABSLink = () =>
  ABSLinkBuilder(
    'abs@.nsf/mf/5206.0',
    'Australian Bureau of Statistics. Australian National Accounts: National Income, Expenditure and Product',
  );

export const NierLink = () =>
  LinkBuilder('http://www.nieir.com.au/', 'National Institute of Economic and Industry Research (NIEIR)');

export const IdLink = () => LinkBuilder('http://home.id.com.au/about-us/', ' .id the population experts');

export const ABSCensusHousingLink = () =>
  LinkBuilder('http://www.abs.gov.au/census', 'Census of Population and Housing');

export const ABSLinkBuilder = (handle, displayText, target?, title?) =>
  LinkBuilder(`http://www.abs.gov.au/ausstats/${handle}`, displayText, target, title);

export const LinkBuilder = (href, displayText, target?, title?): JSX.Element => {
  return (
    <a href={href} rel="noopener" target={target || '_blank'} title={title || displayText}>
      {displayText}
    </a>
  );
};
