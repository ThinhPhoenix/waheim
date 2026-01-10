import Assets from '@/assets';

export const navMenu = {
  feed: {
    label: 'common:navMenu.feed',
    icon: Assets.LottiesArticle,
    href: '/',
  },
  search: {
    label: 'common:navMenu.search',
    icon: Assets.LottiesSearch,
    href: '/search',
  },
  favorites: {
    label: 'common:navMenu.favorites',
    icon: Assets.LottiesHeart,
    href: '/favorites',
  },
  profile: {
    label: 'common:navMenu.profile',
    icon: Assets.LottiesProfile,
    href: '/profile',
  },
};
