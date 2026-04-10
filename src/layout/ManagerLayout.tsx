import { ManagerSidebar } from '@/(manager-flow)/_components/ManagerSidebar'
import { Navbar } from '@/components/shared/navbar/Navbar'
import { useAppSelector } from '@/redux/ReduxStore';
import { Outlet } from 'react-router'

// const NAVBAR_HEIGHT = 'h-24' // adjust if needed

const ManagerLayout = () => {
  const { user } = useAppSelector((state) => state.auth);
  return (
    <div className="flex h-screen bg-[#F8F9FA] overflow-hidden">
      <ManagerSidebar />

      <main className="flex-1 lg:ml-72 flex flex-col h-screen overflow-hidden">
        {/* FIXED NAVBAR */}
        <div className="fixed top-0 left-0 right-0 lg:left-72 z-40 bg-[#F8F9FA] px-4 pt-4">
          <div className="ml-10 md:ml-0">
            <Navbar
              title="Manager"
              subtitle="Run huddles. Assign roleplays. Approve logs"
              notificationCount={2}
              user={{
                name: user.name,
                role: user.role == "MANAGER" ? "Manager" : "",
                profilePic: "https://i.pravatar.cc/150?u=esther",
              }}
            />
          </div>
        </div>

        {/* SCROLLABLE CONTENT */}
        <div className="flex-1 overflow-y-auto pt-28 px-2">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default ManagerLayout
