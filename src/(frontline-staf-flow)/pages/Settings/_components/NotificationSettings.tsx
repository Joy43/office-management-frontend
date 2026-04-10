import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useGetProfileQuery, useUpdateProfileMutation } from "@/redux/api/auth/authApi";
import { toast } from "react-toastify";

export const NotificationSettings = () => {
  const { data: profileData } = useGetProfileQuery();
  const [updateProfile] = useUpdateProfileMutation();
  const user = profileData?.data;

  const handleToggle = async (field: string, value: boolean) => {
    if (!user) return;
    try {
      await updateProfile({ id: user.id, body: { [field]: value } }).unwrap();
      toast.success("Notification updated!");
    } catch (err) {
      console.log(err)
      toast.error("Failed to update notification settings");
    }
  };

  const notificationItems = [
    {
      id: "isDasktopNotificationsEnabled",
      title: "Enable Desktop Notifications",
      desc: "Receive notification on all of updates",
      checked: user?.isDasktopNotificationsEnabled,
    },
    {
      id: "isEmailNotificationsEnabled",
      title: "Receive Email Notifications",
      desc: "Important updates and alerts via email",
      checked: user?.isEmailNotificationsEnabled,
    },
    {
      id: "isSmsNotificationsEnabled",
      title: "Receive SMS Notifications",
      desc: "Updates and alerts directly to your phone via SMS",
      checked: user?.isSmsNotificationsEnabled,
    },
    {
      id: "isDailySummariesEnabled",
      title: "Daily Summaries",
      desc: "Get a daily overview of all project activities",
      checked: user?.isDailySummariesEnabled,
    },
  ];

  return (
    <div className="space-y-8 max-w-2xl">
      <section>
        <h2 className="text-xl font-bold text-slate-900">Notifications</h2>
        <p className="text-sm text-slate-500">
          Manage how you receive alerts and summaries.
        </p>
      </section>

      <div className="space-y-6">
        {notificationItems.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between py-2 border-b border-slate-50 last:border-0"
          >
            <div className="space-y-1">
              <Label className="text-lg font-bold text-slate-800">
                {item.title}
              </Label>
              <p className="text-base text-slate-500">{item.desc}</p>
            </div>
            <Switch
              checked={item.checked}
              onCheckedChange={(val) => handleToggle(item.id, val)}
              className="data-[state=checked]:bg-[#8C23CC] scale-125 cursor-pointer"
            />
          </div>
        ))}
      </div>
    </div>
  );
};
