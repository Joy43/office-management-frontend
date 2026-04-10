
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useGetProfileQuery, useUpdateProfileMutation, useUploadSingleFileMutation } from "@/redux/api/auth/authApi";
import { toast } from "react-toastify";


export const AccountSettings = () => {
  const { data: profileData, isLoading } = useGetProfileQuery();
  const [updateProfile] = useUpdateProfileMutation();
  const [uploadFile, { isLoading: isUploading }] =
    useUploadSingleFileMutation();

  const user = profileData?.data;
console.log(profileData);
  // Local state for form fields
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        phone: user.phone || "",
        email: user.email || "",
      });
    }
  }, [user]);

  // -------- Handle Profile Picture Upload --------
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && user) {
      const fd = new FormData();
      fd.append("file", file); 

      try {
        const res = await uploadFile(fd).unwrap();
        await updateProfile({
          id: user.id,
          body: { image: res.file },
        }).unwrap();
        toast.success("Profile picture updated!");
      } catch (error) {
           console.log(error);
        toast.error("Failed to upload image");
      }
    }
  };

  const handleUpdateInfo = async () => {
    if (!user) return;
    try {
      await updateProfile({
        id: user.id,
        body: { name: formData.name, phone: formData.phone },
      }).unwrap();
      toast.success("Profile updated successfully!");
    } catch (err) {
      console.log(err)
      toast.error("Update failed!");
    }
  };

  const handleToggle = async (field: string, value: boolean) => {
    if (!user) return;
    try {
      await updateProfile({ id: user.id, body: { [field]: value } }).unwrap();
    } catch (err) {   console.log(err);
      toast.error("Failed to update security setting");
    }
  };

  if (isLoading) return <div>Loading Profile...</div>;

  return (
    <div className="space-y-10 max-w-2xl">
      <section>
        <h2 className="text-xl font-bold text-slate-900">
          Profile Information
        </h2>
        <p className="text-base text-slate-500">
          Manage your personal details and contact info.
        </p>
      </section>

      {/* Profile Picture Section */}
      <section className="space-y-4">
        <Label className="text-base font-semibold text-slate-700">
          Profile Picture
        </Label>
        <div className="flex items-center gap-6">
          <div className="relative">
            <img
              src={user?.profilePicture || "https://github.com/shadcn.png"}
              alt="Avatar"
              className="w-24 h-24 rounded-full object-cover border-2 border-slate-100"
            />
            {isUploading && (
              <div className="absolute inset-0 bg-black/20 rounded-full flex items-center justify-center text-[10px] text-white">
                Uploading...
              </div>
            )}
            <div className="absolute bottom-1 right-1 w-5 h-5 bg-emerald-500 border-2 border-white rounded-full"></div>
          </div>
          <div className="flex gap-3">
            <input
              type="file"
              id="pic"
              hidden
              onChange={handleImageUpload}
              accept="image/*"
            />
            <Button
              variant="outline"
              className="text-[#B91010] border-[#B91010] hover:bg-red-50 px-6"
            >
              Delete
            </Button>
            <Button
              className="bg-[#8C23CC] hover:bg-[#761eb0] text-white px-6"
              onClick={() => document.getElementById("pic")?.click()}
            >
              Update
            </Button>
          </div>
        </div>
      </section>

      {/* ---------- Form Fields -------------- */}
      <section className="grid gap-6">
        <div className="grid gap-2">
          <Label className="text-slate-700 font-medium">Name</Label>
          <Input
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="bg-slate-50/50 border-slate-200"
          />
        </div>
        <div className="grid gap-2">
          <Label className="text-slate-700 font-medium">Email (Primary)</Label>
          <Input
            value={formData.email}
            disabled
            className="bg-slate-100 border-slate-200 cursor-not-allowed"
          />
        </div>
        <div className="grid gap-2">
          <Label className="text-slate-700 font-medium">Phone</Label>
          <Input
            value={formData.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
            className="bg-slate-50/50 border-slate-200"
          />
        </div>
        <Button onClick={handleUpdateInfo} className="w-fit bg-[#8C23CC]">
          Save Changes
        </Button>
      </section>

      <hr className="border-slate-100" />

      {/*------- Security Section------------- */}
      <section className="space-y-6">
        <h2 className="text-xl font-bold text-slate-900">Security</h2>
        <div className="flex items-center justify-between py-2 border-b border-slate-50">
          <div className="space-y-1">
            <Label className="text-lg font-bold text-slate-800">
              Two-Factor Authentication
            </Label>
            <p className="text-base text-slate-500">
              Add an extra layer of protection.
            </p>
          </div>
          <Switch
            checked={user?.is2FAEnabled}
            onCheckedChange={(val) => handleToggle("is2FAEnabled", val)}
            className="data-[state=checked]:bg-[#8C23CC] scale-125 cursor-pointer"
          />
        </div>

        <div className="flex items-center justify-between py-2 border-b border-slate-50">
          <div className="space-y-1">
            <Label className="text-lg font-bold text-slate-800">
              Login Alert Notification
            </Label>
            <p className="text-base text-slate-500">
              Notified when accessed from a new device.
            </p>
          </div>
          <Switch
            checked={user?.isLoginAlertsNotification}
            onCheckedChange={(val) =>
              handleToggle("isLoginAlertsNotification", val)
            }
            className="data-[state=checked]:bg-[#8C23CC] scale-125 cursor-pointer"
          />
        </div>
      </section>
    </div>
  );
};
