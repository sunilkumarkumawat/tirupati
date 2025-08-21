import React, { useState } from 'react';
import { Button, ToggleButtonGroup, ToggleButton, Switch } from '@mui/material';
import { Settings as SettingsIcon } from '@mui/icons-material';

const SettingsSidebar = () => {
  const [isOpenSidebar, setIsOpenSidebar] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [isDarkSidebar, setIsDarkSidebar] = useState(false);
  const [selectedBgColor, setSelectedBgColor] = useState('white');
  const [isRtl, setIsRtl] = useState(false);

  const toggleRightSidebar = () => {
    setIsOpenSidebar(!isOpenSidebar);
  };

  const lightThemeBtnClick = () => {
    setIsDarkTheme(false);
    // Add theme switching logic here
  };

  const darkThemeBtnClick = () => {
    setIsDarkTheme(true);
    // Add theme switching logic here
  };

  const lightSidebarBtnClick = () => {
    setIsDarkSidebar(false);
    // Add sidebar color logic here
  };

  const darkSidebarBtnClick = () => {
    setIsDarkSidebar(true);
    // Add sidebar color logic here
  };

  const selectTheme = (color) => {
    setSelectedBgColor(color);
    // Add theme color logic here
  };



const switchDirection = (event) => {
    const checked = event.target.checked;
    setIsRtl(checked);

    const body = document.body;

    if (checked) {
      // Add RTL
      body.classList.add(
        "mat-typography",
        "menu_light",
        "logo-white",
        "light",
        "side-closed",
        "theme-black",
        "submenu-closed",
        "rtl"
      );
      // Remove LTR (if any custom class defined for LTR, remove it here)
      body.classList.remove("ltr");
    } else {
      // Add LTR
      body.classList.add("ltr");
      // Remove RTL
      body.classList.remove(
        "mat-typography",
        "menu_light",
        "logo-white",
        "light",
        "side-closed",
        "theme-black",
        "submenu-closed",
        "rtl"
      );
    }
  };

  

  return (
    <div className={`settingSidebar ${isOpenSidebar ? 'showSettingPanel' : ''}`}>
      <a href="javascript:void(0)" className="settingPanelToggle" onClick={toggleRightSidebar}>
        <SettingsIcon className="setting-sidebar-icon" />
      </a>
      <div className="settingSidebar-body ps-container ps-theme-default" style={{ height: 'calc(100vh - 60px)', overflowY: 'auto' }}>
        <div className="fade show active">
          <div className="setting-panel-header">Setting Panel</div>
          <div className="p-15 border-bottom">
            <p className="font-medium m-b-10">Select Layout</p>
            <div className="flex flex-wrap hiddenradio">
              <div className="flex flex-col">
                <label>
                  <input
                    type="radio"
                    name="value"
                    value="light"
                    checked={!isDarkTheme}
                    onChange={lightThemeBtnClick}
                  />
                  <img src="assets/images/light.png" alt="Light Theme" />
                </label>
                <div className="mt-1 text-md text-center">Light</div>
              </div>
              <div className="flex flex-col mt-3">
                <label>
                  <input
                    type="radio"
                    name="value"
                    value="dark"
                    checked={isDarkTheme}
                    onChange={darkThemeBtnClick}
                  />
                  <img src="assets/images/dark.png" alt="Dark Theme" />
                </label>
                <div className="mt-1 text-md text-center">Dark</div>
              </div>
            </div>
          </div>
          <div className="rightSetting">
            <p className="font-medium m-b-10">Sidebar Menu Color</p>
            <ToggleButtonGroup
              value={isDarkSidebar ? 'dark' : 'light'}
              exclusive
              onChange={(e, value) => {
                if (value) value === 'dark' ? darkSidebarBtnClick() : lightSidebarBtnClick();
              }}
              className="mt-2"
            >
              <ToggleButton value="light">Light</ToggleButton>
              <ToggleButton value="dark">Dark</ToggleButton>
            </ToggleButtonGroup>
          </div>
          <div className="p-15 border-bottom">
            <p className="font-medium m-b-10">Color Theme</p>
            <div className="theme-setting-options">
              <ul className="choose-theme list-unstyled mb-0">
                {['white', 'black', 'purple', 'orange', 'cyan', 'green', 'blue'].map((color) => (
                  <li
                    key={color}
                    data-theme={color}
                    className={selectedBgColor === color ? 'active' : ''}
                    onClick={() => selectTheme(color)}
                  >
                    <div className={color}></div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="rightSetting">
            <p className="font-medium m-b-10">RTL Layout</p>
            <Switch
              checked={isRtl}
              onChange={switchDirection}
              className="mt-2"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsSidebar;
