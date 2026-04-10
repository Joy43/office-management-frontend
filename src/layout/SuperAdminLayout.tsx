import { SuperAdminSidebar } from '@/(super-admin)/_components/SuperAdminSidebar'
import { Navbar } from '@/components/shared/navbar/Navbar'
import { useAppSelector } from '@/redux/ReduxStore';
import { Outlet } from 'react-router'

const SuperAdminLayout = () => {
    const { user } = useAppSelector((state) => state.auth);
  return (
    <div className="flex h-screen bg-[#F8F9FA] overflow-hidden">
      <SuperAdminSidebar />

      <main className="flex-1 lg:ml-72 flex flex-col h-screen overflow-hidden">
        <div className="fixed top-0 left-0 right-0 lg:left-72 z-40 bg-[#F8F9FA] px-4 pt-4">
          <div className="ml-10 md:ml-0">
            <Navbar
              title="Super Admin Workspace"
              subtitle="Manage organizations, trainers, users, and system-wide operations."
              notificationCount={2}
              user={{
                name: user.name,
                role: user.role == "SUPER_ADMIN" ? "Super Admin" : "",
                profilePic: "https://i.pravatar.cc/150?u=esther",
              }}
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto pt-28 px-4">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default SuperAdminLayout
