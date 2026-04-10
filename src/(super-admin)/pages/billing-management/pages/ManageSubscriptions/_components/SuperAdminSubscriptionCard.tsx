/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { useDeletePlanMutation, type ISubscriptionPlan } from "@/redux/features/admin/subscriptionApi";
import { CheckCircle2, Edit3, Trash2 } from "lucide-react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
interface Props {
  plan: ISubscriptionPlan;
  onEdit: () => void;
}

const SuperAdminSubscriptionCard = ({ plan, onEdit }: Props) => {
  const [deletePlan, { isLoading: isDeleting }] = useDeletePlanMutation();

const handleDelete = async () => {
  Swal.fire({
    title: "Are you sure?",
    text: `You are about to delete the "${plan.planName}" plan. This action cannot be undone!`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#8A2BE2",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
    cancelButtonText: "No, cancel",
    customClass: {
      popup: "rounded-[24px]", 
      confirmButton: "rounded-xl px-6 py-3 font-bold",
      cancelButton: "rounded-xl px-6 py-3 font-bold",
    },
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        const res = await deletePlan(plan.id).unwrap();

        Swal.fire({
          title: "Deleted!",
          text: res.message || "The plan has been removed.",
          icon: "success",
          confirmButtonColor: "#8A2BE2",
          customClass: {
            popup: "rounded-[24px]",
          },
        });
      } catch (err: any) {
        toast.error(err?.data?.message || "Failed to delete plan");
      }
    }
  });
};
  const getBadgeStyles = (name: string) => {
    switch (name) {
      case "STARTER":
        return "bg-slate-100 text-slate-600";
      case "GROWTH":
        return "bg-violet-100 text-[#8A2BE2]";
      case "ENTERPRISE":
        return "bg-orange-100 text-orange-600";
      default:
        return "bg-gray-100";
    }
  };

  return (
    <div className="bg-white rounded-3xl p-8 flex flex-col shadow-sm border border-slate-100 hover:shadow-xl hover:shadow-purple-500/5 transition-all duration-300 group relative">
      {/* Delete Icon Button */}
      <button
        onClick={handleDelete}
        disabled={isDeleting}
        className="absolute top-6 right-6 p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-full transition-all cursor-pointer  group-hover:opacity-100 disabled:opacity-50"
        title="Delete Plan"
      >
        <Trash2 size={20} />
      </button>

      <div
        className={`w-fit px-4 py-1.5 rounded-full text-xs font-bold mb-5 tracking-wider ${getBadgeStyles(plan.planName)}`}
      >
        {plan.planName}
      </div>

      <h3 className="text-xl font-bold text-slate-800 mb-2">
        {plan.planTitle}
      </h3>
      <p className="text-sm text-slate-500 mb-8 leading-relaxed">
        {plan.duration} access with premium features.
      </p>

      <div className="flex items-baseline gap-1 mb-8">
        <span className="text-4xl font-black text-slate-900">
          ${plan.amount}
        </span>
        <span className="text-slate-400 text-sm font-medium lowercase">
          /{plan.billingCycle === "MONTHLY" ? "mo" : "yr"}
        </span>
      </div>

      <div className="space-y-4 mb-10 flex-grow">
        {plan.planFeatures.map((feature, idx) => (
          <div key={idx} className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
            <span className="text-sm text-slate-600 font-medium">
              {feature}
            </span>
          </div>
        ))}
      </div>

      <Button
        variant="outline"
        onClick={onEdit}
        className="w-full border-2 cursor-pointer border-[#8A2BE2] text-[#8A2BE2] hover:bg-[#8A2BE2] hover:text-white py-6 rounded-2xl font-bold transition-all flex gap-2"
      >
        <Edit3 size={18} /> Edit Plan
      </Button>
    </div>
  );
};

export default SuperAdminSubscriptionCard;
