import { useState, useEffect, useContext } from 'react';
import _ from 'lodash';
import styled from 'styled-components';
import React from 'react';
import ReportServiceFetcher from './ReportsFetcher';
import CheckboxGroup from './CheckboxGroup';
import { SectionTitle } from '../../layouts/covid19/page/Styles';
import useForm from 'react-hook-form';
import { emailRGX } from '../../utils/Regex';
import { EmailAddress, ErrorMsg, SubmitButton } from '../Actions';
import { ClientContext } from '../../utils/context';
import useEntityText from '../../utils/useEntityText';

const ReportsTool = ({ pageGroups }) => {
  const { clientAlias, LongName } = useContext(ClientContext);
  const Title = useEntityText('SubTitle');
  const [checkedPages, setCheckedPages] = useState([]);
  const [requestAttempt, setRequestAttempt] = useState(false);
  const [requestSuccesful, setRequestSuccesful] = useState(false);
  const [thanksMessage, setThanksMessage] = useState(false);
  const { register, errors, handleSubmit } = useForm({
    defaultValues: {
      format: '0',
    },
  });
  const [reportFormat, setReporFormat] = useState('0');

  const onChange = group => setCheckedPages(updateCheckedPages(group));

  useEffect(() => {
    setThanksMessage(requestSuccesful);
  }, [requestSuccesful]);

  const updateCheckedPages = (group: any): [] => {
    let pages: any = [...checkedPages];
    const exists = pages.some(({ id }) => id === group.id);
    const isEmpty = group.registeredOptions.length <= 0;
    setRequestAttempt(false);
    if (!exists && !isEmpty) {
      pages.push(group);
    } else {
      const newPages = pages.filter(({ id }) => id != group.id);
      pages = isEmpty ? [...newPages] : [...newPages, group];
    }
    return pages;
  };

  const onRequestReports = data => {
    setRequestAttempt(true);
    if (checkedPages.length === 0) return;
    const pages = _.sortBy(checkedPages, 'id');
    ReportServiceFetcher({ clientAlias, LongName, Title, data, pages })
      .then(message => {
        setRequestSuccesful(true);
      })
      .catch(e => {
        setRequestSuccesful(false);
      });
  };

  const handleCloseThankYouMessage = () => {
    setRequestSuccesful(false);
    setThanksMessage(false);
  };

  const ThankYouMessage = (): JSX.Element => {
    return (
      <div>
        <p>Thank you. Your report is on its way! (usually less than a few minutes).</p>
        <br />
        <SubmitButton onClick={handleCloseThankYouMessage}>Run another report ?</SubmitButton>
      </div>
    );
  };

  const buildSiteMap = () => {
    const uniq = [...new Set(pageGroups.map(group => group.col))];
    const finalCols = [];
    uniq.forEach(colnum => finalCols.push(pageGroups.filter(({ col }) => col === colnum)));

    const layout = finalCols.map((column, i) => (
      <Column key={i} col={i + 1}>
        {column.map((groups, i) => {
          return (
            <ColumnGroup key={i}>
              <CheckboxGroup key={i} group={groups} onSelect={onChange} />
            </ColumnGroup>
          );
        })}
      </Column>
    ));
    return layout;
  };

  return (
    <>
      <SectionTitle>
        1) Select the topic(s) you would like to include in the report.{' '}
        <span>All selected topics will be combined into one report.</span>
      </SectionTitle>
      <SiteMapContainer>{buildSiteMap()}</SiteMapContainer>
      <SectionTitle>
        2) Select the report's format and request the report via email
        <span>A download link will be emailed to you shortly after submiting your request </span>
      </SectionTitle>
      {thanksMessage ? (
        <ThankYouMessage />
      ) : (
        <form onSubmit={handleSubmit(onRequestReports)}>
          <Format>
            <Rad
              type="radio"
              name="format"
              id="pdf"
              ref={register}
              value="0"
              checked={reportFormat === '0'}
              onClick={() => setReporFormat('0')}
            />
            <label htmlFor="pdf">PDF</label>
            <Rad
              type="radio"
              name="format"
              id="word"
              ref={register}
              value="1"
              checked={reportFormat === '1'}
              onClick={() => setReporFormat('1')}
            />
            <label htmlFor="word">WORD</label>
          </Format>
          <EmailContainer>
            <EmailAddress
              type="text"
              name="emailAddress"
              placeholder="Enter your email"
              ref={register({
                required: true,
                pattern: emailRGX,
              })}
            />
            <SubmitButton type="submit">Email me the report</SubmitButton>
          </EmailContainer>
          <ErrorMsg>{errors.emailAddress && 'Please enter a valid email address'}</ErrorMsg>
          <ErrorMsg>{_.isEmpty(checkedPages) && requestAttempt && 'Please select at least one topic'}</ErrorMsg>
        </form>
      )}
    </>
  );
};

export default ReportsTool;

const Format = styled.div`
  margin-bottom: 20px;
  label {
    font-weight: bold;
    margin-right: 10px;
  }
`;
const ColumnGroup = styled.div`
  margin-top: 10px;
  margin-right: 40px;
`;
const SiteMapContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Column = styled.div`
  /* grid-area: ${props => `col${props.col}`}; */
`;

const EmailContainer = styled.div`
  display: flex;
  font-size: 14px;
  line-height: 18px;
  position: relative;
  p {
    color: #fff;
  }
`;

const Rad = styled.input`
  &[type='radio']:checked,
  &[type='radio']:not(:checked) {
    position: absolute;
    left: -9999px;
  }
  &[type='radio']:checked + label,
  &[type='radio']:not(:checked) + label {
    position: relative;
    padding-left: 28px;
    cursor: pointer;
    line-height: 20px;
    display: inline-block;
    color: #666;
  }
  &[type='radio']:checked + label:before,
  &[type='radio']:not(:checked) + label:before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 18px;
    height: 18px;
    border: 1px solid #ddd;
    border-radius: 100%;
    background: #fff;
  }
  &[type='radio']:checked + label:after,
  &[type='radio']:not(:checked) + label:after {
    content: '';
    width: 12px;
    height: 12px;
    background: #70b859;
    position: absolute;
    top: 3px;
    left: 3px;
    border-radius: 100%;
    -webkit-transition: all 0.05s ease;
    transition: all 0.05s ease;
  }
  &[type='radio']:not(:checked) + label:after {
    opacity: 0;
    -webkit-transform: scale(0);
    transform: scale(0);
  }
  &[type='radio']:checked + label:after {
    opacity: 1;
    -webkit-transform: scale(1);
    transform: scale(1);
  }
`;
