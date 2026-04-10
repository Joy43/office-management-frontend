/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {  FileText, Users, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TemplateDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  template: any;
}

const TemplateDetailModal = ({ isOpen, onClose, template }: TemplateDetailModalProps) => {
  if (!template) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md p-0 border-none rounded-2xl shadow-2xl overflow-hidden bg-white">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
          <DialogHeader>
            <DialogTitle className="text-xl font-extrabold text-slate-900">Template Details</DialogTitle>
            <p className="text-xs text-slate-400 font-medium">Review information before selecting</p>
          </DialogHeader>
          {/* <button onClick={onClose} className="text-slate-300 hover:text-slate-500 transition-colors cursor-pointer">
            <X size={20} />
          </button> */}
        </div>

        <div className="p-8 space-y-6">
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100">
              <div className="p-2 bg-white rounded-lg shadow-sm text-[#8C23CC]"><FileText size={20}/></div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Name</p>
                <p className="text-sm font-bold text-slate-900">{template.name}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100">
                <div className="p-2 bg-white rounded-lg shadow-sm text-[#8C23CC]"><Layers size={18}/></div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Type</p>
                  <p className="text-sm font-bold text-slate-900">{template.type}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100">
                <div className="p-2 bg-white rounded-lg shadow-sm text-[#8C23CC]"><Users size={18}/></div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Users</p>
                  <p className="text-sm font-bold text-slate-900">{template.totalUsers}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Description</label>
            <p className="text-sm text-slate-600 leading-relaxed font-medium bg-slate-50 p-4 rounded-xl border border-slate-100 italic">
              "{template.description}"
            </p>
          </div>

          <div className="flex gap-3 pt-4">
            <Button variant="outline" onClick={onClose} 
              className="flex-1 h-12 border-slate-200 text-slate-600 font-bold rounded-xl cursor-pointer">
              Cancel
            </Button>
            <Button onClick={() => { console.log('Confirmed:', template.name); onClose(); }} 
              className="flex-1 h-12 bg-[#8C23CC] hover:bg-[#761eb0] text-white font-bold rounded-xl cursor-pointer shadow-lg shadow-purple-100">
              Confirm Selection
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TemplateDetailModal;