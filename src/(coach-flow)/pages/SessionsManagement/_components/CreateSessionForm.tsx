/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useRef } from "react";
import { Upload, FileText, Trash2, ChevronDown, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

// Dashboard theke asha user type
interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

export interface UploadedFile {
  id: string;
  name: string;
  size: string;
  file: File; // Backend e pathanor jonno binary file rakha hoyeche
  progress?: number;
}

export interface SessionFormData {
  title: string;
  dateTime: string;
  duration: string;
  agenda: string;
  participants: string[]; // Selected User IDs
}

interface CreateSessionFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: SessionFormData, files: any[]) => void;
  users: User[]; // User list props hisebe asche
}

const CreateSessionForm = ({
  isOpen,
  onClose,
  onSubmit,
  users = [],
}: CreateSessionFormProps) => {
  const [formData, setFormData] = useState<SessionFormData>({
    title: "",
    dateTime: "",
    duration: "",
    agenda: "",
    participants: [],
  });
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // File Upload Logic
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      Array.from(files).forEach((file) => {
        const fileSize = (file.size / 1024).toFixed(0) + "KB";
        const newFile: UploadedFile = {
          id: Date.now().toString() + Math.random(),
          name: file.name,
          size: fileSize,
          file: file, // Store actual file object
          progress: 100,
        };
        setUploadedFiles((prev) => [...prev, newFile]);
      });
    }
  };

  const handleDeleteFile = (fileId: string) => {
    setUploadedFiles((prev) => prev.filter((file) => file.id !== fileId));
  };

  // Participant Selection Logic
  const toggleUserSelection = (userId: string) => {
    setFormData((prev) => {
      const isSelected = prev.participants.includes(userId);
      return {
        ...prev,
        participants: isSelected
          ? prev.participants.filter((id) => id !== userId)
          : [...prev.participants, userId],
      };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Dashboard e pathanor somoy file object list pathano hochhe
    onSubmit(
      formData,
      uploadedFiles.map((f) => f.file),
    );
    handleCancel();
  };

  const handleCancel = () => {
    setFormData({
      title: "",
      dateTime: "",
      duration: "",
      agenda: "",
      participants: [],
    });
    setUploadedFiles([]);
    setIsUserDropdownOpen(false);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-slate-900">
            Create Sessions
          </DialogTitle>
          <DialogDescription className="text-sm text-slate-600">
            Fill up the form to schedule a new session
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Session Title */}
          <div>
            <label className="block text-sm font-medium text-slate-900 mb-2">
              Session Title <span className="text-red-500">*</span>
            </label>
            <Input
              type="text"
              placeholder="Enter Session Title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Date & Time */}
            <div>
              <label className="block text-sm font-medium text-slate-900 mb-2">
                Select Date & Time <span className="text-red-500">*</span>
              </label>
              <Input
                type="datetime-local"
                value={formData.dateTime}
                onChange={(e) =>
                  setFormData({ ...formData, dateTime: e.target.value })
                }
                required
              />
            </div>

            {/* Duration */}
            <div>
              <label className="block text-sm font-medium text-slate-900 mb-2">
                Duration (Min) <span className="text-red-500">*</span>
              </label>
              <Input
                type="text"
                placeholder="e.g. 60"
                value={formData.duration}
                onChange={(e) =>
                  setFormData({ ...formData, duration: e.target.value })
                }
                required
              />
            </div>
          </div>

          {/* Participant Selection (Custom Multi-select) */}
          <div className="relative">
            <label className="block text-sm font-medium text-slate-900 mb-2">
              Select Participants <span className="text-red-500">*</span>
            </label>
            <div
              className="min-h-[42px] p-2 border border-slate-200 rounded-md cursor-pointer flex flex-wrap gap-2 items-center bg-white"
              onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
            >
              {formData.participants.length === 0 && (
                <span className="text-slate-400 text-sm ml-2">
                  Choose participants...
                </span>
              )}
              {formData.participants.map((userId) => {
                const user = users.find((u) => u.id === userId);
                return (
                  <span
                    key={userId}
                    className="bg-slate-100 text-slate-700 text-xs px-2 py-1 rounded-full flex items-center gap-1 border border-slate-200"
                  >
                    {user?.name}
                    <X
                      className="w-3 h-3 cursor-pointer hover:text-red-500"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleUserSelection(userId);
                      }}
                    />
                  </span>
                );
              })}
              <ChevronDown className="w-4 h-4 ml-auto text-slate-400" />
            </div>

            {isUserDropdownOpen && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-slate-200 rounded-md shadow-lg max-h-60 overflow-y-auto">
                {users.map((user) => (
                  <div
                    key={user.id}
                    className={`flex items-center justify-between p-3 cursor-pointer hover:bg-slate-50 border-b border-slate-50 last:border-0 ${
                      formData.participants.includes(user.id)
                        ? "bg-purple-50"
                        : ""
                    }`}
                    onClick={() => toggleUserSelection(user.id)}
                  >
                    <div>
                      <p className="text-sm font-medium text-slate-900">
                        {user.name}
                      </p>
                      <p className="text-xs text-slate-500">
                        {user.email} | {user.role}
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      checked={formData.participants.includes(user.id)}
                      onChange={() => {}}
                      className="accent-[#8C23CC]"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Agenda */}
          <div>
            <label className="block text-sm font-medium text-slate-900 mb-2">
              Agenda <span className="text-red-500">*</span>
            </label>
            <textarea
              placeholder="Enter Agenda"
              value={formData.agenda}
              onChange={(e) =>
                setFormData({ ...formData, agenda: e.target.value })
              }
              required
              className="w-full px-3 py-2 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8C23CC] min-h-[100px] resize-none"
            />
          </div>

          {/* Upload Materials */}
          <div>
            <label className="block text-sm font-medium text-slate-900 mb-2">
              Upload Materials
            </label>
            <div
              className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center cursor-pointer hover:border-[#8C23CC] transition-colors bg-slate-50"
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload className="w-10 h-10 mx-auto mb-2 text-slate-400" />
              <p className="text-xs text-slate-600">
                Drag and drop or{" "}
                <span className="text-[#8C23CC] font-semibold">browse</span>
              </p>
              <input
                ref={fileInputRef}
                type="file"
                multiple
                className="hidden"
                onChange={handleFileUpload}
              />
            </div>

            {/* File List */}
            {uploadedFiles.length > 0 && (
              <div className="mt-4 space-y-2">
                {uploadedFiles.map((file) => (
                  <div
                    key={file.id}
                    className="flex items-center justify-between p-2 bg-white rounded border border-slate-200"
                  >
                    <div className="flex items-center gap-3">
                      <FileText className="w-4 h-4 text-red-500" />
                      <span className="text-sm text-slate-700">
                        {file.name} ({file.size})
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleDeleteFile(file.id)}
                    >
                      <Trash2 className="w-4 h-4 text-red-400 hover:text-red-600" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <DialogFooter>
            <div className="flex justify-end gap-3 w-full">
              <Button type="button" variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-[#8C23CC] hover:bg-[#761eb0] text-white px-8"
              >
                Create Session
              </Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateSessionForm;
