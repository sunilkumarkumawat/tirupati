import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IconButton, Menu, MenuItem, Button } from '@mui/material';
import logo from '../assets/images/logo.png';
import english from '../assets/images/flags/us.svg';
import spanish from '../assets/images/flags/germany.svg';
import german from '../assets/images/flags/spain.svg';
import userImg from '../assets/images/user/admin.jpg';

const Header = ({ homePage = '/', notifications = [], user = [], logout }) => {
  const [isNavbarCollapsed, setIsNavbarCollapsed] = useState(true);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [anchorElNotifications, setAnchorElNotifications] = useState(null);
  const [anchorElLanguage, setAnchorElLanguage] = useState(null);
  const [anchorElProfile, setAnchorElProfile] = useState(null);
  const [flagvalue, setFlagvalue] = useState(english);
  const [langStoreValue, setLangStoreValue] = useState(localStorage.getItem('lang') || 'en');
  const navbarRef = useRef(null);
  const docElement = useRef(document.documentElement);
  const bodyRef = useRef(document.body);
  const navigate = useNavigate();

  const listLang = [
    { text: 'English', flag: english, lang: 'en' },
    { text: 'Spanish', flag: spanish, lang: 'es' },
    { text: 'German', flag: german, lang: 'de' },
  ];

  useEffect(() => {
    const handleFullScreenChange = () => {
      setIsFullScreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullScreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullScreenChange);
  }, []);

  const toggleNavbar = () => setIsNavbarCollapsed(!isNavbarCollapsed);

  const mobileMenuSidebarOpen = (event) => {
    const hasClass = event.target.classList.contains('overlay-open');
    if (hasClass) {
      bodyRef.current.classList.remove('overlay-open');
    } else {
      bodyRef.current.classList.add('overlay-open');
    }
  };

  const callSidemenuCollapse = () => {
    const hasClass = bodyRef.current.classList.contains('side-closed');
    if (hasClass) {
      bodyRef.current.classList.remove('side-closed', 'submenu-closed');
      localStorage.setItem('collapsed_menu', 'false');
    } else {
      bodyRef.current.classList.add('side-closed', 'submenu-closed');
      localStorage.setItem('collapsed_menu', 'true');
    }
  };

  const callFullscreen = () => {
    if (!isFullScreen) {
      if (docElement.current.requestFullscreen) {
        docElement.current.requestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
    setIsFullScreen(!isFullScreen);
  };

  const handleNotificationsOpen = (event) => setAnchorElNotifications(event.currentTarget);
  const handleNotificationsClose = () => setAnchorElNotifications(null);

  const handleLanguageOpen = (event) => setAnchorElLanguage(event.currentTarget);
  const handleLanguageClose = () => setAnchorElLanguage(null);

  const handleProfileOpen = (event) => setAnchorElProfile(event.currentTarget);
  const handleProfileClose = () => setAnchorElProfile(null);

  const setLanguage = (text, lang, flag) => {
    setFlagvalue(flag);
    setLangStoreValue(lang);
    localStorage.setItem('lang', lang);
    console.log(`Language set to ${lang}`);
  };



  return (
    <nav ref={navbarRef} className="navbar active">
      <div className="container-fluid">

        <div className="navbar-header">
          <a href="#" onClick={(e) => { e.preventDefault(); toggleNavbar(); }} className="navbar-toggle collapsed" aria-expanded="false"></a>
          <a href="#" onClick={(e) => { e.preventDefault(); mobileMenuSidebarOpen(e); }} className="bars"></a>
          <Link to={homePage} className="navbar-brand">

            <img
              src={user?.appData?.left_logo || logo}
              alt="App Logo"
              onError={(e) => {
                e.target.onerror = null; // infinite loop prevent
                e.target.src = logo;     // fallback logo
              }}
              style={{width:'40px'}}
            />

            <span className="logo-name">{user?.appData?.name || ''}</span>
          </Link>
        </div>
        <div className={`collapse navbar-collapse ${!isNavbarCollapsed ? 'show' : ''}`}>
          <ul className="float-start collapse-menu-icon">
            <li>
              <IconButton onClick={callSidemenuCollapse} className="sidemenu-collapse nav-notification-icons" style={{ height: '40px', width: '40px' }}>
                <i className="material-icons-outlined icon-color">menu</i>
              </IconButton>
            </li>
          </ul>
          <ul className="nav navbar-nav navbar-right">
            <li className="fullscreen">
              <IconButton onClick={callFullscreen} className="nav-notification-icons" >
                <i className="material-icons-outlined icon-color">fullscreen</i>
              </IconButton>
            </li>
            <li>
              <IconButton onClick={handleNotificationsOpen} className="nav-notification-icons">
                <i className="material-icons-outlined icon-color">notifications_active</i>
              </IconButton>
              <Menu anchorEl={anchorElNotifications} open={Boolean(anchorElNotifications)} onClose={handleNotificationsClose} className="nfc-menu">
                <div className="nfc-header">
                  <h5 className="mb-0">Notitications</h5>
                  <a className="nfc-mark-as-read">Mark all as read</a>
                </div>
                <div className="nfc-dropdown" style={{ height: '350px', overflowY: 'auto' }}>
                  <div className="noti-list header-menu">
                    <div className="menu">
                      {notifications.map((notification) => (
                        <MenuItem
                          key={notification.message}
                          onClick={(e) => e.preventDefault()}
                          className={notification.status}
                        >
                          <span className="table-img msg-user">
                            <i className={`material-icons-outlined nfc-type-icon ${notification.color}`}>{notification.icon}</i>
                          </span>
                          <span className="menu-info">
                            <span className="menu-title">{notification.message}</span>
                            <span className="menu-desc mt-2">
                              <i className="material-icons">access_time</i> {notification.time}
                            </span>
                          </span>
                          <span className="nfc-close">
                            <i className="material-icons-outlined user-menu-icons">close</i>
                          </span>
                        </MenuItem>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="nfc-footer">
                  <a className="nfc-read-all">Read All Notifications</a>
                </div>
              </Menu>
            </li>
            <li className="nav-item">
              <IconButton onClick={handleLanguageOpen} className="lang-dropdown nav-notification-icons">
                {flagvalue ? <img src={flagvalue} height="16" /> : <img src={defaultFlag} height="16" />}
              </IconButton>
              <Menu anchorEl={anchorElLanguage} open={Boolean(anchorElLanguage)} onClose={handleLanguageClose} className="lang-item-menu">
                {listLang.map((item) => (
                  <div key={item.lang} className="lang-item">
                    <MenuItem
                      onClick={() => setLanguage(item.text, item.lang, item.flag)}
                      className={`dropdown-item lang-item-list ${langStoreValue === item.lang ? 'active' : ''}`}
                    >
                      <img src={item.flag} className="flag-img" height="12" alt={item.text} />
                      <span className="align-middle">{item.text}</span>
                    </MenuItem>
                  </div>
                ))}
              </Menu>
            </li>
            <li className="nav-item user_profile">
              <Button onClick={handleProfileOpen} className="chip dropdown-toggle header_toggle_button">
                <span className='user_name'>{user?.owner_name || 'Guest'}</span>
                <img src={userImg} className="user_img" width="32" height="32" alt="User" />
              </Button>
              <Menu anchorEl={anchorElProfile} open={Boolean(anchorElProfile)} onClose={handleProfileClose} className="profile-menu">
                <div className="noti-list">
                  <div className="menu">
                    <div className="user_dw_menu">
                      <MenuItem className="user-item-list">
                        <i className="material-icons-outlined user-menu-icons">person</i>Account
                      </MenuItem>
                      <MenuItem className="user-item-list">
                        <i className="material-icons-outlined user-menu-icons">email</i>Inbox
                      </MenuItem>
                      <MenuItem className="user-item-list">
                        <i className="material-icons-outlined user-menu-icons">settings</i>Settings
                      </MenuItem>
                      <MenuItem onClick={logout} className="user-item-list">
                        <i className="material-icons-outlined user-menu-icons">logout</i>Logout
                      </MenuItem>
                    </div>
                  </div>
                </div>
              </Menu>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;