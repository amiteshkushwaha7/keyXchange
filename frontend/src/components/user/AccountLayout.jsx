import { Outlet, Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  UserIcon,
  ClipboardDocumentListIcon,
  ArrowLeftStartOnRectangleIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import LogoutButton from "../../components/layouts/LogoutButton";

const tabs = [
  {
    name: "Profile",
    path: "/account/profile",
    icon: UserIcon,
  },
  {
    name: "Orders",
    path: "/account/my-orders",
    icon: ClipboardDocumentListIcon,
  },
];

export default function AccountLayout() {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { pathname } = useLocation();
  const [expanded, setExpanded] = useState(true);

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-[#f4f3ff] to-[#dddfee]">
      {/* Sidebar */}
      <div
        className={`
          ${expanded ? "w-64" : "w-20"}
          transition-all duration-300 bg-white shadow-lg rounded-2xl m-3 
          flex flex-col justify-between
      `}
      > 
        {/* Logo and Collapse Button */}
        <div>
          <div className="flex items-center justify-between px-4 pt-4 pb-2">
            <Link to="/">
              <div className="rounded-full bg-violet-500 h-10 w-10 flex items-center justify-center">
                <span className="text-white font-bold text-lg">A</span>
              </div>
            </Link>
            {expanded && (
              <span className="ml-2 font-bold text-lg text-gray-700">ACCOUNT</span>
            )}
            <button
              className="ml-auto"
              onClick={() => setExpanded((p) => !p)}
              aria-label={expanded ? "Collapse sidebar" : "Expand sidebar"}
            > 
              <svg 
                className="w-5 h-5 text-violet-500 cursor-pointer"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={expanded ? "M15 19l-7-7 7-7" : "M9 5l7 7-7 7"}
                />
              </svg>
            </button>
          </div>

          {/* Navigation Tabs */}
          <nav className="flex flex-col gap-1 mt-2">
            {tabs.map((tab) => {
              const isActive = pathname.startsWith(tab.path);
              return (
                <Link
                  to={tab.path}
                  key={tab.name}
                  className={`
                    relative group flex items-center gap-4 p-3 mx-3 my-1 rounded-lg cursor-pointer transition-all font-medium
                    ${isActive
                      ? "bg-violet-100 text-violet-600"
                      : "text-gray-700 hover:bg-violet-50"}
                  `}
                  style={
                    isActive && expanded
                      ? { background: "#ece6fc", color: "#7c3aed" }
                      : {}
                  }
                  aria-label={tab.name}
                >
                  <tab.icon className="w-6 h-6" />
                  {expanded && <span>{tab.name}</span>}

                  {/* Tooltip only when collapsed */}
                  {!expanded && (
                    <span
                      className="
                        absolute left-full top-1/2 -translate-y-1/2 ml-2
                        bg-gray-700 text-white text-xs rounded px-2 py-1
                        whitespace-nowrap
                        opacity-0 group-hover:opacity-100
                        pointer-events-none
                        transition-opacity duration-300
                        z-10
                      "
                    >
                      {tab.name}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col gap-2 mb-4 border-t border-gray-100 ">
          {isAuthenticated && (
            <div className="relative group mx-3">
              <LogoutButton
                className="cursor-pointer 
                  flex justify-center items-center gap-2 p-2 rounded-lg font-medium w-full
                  transition-all duration-200
                  text-rose-600 bg-rose-50 hover:bg-rose-100 hover:text-rose-700
                  hover:shadow-lg hover:scale-[1.03]
                "
                aria-label="Log out"
              >
                <ArrowLeftStartOnRectangleIcon className="w-5 h-5 opacity-80 group-hover:opacity-100" />
                {expanded && <span>Log out</span>}
              </LogoutButton>

              {!expanded && (
                <span
                  className="
                    absolute left-full top-1/2 -translate-y-1/2 ml-2
                    bg-gray-700 text-white text-xs rounded px-2 py-1
                    whitespace-nowrap
                    opacity-0 group-hover:opacity-100
                    pointer-events-none
                    transition-opacity duration-300
                    z-10
                  "
                >
                  Log out
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 m-3">
        <Outlet />
      </div>
    </div>
  );
}
