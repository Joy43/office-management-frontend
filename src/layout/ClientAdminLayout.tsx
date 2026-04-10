import { ClientAdminSidebar } from '@/(client-admin)/_components/ClientAdminSidebar'
import { Navbar } from '@/components/shared/navbar/Navbar'
import { useAppSelector } from '@/redux/ReduxStore';
import { Outlet } from 'react-router'


const ClientAdminLayout = () => {
   const { user } = useAppSelector((state) => state.auth);
  return (
    <div className="flex h-screen bg-[#F8F9FA] overflow-hidden">
      <ClientAdminSidebar />

      <main className="flex-1 lg:ml-72 flex flex-col h-screen overflow-hidden">
        <div className="fixed top-0 left-0 right-0 lg:left-72 z-40 bg-[#F8F9FA] px-4 pt-4">
          <div className="ml-10 md:ml-0">
            <Navbar
              title="Client Admin Workspace"
              subtitle="Manage organizations, trainers, users, and system-wide operations."
              notificationCount={2}
              user={{
                name: user.name,
                role: user.role == "CLIENT_ADMIN" ? "Client Admin" : "",
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

export default ClientAdminLayout

