export interface Template {
  id: string;
  name: string;
  type: "Program" | "Document";
  totalUsers: number;
  status: boolean;
  createdAt: string;
}

export const ManageTemplateData: Template[] = [
  {
    id: "1",
    name: "90-Day Pilot Template",
    type: "Program",
    totalUsers: 50,
    status: true,
    createdAt: "April 14, 2020",
  },
  {
    id: "2",
    name: "Manager Toolkit",
    type: "Document",
    totalUsers: 50,
    status: true,
    createdAt: "April 14, 2020",
  },
];