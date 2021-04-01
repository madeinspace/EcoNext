import React, { useContext } from 'react';
import styled from 'styled-components';
import { BaseFooterRow } from './grid';
import { ClientContext, PageContext } from '../utils/context';
import Idlogo_poweredby from './ui/logos/Idlogo_poweredby';

const StaticFooter = styled(BaseFooterRow)`
  margin-top: 2em;
  margin-bottom: 2em;
  grid-template-areas: '. powered-by powered-by powered-by demographic demographic demographic .';
  grid-gap: 0;
`;
const DisclaimerFooter = styled(StaticFooter)`
  margin-top: 40px;
  margin-bottom: 40px;
  grid-template-areas: '. disclaimer disclaimer disclaimer disclaimer disclaimer disclaimer .';
`;

const DisclaimerText = styled.div`
  grid-area: disclaimer;

  p {
    color: #6a6a6a;
    font-size: 8.5px;
    line-height: 11px;
    margin: 0;
  }
`;

const PoweredBy = styled.div`
  grid-area: powered-by;
  display: flex;
  justify-contents: space-between;
`;

const Demographic = styled.div`
  grid-area: demographic;
  display: flex;
  justify-contents: space-between;
`;

const LogoBox = styled.span`
  width: 30%;
`;
const LogoCompanion = styled.span`
  width: 70%;
`;

const StaticFooterHeading = styled.h1`
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 16px;
  line-height: 22px;
  color: #000;
`;

const StaticFooterText = styled.p`
  font-size: 16px;
  margin-bottom: 16px;
  line-height: 24px;
  color: #56565a;
`;

const ArrowIcon = styled.span`
  &::after {
    border-style: solid;
    border-width: 0.12em 0.12em 0 0;
    content: '';
    height: 0.55em;
    left: 0.15em;
    position: relative;
    top: 0.25em;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
    vertical-align: top;
    width: 0.55em;
    display: inline-block;
  }
`;

const ExternalLink = styled.a`
  text-decoration: none;
  color: black;

  &.active,
  :hover {
    text-decoration: underline;
  }
`;

const HomeLink = styled.a`
  text-decoration: none;
  color: #ff4612;

  &.active,
  :hover {
    text-decoration: underline;
  }
`;

export const SharedFooter = () => {
  const { LongName } = useContext(ClientContext);
  const { entityData } = useContext(PageContext);
  const formattedClientName = LongName != undefined ? `for ${entityData.HasPrefix ? `the ${LongName}` : LongName}` : '';

  return (
    <div id="footer">
      <StaticFooter>
        <PoweredBy>
          <LogoBox>
            <Idlogo_poweredby />
          </LogoBox>
          <LogoCompanion
            style={{
              paddingRight: '20px',
              borderRight: '1px solid #ccc',
            }}
          >
            <StaticFooterHeading>Powered by .id informed decisions {formattedClientName}</StaticFooterHeading>
            <StaticFooterText>
              .id community is an evidence-base for over 250 local government areas in Australia and New Zealand,
              helping you make informed decisions.
            </StaticFooterText>
            <HomeLink target="_blank" rel="noopener" href="http://home.id.com.au">
              LEARN MORE ABOUT .id <ArrowIcon />
            </HomeLink>
          </LogoCompanion>
        </PoweredBy>
        <Demographic>
          <LogoBox>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 100">
              <polygon
                points="129.81 20.04 127.81 20.04 127.81 89.65 87.79 89.65 88.36 93.98 72.37 93.98 72.94 89.65 32.35 89.65 32.35 20.04 30.35 20.04 30.35 91.65 70.66 91.65 70.08 95.98 90.64 95.98 90.07 91.65 129.81 91.65 129.81 20.04"
                style={{ fill: '#ff4611' }}
              />
              <polygon
                points="61 58.59 61 69.18 63 69.18 63 57.6 53.29 50.12 43.78 57.39 43.78 69.18 45.78 69.18 45.78 58.38 53.28 52.64 61 58.59"
                style={{ fill: '#ff4611' }}
              />
              <path
                d="M69.21,61.5v7.37h2V61.5c1.67-.29,3.3-1.45,3.3-4.83,0-3.73-1.89-6.66-4.3-6.66s-4.3,2.92-4.3,6.66C65.91,60.06,67.53,61.21,69.21,61.5Zm1-9.49c1.08,0,2.3,2,2.3,4.66s-1.13,2.92-2.3,2.92-2.3-.23-2.3-2.92S69.12,52,70.21,52Z"
                style={{ fill: '#ff4611' }}
              />
              <rect x="52.39" y="63.54" width="2" height="5.33" style={{ fill: '#ff4611' }} />
              <circle cx="59.14" cy="19.04" r="4.8" style={{ fill: '#ff4611' }} />
              <path
                d="M80.15,86.32a105.33,105.33,0,0,1,21.3-2,131,131,0,0,1,23.31,2V14.09a122,122,0,0,0-14.63-1.75v-6L99.81,9.9v2.19q-2,0-4,.12V6.85H85.46v6.32c-1.77.26-3.54.55-5.32.92-2.23-.46-4.46-.81-6.68-1.1a15.51,15.51,0,0,0-28.57-.21c-5.74.58-9.36,1.31-9.36,1.31V86.32a131,131,0,0,1,23.31-2A105.31,105.31,0,0,1,80.15,86.32ZM99.81,14.08v5.77h-4V14.21Q97.76,14.11,99.81,14.08ZM87.46,29.85v-21h6.3v13h8V11.33l6.32-2.17V21.61h9v8.24h2V19.61h-9V14.35c5.8.38,10.35,1,12.63,1.42V83.94a138.68,138.68,0,0,0-21.31-1.65,108.35,108.35,0,0,0-20.37,1.81V16c1.43-.29,2.89-.54,4.39-.76V29.85ZM59.14,5.42A13.51,13.51,0,0,1,70.48,26.28L59.14,43.75,47.8,26.27A13.51,13.51,0,0,1,59.14,5.42ZM37.54,15.77c1.42-.23,3.72-.58,6.65-.9a15.38,15.38,0,0,0,1.94,12.49l13,20.06,13-20.06a15.36,15.36,0,0,0,2-12.27c1.68.24,3.32.51,4.92.83V84.08Q74.72,83.25,70,82.8c-.13-8.86-8.14-8.87-12.94-8.87a2.39,2.39,0,0,1-2.66-2.41h-2A4.42,4.42,0,0,0,57,75.93c5.87,0,10.74.53,10.94,6.71q-4.43-.33-9.13-.34a138.69,138.69,0,0,0-21.31,1.65Z"
                style={{ fill: '#ff4611' }}
              />
              <path
                d="M109.3,55.5a4.48,4.48,0,0,0-1,8.85v12h2v-12a4.47,4.47,0,0,0-1-8.82Zm0,7A2.48,2.48,0,1,1,111.78,60,2.48,2.48,0,0,1,109.3,62.46Z"
                style={{ fill: '#ff4611' }}
              />
              <path
                d="M96.14,58.54a4.52,4.52,0,0,0-1,8.93v9.1h2V67.46a4.52,4.52,0,0,0-1-8.92Zm0,7a2.52,2.52,0,1,1,2.52-2.52A2.53,2.53,0,0,1,96.14,65.58Z"
                style={{ fill: '#ff4611' }}
              />
              <path
                d="M92,51.24h2v-3h3v3h2v-3H109.7v3h2v-3H115V42.4l-3.57-4.81h-4.39v-3H87.8V48.21H92Zm18.46-11.65L113,43.06v3.15h-6V39.58Zm-20.64-3h15.26v9.61H89.8Z"
                style={{ fill: '#ff4611' }}
              />
            </svg>
          </LogoBox>
          <LogoCompanion>
            <StaticFooterHeading>Free demographic resources</StaticFooterHeading>
            <StaticFooterText>
              Access hundreds of free demographic and economic resources to help you make informed decisions.
            </StaticFooterText>
            <HomeLink target="_blank" rel="noopener" href="http://home.id.com.au/demographic-resources/">
              FIND FREE RESOURCES
              <ArrowIcon />
            </HomeLink>
          </LogoCompanion>
        </Demographic>
      </StaticFooter>
      <hr />
      <DisclaimerFooter>
        <DisclaimerText>
          <p>
            DISCLAIMER: While all due care has been taken to ensure that the content of this website is accurate and
            current, there may be errors or omissions in it and no legal responsibility is accepted for the information
            and opinions in this website.
          </p>
          <p>
            Please view our <ExternalLink href="https://home.id.com.au/privacy-policy/">Privacy Policy</ExternalLink>,{' '}
            <ExternalLink href="https://home.id.com.au/terms-of-use/">Terms of use</ExternalLink> and{' '}
            <ExternalLink href="https://home.id.com.au/legal-notices/">Legal notices</ExternalLink>.
          </p>
          <p>
            ABS Data and the copyright in the ABS Data remains the property of the Australian Bureau of Statistics. The
            copyright in the way .id has modified, transformed or reconfigured the ABS Data as published on this website
            remains the property of .id. ABS Data can be accessed from the Australian Bureau of Statistics at{' '}
            <ExternalLink href="http://www.abs.gov.au" title="Australian Bureau of Statistics">
              www.abs.gov.au
            </ExternalLink>
            . ABS data can be used under license - terms published on ABS website.{' '}
            <ExternalLink href="mailto:intermediary.management@abs.gov.au">
              intermediary.management@abs.gov.au
            </ExternalLink>{' '}
            if you have any queries or wish to distribute any ABS data.
          </p>{' '}
        </DisclaimerText>
      </DisclaimerFooter>
    </div>
  );
};
export default SharedFooter;
