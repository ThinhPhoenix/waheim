import i18n from '@/helpers/i18n';
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
          className="px-96!"
          initState={{ username: 'John Doe', age: 25 }}
        />
      </Col>
    </Col>
  );
}
