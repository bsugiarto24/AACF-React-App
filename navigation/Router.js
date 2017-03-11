import {
  createRouter,
} from '@exponent/ex-navigation';

import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import SettingsScreen from '../screens/SettingsScreen';
import AnnoucementScreen from '../screens/AnnouncementScreen';
import LoginScreen from '../screens/LoginScreen';
import RootNavigation from './RootNavigation';

export default createRouter(() => ({
  home: () => HomeScreen,
  links: () => LinksScreen,
  settings: () => SettingsScreen,
  announcements: () => AnnoucementScreen,
  login: () => LoginScreen,
  rootNavigation: () => RootNavigation,
}));
