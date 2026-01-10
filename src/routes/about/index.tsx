import { envConfig } from '@/helpers/constants/env-config';
import '@/routes/___shared/inner-html/inner-html.css';
import { createFileRoute } from '@tanstack/react-router';
import { Col } from 'antd';
import pkg from '../../../package.json';
import InnerHTML from '../___shared/inner-html';

export const Route = createFileRoute('/about/')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <Col>
      <p className="capitalize inner-html">
        © {new Date().getFullYear()} Waheim PWA {pkg.version} -{' '}
        {envConfig.bunEnv}
      </p>
      <InnerHTML html={``} />
    </Col>
  );
}
