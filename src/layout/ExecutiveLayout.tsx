import { ExecutiveSidebar } from "@/(executive-flow)/_components/ExecutiveSidebar"
import { Navbar } from "@/components/shared/navbar/Navbar"
import { useAppSelector } from "@/redux/ReduxStore";
import { Outlet } from "react-router"

const ExecutiveLayout = () => {
   const { user } = useAppSelector((state) => state.auth);
  return (
    <div className="flex h-screen bg-[#F8F9FA] overflow-hidden">
      <ExecutiveSidebar />

      <main className="flex-1 lg:ml-72 flex flex-col h-screen overflow-hidden">
        <div className="fixed top-0 left-0 right-0 lg:left-72 z-40 bg-[#F8F9FA] px-4 pt-4">
          <div className="ml-10 md:ml-0">
            <Navbar
              title="Executive"
              subtitle="Here's your service excellence overview for today"
              notificationCount={2}
              user={{
               name: user.name,
                role: user.role == "EXECUTIVE" ? "Executive": "",
                profilePic: "https://i.pravatar.cc/150?u=esther"
              }}
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto pt-28 px-4">
          <Outlet />
        </div>
      </main>
    </div>
  )
}

export default ExecutiveLayout
