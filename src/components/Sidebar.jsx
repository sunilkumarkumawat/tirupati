import React, { useState, useEffect, useRef, useContext } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Icon } from '@mui/material';
import sidebarItem from '../assets/data/routes.json'
import userImg from '../assets/images/user/admin.jpg'
import SettingsSidebar from './SettingsSidebar';
const Sidebar = ({ user=[]}) => {
  const [sidebarItems, setSidebarItems] = useState(sidebarItem);
  const [isHovered, setIsHovered] = useState(false);
  const [listMaxHeight, setListMaxHeight] = useState('calc(100vh - 150px)');
  const sidebarRef = useRef(null);
  const bodyRef = useRef(document.body);
  const location = useLocation();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        bodyRef.current.classList.remove('overlay-open');
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const callToggleMenu = (e, hasSubmenu) => {
    if (hasSubmenu) {
      e.preventDefault();
      const parentElement = e.target.closest('li');
      if (parentElement) {
        parentElement.classList.toggle('active');
      }
    }
  };

  const mouseHover = () => {
    if (bodyRef.current.classList.contains('submenu-closed')) {
      bodyRef.current.classList.add('side-closed-hover');
      bodyRef.current.classList.remove('submenu-closed');
    }
  };

  const mouseOut = () => {
    if (bodyRef.current.classList.contains('side-closed-hover')) {
      bodyRef.current.classList.remove('side-closed-hover');
      bodyRef.current.classList.add('submenu-closed');
    }
  };

  const logout = () => {
    // Replace with actual logout logic
    console.log('Logout clicked');
    // Example: Navigate to signin
    window.location.href = '/authentication/signin';
  };

  const formatTitle = (title) => {
  if (!title) return "";

  const parts = title.split(".");
  const last = parts[parts.length - 1]; // last segment
  const second = parts[1]; // e.g. APPOINTMENTS

  if (last === "TEXT") {
    // TEXT wale case me second segment ko use karo
    return capitalize(second.toLowerCase());
  } else {
    // LIST wale case me last segment ko readable bana do
    return last
      .toLowerCase()
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }
};

const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

const renderMenuItem = (item, level = 0) => {
  const isActive = location.pathname === item.path;
  const menuClass = `menu-top ${item.class} ${
    isActive ? (item.submenu.length > 0 ? 'active' : 'active-top') : ''
  } ${level > 0 ? `ml-menu-${level}` : ''}`;

  return (
    <li key={item.path || item.title} className={item.groupTitle ? 'header' : ''}>
      {!item.groupTitle && (
        <Link
          to={item.path || '#'}
          className={menuClass}
          onClick={(e) => callToggleMenu(e, item.submenu.length)}
        >
          <i className={item.iconType}>{item.icon}</i>
          <span className="hide-menu">{formatTitle(item.title)}</span>
          {item.badge && <span className={item.badgeClass}>{item.badge}</span>}
        </Link>
      )}

      {item.submenu.length > 0 && (
        <ul className={`ml-menu-${level + 1}`} >
          {item.submenu.map((subItem) => renderMenuItem(subItem, level + 1))}
        </ul>
      )}
    </li>
  );
};

  return (
    <>
    <aside id="leftsidebar" className="sidebar" ref={sidebarRef} onMouseEnter={mouseHover} onMouseLeave={mouseOut}>
      <div className="menu">
        <div className="sidebar-user-panel" style={{ height: listMaxHeight, overflowY: 'auto' }}>
          <ul className="list">
            <li className="sidebar-user-panel user-profile-area">
              <div className="user-panel">
                <div className="image">
                  <img src={userImg} className="img-circle user-img-circle" alt="User Image" />
                </div>
              </div>
              <div className="profile-usertitle">
                <div className="sidebar-userpic-name">{user?.owner_name || 'Guest'}</div>
                <div className="profile-usertitle-job">{user?.owner_designation1 || ''}</div>
              </div>
            </li>
            {sidebarItems.routes.map((item) => renderMenuItem(item))}
            <li>
              <a href="javascript:void(0)" className="menu-top" onClick={logout}>
                <Icon className="material-icons-outlined">power_settings_new</Icon>
                <span className="hide-menu">Logout</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </aside>
    <SettingsSidebar />
    </>
  );
};

export default Sidebar;