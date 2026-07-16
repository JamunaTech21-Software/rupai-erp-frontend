import { useState, useEffect, useRef } from "react";
import { useMatches } from "react-router-dom";
import {
  Menu,
  MapPin,
  Calendar,
  Bell,
  ChevronDown,
  Check,
  User,
  Settings,
  LogOut,
  Shield,
} from "lucide-react";
import { headerInfo } from "../../data/dashboardData";

const estates = [
  { id: 1, name: "Jamuna Tea Estate", location: "Sreemangal" },
  { id: 2, name: "Malnicherra Tea Estate", location: "Sylhet" },
  { id: 3, name: "Finlay Tea Estate", location: "Moulvibazar" },
  { id: 4, name: "Duncan Tea Estate", location: "Habiganj" },
];

const profileMenus = [
  { id: "profile", label: "My Profile", icon: User },
  { id: "settings", label: "Account Settings", icon: Settings },
  { id: "security", label: "Security", icon: Shield },
  { id: "logout", label: "Logout", icon: LogOut, danger: true },
];

export default function Header({ onToggleSidebar }) {
  const { date, user, notifications } = headerInfo;
  const matches = useMatches();
  const pageTitle =
    matches.find((match) => match.handle?.title)?.handle?.title ?? "Dashboard";
  const [selectedEstate, setSelectedEstate] = useState(estates[0]);
  const [estateOpen, setEstateOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const estateRef = useRef(null);
  const profileRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (estateRef.current && !estateRef.current.contains(e.target)) {
        setEstateOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleEstate = () => {
    setEstateOpen((v) => !v);
    setProfileOpen(false);
  };

  return (
    <header className='sticky top-0 z-30 flex h-14 shrink-0 items-center justify-between gap-2 border-b border-slate-200 bg-white px-3 sm:h-16 sm:gap-4 sm:px-4 lg:px-6 '>
      <div className='flex min-w-0 items-center gap-2 sm:gap-3'>
        <button
          type='button'
          onClick={onToggleSidebar}
          className='shrink-0 rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700'
          aria-label='Toggle sidebar'
        >
          <Menu className='h-5 w-5' />
        </button>
        <h2 className='truncate text-base font-bold text-primary sm:text-lg'>
          {pageTitle}
        </h2>
      </div>

      <div className='flex  shrink-0 items-center gap-1.5 sm:gap-3 '>
        {/* Estate selector */}
        <div className='relative' ref={estateRef}>
          <button
            type='button'
            onClick={toggleEstate}
            className='flex items-center cursor-pointer gap-2 rounded-lg border border-slate-200 bg-white p-2 text-sm font-medium text-slate-700 shadow-sm transition hover:border-primary/30 hover:bg-primary-muted md:px-3 md:py-1.5'
            aria-label='Select estate'
          >
            <MapPin className='h-4 w-4 text-primary' />
            <span className='hidden max-w-[120px] truncate md:inline lg:max-w-[160px]'>
              {selectedEstate.name}
            </span>
            <ChevronDown
              className={`hidden h-3.5 w-3.5 text-slate-400 transition-transform md:block ${
                estateOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {estateOpen && (
            <div className='absolute right-0 top-full z-50 mt-2 w-[min(16rem,calc(100vw-2rem))] overflow-hidden rounded-xl border border-slate-100 bg-white py-1.5 shadow-lg'>
              <p className='px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-slate-400'>
                Select Estate
              </p>
              {estates.map((item) => {
                const isActive = item.id === selectedEstate.id;
                return (
                  <button
                    key={item.id}
                    type='button'
                    onClick={() => {
                      setSelectedEstate(item);
                      setEstateOpen(false);
                    }}
                    className={`flex w-full cursor-pointer items-center gap-2.5 px-3 py-2.5 text-left text-sm transition hover:bg-primary-muted ${
                      isActive ? "bg-primary-muted" : ""
                    }`}
                  >
                    <MapPin
                      className={`h-4 w-4 shrink-0 ${
                        isActive ? "text-primary" : "text-slate-400"
                      }`}
                    />
                    <div className='min-w-0 flex-1'>
                      <p
                        className={`truncate font-medium ${
                          isActive ? "text-primary" : "text-slate-700"
                        }`}
                      >
                        {item.name}
                      </p>
                      <p className='text-[11px] text-slate-400'>
                        {item.location}
                      </p>
                    </div>
                    {isActive && (
                      <Check className='h-4 w-4 shrink-0 text-primary' />
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        <div className='hidden cursor-pointer items-center gap-2 rounded-lg border border-slate-100 bg-slate-50 px-3 py-1.5 text-sm text-slate-600 xl:flex'>
          <Calendar className='h-4 w-4 text-primary' />
          <span>{date}</span>
        </div>

        <button
          type='button'
          className='relative cursor-pointer rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700'
          aria-label='Notifications'
        >
          <Bell className='h-5 w-5' />
          {notifications > 0 && (
            <span className='absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white'>
              {notifications}
            </span>
          )}
        </button>

        <div className='relative' ref={profileRef}>
          <button
            type='button'
            onClick={() => {
              setProfileOpen((v) => !v);
              setEstateOpen(false);
            }}
            className='flex cursor-pointer items-center gap-2 rounded-lg py-1 pl-1 pr-1 transition hover:bg-slate-50 sm:gap-2.5 sm:pr-2'
          >
            <img
              src={user.avatar}
              alt={user.name}
              className='h-8 w-8 rounded-full object-cover ring-2 ring-primary/20 sm:h-9 sm:w-9'
            />
            <div className='hidden text-left sm:block'>
              <p className='text-sm font-semibold leading-tight text-slate-800'>
                {user.name}
              </p>
              <p className='text-[11px] text-slate-500'>{user.role}</p>
            </div>
            <ChevronDown
              className={`hidden h-3.5 w-3.5 text-slate-400 transition-transform sm:block ${
                profileOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {profileOpen && (
            <div className='absolute right-0 top-full z-50 mt-2 w-[min(14rem,calc(100vw-2rem))] overflow-hidden rounded-xl border border-slate-100 bg-white py-1.5 shadow-lg'>
              <div className='border-b border-slate-100 px-3 py-2.5'>
                <p className='text-sm font-semibold text-slate-800'>
                  {user.name}
                </p>
                <p className='text-[11px] text-slate-500'>{user.role}</p>
              </div>
              {profileMenus.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    type='button'
                    onClick={() => setProfileOpen(false)}
                    className={`flex w-full cursor-pointer items-center gap-2.5 px-3 py-2.5 text-left text-sm transition hover:bg-slate-50 ${
                      item.danger
                        ? "text-red-600 hover:bg-red-50"
                        : "text-slate-700"
                    } ${item.id === "logout" ? "border-t border-slate-100" : ""}`}
                  >
                    <Icon className='h-4 w-4 shrink-0' />
                    <span className='font-medium'>{item.label}</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
