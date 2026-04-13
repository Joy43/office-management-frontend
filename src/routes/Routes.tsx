import ClientAdminBranchesManagement from "@/(client-admin)/pages/BranchesManagement/BranchesManagement";
import ClientAdminDashboard from "@/(client-admin)/pages/Dashboard/Dashboard";
import ClientAdminInvoiceManagement from "@/(client-admin)/pages/InvoiceManagement/InvoiceManagement";
import ClientAdminPlansAndPricing from "@/(client-admin)/pages/PlansPricing/PlansAndPricing";
import ClientAdminSettings from "@/(client-admin)/pages/Settings/Settings";
import ClientAdminSetupTemplate from "@/(client-admin)/pages/SetupTemplate/SetupTemplate";
import ClientAdminUsersManagement from "@/(client-admin)/pages/UsersManagement/UsersManagement";
// import ManageringLogs from "@/(manager-flow)/pages/ManageringLogs/ManageringLogs";
import ManagerDoshboard from "@/(manager-flow)/pages/dashboard/Doshboard";
import ManagerHuddles from "@/(manager-flow)/pages/Huddles/Huddles";
import ManagerSessionsManagement from "@/(manager-flow)/pages/SessionsManagement/SessionsManagement";
import ManagerSettings from "@/(manager-flow)/pages/Settings/Settings";
import ManagerTeamManagement from "@/(manager-flow)/pages/TeamManagement/TeamManagement";
import SuperAmdinAllPayments from "@/(super-admin)/pages/billing-management/pages/AllPayments/AllPayments";
import SuperAmdinManageSubscriptions from "@/(super-admin)/pages/billing-management/pages/ManageSubscriptions/ManageSubscriptions";
import SuperAmdinRevenueDashboard from "@/(super-admin)/pages/billing-management/pages/Revenue-Dashboard/RevenueDashboard";
import SuperAmdinManageTemplate from "@/(super-admin)/pages/manage-tamplate/ManageTemplate";
import SuperAdminOverview from "@/(super-admin)/pages/overview/Overview";
import SuperAmdinSetting from "@/(super-admin)/pages/settings/Setting";
import ErrorPage from "@/components/shared/errorPage/ErrorPage";
import ClientAdminLayout from "@/layout/ClientAdminLayout";
// import ManagerLayout from "@/layout/ManagerLayout";
import SuperAdminLayout from "@/layout/SuperAdminLayout";
import { createBrowserRouter } from "react-router";
import ManagerCoachingLogs from "@/(manager-flow)/pages/CoachingLogs/CoachingLogs";
import ManagerLayout from "@/layout/ManagerLayout";
import CoachLayout from "@/layout/CoachLayout";
import CoachDashboard from "@/(coach-flow)/pages/Dashboard/Dashboard";
import CoachSessionsManagement from "@/(coach-flow)/pages/SessionsManagement/SessionsManagement";
import CoachCoachingLogs from "@/(coach-flow)/pages/CoachingLogs/CoachingLogs";
import CoachAssignedTeamMembers from "@/(coach-flow)/pages/AssignedTeamMembers/AssignedTeamMembers";
import CoachHuddles from "@/(coach-flow)/pages/Huddles/Huddles";
import CoachSettings from "@/(coach-flow)/pages/Settings/Settings";
import FrontLineLayout from "@/layout/FrontLineLayout";
import FrontLineDashboard from "@/(frontline-staf-flow)/pages/Dashboard/Dashboard";
import FrontLineMySessions from "@/(frontline-staf-flow)/pages/Myessions/MySessions";
import FrontLineMyHabits from "@/(frontline-staf-flow)/pages/MyHabits/MyHabits";
import FrontLineHuddles from "@/(frontline-staf-flow)/pages/Huddles/Huddles";
import FrontLineSettings from "@/(frontline-staf-flow)/pages/Settings/Settings";
import ExecutiveDashboard from "@/(executive-flow)/pages/Dashboard/Dashboard";
import ExecutiveLayout from "@/layout/ExecutiveLayout";
import ExecutiveScorecard from "@/(executive-flow)/pages/Scorecard/Scorecard";
import ExecutiveSettings from "@/(executive-flow)/pages/Settings/Settings";
import FrontLineMyScorecard from "@/(frontline-staf-flow)/pages/MyScorecard/MyScorecard";
import LoginPage from "@/pages/auth/LoginPage";
import { ForgotPassword } from "@/pages/auth/ForgotPassword";
import { ResetPassword } from "@/pages/auth/ResetPassword";
import VerifyOtpPage from "@/pages/auth/VerifyOtpPage";
import PrivateRoute from "./PrivateRoute";
import Onboarding from "@/pages/onbording/Onboarding";

const Routes = createBrowserRouter([
  {
    path: "/",
    element:<Onboarding/>
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "/reset-password",
    element: <ResetPassword />,
  },
  {
    path: "verify-otp",
    element: <VerifyOtpPage />,
  },
  {
    path: "super-admin/dashboard",
    element: (
      <PrivateRoute allowedRoles={["SUPER_ADMIN"]}>
        <SuperAdminLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: <SuperAdminOverview />,
      },
      {
        path: "Manage-Templates",
        element: <SuperAmdinManageTemplate />,
      },
      {
        path: "Revenue-Dashboard",
        element: <SuperAmdinRevenueDashboard />,
      },
      {
        path: "Manage-Subscriptions",
        element: <SuperAmdinManageSubscriptions />,
      },
      {
        path: "All-Payments",
        element: <SuperAmdinAllPayments />,
      },
      {
        path: "settings",
        element: <SuperAmdinSetting />,
      },
    ],
  },
  {
    path: "client-admin/dashboard",
    element: (
      <PrivateRoute allowedRoles={["CLIENT_ADMIN"]}>
        <ClientAdminLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: <ClientAdminDashboard />,
      },
      {
        path: "Setup-Template",
        element: <ClientAdminSetupTemplate />,
      },
      {
        path: "Branches-Management",
        element: <ClientAdminBranchesManagement />,
      },
      {
        path: "Users-Management",
        element: <ClientAdminUsersManagement />,
      },
      {
        path: "Invoice-Management",
        element: <ClientAdminInvoiceManagement />,
      },
      {
        path: "Plans-Pricing",
        element: <ClientAdminPlansAndPricing />,
      },
      {
        path: "settings",
        element: <ClientAdminSettings />,
      },
    ],
  },
  {
    path: "Manager/dashboard",
    element: (
      <PrivateRoute allowedRoles={["MANAGER"]}>
        <ManagerLayout />
      </PrivateRoute>
    ),

    children: [
      {
        index: true,
        element: <ManagerDoshboard />,
      },
      {
        path: "Huddles",
        element: <ManagerHuddles />,
      },
      {
        path: "Coaching-Logs",
        element: <ManagerCoachingLogs />,
      },
      {
        path: "Team-Management",
        element: <ManagerTeamManagement />,
      },
      {
        path: "Sessions-Management",
        element: <ManagerSessionsManagement />,
      },
      {
        path: "Settings",
        element: <ManagerSettings />,
      },
    ],
  },
  {
    path: "coach/dashboard",
    element: (
      <PrivateRoute allowedRoles={["TAINER"]}>
        <CoachLayout />
      </PrivateRoute>
    ),

    children: [
      {
        index: true,
        element: <CoachDashboard />,
      },
      {
        path: "Sessions-Management",
        element: <CoachSessionsManagement />,
      },
      {
        path: "Coaching-Logs",
        element: <CoachCoachingLogs />,
      },
      {
        path: "Assigned-Team-Members",
        element: <CoachAssignedTeamMembers />,
      },
      {
        path: "Huddles",
        element: <CoachHuddles />,
      },
      {
        path: "settings",
        element: <CoachSettings />,
      },
    ],
  },
  {
    path: "frontLine/dashboard",
    element: (
      <PrivateRoute allowedRoles={["STAFF"]}>
        <FrontLineLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: <FrontLineDashboard />,
      },
      {
        path: "My-Sessions",
        element: <FrontLineMySessions />,
      },
      {
        path: "My-Habits",
        element: <FrontLineMyHabits />,
      },
      {
        path: "My-Scorecard",
        element: <FrontLineMyScorecard />,
      },
      {
        path: "Huddles",
        element: <FrontLineHuddles />,
      },
      {
        path: "settings",
        element: <FrontLineSettings />,
      },
    ],
  },
  {
    path: "Executive/Dashboard",
    element: (
      <PrivateRoute allowedRoles={["EXECUTIVE"]}>
        <ExecutiveLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: <ExecutiveDashboard />,
      },
      {
        path: "Scorecard",
        element: <ExecutiveScorecard />,
      },
      {
        path: "settings",
        element: <ExecutiveSettings />,
      },
    ],
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);

export default Routes