import { registerRootComponent } from 'expo';

if (typeof Intl === 'undefined') {
  require('intl');
  require('intl/locale-data/jsonp/en');
  require('intl/locale-data/jsonp/ru');
}

import { App } from './src/app/app';

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
