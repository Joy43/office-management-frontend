/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { toast } from "react-toastify";
import { Plus, X } from "lucide-react";
import { useCreatePlanMutation, useUpdatePlanMutation, type BillingCycle, type ISubscriptionPlan, type PlanName, type SubscribeStatus } from "@/redux/features/admin/subscriptionApi";


interface Props {
  isOpen: boolean;
  onClose: () => void;
  editData: ISubscriptionPlan | null;
}

const SubscriptionModal = ({ isOpen, onClose, editData }: Props) => {
  const [createPlan, { isLoading: isCreating }] = useCreatePlanMutation();
  const [updatePlan, { isLoading: isUpdating }] = useUpdatePlanMutation();

  const [features, setFeatures] = useState<string[]>([""]);
  const [formData, setFormData] = useState({
    planName: "STARTER" as PlanName,
    planTitle: "",
    subscribeStatus: "ACTIVE" as SubscribeStatus,
    billingCycle: "MONTHLY" as BillingCycle,
    amount: "",
    duration: "30 days",
  });

  useEffect(() => {
    if (editData) {
      setFormData({
        planName: editData.planName,
        planTitle: editData.planTitle,
        subscribeStatus: editData.subscribeStatus,
        billingCycle: editData.billingCycle,
        amount: editData.amount,
        duration: editData.duration,
      });
      setFeatures(editData.planFeatures);
    } else {
      setFormData({
        planName: "STARTER",
        planTitle: "",
        subscribeStatus: "ACTIVE",
        billingCycle: "MONTHLY",
        amount: "",
        duration: "30 days",
      });
      setFeatures([""]);
    }
  }, [editData, isOpen]);

  const handleAddFeature = () => setFeatures([...features, ""]);
  const handleRemoveFeature = (index: number) =>
    setFeatures(features.filter((_, i) => i !== index));
  const handleFeatureChange = (index: number, value: string) => {
    const newFeatures = [...features];
    newFeatures[index] = value;
    setFeatures(newFeatures);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      ...formData,
      planFeatures: features.filter((f) => f.trim() !== ""),
    };

    try {
      if (editData) {
        const res = await updatePlan({
          id: editData.id,
          data: payload,
        }).unwrap();
        toast.success(res.message || "Plan updated successfully");
      } else {
        const res = await createPlan(payload).unwrap();
        toast.success(res.message || "Plan created successfully");
      }
      onClose();
    } catch (err: any) {
      toast.error(err?.data?.message || "Something went wrong");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {editData ? "Edit Subscription Plan" : "Create New Plan"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Plan Type</Label>
              <Select
                value={formData.planName}
                onValueChange={(v) =>
                  setFormData({ ...formData, planName: v as PlanName })
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="STARTER">Starter</SelectItem>
                  <SelectItem value="GROWTH">Growth</SelectItem>
                  <SelectItem value="ENTERPRISE">Enterprise</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Billing Cycle</Label>
              <Select
                value={formData.billingCycle}
                onValueChange={(v) =>
                  setFormData({ ...formData, billingCycle: v as BillingCycle })
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="MONTHLY">Monthly</SelectItem>
                  <SelectItem value="ANNUAL">Yearly</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Plan Title</Label>
            <Input
              required
              value={formData.planTitle}
              onChange={(e) =>
                setFormData({ ...formData, planTitle: e.target.value })
              }
              placeholder="e.g. Best for small teams"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Amount ($)</Label>
              <Input
                required
                type="number"
                value={formData.amount}
                onChange={(e) =>
                  setFormData({ ...formData, amount: e.target.value })
                }
                placeholder="99.99"
              />
            </div>
            <div className="space-y-2">
              <Label>Status</Label>
              <Select
                value={formData.subscribeStatus}
                onValueChange={(v) =>
                  setFormData({
                    ...formData,
                    subscribeStatus: v as SubscribeStatus,
                  })
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ACTIVE">Active</SelectItem>
                  <SelectItem value="INACTIVE">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-3">
            <Label className="flex justify-between">
              Features{" "}
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={handleAddFeature}
                className="h-6 text-[#8A2BE2] cursor-pointer"
              >
                <Plus size={14} /> Add
              </Button>
            </Label>
            {features.map((feature, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  required
                  value={feature}
                  onChange={(e) => handleFeatureChange(index, e.target.value)}
                  placeholder="Feature description"
                />
                {features.length > 1 && (
                  <Button
                    className="cursor-pointer"
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemoveFeature(index)}
                  >
                    <X size={16} className="text-red-500" />
                  </Button>
                )}
              </div>
            ))}
          </div>

          <DialogFooter className="pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="cursor-pointer"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isCreating || isUpdating}
              className="bg-[#8A2BE2] hover:bg-[#7A26C1] cursor-pointer"
            >
              {isCreating || isUpdating ? "Saving..." : "Save Plan"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default SubscriptionModal;
