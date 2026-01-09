import i18n from '@/helpers/i18n';
import { createFileRoute } from '@tanstack/react-router';
import { Col, Row } from 'antd';
import FancyButton from './___shared/fancy-button';
import FancyForm, { type FieldForm } from './___shared/fancy-form';

export const Route = createFileRoute('/')({
  component: RouteComponent,
});

function RouteComponent() {
  const fields: FieldForm[] = [
    {
      type: 'text',
      label: 'Username',
      placeHolder: 'Enter your username',
      rules: [{ required: true, message: 'Username is required' }],
      key: 'username',
    },
    {
      type: 'password',
      label: 'Password',
      placeHolder: 'Enter your password',
      rules: [{ required: true, message: 'Password is required' }],
      key: 'password',
    },
    {
      key: 'phone',
      type: 'tel',
      label: 'Phone Number',
      placeHolder: 'Enter your phone number',
      options: [
        { label: '+1 US', value: '+1' },
        { label: '+84 VN', value: '+84' },
        { label: '+44 UK', value: '+44' },
        { label: '+86 CN', value: '+86' },
      ],
    },
    {
      key: 'age',
      type: 'number',
      label: 'Age',
      placeHolder: 'Enter your age',
    },
    {
      key: 'description',
      type: 'areatext',
      label: 'Description',
      placeHolder: 'Enter your description',
    },
  ];

  return (
    <Col>
      <Row className="p-4 gap-2">
        <FancyButton type="primary">{i18n.t('common:loadTodos')}</FancyButton>
        <FancyButton type="default">{i18n.t('common:loadTodos')}</FancyButton>
        <FancyButton type="dashed">{i18n.t('common:loadTodos')}</FancyButton>
        <FancyButton type="link">{i18n.t('common:loadTodos')}</FancyButton>
        <FancyButton type="text">{i18n.t('common:loadTodos')}</FancyButton>
      </Row>
      <Col>
        <FancyForm
          render={fields}
          className="px-96!"
          initState={{ username: 'John Doe', age: 25 }}
        />
      </Col>
    </Col>
  );
}
