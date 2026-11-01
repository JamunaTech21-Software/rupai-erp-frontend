import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { X } from "lucide-react";
import { api } from "../../lib/api";
import { useApi } from "../../lib/useApi";
import ErrorState from "../common/ErrorState";
import ConfirmDialog from "../common/ConfirmDialog";

// Approval On / Off for each module. Turning one Off asks first.
export default function ApprovalSettingsModal({ onClose }) {
  const settings = useApi(() => api.get("/approval-settings"), []);
  const [savingModule, setSavingModule] = useState(null);
  const [turningOff, setTurningOff] = useState(null);

  useEffect(() => {
    const onKey = (event) => event.key === "Escape" && !turningOff && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose, turningOff]);

  const save = async (item, enabled) => {
    setSavingModule(item.module);
    try {
      await api.put(`/approval-settings/${item.module}`, { enabled });
      toast.success(`${item.label} approval turned ${enabled ? "on" : "off"}`);
      setTurningOff(null);
      await settings.reload();
    } catch (error) {
      toast.error(error.fields?.enabled ?? error.message);
      setTurningOff(null);
    } finally {
      setSavingModule(null);
    }
  };

  const flip = (item) => {
    if (item.enabled) setTurningOff(item);
    else save(item, true);
  };

  const list = settings.data ?? [];

  return (
    <div className='fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 p-4' onMouseDown={onClose}>
      <div className='max-h-full w-full max-w-lg overflow-y-auto rounded-xl bg-white shadow-xl' onMouseDown={(event) => event.stopPropagation()}>
        <div className='flex items-center justify-between border-b border-gray-200 px-5 py-4'>
          <h2 className='text-lg font-semibold text-green-800'>Approval Settings</h2>
          <button type='button' onClick={onClose} className='cursor-pointer rounded-lg p-2 text-gray-500 transition hover:bg-gray-100' aria-label='Close'>
            <X size={20} />
          </button>
        </div>

        <div className='p-5'>
          <p className='mb-4 text-sm text-gray-600'>
            When approval is On, saves in a module wait in the Approval Dashboard until they are approved.
          </p>
          {settings.loading && !settings.data && <p className='py-8 text-center text-sm text-gray-500'>Loading...</p>}
          {settings.error && !settings.data && <ErrorState message={settings.error.message} onRetry={settings.reload} />}
          <ul className='divide-y divide-gray-200 rounded-lg border border-gray-200'>
            {list.map((item) => (
              <li key={item.module} className='flex items-center justify-between gap-3 px-4 py-3'>
                <div className='min-w-0'>
                  <p className='text-sm font-medium text-gray-800'>{item.label}</p>
                  <p className='text-xs text-gray-500'>
                    {item.built ? `${item.pending} pending request${item.pending === 1 ? "" : "s"}` : "Not built yet"}
                  </p>
                </div>
                <div className='flex shrink-0 items-center gap-2'>
                  <span className={`w-7 text-right text-xs font-semibold ${item.enabled ? "text-green-700" : "text-gray-400"}`}>{item.enabled ? "On" : "Off"}</span>
                  <button
                    type='button'
                    role='switch'
                    aria-checked={item.enabled}
                    aria-label={`${item.label} approval`}
                    disabled={!item.built || savingModule === item.module}
                    onClick={() => flip(item)}
                    className={`relative h-6 w-11 cursor-pointer rounded-full transition disabled:cursor-not-allowed disabled:opacity-50 ${item.enabled ? "bg-green-600" : "bg-gray-300"}`}
                  >
                    <span className={`absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${item.enabled ? "translate-x-5" : ""}`} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className='mt-5 flex justify-end'>
            <button
              type='button'
              onClick={onClose}
              className='h-10 cursor-pointer rounded-lg border border-gray-300 bg-white px-6 text-sm text-gray-700 transition hover:bg-gray-50'
            >
              Close
            </button>
          </div>
        </div>
      </div>

      <ConfirmDialog
        open={Boolean(turningOff)}
        title={`Turn off ${turningOff?.label ?? ""} approval?`}
        message={`Saves in this module will apply straight away. ${turningOff?.pending ?? 0} pending request${turningOff?.pending === 1 ? "" : "s"} stay in the queue.`}
        confirmLabel='Turn Off'
        zClass='z-[10000]'
        loading={savingModule === turningOff?.module}
        onConfirm={() => save(turningOff, false)}
        onCancel={() => setTurningOff(null)}
      />
    </div>
  );
}
