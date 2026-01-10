import i18n from '@/helpers/i18n';
import { createFileRoute } from '@tanstack/react-router';
import { Col } from 'antd';

export const Route = createFileRoute('/(tabs)/')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <Col>
      <div className="flex items-center gap-2">
        <h2>{i18n.t('feed:title')}</h2>
        <h3 className="text-[#969696]">10 tháng 1</h3>
      </div>
    </Col>
  );
}
