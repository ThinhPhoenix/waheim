import { navMenu } from '@/helpers/constants/nav-menu';
import { Link, useLocation } from '@tanstack/react-router';
import Lottie, { type LottieRefCurrentProps } from 'lottie-react';
import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

const NavMenu: React.FC = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const [lottieRefs] = useState(() =>
    Object.keys(navMenu).map(() => useRef<LottieRefCurrentProps | null>(null)),
  );

  const handleIconClick = (index: number) => {
    const key = Object.keys(navMenu)[index];
    const item = navMenu[key as keyof typeof navMenu];
    const isSelected = location.pathname === item.href;
    if (!isSelected) {
      const ref = lottieRefs[index];
      if (ref.current) {
        ref.current.play();
      }
    }
  };

  return (
    <div className="nav-menu-container fixed bottom-0 left-0 right-0 bg-black/50 w-full py-2 backdrop-blur-2xl border-t border-primary-foreground">
      <nav className="nav-menu flex justify-around gap-5 pb-8">
        {Object.keys(navMenu).map((key, index) => {
          const item = navMenu[key as keyof typeof navMenu];
          const isSelected = location.pathname === item.href;
          return (
            <Link
              to={item.href}
              key={key}
              className="nav-menu-item"
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                cursor: 'pointer',
              }}
            >
              <Lottie
                animationData={item.icon}
                className="nav-menu-icon"
                autoplay={isSelected}
                loop={false}
                lottieRef={lottieRefs[index]}
                onClick={() => handleIconClick(index)}
                style={{
                  width: '30px',
                  height: '30px',
                  filter: isSelected ? 'none' : 'grayscale(100%)',
                }}
              />
              <span
                className={`text-xs ${isSelected ? 'text-primary' : 'text-[#8f8f8f]'}`}
              >
                {t(item.label)}
              </span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default NavMenu;
