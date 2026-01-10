import { colors } from '@/helpers/constants/colors';
import { ConfigProvider, theme } from 'antd';

export default function AntdProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
        token: {
          colorBgBase: colors.primaryForeground,
          colorBgContainer: colors.primaryForeground,
          borderRadius: 8,
          colorPrimary: colors.primary,
        },
      }}
      componentSize="large"
    >
      {children}
    </ConfigProvider>
  );
}
