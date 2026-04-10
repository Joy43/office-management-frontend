/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useGetAllPlansQuery, type ISubscriptionPlan } from "@/redux/features/admin/subscriptionApi";
import SubscriptionModal from "./_components/SubscriptionModal";
import SuperAdminSubscriptionCard from "./_components/SuperAdminSubscriptionCard";

const SuperAdminManageSubscriptions = () => {
  const [billingCycle, setBillingCycle] = useState<"MONTHLY" | "YEARLY">(
    "MONTHLY",
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<ISubscriptionPlan | null>(
    null,
  );

  const { data: plansResponse, isLoading } = useGetAllPlansQuery();

console.log(plansResponse);
  const filteredPlans =
    plansResponse?.data?.data?.filter(
      (plan) => plan.billingCycle === billingCycle,
    ) || [];

  const handleEdit = (plan: ISubscriptionPlan) => {
    setSelectedPlan(plan);
    setIsModalOpen(true);
  };

  const handleCreate = () => {
    setSelectedPlan(null);
    setIsModalOpen(true);
  };

  return (
    <div className="p-8 min-h-screen bg-slate-50/50">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Manage Subscription</h1>
        <Button
          onClick={handleCreate}
          className="bg-[#8A2BE2] hover:bg-[#7A26C1] rounded-xl px-6 cursor-pointer"
        >
          + Create New Plan
        </Button>
      </div>

      {/* Toggle Switch */}
      <div className="flex justify-center mb-12">
        <div className="bg-slate-100 p-1 rounded-xl flex">
          {["MONTHLY", "ANNUAL"].map((cycle) => (
            <button
              key={cycle}
              onClick={() => setBillingCycle(cycle as any)}
              className={`px-8 py-2.5 rounded-lg text-sm transition-all cursor-pointer ${
                billingCycle === cycle
                  ? "bg-white shadow-md font-bold text-[#8A2BE2]"
                  : "text-slate-500 font-medium"
              }`}
            >
              {cycle.charAt(0) + cycle.slice(1).toLowerCase()}
            </button>
          ))}
        </div>
      </div>

      {isLoading ? (
        <div className="text-center py-20 text-slate-400 animate-pulse font-medium">
          Loading subscription plans...
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mx-auto max-w-7xl">
          {filteredPlans.length > 0 ? (
            filteredPlans.map((item) => (
              <SuperAdminSubscriptionCard
                key={item.id}
                plan={item}
                onEdit={() => handleEdit(item)}
              />
            ))
          ) : (
            <div className="col-span-3 text-center py-20 bg-white rounded-3xl border-2 border-dashed">
              <p className="text-slate-400">
                No plans found for {billingCycle.toLowerCase()} billing.
              </p>
            </div>
          )}
        </div>
      )}

      <SubscriptionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        editData={selectedPlan}
      />
    </div>
  );
};

export default SuperAdminManageSubscriptions;
