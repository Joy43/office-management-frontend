/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";;
import { toast } from "react-toastify";
import { useCreateTenantMutation, useUpdateTenantMutation, type ITenant } from "@/redux/features/admin/tenantApi";
import { useGetAllPlansQuery } from "@/redux/features/admin/subscriptionApi";
// import { data } from "react-router";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  initialData?: ITenant | null;
}

const SuperAdminTenantDialog = ({ isOpen, onClose, initialData }: Props) => {
  const [createTenant, { isLoading: isCreating }] = useCreateTenantMutation();
  const [updateTenant, { isLoading: isUpdating }] = useUpdateTenantMutation();
  const { data: plansRes } = useGetAllPlansQuery();

  const plans = plansRes?.data?.data || [];

  const [formData, setFormData] = useState({
    companyName: "",
    subdomain: "",
    companyEmail: "",
    planId: "",
    status: "ACTIVE",
    locale: "en",
    timezone: "Africa/Accra",
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        companyName: initialData.companyName,
        subdomain: initialData.subdomain,
        companyEmail: initialData.companyEmail,
        planId: "", // Backend usually doesn't return planId in list
        status: initialData.status,
        locale: initialData.locale,
        timezone: initialData.timezone,
      });
    } else {
      setFormData({
        companyName: "",
        subdomain: "",
        companyEmail: "",
        planId: plans[0]?.id || "",
        status: "ACTIVE",
        locale: "en",
        timezone: "Africa/Accra",
      });
    }
  }, [initialData, isOpen, plans]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (initialData) {
        await updateTenant({ id: initialData.id, data: formData } as any).unwrap();
        toast.success("Tenant updated!");
      } else {
        await createTenant(formData as any).unwrap();
        toast.success("Tenant created successfully!");
      }
      onClose();
    } catch (err: any) {
      toast.error(err?.data?.message || "Operation failed");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] p-8">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            {initialData ? "Edit Tenant" : "Create New Tenant"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5 mt-4">
          <div className="space-y-2">
            <Label>Company Name *</Label>
            <Input
              value={formData.companyName}
              onChange={(e) =>
                setFormData({ ...formData, companyName: e.target.value })
              }
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Subdomain *</Label>
            <div className="flex items-center gap-2">
              <Input
                value={formData.subdomain}
                onChange={(e) =>
                  setFormData({ ...formData, subdomain: e.target.value })
                }
                required
                placeholder="acme"
              />
              <span className="text-sm text-slate-400">.domain.com</span>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Admin Email *</Label>
            <Input
              type="email"
              value={formData.companyEmail}
              onChange={(e) =>
                setFormData({ ...formData, companyEmail: e.target.value })
              }
              required
            />
          </div>

          <div className="space-y-4">
            <Label className="font-bold">Select Subscription Plan</Label>
            <RadioGroup
              value={formData.planId}
              onValueChange={(val) => setFormData({ ...formData, planId: val })}
              className="grid grid-cols-1 gap-3"
            >
              {plans.map((plan) => (
                <div
                  key={plan.id}
                  className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-slate-50"
                >
                  <RadioGroupItem value={plan.id} id={plan.id} />
                  <Label
                    htmlFor={plan.id}
                    className="flex justify-between w-full cursor-pointer"
                  >
                    <span>{plan.planName}</span>
                    <span className="font-bold text-[#8C23CC]">
                      ${plan.amount}
                    </span>
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isCreating || isUpdating}
              className="bg-[#8C23CC]"
            >
              {isCreating || isUpdating
                ? "Processing..."
                : initialData
                  ? "Update"
                  : "Create"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default SuperAdminTenantDialog;
