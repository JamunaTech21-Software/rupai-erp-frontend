import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Home,
  Map,
  Layers,
  Sprout,
  Replace,
  ClipboardList,
  BookOpen,
  TreeDeciduous,
  Flower2,
  ScanFace,
  UserCog,
  Wallet,
  HandCoins,
  Leaf,
  Factory,
  BadgeCheck,
  Package,
  ShoppingCart,
  Calculator,
  BarChart3,
  Users,
  Settings,
  ChevronRight,
  X,
} from "lucide-react";
import { navSections } from "../../data/dashboardData";

const iconMap = {
  Home,
  Map,
  Layers,
  Sprout,
  Replace,
  ClipboardList,
  BookOpen,
  TreeDeciduous,
  Flower2,
  ScanFace,
  UserCog,
  Wallet,
  HandCoins,
  Leaf,
  Factory,
  BadgeCheck,
  Package,
  ShoppingCart,
  Calculator,
  BarChart3,
  Users,
  Settings,
};

export default function Sidebar({ collapsed, mobileOpen, onCloseMobile }) {
  const [expandedId, setExpandedId] = useState(null);
  const location = useLocation();

  useEffect(() => {
    if (collapsed) setExpandedId(null);
  }, [collapsed]);

  // Auto-expand parent when child route is active
  useEffect(() => {
    navSections.forEach((section) => {
      section.items.forEach((item) => {
        if (item.children?.some((child) => child.path === location.pathname)) {
          setExpandedId(item.id);
        }
      });
    });
  }, [location.pathname]);

  const toggleExpand = (id) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  // Icon-only rail only on desktop (lg+). Mobile drawer always shows full labels.
  const labelClass = collapsed ? "lg:hidden" : "";
  const iconRailBtn = collapsed ? "lg:justify-center lg:px-2 lg:py-2.5" : "";

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-40 flex h-screen w-[min(270px,85vw)] flex-col border-r border-slate-200 bg-white transition-all duration-300 lg:static lg:translate-x-0 ${
        collapsed ? "lg:w-18" : "lg:w-[270px]"
      } ${mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
    >
      {/* Fixed top logo */}
      <div
        className={`flex h-14 shrink-0 items-center gap-2.5 border-b border-slate-100 px-4 sm:h-16 ${
          collapsed ? "lg:justify-center lg:px-2 lg:gap-0" : ""
        }`}
      >
        <div className='flex h-8 w-8 shrink-0 items-center justify-center'>
          <img
            src='/sidebar-top-logo.png'
            alt='RupAi Logo'
            className='h-8 w-8 object-contain'
          />
        </div>
        <div className={`min-w-0 flex-1 ${labelClass}`}>
          <h1 className='text-lg font-bold leading-tight text-primary'>
            RupAi ERP
          </h1>
          <p className='truncate text-[10px] font-medium text-slate-400'>
            Smart Management for Tea Estates
          </p>
        </div>
        {onCloseMobile && (
          <button
            type='button'
            onClick={onCloseMobile}
            className='rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 lg:hidden'
            aria-label='Close menu'
          >
            <X className='h-5 w-5' />
          </button>
        )}
      </div>

      {/* Scrollable menu items */}
      <nav className='min-h-0 flex-1 overflow-y-auto overflow-x-hidden px-2 py-3'>
        {navSections.map((section, si) => (
          <div key={si} className={si > 0 ? "mt-3" : ""}>
            {section.label && (
              <p
                className={`mb-1.5 px-3 text-[10px] font-semibold uppercase tracking-wider text-slate-400 ${labelClass}`}
              >
                {section.label}
              </p>
            )}
            <ul className='space-y-0.5'>
              {section.items.map((item) => {
                const Icon = iconMap[item.icon] || Home;
                const isExpanded = expandedId === item.id;
                const hasChildren =
                  item.expandable && item.children?.length > 0;
                const isItemActive =
                  item.path === location.pathname ||
                  item.children?.some(
                    (child) => child.path === location.pathname,
                  );

                return (
                  <li key={item.id}>
                    {item.path ? (
                      <NavLink
                        to={item.path}
                        end
                        title={item.label}
                        onClick={() => onCloseMobile?.()}
                        className={({ isActive }) =>
                          `group flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-[13px] font-medium transition-colors ${iconRailBtn} ${
                            isActive
                              ? "bg-primary text-white shadow-sm"
                              : "text-slate-600 hover:bg-primary-muted hover:text-primary"
                          }`
                        }
                      >
                        {({ isActive }) => (
                          <>
                            <Icon
                              className={`h-4 w-4 shrink-0 ${
                                isActive
                                  ? "text-white"
                                  : "text-slate-400 group-hover:text-primary"
                              }`}
                            />
                            <span className={`flex-1 truncate ${labelClass}`}>
                              {item.label}
                            </span>
                          </>
                        )}
                      </NavLink>
                    ) : (
                      <button
                        type='button'
                        title={item.label}
                        onClick={() => {
                          if (!hasChildren) return;
                          if (
                            collapsed &&
                            typeof window !== "undefined" &&
                            window.matchMedia("(min-width: 1024px)").matches
                          ) {
                            return;
                          }
                          toggleExpand(item.id);
                        }}
                        className={`group flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-[13px] font-medium transition-colors ${iconRailBtn} ${
                          isItemActive
                            ? "bg-primary text-white shadow-sm"
                            : "text-slate-600 hover:bg-primary-muted hover:text-primary"
                        }`}
                      >
                        <Icon
                          className={`h-4 w-4 shrink-0 ${
                            isItemActive
                              ? "text-white"
                              : "text-slate-400 group-hover:text-primary"
                          }`}
                        />
                        <span className={`flex-1 truncate ${labelClass}`}>
                          {item.label}
                        </span>
                        {hasChildren && (
                          <ChevronRight
                            className={`h-3.5 w-3.5 shrink-0 transition-transform duration-200 ${labelClass} ${
                              isExpanded
                                ? "rotate-90 text-primary"
                                : "text-slate-300"
                            } ${isItemActive ? "text-white/70" : ""}`}
                          />
                        )}
                      </button>
                    )}

                    {hasChildren && isExpanded && (
                      <ul
                        className={`mt-0.5 ml-5 space-y-0.5 border-l border-slate-200 py-1 pl-3 ${
                          collapsed ? "lg:hidden" : ""
                        }`}
                      >
                        {item.children.map((child) => (
                          <li key={child.id}>
                            {child.path ? (
                              <NavLink
                                to={child.path}
                                onClick={() => onCloseMobile?.()}
                                className={({ isActive }) =>
                                  `block rounded-md px-2.5 py-1.5 text-[12px] font-medium transition-colors ${
                                    isActive
                                      ? "bg-primary-muted text-primary"
                                      : "text-slate-500 hover:bg-primary-muted hover:text-primary"
                                  }`
                                }
                              >
                                {child.label}
                              </NavLink>
                            ) : (
                              <span className='block rounded-md px-2.5 py-1.5 text-[12px] font-medium text-slate-500'>
                                {child.label}
                              </span>
                            )}
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* Fixed bottom logo / version */}
      <div
        className={`shrink-0 border-t border-slate-100 p-3 ${collapsed ? "lg:p-2" : ""}`}
      >
        <div
          className={`flex items-center gap-2.5 rounded-xl bg-primary px-3.5 py-3 text-white ${
            collapsed ? "lg:justify-center lg:gap-0 lg:p-2.5 lg:px-2.5" : ""
          }`}
          title='RupAi ERP v2.0.0'
        >
          <div className='flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/15'>
            <Leaf className='h-4 w-4' />
          </div>
          <div className={`min-w-0 ${labelClass}`}>
            <p className='truncate text-sm font-semibold'>RupAi ERP</p>
            <p className='text-[11px] text-white/70'>Version 2.0.0</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
