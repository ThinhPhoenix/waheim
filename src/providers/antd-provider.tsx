import { ConfigProvider, theme } from 'antd';
import { colors } from '@/helpers/constants/colors';

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
    >
      {children}
    </ConfigProvider>
  );
}
