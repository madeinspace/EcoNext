/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable react/prop-types */
import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import ExportOptions from '../utils/fecthPageReport/Formats';
import fetchPageReport from '../utils/fecthPageReport';
import { ClientContext, PageContext } from '../utils/context';
import payload from '../utils/fecthPageReport/ReportPayload';
import useForm from 'react-hook-form';
import { emailRGX } from '../utils/Regex';
import { FaFileExport, FaShareAlt, FaUndo } from 'react-icons/fa';
import axios from 'axios';
const variables = require(`sass-extract-loader?{"plugins": ["sass-extract-js"]}!../styles/variables.scss`);

export const ExportDropdown: React.FC<any> = props => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const { exportOptions, handleExport } = props;

  return (
    <DropdownContainer>
      <ExportButton
        onClick={() => {
          if (!dropdownVisible) {
            const dismiss = (): void => {
              setDropdownVisible(false);
              document.removeEventListener('click', dismiss);
            };
            document.addEventListener('click', dismiss);
          }
          setDropdownVisible(!dropdownVisible);
        }}
      />
      <DropdownList dropdownVisible={dropdownVisible}>
        {exportOptions.formats.map((item, i) => {
          return (
            <DropdownListItem
              key={i}
              onClick={(): void => {
                handleExport(item);
              }}
            >
              {item.displayText}
            </DropdownListItem>
          );
        })}
      </DropdownList>
    </DropdownContainer>
  );
};

const LogoBox = styled.span`
  width: 20px;
  height: 20px;
  grid-column: logo;
`;

const TwitterLogo = (): JSX.Element => (
  <LogoBox>
    <svg width="15" height="18" viewBox="0 0 15 14">
      <path d="M16.272 4.098c-0.442 0.643-0.994 1.215-1.627 1.677 0.010 0.141 0.010 0.281 0.010 0.422 0 4.289-3.265 9.231-9.231 9.231-1.838 0-3.546-0.532-4.982-1.456 0.261 0.030 0.512 0.040 0.783 0.040 1.517 0 2.913-0.512 4.028-1.386-1.426-0.030-2.622-0.964-3.033-2.25 0.201 0.030 0.402 0.050 0.613 0.050 0.291 0 0.583-0.040 0.854-0.11-1.487-0.301-2.602-1.607-2.602-3.184v-0.040c0.432 0.241 0.934 0.392 1.467 0.412-0.874-0.583-1.446-1.577-1.446-2.702 0-0.603 0.161-1.155 0.442-1.637 1.597 1.969 3.998 3.254 6.69 3.395-0.050-0.241-0.080-0.492-0.080-0.743 0-1.788 1.446-3.244 3.244-3.244 0.934 0 1.778 0.392 2.371 1.025 0.733-0.141 1.436-0.412 2.059-0.783-0.241 0.753-0.753 1.386-1.426 1.788 0.653-0.070 1.286-0.251 1.868-0.502z" />
    </svg>
  </LogoBox>
);

const FacebookLogo = (): JSX.Element => (
  <LogoBox>
    <svg width="15" height="18" viewBox="0 0 15 18">
      <path d="M14.575 1.286c0.472 0 0.854 0.382 0.854 0.854v13.721c0 0.472-0.382 0.854-0.854 0.854h-3.927v-5.977h1.999l0.301-2.33h-2.3v-1.487c0-0.673 0.181-1.125 1.155-1.125l1.225-0.010v-2.079c-0.211-0.030-0.944-0.090-1.788-0.090-1.778 0-3.003 1.085-3.003 3.074v1.718h-2.009v2.33h2.009v5.977h-7.383c-0.472 0-0.854-0.382-0.854-0.854v-13.721c0-0.472 0.382-0.854 0.854-0.854h13.721z" />
    </svg>
  </LogoBox>
);

const LinkedInLogo = (): JSX.Element => (
  <LogoBox>
    <svg width="15" height="18" viewBox="0 0 15 18">
      <path d="M3.506 6.278v9.954h-3.315v-9.954h3.315zM3.717 3.204c0.010 0.954-0.713 1.718-1.868 1.718v0h-0.020c-1.115 0-1.828-0.763-1.828-1.718 0-0.974 0.743-1.718 1.868-1.718 1.135 0 1.838 0.743 1.848 1.718zM15.429 10.527v5.705h-3.305v-5.324c0-1.336-0.482-2.25-1.677-2.25-0.914 0-1.456 0.613-1.698 1.205-0.080 0.221-0.11 0.512-0.11 0.814v5.555h-3.305c0.040-9.020 0-9.954 0-9.954h3.305v1.446h-0.020c0.432-0.683 1.215-1.677 3.003-1.677 2.18 0 3.807 1.426 3.807 4.48z" />
    </svg>
  </LogoBox>
);

export const Share = (): JSX.Element => {
  const [dropdownVisible, setDropdownVisible] = useState(false);

  return (
    <DropdownContainer style={{ marginRight: '20px' }}>
      <ShareButton
        onClick={() => {
          if (!dropdownVisible) {
            const dismiss = (): void => {
              setDropdownVisible(false);
              document.removeEventListener('click', dismiss);
            };
            document.addEventListener('click', dismiss);
          }
          setDropdownVisible(!dropdownVisible);
        }}
      />
      <ShareDropdownList dropdownVisible={dropdownVisible}>
        <ShareDropdownListItem>
          <a href="" title="Share to twitter" className="addthis_button_twitter" rel="noopener" target="_blank">
            <TwitterLogo />
            <PageButtonName>Twitter</PageButtonName>
          </a>
        </ShareDropdownListItem>

        <ShareDropdownListItem>
          <a href="" title="Share to facebook" className="addthis_button_facebook" rel="noopener" target="_blank">
            <FacebookLogo />
            <PageButtonName>Facebook</PageButtonName>
          </a>
        </ShareDropdownListItem>
        <ShareDropdownListItem>
          <a href="" title="Share to linkedin" className="addthis_button_linkedin" rel="noopener" target="_blank">
            <LinkedInLogo />
            <PageButtonName>LinkedIn</PageButtonName>
          </a>
        </ShareDropdownListItem>
      </ShareDropdownList>
    </DropdownContainer>
  );
};

const NOROBOT = styled.div`
  position: absolute;
  top: 40px;
  right: -20px;
  width: 300px;
  padding: 5px;
`;

const ThankyouNote = styled.div`
  padding: 10px;
  background-color: ${variables.colorEconomy};
  line-height: 18px;
  font-size: 14px;
  width: 300px;
  color: #fff;
`;

const RequestReportForm = styled.form`
  font-size: 14px;
  line-height: 18px;
  padding: 10px;
  margin: 0;
  position: relative;
  background-color: ${variables.colorEconomy};
  p {
    color: #fff;
  }
`;
const EmailAddress = styled.input`
  display: block;
  border: 1px solid lightgray;
  padding: 0 5px;
  height: 25px;
`;
const ErrorMsg = styled.span`
  color: red;
  display: block;
  margin: 10px 0;
`;
const Align = styled.div`
  display: grid;
  grid-gap: 10px;
  grid-template-columns: [label] auto [input];
  margin-bottom: 10px;
  p {
    font-size: 14px;
    line-height: 18px;
    color: #fff;
  }
  input {
    grid-column: input;
    align-self: center;
  }
  label {
    grid-column: label;
    align-self: center;
    color: #fff;
  }
  button {
    flex-direction: row;
  }
`;

const AlignAlt = styled.div`
  display: grid;
  grid-gap: 10px;
  grid-template-columns: [cancel] auto [submit];
  button {
    cursor: pointer;
  }
`;

const SubmitButton = styled.button`
  background-color: #fff;
  color: ${variables.colorEconomy};
  font-weight: bold;
  border-radius: 5px;
  border: none;
  height: 30px;
  grid-column: submit;
`;

const CancelButton = styled(SubmitButton)`
  grid-column: cancel;
`;

export const ExportPage = (): JSX.Element => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [requestFormVisible, setrequestFormVisible] = useState(false);
  const [reqPayload, setreqPayload] = useState({ formatID: 1, LongName: '', pageSubTitle: '', emailAddress: '' });
  const [ThankYouNote, setThankYouNote] = useState(false);
  const [WaitingNote, setWaitingNote] = useState(false);
  const { LongName } = useContext(ClientContext);
  const { handle } = useContext(PageContext);
  const {
    pageData: { SubTitle: pageSubTitle },
  } = useContext(PageContext);
  let timer = null;

  const Submit = (value): void => {
    setrequestFormVisible(false);
    setreqPayload({ ...reqPayload, emailAddress: value.emailAddress });
    const PayLoad = payload({ ...reqPayload, emailAddress: value.emailAddress });
    fetchPageReport(PayLoad)
      .then((res: any) => {
        if (res.status === 200) {
          setThankYouNote(true);
        } else {
        }
        timer = setTimeout(() => {
          setThankYouNote(false);
          clearTimeout(timer);
        }, 5000);
      })
      .catch(err => {
        console.log('Oops an error has occured: ', err);
      });
  };

  const handleClose = () => {
    setrequestFormVisible(false);
  };

  const ReportRequestForm = (): JSX.Element => {
    const { register, errors, handleSubmit } = useForm();
    return (
      <RequestReportForm onSubmit={handleSubmit(Submit)} className="e-shad">
        <p>
          We are preparing your report! Please enter your email address and we'll email you a link when it's ready —
          usually within a few minutes.
        </p>
        <Align>
          <label>Email</label>
          <EmailAddress
            type="text"
            name="emailAddress"
            ref={register({
              required: true,
              pattern: emailRGX,
            })}
          />
        </Align>
        <ErrorMsg>{errors.emailAddress && 'Please enter a valid email address'}</ErrorMsg>
        <AlignAlt>
          <CancelButton onClick={handleClose}>Cancel</CancelButton>
          <SubmitButton type="submit">Submit</SubmitButton>
        </AlignAlt>
      </RequestReportForm>
    );
  };

  const ThanksMsg = (): JSX.Element => {
    return (
      <ThankyouNote className="e-shad">
        Thank you, an email with a download link is on its way to {reqPayload.emailAddress}
      </ThankyouNote>
    );
  };

  const WaitMessage = () => {
    return (
      <ThankyouNote className="e-shad">
        Thank you, your report will download soon (typically within 20 seconds)
      </ThankyouNote>
    );
  };

  const handleExportPDF = () => {
    setWaitingNote(true);
    timer = setTimeout(() => {
      setWaitingNote(false);
      clearTimeout(timer);
    }, 5000);
    axios
      .get(`https://pdfmyurl.com/api?license=H2oRd9Ih6vnA&url=${window.location.href}`, {
        responseType: 'arraybuffer',
      })
      .then(res => {
        let blob = new Blob([res.data], { type: 'application/pdf' });
        let link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = `${LongName}-${handle}.pdf`;
        link.click();
      });
  };

  const handleRequestExport = option => {
    setreqPayload({ formatID: option.id, LongName, pageSubTitle, emailAddress: '' });
    setrequestFormVisible(true);
  };

  return (
    <>
      <NOROBOT>
        {requestFormVisible && <ReportRequestForm />}
        {WaitingNote && <WaitMessage />}
      </NOROBOT>
      <DropdownContainer>
        <ExportPageButton
          onClick={(): void => {
            if (!dropdownVisible) {
              const dismiss = (): void => {
                setDropdownVisible(false);
                document.removeEventListener('click', dismiss);
              };
              document.addEventListener('click', dismiss);
            }
            setDropdownVisible(!dropdownVisible);
          }}
        />
        <ShareDropdownList dropdownVisible={dropdownVisible}>
          {ExportOptions.map((option, i) => (
            <ShareDropdownListItem key={i} onClick={handleExportPDF}>
              {option.displayText}
            </ShareDropdownListItem>
          ))}
        </ShareDropdownList>
      </DropdownContainer>
    </>
  );
};

const PageButtonName = styled.span`
  margin-left: 5px;
  line-height: 25px;
  text-align: left;
  grid-column: displayText;
`;

const ShareButton = ({ onClick }): JSX.Element => (
  <PageShareButtonLink onClick={onClick}>
    <FaShareAlt size={'18px'} />
    <PageButtonName>Share</PageButtonName>
  </PageShareButtonLink>
);
const ExportPageButton = ({ onClick }): JSX.Element => (
  <PageExportButtonLink onClick={onClick}>
    <FaFileExport size={'18px'} />
    <PageButtonName>Export</PageButtonName>
  </PageExportButtonLink>
);

const DropdownContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  position: relative;
`;

const DropdownListItem = styled.li`
  padding: 8px;

  &:hover {
    cursor: pointer;
    color: ${variables.colorEconomyDark};
    background-color: white;
  }
`;

const DropdownList = styled.ul`
  visibility: ${(props: any) => (props.dropdownVisible ? 'visible' : 'hidden')};
  z-index: 100;
  position: absolute;
  right: 0;
  top: 25px;
  background-color: ${variables.colorEconomy};
  color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 100px;
  list-style-type: none;
  margin: 5px auto auto 0;
`;
const ShareDropdownList = styled(DropdownList)`
  width: 110px;
`;

const ShareDropdownListItem = styled(DropdownListItem)`
  a {
    display: grid;
    grid-gap: 10px;
    grid-template-columns: [logo] 10px [displayText];
    align-items: center;
    text-decoration: none;
    color: #fff;
  }
  svg {
    fill: #fff;
  }

  &:hover {
    cursor: pointer;
    a {
      color: ${variables.colorEconomyDark};
      background-color: white;
    }
    svg {
      fill: ${variables.colorEconomyDark};
    }
  }
`;

const ButtonLink = styled.a`
  width: fit-content;
  display: inline-flex;
  bottom: 5px;
  right: 10px;
  padding: 0 0 0 5px;
  border: none;
  line-height: 25px;
  height: 25px;
  cursor: pointer;
  background-color: #dddddd;
  color: ${variables.grayDark};
`;

const IconBase = styled.span`
  height: 25px;
  width: 25px;
  margin-left: 5px;
  color: #fff;
  background-color: ${variables.colorEconomy};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PageShareButtonLink = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;
const PageExportButtonLink = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const Button = ({ name, action, children }): JSX.Element => (
  <ButtonLink onClick={action}>
    <span>{name}</span>
    {children}
  </ButtonLink>
);

const ExportButton = ({ onClick }): JSX.Element => (
  <Button name="export" action={onClick}>
    <IconBase>
      <FaFileExport />
    </IconBase>
  </Button>
);

export const ResetButton = ({ onClick }): JSX.Element => (
  <Button name="reset" action={onClick}>
    <IconBase>
      <FaUndo />
    </IconBase>
  </Button>
);

const _Actions = styled.div`
  position: absolute;
  display: flex;
  top: 10px;
  right: 10px;
  z-index: 100;
`;

export class Actions extends React.Component<{}, { visible: boolean }> {
  public render = () => {
    return <_Actions className="action">{this.props.children}</_Actions>;
  };
}

export const EntityContainer = styled.div`
  position: relative;
`;
