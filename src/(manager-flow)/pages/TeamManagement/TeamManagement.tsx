/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { FiSearch, FiMoreVertical, FiFilter } from "react-icons/fi";
import { HiFire } from "react-icons/hi";
import { Button } from "@/components/ui/button";
import CommonTable, {
  type Column,
} from "@/components/shared/common/CommonTable";
import CommonPagination from "@/components/shared/common/CommonPagination";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import StatusBadge from "./_components/StatusBadge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetManagerEmployeesQuery } from "@/redux/features/manager/sessionApi"; // Adjust path as needed

const ManagerTeamManagement = () => {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // RTK Query Hook
  const { data: response } = useGetManagerEmployeesQuery({
    page: currentPage,
    limit: pageSize,
    searchName: search,
  });

  const employees = response?.data?.employees || [];
  const totalItems = response?.data?.totalEmployees || 0;

  const columns: Column<any>[] = [
    {
      header: "Name",
      render: (item) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden border border-slate-100">
            <img
              src={
                item.profilePicture ||
                `https://api.dicebear.com/7.x/avataaars/svg?seed=${item.name}`
              }
              alt="avatar"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-base text-slate-900">
              {item.name}
            </span>
            <span className="text-[10px] text-slate-400 font-mono">
              ID: {item.id.slice(0, 8)}
            </span>
          </div>
        </div>
      ),
    },
    {
      header: "Primary Habit",
      render: (item) => {
        const primaryHabit = item.habits?.[0];
        return (
          <div className="max-w-[200px]">
            <div className="font-bold text-slate-900 text-base leading-tight">
              {primaryHabit ? primaryHabit.habitName : "No habits assigned"}
            </div>
            {primaryHabit && (
              <div className="text-[13px] text-slate-400 font-medium truncate">
                {primaryHabit.habitDescription}
              </div>
            )}
          </div>
        );
      },
    },
    {
      header: "Progress",
      render: (item) => (
        <span className="text-slate-400 text-base font-medium">
          {item.habits?.[0]?.completionPercentage || 0}%
        </span>
      ),
    },
    {
      header: "Streak",
      render: (item) => (
        <div className="flex items-center gap-1 font-bold text-slate-900">
          <HiFire className="text-orange-500 text-lg" />{" "}
          {item.habits?.[0]?.streak || 0}
        </div>
      ),
    },
    {
      header: "Total Habits",
      render: (item) => (
        <span className="font-bold text-base text-slate-900">
          {item.totalHabits}
        </span>
      ),
    },
    {
      header: "Score",
      render: (item) => (
        <span className="font-bold text-base text-slate-900">
          {item.score}/5
        </span>
      ),
    },
    {
      header: "Assigned Trainer",
      render: (item) => (
        <Select defaultValue={item.assignedTrainer?.id || "unassigned"}>
          <SelectTrigger className="w-[140px] h-9 bg-white border-slate-200 rounded-lg text-sm font-medium focus:ring-1 focus:ring-[#8C23CC] outline-none">
            <SelectValue placeholder="Select Trainer" />
          </SelectTrigger>
          <SelectContent className="bg-white rounded-xl shadow-xl border-slate-100">
            <SelectItem value="unassigned" disabled>
              Select Trainer
            </SelectItem>
            {item.assignedTrainer && (
              <SelectItem value={item.assignedTrainer.id}>
                {item.assignedTrainer.name}
              </SelectItem>
            )}
            {/* You might want to fetch a list of all trainers and map them here */}
          </SelectContent>
        </Select>
      ),
    },
    {
      header: "Status",
      render: (item) => <StatusBadge status={item.status} />,
    },
    {
      header: "Action",
      render: () => (
        <DropdownMenu>
          <DropdownMenuTrigger className="outline-none">
            <FiMoreVertical className="text-slate-600 cursor-pointer hover:text-slate-900" />
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="bg-white rounded-xl shadow-xl border-slate-100 min-w-[150px]"
          >
            <DropdownMenuItem className="cursor-pointer text-sm font-bold p-3 hover:bg-slate-50">
              View Profile
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer text-sm font-bold p-3 text-red-500 hover:bg-red-50">
              Unassign Trainer
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  return (
    <div className="p-8 min-h-screen space-y-6 bg-slate-50/30">
      <h1 className="text-3xl font-extrabold text-slate-900">
        Team Management
      </h1>

      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div className="relative w-full md:w-80">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1); // Reset to page 1 on search
              }}
              placeholder="Search by name or email..."
              className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-lg text-base outline-none focus:ring-1 focus:ring-[#8C23CC]"
            />
          </div>
          <div className="flex gap-3 w-full md:w-auto">
            <Button
              variant="outline"
              className="flex-1 md:flex-none px-6 border-slate-200 text-slate-600 font-bold h-10"
            >
              <FiFilter className="mr-2" /> Filter
            </Button>
            <Button
              variant="outline"
              className="flex-1 md:flex-none px-6 border-slate-200 text-slate-600 font-bold h-10"
            >
              Export CSV
            </Button>
          </div>
        </div>

        <CommonTable columns={columns} data={employees} />

        <div className="mt-8">
          <CommonPagination
            totalItems={totalItems}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
            onPageSizeChange={setPageSize}
          />
        </div>
      </div>
    </div>
  );
};

export default ManagerTeamManagement;
