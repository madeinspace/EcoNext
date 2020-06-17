import { ClientContext } from '../../utils/context';
import { useContext, useState } from 'react';
import _ from 'lodash';
import styled from 'styled-components';
import React from 'react';
import { Form, Input, Button } from 'antd';
import ReportServiceFetcher from './ReportsFetcher';
import CheckboxGroup from './CheckboxGroup';
import { EconomicOverviewReports } from './ReportLists';

const ReportsTool = () => {
  const [checkedPages, setCheckedPages] = useState([]);

  const validateMessages = {
    required: '${label} is required!',
    types: {
      email: '${label} is not validate email!',
    },
  };

  const onChange = group => setCheckedPages(updateCheckedPages(group));

  const updateCheckedPages = (group: any): [] => {
    let pages: any = [...checkedPages];
    const exists = pages.some(({ id }) => id === group.id);
    const isEmpty = group.registeredValues.length <= 0;

    if (!exists && !isEmpty) {
      pages.push(group);
    } else {
      const newPages = pages.filter(({ id }) => id != group.id);
      pages = isEmpty ? [...newPages] : [...newPages, group];
    }
    return pages;
  };

  const onRequestReports = () => {
    if (checkedPages.length === 0) return;
    const ordered = _.sortBy(checkedPages, 'id');
    ReportServiceFetcher(ordered).then(message => console.log(message));
  };

  return (
    <>
      <SiteMapContainer>
        {EconomicOverviewReports.map((group, id) => {
          return <CheckboxGroup key={id} group={group} onSelect={onChange} />;
        })}
      </SiteMapContainer>
      <RequestForm name="nest-messages" onFinish={onRequestReports} validateMessages={validateMessages}>
        <Form.Item required name={['user', 'email']} label="Email" rules={[{ type: 'email' }]}>
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </RequestForm>
    </>
  );
};

export default ReportsTool;

const SiteMapContainer = styled.div`
  /* display: flex; */
  /* justify-content: space-between; */
`;

const RequestForm = styled(Form)`
  margin-top: 20px;
`;
