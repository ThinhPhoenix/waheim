import i18n from '@/helpers/i18n';
import { createFileRoute } from '@tanstack/react-router';
import { Input } from 'antd';
import React from 'react';

export const Route = createFileRoute('/search/')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <React.Fragment>
      <Input.Search
        placeholder={`${i18n.t('common:search')}...`}
        variant="filled"
      />
    </React.Fragment>
  );
}
