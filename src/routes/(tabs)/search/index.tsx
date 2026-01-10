import i18n from '@/helpers/i18n';
import { createFileRoute } from '@tanstack/react-router';
import { Col, Input } from 'antd';

export const Route = createFileRoute('/(tabs)/search/')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <Col>
      <div className="flex items-center gap-2">
        <h2>{i18n.t('search:title')}</h2>
      </div>
      <Input.Search
        placeholder={`${i18n.t(`common:search`)}...`}
        variant="filled"
      />
    </Col>
  );
}
