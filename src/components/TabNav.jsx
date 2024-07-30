import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const TabNavigation = () => {
  const location = useLocation();

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex border-2 border-slate-700 rounded-xl">
        <Tab 
          to="/dealership-dashboard/upload"
          label="Upload"
          isActive={location.pathname === '/dealership-dashboard/upload'}
        />
        <Tab 
          to="/dealership-dashboard/post"
          label="Post"
          isActive={location.pathname === '/dealership-dashboard/post'}
        />
      </div>
    </div>
  );
};

const Tab = ({ to, label, isActive }) => {
  const baseClasses = "w-1/2 px-12 py-3 text-center font-bold transition-colors duration-200";
  const activeClasses = "bg-slate-700 text-white rounded-l-xl";
  const inactiveClasses = "text-slate-700 hover:bg-slate-100";

  return (
    <Link
      to={to}
      className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}
    >
      {label}
    </Link>
  );
};

export default TabNavigation;