import { useLayoutEffect, useRef, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { useFiveRowTables } from "../../lib/useFiveRowTables";

export default function AppLayout() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  // Tables show 5 rows and scroll for the rest.
  const mainRef = useRef(null);
  useFiveRowTables(mainRef);

  // Every page opens at the top: the page scrolls inside <main>, not the window. This runs before the screen is painted, so the old scroll position is never seen.
  const { pathname } = useLocation();
  useLayoutEffect(() => {
    mainRef.current?.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);

  const handleToggleSidebar = () => {
    if (window.matchMedia("(min-width: 1024px)").matches) {
      setSidebarCollapsed((v) => !v);
    } else {
      setMobileOpen((v) => !v);
    }
  };

  return (
    <div className='flex h-screen overflow-hidden bg-slate-50'>
      {mobileOpen && (
        <button
          type='button'
          className='fixed inset-0 z-30 bg-black/40 lg:hidden'
          aria-label='Close sidebar overlay'
          onClick={() => setMobileOpen(false)}
        />
      )}

      <Sidebar
        collapsed={sidebarCollapsed}
        mobileOpen={mobileOpen}
        onCloseMobile={() => setMobileOpen(false)}
      />

      <div className='flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden'>
        <Header onToggleSidebar={handleToggleSidebar} />

        <main ref={mainRef} className='[scrollbar-gutter:stable] [overflow-anchor:none] min-h-0 flex-1 space-y-3 overflow-x-hidden overflow-y-auto p-3 sm:space-y-4 sm:p-4 lg:p-4'>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
