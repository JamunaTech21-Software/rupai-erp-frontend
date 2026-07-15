import WelcomeBanner from '../components/dashboard/WelcomeBanner'
import WeatherCard from '../components/dashboard/WeatherCard'
import StatCards from '../components/dashboard/StatCards'
import PluckingTrendChart from '../components/dashboard/PluckingTrendChart'
import FieldWiseDonut from '../components/dashboard/FieldWiseDonut'
import TopFieldsList from '../components/dashboard/TopFieldsList'
import WorkerAttendance from '../components/dashboard/WorkerAttendance'
import RecentActivities from '../components/dashboard/RecentActivities'
import EstateMap from '../components/dashboard/EstateMap'
import QuickActions from '../components/dashboard/QuickActions'
import DashboardFooter from '../components/dashboard/DashboardFooter'

export default function Dashboard() {
  return (
    <>
      <div className="grid grid-cols-1 gap-3 sm:gap-4 lg:grid-cols-12 lg:items-stretch">
        <div className="lg:col-span-8">
          <WelcomeBanner />
        </div>
        <div className="lg:col-span-4">
          <WeatherCard />
        </div>
      </div>

      <StatCards />

      <div className="grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-2 lg:grid-cols-12">
        <div className="md:col-span-2 lg:col-span-5">
          <PluckingTrendChart />
        </div>
        <div className="lg:col-span-4">
          <FieldWiseDonut />
        </div>
        <div className="lg:col-span-3">
          <TopFieldsList />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-2 lg:grid-cols-12">
        <div className="lg:col-span-3">
          <WorkerAttendance />
        </div>
        <div className="lg:col-span-4">
          <RecentActivities />
        </div>
        <div className="md:col-span-2 lg:col-span-5">
          <EstateMap />
        </div>
      </div>

      <QuickActions />

      <DashboardFooter />
    </>
  )
}
