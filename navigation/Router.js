import {
  createRouter,
} from '@exponent/ex-navigation';

import HomeScreen from '../screens/HomeScreen';
import PrayerScreen from '../screens/PrayerScreen';
import MoiNameScreen from '../screens/MoiNameScreen';
import AnnoucementScreen from '../screens/AnnouncementScreen';
import MoiScreen from '../screens/MoiScreen';
import RootNavigation from './RootNavigation';

export default createRouter(() => ({
  home: () => HomeScreen,
  links: () => PrayerScreen,
  settings: () => MoiNameScreen,
  announcements: () => AnnoucementScreen,
  login: () => MoiScreen,
  rootNavigation: () => RootNavigation,
}));
