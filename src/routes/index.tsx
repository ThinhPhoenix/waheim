import i18n from '@/helpers/i18n';
import { UserOutlined } from '@ant-design/icons';
import { createFileRoute } from '@tanstack/react-router';
import { Col, Row } from 'antd';
import FancyButton from './___shared/fancy-button';
import FancyForm, { type FieldForm } from './___shared/fancy-form';
import FancyFormMobile from './___shared/fancy-form-mobile';

export const Route = createFileRoute('/')({
  component: RouteComponent,
});

function RouteComponent() {
  const fields: FieldForm[] = [
    {
      type: 'date',
      label: 'Date',
      placeHolder: 'Enter your username',
      key: 'date',
    },
    {
      type: 'text',
      label: 'Username',
      placeHolder: 'Enter your username',
      key: 'username',
      leftComponent: <UserOutlined />,
    },
    {
      type: 'number',
      label: 'Age',
      placeHolder: 'Enter your age',
      key: 'age',
    },
    {
      key: 'tel',
      type: 'tel',
      label: 'Phone Number',
      placeHolder: 'Enter your phone number',
      options: [
        { label: 'US (+1)', value: '+1' },
        { label: 'UK (+44)', value: '+44' },
        { label: 'VN (+84)', value: '+84' },
        { label: 'US (+1)', value: '+1' },
        { label: 'UK (+44)', value: '+44' },
        { label: 'VN (+84)', value: '+84' },
        { label: 'US (+1)', value: '+1' },
        { label: 'UK (+44)', value: '+44' },
        { label: 'VN (+84)', value: '+84' },
        { label: 'US (+1)', value: '+1' },
        { label: 'UK (+44)', value: '+44' },
        { label: 'VN (+84)', value: '+84' },
        { label: 'US (+1)', value: '+1' },
        { label: 'UK (+44)', value: '+44' },
        { label: 'VN (+84)', value: '+84' },
        { label: 'US (+1)', value: '+1' },
        { label: 'UK (+44)', value: '+44' },
        { label: 'VN (+84)', value: '+84' },
        { label: 'US (+1)', value: '+1' },
        { label: 'UK (+44)', value: '+44' },
        { label: 'VN (+84)', value: '+84' },
        { label: 'US (+1)', value: '+1' },
        { label: 'UK (+44)', value: '+44' },
        { label: 'VN (+84)', value: '+84' },
        { label: 'US (+1)', value: '+1' },
        { label: 'UK (+44)', value: '+44' },
        { label: 'VN (+84)', value: '+84' },
        { label: 'US (+1)', value: '+1' },
        { label: 'UK (+44)', value: '+44' },
        { label: 'VN (+84)', value: '+84' },
        { label: 'US (+1)', value: '+1' },
        { label: 'UK (+44)', value: '+44' },
        { label: 'VN (+84)', value: '+84' },
      ],
    },
    {
      type: 'select',
      label: 'Favorite Fruit',
      placeHolder: 'Select your favorite fruit',
      key: 'favoriteFruit',
      options: [
        { label: 'Apple', value: 'apple' },
        { label: 'Banana', value: 'banana' },
        { label: 'Orange', value: 'orange' },
        { label: 'Mango', value: 'mango' },
        { label: 'Pineapple', value: 'pineapple' },
      ],
    },
    {
      type: 'comboselect',
      label: 'Country',
      placeHolder: 'Select your country',
      key: 'country',
      options: [
        { label: 'United States', value: 'us' },
        { label: 'United Kingdom', value: 'uk' },
        { label: 'Vietnam', value: 'vn' },
        { label: 'Canada', value: 'ca' },
        { label: 'Australia', value: 'au' },
      ],
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
        <FancyFormMobile
          render={fields}
          className="p-8!"
          initState={{ username: 'John Doe', age: 25 }}
        />
        <FancyForm
          render={fields}
          className="p-8!"
          initState={{ username: 'John Doe', age: 25 }}
        />
      </Col>
    </Col>
  );
}
