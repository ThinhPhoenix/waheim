import i18n from '@/helpers/i18n';
import {
  MobileOutlined,
  RightOutlined,
  SettingOutlined,
  ShareAltOutlined,
  SignatureOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { useNavigate } from '@tanstack/react-router';

interface MenuItemProps {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
}

const MenuItem = ({ icon, label, onClick }: MenuItemProps) => (
  <button
    onClick={onClick}
    className="w-full flex items-center justify-between p-4 hover:bg-[#2a2a2a] transition-colors rounded-lg group"
  >
    <div className="flex items-center gap-3">
      <div className="text-gray-400 group-hover:text-white transition-colors">
        {icon}
      </div>
      <span className="text-gray-200 group-hover:text-white transition-colors">
        {label}
      </span>
    </div>
    <RightOutlined className="text-gray-600 group-hover:text-gray-400 transition-colors text-xs" />
  </button>
);

export default function ProfileMenu() {
  const navigate = useNavigate();
  const menuItems = [
    {
      icon: <UserOutlined />,
      label: i18n.t('profile:editProfile'),
      action: () => {},
    },
    {
      icon: <SettingOutlined />,
      label: i18n.t('profile:generalSettings'),
      action: () => {},
    },
    {
      icon: <MobileOutlined />,
      label: i18n.t('profile:about'),
      action: () => navigate({ to: '/about' }),
    },
    {
      icon: <SignatureOutlined />,
      label: i18n.t('profile:terms'),
      action: () => {},
    },
    {
      icon: (
        <svg
          className="w-4 h-4"
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_1545_10607)">
            <path
              d="M3 6.9999V4.3699C3.00781 3.85293 3.11755 3.34258 3.32294 2.8681C3.52832 2.39362 3.82532 1.96433 4.1969 1.60482C4.56848 1.24531 5.00735 0.962663 5.48836 0.77306C5.96936 0.583458 6.48306 0.490631 7 0.499899V0.499899C7.51694 0.490631 8.03064 0.583458 8.51164 0.77306C8.99265 0.962663 9.43152 1.24531 9.8031 1.60482C10.1747 1.96433 10.4717 2.39362 10.6771 2.8681C10.8824 3.34258 10.9922 3.85293 11 4.3699V6.9999"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M1.5 5.5H2.5C2.63261 5.5 2.75979 5.55268 2.85355 5.64645C2.94732 5.74021 3 5.86739 3 6V9C3 9.13261 2.94732 9.25979 2.85355 9.35355C2.75979 9.44732 2.63261 9.5 2.5 9.5H1.5C1.23478 9.5 0.98043 9.39464 0.792893 9.20711C0.605357 9.01957 0.5 8.76522 0.5 8.5V6.5C0.5 6.23478 0.605357 5.98043 0.792893 5.79289C0.98043 5.60536 1.23478 5.5 1.5 5.5V5.5Z"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M12.5 9.5H11.5C11.3674 9.5 11.2402 9.44732 11.1464 9.35355C11.0527 9.25979 11 9.13261 11 9V6C11 5.86739 11.0527 5.74021 11.1464 5.64645C11.2402 5.55268 11.3674 5.5 11.5 5.5H12.5C12.7652 5.5 13.0196 5.60536 13.2071 5.79289C13.3946 5.98043 13.5 6.23478 13.5 6.5V8.5C13.5 8.76522 13.3946 9.01957 13.2071 9.20711C13.0196 9.39464 12.7652 9.5 12.5 9.5V9.5Z"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M9 12.25C9.53043 12.25 10.0391 12.0393 10.4142 11.6642C10.7893 11.2891 11 10.7804 11 10.25V8"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M9 12.25C9 12.5815 8.8683 12.8995 8.63388 13.1339C8.39946 13.3683 8.08152 13.5 7.75 13.5H6.25C5.91848 13.5 5.60054 13.3683 5.36612 13.1339C5.1317 12.8995 5 12.5815 5 12.25C5 11.9185 5.1317 11.6005 5.36612 11.3661C5.60054 11.1317 5.91848 11 6.25 11H7.75C8.08152 11 8.39946 11.1317 8.63388 11.3661C8.8683 11.6005 9 11.9185 9 12.25Z"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
          <defs>
            <clipPath id="clip0_1545_10607">
              <rect width="14" height="14" fill="white" />
            </clipPath>
          </defs>
        </svg>
      ),
      label: i18n.t('profile:support'),
      action: () => {},
    },
    {
      icon: <ShareAltOutlined />,
      label: i18n.t('profile:share'),
      action: () => {},
    },
  ];

  return (
    <div className="bg-linear-to-br from-[#252423] to-[#1a1918] rounded-xl shadow-lg my-4 overflow-hidden border border-[#2a2a2a]">
      <div className="p-2">
        {menuItems.map((item, index) => (
          <MenuItem key={index} {...item} onClick={item.action} />
        ))}
      </div>
    </div>
  );
}
