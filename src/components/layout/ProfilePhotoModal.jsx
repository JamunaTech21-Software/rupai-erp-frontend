import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { Camera, Save, Upload, X } from "lucide-react";
import { api } from "../../lib/api";
import UserAvatar from "./UserAvatar";

const TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_BYTES = 2 * 1024 * 1024;
const PROBLEM = "Use a JPG, PNG or WEBP image of at most 2 MB.";

// Change photo popup: pick a JPG / PNG / WEBP up to 2 MB, see it, Save. Closes after the save.
export default function ProfilePhotoModal({ user, onSaved, onClose }) {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const input = useRef(null);

  useEffect(() => {
    if (!file) return undefined;
    const url = URL.createObjectURL(file);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  useEffect(() => {
    const onKey = (event) => event.key === "Escape" && !saving && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [saving, onClose]);

  const pick = (picked) => {
    if (!picked) return;
    if (!TYPES.includes(picked.type) || picked.size > MAX_BYTES) {
      setFile(null);
      setPreview("");
      setError(PROBLEM);
      return;
    }
    setError("");
    setFile(picked);
  };

  const save = async () => {
    if (!file) {
      setError("Choose a photo first.");
      return;
    }
    setSaving(true);
    setError("");
    try {
      const uploaded = await api.upload(file);
      const result = await api.put("/auth/me/photo", { photo: uploaded.id });
      toast.success("Profile photo updated");
      onSaved(result.user);
      onClose();
    } catch (err) {
      setError(err.fields?.photo ?? err.fields?.file ?? err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div
      className='fixed inset-0 z-[9999] flex items-start justify-center overflow-y-auto bg-black/40 px-4 py-6'
      onMouseDown={(event) => event.target === event.currentTarget && !saving && onClose()}
    >
      <div role='dialog' aria-modal='true' aria-label='Change photo' className='w-full max-w-md overflow-hidden rounded-xl bg-white shadow-2xl'>
        <div className='flex items-center justify-between bg-emerald-800 px-5 py-3.5 text-white'>
          <h2 className='flex items-center gap-2 text-lg font-bold'>
            <Camera className='h-5 w-5' />
            Change Photo
          </h2>
          <button
            type='button'
            onClick={onClose}
            disabled={saving}
            aria-label='Close'
            title='Close'
            className='flex h-8 w-8 cursor-pointer items-center justify-center rounded-md hover:bg-white/15 disabled:cursor-not-allowed'
          >
            <X className='h-5 w-5' />
          </button>
        </div>

        <div className='flex flex-col items-center gap-4 p-5'>
          {preview ? (
            <img src={preview} alt='New photo preview' className='h-32 w-32 rounded-full object-cover ring-2 ring-primary/20' />
          ) : (
            <UserAvatar user={user} className='h-32 w-32 text-3xl' />
          )}
          <input
            ref={input}
            type='file'
            accept='image/jpeg,image/png,image/webp'
            className='hidden'
            onChange={(event) => {
              pick(event.target.files?.[0]);
              event.target.value = "";
            }}
          />
          <button
            type='button'
            onClick={() => input.current?.click()}
            disabled={saving}
            className='flex cursor-pointer items-center gap-2 rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60'
          >
            <Upload className='h-4 w-4' />
            {file ? "Choose another photo" : "Choose photo"}
          </button>
          <p className='text-xs text-slate-500'>JPG, PNG or WEBP, up to 2 MB.</p>
          {file && <p className='max-w-full truncate text-xs text-slate-600'>{file.name}</p>}
          {error && (
            <p role='alert' className='w-full rounded-md bg-red-50 px-3 py-2 text-center text-xs text-red-600'>
              {error}
            </p>
          )}
        </div>

        <div className='flex justify-end gap-3 border-t border-slate-100 bg-slate-50 px-5 py-3'>
          <button
            type='button'
            onClick={onClose}
            disabled={saving}
            className='cursor-pointer rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60'
          >
            Cancel
          </button>
          <button
            type='button'
            onClick={save}
            disabled={saving || !file}
            className='flex cursor-pointer items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white transition hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-60'
          >
            <Save className='h-4 w-4' />
            {saving ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}
