import _ from 'lodash';
import React, { useContext, useEffect, useState } from 'react';
import useForm from 'react-hook-form';
import styled from 'styled-components';
import { SectionTitle } from '../../layouts/covid19/page/Styles';
import { ClientContext } from '../../utils/context';
import useDropdown from '../../utils/hooks/useDropdown';
import { emailRGX } from '../../utils/Regex';
import useEntityText from '../../utils/useEntityText';
import { EmailAddress, ErrorMsg, SubmitButton } from '../Actions';
import CheckboxGroup from './CheckboxGroup';
import ReportServiceFetcher from './ReportsFetcher';

const ReportsTool = ({ dropdownData = null, pageGroups }) => {
  const Title = useEntityText('SubTitle');
  const { clientAlias, LongName, ClientID } = useContext(ClientContext);
  const [checkedPages, setCheckedPages] = useState([]);
  const [requestAttempt, setRequestAttempt] = useState(false);
  const [requestSuccesful, setRequestSuccesful] = useState(false);
  const [thanksMessage, setThanksMessage] = useState(false);
  const [reportFormat, setReporFormat] = useState('0');
  const { register, errors, handleSubmit } = useForm({
    defaultValues: {
      format: '0',
    },
  });

  const industryDropDownInitialState = {
    label: 'All industries',
    parent: false,
    parentValue: '22000',
    key: 'IndkeyNieir',
    parentKey: 'IndkeyNieir',
    value: '22000',
  };
  const [industryKey, IndustryDropdown] = useDropdown('All industries', industryDropDownInitialState, dropdownData);

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

  const onRequestReports = userData => {
    setRequestAttempt(true);
    if (checkedPages.length === 0) return;
    const pages = prepareOptionsForExport();
    ReportServiceFetcher({ ClientID, clientAlias, LongName, reportTitle: Title, userData, pages })
      .then(message => {
        setRequestSuccesful(true);
      })
      .catch(e => {
        setRequestSuccesful(false);
      });
  };

  const prepareOptionsForExport = () => {
    const sortedCheckedPages: any = _.sortBy(checkedPages, 'id')[0];
    const flattenedPagesList = sortedCheckedPages.registeredOptions.map(option => buildReportObject(option));
    return flattenedPagesList;
  };

  const buildReportObject = ({ label, value, id }) => {
    const query = buildQuery(id);
    return {
      Title: label,
      url: `https://economy.id.com.au/${clientAlias}/${value}${query}`,
    };
  };

  const buildQuery = pageID => {
    const is2DigitPage = is2digitPage(pageID);
    const indValue = is2DigitPage ? industryKey.twoDigitValue : industryKey.oneDigitValue;
    const indKey = is2DigitPage ? industryKey.twoDigitKey : industryKey.oneDigitKey;
    const query = `?${indKey}=${indValue}`;
    return query;
  };

  const is2digitPage = pageID => {
    return pageID === 4330;
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
      {dropdownData && (
        <>
          <SectionTitle>
            Select the industry you would like to produce a report for.
            <span>All industries is selected by default</span>
          </SectionTitle>
          <IndustryDropdown />
          <br />
        </>
      )}
      <SectionTitle>
        Select the topic(s) you would like to include in the report.{' '}
        <span>All selected topics will be combined into one report.</span>
      </SectionTitle>
      <SiteMapContainer>{buildSiteMap()}</SiteMapContainer>
      <SectionTitle>
        Select the report's format and request the report via email
        <span>Your report will be emailed to you shortly after submiting your request </span>
      </SectionTitle>
      {thanksMessage ? (
        <ThankYouMessage />
      ) : (
        <>
          <form onSubmit={handleSubmit(onRequestReports)}>
            <Format>
              <Rad
                type="radio"
                name="format"
                id="pdf"
                ref={register}
                value="0"
                checked={reportFormat === '0'}
                onChange={() => setReporFormat('0')}
              />
              <label htmlFor="pdf">PDF</label>
              <Rad
                type="radio"
                name="format"
                id="word"
                ref={register}
                value="1"
                checked={reportFormat === '1'}
                onChange={() => setReporFormat('1')}
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
          </form>
          <ErrorMsg>
            {_.isEmpty(checkedPages) && requestAttempt && 'Please select at least one topic to export'}
          </ErrorMsg>
        </>
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
