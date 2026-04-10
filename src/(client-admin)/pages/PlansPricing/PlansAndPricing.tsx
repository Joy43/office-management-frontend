/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import SubscriptionPlan from "./_components/SubscriptionPlan";
import PlanComparisonTable from "./_components/PlanComparisonTable";
import { useGetTenantSubscriptionDetailsQuery } from "@/redux/features/user-admin/othersSubcriptionDetails";


const ClientAdminPlansAndPricing = () => {
  const [billingCycle, setBillingCycle] = useState<"MONTHLY" | "ANNUAL">(
    "MONTHLY",
  );

  const { data: subscriptionResponse, isLoading } =
    useGetTenantSubscriptionDetailsQuery();
console.log(subscriptionResponse?.data);
  const activePlan = subscriptionResponse?.data?.Mysubscription;
  const allAvailablePlans =
    subscriptionResponse?.data?.othersSubcriptionDetails || [];

  const planConfigs: any = {
    STARTER: {
      badgeColor: "bg-slate-100 text-slate-600",
    },
    GROWTH: {
      badgeColor: "bg-[#D0DBFB] text-[#1447E6]",
    },
    ENTERPRISE: {
      badgeColor: "bg-orange-100 text-orange-600",
    },
  };

  if (isLoading)
    return (
      <div className="p-8 text-center font-bold text-[#8C23CC]">
        Loading Plans...
      </div>
    );

  return (
    <div className="p-8 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Plans & Pricing</h1>
      </div>

      {/* Toggle Switch */}
      <div className="flex justify-center mb-12">
        <div className="bg-slate-100 p-1 rounded-xl flex border border-slate-200">
          <button
            onClick={() => setBillingCycle("MONTHLY")}
            className={`px-8 py-2.5 rounded-lg text-sm transition-all cursor-pointer ${
              billingCycle === "MONTHLY"
                ? "bg-white shadow-md font-bold text-[#8C23CC]"
                : "text-slate-500 font-medium"
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setBillingCycle("ANNUAL")}
            className={`px-8 py-2.5 rounded-lg text-sm transition-all cursor-pointer ${
              billingCycle === "ANNUAL"
                ? "bg-white shadow-md font-bold text-[#8C23CC]"
                : "text-slate-500 font-medium"
            }`}
          >
            Yearly
          </button>
        </div>
      </div>

      {/* Cards Grid - সম্পূর্ণ ডাইনামিক লুপ */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mx-auto max-w-7xl">
        {allAvailablePlans.map((planData: any) => {
          // এপিআই থেকে আসা প্ল্যান অনুযায়ী কনফিগ সিলেক্ট করা
          const config =
            planConfigs[planData.planName] || planConfigs["STARTER"];

          return (
            <SubscriptionPlan
              key={planData.id}
              plan={planData.planName}
              price={planData.amount}
              description={planData.planTitle}
              features={planData.planFeatures}
              badgeColor={config.badgeColor}
              // আইডি চেক করে একটিভ প্ল্যান ডিটেক্ট করা
              isCurrentPlan={activePlan?.id === planData.id}
              billingCycle={billingCycle}
            />
          );
        })}
      </div>

      <div className="mt-20">
        <h2 className="text-2xl font-bold mb-8 text-center text-slate-900">
          Compare our plans
        </h2>
        <PlanComparisonTable />
      </div>
    </div>
  );
};

export default ClientAdminPlansAndPricing;
