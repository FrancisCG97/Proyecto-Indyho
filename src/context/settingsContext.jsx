import { createContext, useEffect, useState } from 'react';

import themeConfig from '@configs/themeConfig';

const initialSettings = {
  themeColor: 'primary',
  mode: themeConfig.mode,
  skin: themeConfig.skin,
  footer: themeConfig.footer,
  layout: 'vertical',
  lastLayout: themeConfig.layout,
  direction: 'ltr', // default value
  navHidden: themeConfig.navHidden,
  appBarBlur: themeConfig.appBarBlur,
  navCollapsed: themeConfig.navCollapsed,
  contentWidth: themeConfig.contentWidth,
  toastPosition: themeConfig.toastPosition,
  verticalNavToggleType: themeConfig.verticalNavToggleType,
  appBar:
    themeConfig.layout === 'horizontal' && themeConfig.appBar === 'hidden'
      ? 'fixed'
      : themeConfig.appBar,
};

const staticSettings = {
  appBar: initialSettings.appBar,
  footer: initialSettings.footer,
  layout: initialSettings.layout,
  navHidden: initialSettings.navHidden,
  lastLayout: initialSettings.lastLayout,
  toastPosition: initialSettings.toastPosition,
};

const restoreSettings = () => {
  let settings = null;
  try {
    const storedData = window.localStorage.getItem('settings');
    if (storedData) {
      settings = { ...JSON.parse(storedData), ...staticSettings };
    } else {
      settings = initialSettings;
    }
  } catch (err) {
    console.error(err);
  }

  return settings;
};

// set settings in localStorage
const storeSettings = (settings) => {
  const initSettings = Object.assign({}, settings);
  delete initSettings.appBar;
  delete initSettings.footer;
  delete initSettings.navHidden;
  delete initSettings.lastLayout;
  delete initSettings.toastPosition;
  window.localStorage.setItem('settings', JSON.stringify(initSettings));
};

// ** Create Context
export const SettingsContext = createContext({
  saveSettings: () => null,
  settings: initialSettings,
});

export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState({ ...initialSettings });

  // useEffect(() => {
  //   if (settings.layout === 'horizontal' && settings.mode === 'semi-dark') {
  //     saveSettings({ ...settings, mode: 'light' });
  //   }
  //   if (settings.layout === 'horizontal' && settings.appBar === 'hidden') {
  //     saveSettings({ ...settings, appBar: 'fixed' });
  //   }
  // }, [settings.layout]);

  const saveSettings = (updatedSettings) => {
    storeSettings(updatedSettings);
    setSettings(updatedSettings);
  };

  return (
    <SettingsContext.Provider value={{ settings, saveSettings }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const SettingsConsumer = SettingsContext.Consumer;
