import Assets from '@/assets';
import i18n from '@/helpers/i18n';
import FancyButton from '@/routes/___shared/fancy-button';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { Col } from 'antd';
import ProfileMenu from './___ui/profile-menu';

export const Route = createFileRoute('/(tabs)/profile/')({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();

  const handleSignOut = () => {
    navigate({ to: '/sign-in' });
  };

  return (
    <Col>
      <div className="flex items-center justify-between gap-2">
        <h2>{i18n.t('profile:title')}</h2>
        <img
          className="aspect-square object-cover w-8 h-8 rounded-full"
          src="https://scontent.fsgn2-9.fna.fbcdn.net/v/t39.30808-6/428607981_1431840717727021_3463965357891644094_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=Y2ffjVXim4AQ7kNvwEQXb-l&_nc_oc=AdlyT7YVvSJF8D6rfi6wQQQ2pLJV0IdBIKL2rWGaM4EqfuIUu2CcCEEc29D9N9MUnXfaR2qgQiPoiayYt-U1kCNi&_nc_zt=23&_nc_ht=scontent.fsgn2-9.fna&_nc_gid=yHAvmoEKYSYuZJSeWGEm9Q&oh=00_AfqP9AcHEV2IuFN93dJ6sT__f-sM4RA6DlsEYbZrIQtirQ&oe=6967D169"
        />
      </div>
      <div>
        <ProfileMenu />
        <FancyButton
          className="w-full"
          variant="filled"
          icon={<img src={Assets.IconsSignOut} />}
          iconPlacement="end"
          onClick={handleSignOut}
        >
          {i18n.t('common:button.signOut')}
        </FancyButton>
      </div>
    </Col>
  );
}
