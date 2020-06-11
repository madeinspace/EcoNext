import { ClientContext } from '../../utils/context';
import { useContext, useState } from 'react';
import _ from 'lodash';
import styled from 'styled-components';
import React from 'react';
import { Checkbox, Form, Input, Button } from 'antd';

const ReportsTool = () => {
  const { clientPages, sitemapGroups, clientAlias } = useContext(ClientContext);
  const [checkedPages, setCheckedPages] = useState([]);

  const validateMessages = {
    required: '${label} is required!',
    types: {
      email: '${label} is not validate email!',
    },
  };

  const onChange = checkedValues => {
    setCheckedPages(checkedValues);
    console.log('checked = ', checkedValues);
  };

  const onRequestReports = () => {
    if (checkedPages.length === 0) return;
    console.log(`requesting reports for:  ${checkedPages}`);
  };

  const group1 = clientPages
    .filter(node =>
      sitemapGroups[4].Pages.split(',')
        .map(Number)
        .includes(node.PageID),
    )
    .map(item => {
      return { label: item.MenuTitle, value: item.Alias };
    });
  return (
    <>
      <SiteMapContainer>
        <Checkbox.Group options={group1} defaultValue={[]} onChange={onChange} />
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
  display: flex;
  justify-content: space-between;
`;

const RequestForm = styled(Form)`
  margin-top: 20px;
`;
