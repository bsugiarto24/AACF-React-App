import {
  createRouter,
} from '@exponent/ex-navigation';

import HomeScreen from '../screens/HomeScreen';
import PrayerScreen from '../screens/PrayerScreen';
import SettingsScreen from '../screens/SettingsScreen';
import AnnoucementScreen from '../screens/AnnouncementScreen';
import MoiScreen from '../screens/MoiScreen';
import RootNavigation from './RootNavigation';

export default createRouter(() => ({
  home: () => HomeScreen,
  links: () => PrayerScreen,
  settings: () => SettingsScreen,
  announcements: () => AnnoucementScreen,
  login: () => MoiScreen,
  rootNavigation: () => RootNavigation,
}));
