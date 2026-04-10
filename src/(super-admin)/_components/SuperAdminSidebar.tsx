import { useState, useEffect } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { useNavigate, useLocation } from "react-router";
import { SuperAdminMenuItems } from "./SuperAdminMenu";
import logo from "@/assets/superAdmin/E2Elogo.svg";
// import { MdExitToApp } from "react-icons/md";
// import { IoExitOutline } from "react-icons/io5";
import { LuLogOut } from "react-icons/lu";
import { useAppDispatch } from "@/redux/ReduxStore";
import { logoutUser } from "@/redux/features/auth/authSlice";
import { toast } from "react-toastify";

export function SuperAdminSidebar() {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(
    new Set(["dashboard"])
  );
  const [activeItem, setActiveItem] = useState<string>("dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const dispatch = useAppDispatch();
 

  // --- Logout Function ---
  const handleLogout = () => {
    dispatch(logoutUser());
    localStorage.removeItem("token");
    toast.success("Logged out successfully!");
    navigate("/login");
  };

  /* ---------------- Sync active item with route ---------------- */
  useEffect(() => {
    const currentPath = location.pathname.replace("/", "");
    if (!currentPath) return;

    setActiveItem(currentPath);

    const parentItem = findParentItem(currentPath);
    if (parentItem) {
      setExpandedItems((prev) => new Set(prev).add(parentItem));
    }
  }, [location.pathname]);

  /* ---------------- Helpers ---------------- */
  const findParentItem = (childId: string): string | null => {
    for (const item of SuperAdminMenuItems) {
      if (item.children?.some((c) => c.id === childId)) {
        return item.id;
      }
    }
    return null;
  };

  const toggleExpand = (id: string) => {
    setExpandedItems((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const navigateToPage = (pageId: string) => {
    navigate(`/${pageId}`);
  };

  const handleItemClick = (
    id: string,
    hasChildren: boolean,
    isChild = false
  ) => {
    setActiveItem(id);

    if (hasChildren && !isChild) {
      toggleExpand(id);
    } else {
      navigateToPage(id);
    }

    if (window.innerWidth < 1024) {
      setIsSidebarOpen(false);
    }
  };

  /* ---------------- Render Menu ---------------- */
  const renderMenuItems = (
    items: typeof SuperAdminMenuItems,
    level = 0
  ) =>
    items.map((item) => {
      const hasChildren = !!item.children?.length;
      const isExpanded = expandedItems.has(item.id);
      const isItemActive = item.id === activeItem;
        const isChildActive =
        hasChildren && item.children?.some((child) => child.id === activeItem);

      const shouldHighlightParent = isItemActive;

      return (
        <div key={item.id}>
          {/* Parent */}
          <button
            onClick={() =>
              handleItemClick(item.id, hasChildren, level > 0)
            }
            className={`w-full flex items-center gap-3 px-4 py-2.5  cursor-pointer
              font-medium transition-colors relative hover:bg-[#edd3fe] hover:text-black 
              ${shouldHighlightParent ? "bg-[#8C23CC] text-white rounded-md" : ""}
              ${level > 0 ? "ml-4" : ""}
            `}
          >
          {isChildActive && level === 0 && (
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#8C23CC]" />
            )}


            <span className="shrink-0">{item.icon}</span>
            <span className="flex-1 text-left">{item.label}</span>

            {hasChildren && (
              <ChevronDown
                className={`w-4 h-4 transition-transform  ${
                  isExpanded ? "rotate-180" : ""
                }`}
              />
            )}
          </button>

          {/* Children */}
          {hasChildren && isExpanded && (
            <div className="mt-1 ml-4 pl-4 border-l border-slate-200 space-y-1">
              {item.children!.map((child) => {
                const isChildActive = child.id === activeItem;

                return (
                  <button
                    key={child.id}
                    onClick={() =>
                      handleItemClick(child.id, false, true)
                    }
                    className={`w-full flex items-center gap-2 px-3 py-2 rounded text-sm transition-colors cursor-pointer
                      ${
                        isChildActive
                          ? "text-[#FF0794] font-medium hover:bg-[#fadced]"
                          : "text-slate-600 hover:text-slate-900 hover:bg-[#fadced]"
                      }
                    `}
                  >
                    {child.icon && (
                      <span className="shrink-0">{child.icon}</span>
                    )}
                    <span>{child.label}</span>
                  </button>
                );
              })}
            </div>
          )}

          
        </div>
      );
    });

  /* ---------------- Sidebar Content ---------------- */
  const SidebarContent = () => (
    <>
      {/* Logo + close (mobile only) */}

      <div className="flex items-center relative  justify-between mb-4">
        <img src={logo} alt="Logo" className="h-32 object-cover w-full" />
        <button
          onClick={() => setIsSidebarOpen(false)}
          className="lg:hidden p-1 absolute rounded-md hover:scale-105 cursor-pointer top-0 right-0 bg-[#8C23CC] text-white"
        >
          <X className="w-5 h-5 " />
        </button>
      </div>

      <nav className="flex flex-col h-[80vh]">
        <div className="mt-6 space-y-1">
          {renderMenuItems(SuperAdminMenuItems)}
        </div>

        {/* Logout button at bottom */}
        <div className="mt-auto pb-4">
          <button
            onClick={handleLogout}
            className="flex justify-center w-full items-center gap-2 text-[#B91010] bg-[#fdeaea] hover:bg-[#ffd3d3] py-2 rounded-md cursor-pointer transition-colors font-semibold"
          >
            <LuLogOut size={20} />
            Logout
          </button>
        </div>
      </nav>
    </>
  );

  return (
    <>
      {/* 🔹 Mobile Floating Menu Button */}
      <button
        onClick={() => setIsSidebarOpen(true)}
        className="lg:hidden fixed top-9 left-4 z-50 p-2 rounded-md bg-white shadow-md hover:bg-slate-100"
        aria-label="Open Menu"
      >
        <Menu className="w-5 h-5 text-slate-700 cursor-pointer" />
      </button>

      {/* Overlay */}
      {isSidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-full w-72 bg-white p-4 shadow-md
          transform transition-transform duration-300 z-50
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        <SidebarContent />
      </aside>
    </>
  );
}
