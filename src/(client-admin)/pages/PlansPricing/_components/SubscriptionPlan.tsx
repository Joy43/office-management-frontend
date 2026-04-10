import { Button } from "@/components/ui/button";
import { useSelectTemplateMutation } from "@/redux/features/user-admin/dashboardTemplateApi";
import { CheckCircle2 } from "lucide-react";
import Swal from "sweetalert2";

interface SubscriptionCardProps {
  plan: string;
  price: string;
  description: string;
  features: string[];
  badgeColor: string;
  isCurrentPlan?: boolean;
  billingCycle: "MONTHLY" | "ANNUAL";
}

const SubscriptionPlan = ({
  plan,
  price,
  description,
  features,
  badgeColor,
  isCurrentPlan = false,
  billingCycle,
}: SubscriptionCardProps) => {
  const [selectTemplate, { isLoading }] = useSelectTemplateMutation();
console.log(selectTemplate)
  const handlePlanSelect = async () => {

    Swal.fire({
      title: `Switch to ${plan}?`,
      text: "You are about to change your subscription plan.",
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#8C23CC",
      confirmButtonText: "Confirm Change",
    });
  };

  return (
    <div
      className={`bg-white rounded-3xl p-8 flex flex-col shadow-sm border-2 transition-all ${isCurrentPlan ? "border-[#8C23CC] ring-4 ring-purple-50" : "border-transparent"}`}
    >
      <div
        className={`w-fit px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4 ${badgeColor}`}
      >
        {plan}
      </div>

      <p className="text-sm text-slate-500 mb-6 leading-relaxed">
        {description}
      </p>

      <div className="flex items-baseline gap-1 mb-8">
        <span className="text-5xl font-extrabold text-slate-900">${price}</span>
        <span className="text-slate-400 text-sm font-medium">
          /{billingCycle === "ANNUAL" ? "year" : "month"}
        </span>
      </div>

      <div className="space-y-4 mb-10 flex-grow">
        {features.map((feature, idx) => (
          <div key={idx} className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
            <span className="text-sm text-slate-600 font-medium">
              {feature}
            </span>
          </div>
        ))}
      </div>

      {isCurrentPlan ? (
        <Button
          disabled
          className="w-full bg-slate-100 text-slate-400 py-7 rounded-2xl font-bold border-2 border-slate-200"
        >
          Current Active Plan
        </Button>
      ) : (
        <Button
          onClick={handlePlanSelect}
          disabled={isLoading}
          className="w-full bg-[#8C23CC] hover:bg-[#761eb0] text-white py-7 rounded-2xl font-bold shadow-lg shadow-purple-100 transition-all hover:-translate-y-1"
        >
          {isLoading ? "Processing..." : "Upgrade Plan"}
        </Button>
      )}
    </div>
  );
};

export default SubscriptionPlan;
