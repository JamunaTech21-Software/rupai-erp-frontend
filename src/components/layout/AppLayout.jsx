import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Header from './Header'

export default function AppLayout() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleToggleSidebar = () => {
    if (window.matchMedia('(min-width: 1024px)').matches) {
      setSidebarCollapsed((v) => !v)
    } else {
      setMobileOpen((v) => !v)
    }
  }

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">
      {mobileOpen && (
        <button
          type="button"
          className="fixed inset-0 z-30 bg-black/40 lg:hidden"
          aria-label="Close sidebar overlay"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <Sidebar
        collapsed={sidebarCollapsed}
        mobileOpen={mobileOpen}
        onCloseMobile={() => setMobileOpen(false)}
      />

      <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
        <Header onToggleSidebar={handleToggleSidebar} />

        <main className="min-h-0 flex-1 space-y-3 overflow-x-hidden overflow-y-auto p-3 sm:space-y-4 sm:p-4 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
