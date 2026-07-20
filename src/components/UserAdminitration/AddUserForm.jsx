import { useForm } from "react-hook-form";
import { FiUser, FiMail, FiPhone, FiUploadCloud } from "react-icons/fi";
import { MdOutlineAlternateEmail } from "react-icons/md";

const AddUserForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <div>
      <form className='space-y-6'>
        {/* ================= Personal Information ================= */}
        <section className='rounded-xl border border-gray-200 p-5'>
          <h2 className='mb-5 text-lg font-semibold text-green-700'>
            Personal Information
          </h2>

          <div className='grid grid-cols-1 gap-5 md:grid-cols-2'>
            <div>
              <label className='mb-2 block text-sm font-medium text-gray-700'>
                Full Name <span className='text-red-500'>*</span>
              </label>

              <div className='relative'>
                <FiUser className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400' />

                <div className='flex h-11 items-center rounded-lg border border-gray-300 bg-white pl-10 pr-4 text-sm text-gray-400'>
                  Enter full name
                </div>
              </div>
            </div>

            <div>
              <label className='mb-2 block text-sm font-medium text-gray-700'>
                Username <span className='text-red-500'>*</span>
              </label>

              <div className='relative'>
                <MdOutlineAlternateEmail className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400' />

                <div className='flex h-11 items-center rounded-lg border border-gray-300 bg-white pl-10 pr-4 text-sm text-gray-400'>
                  Enter username
                </div>
              </div>
            </div>

            <div>
              <label className='mb-2 block text-sm font-medium text-gray-700'>
                Email Address <span className='text-red-500'>*</span>
              </label>

              <div className='relative'>
                <FiMail className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400' />

                <div className='flex h-11 items-center rounded-lg border border-gray-300 bg-white pl-10 pr-4 text-sm text-gray-400'>
                  Enter email address
                </div>
              </div>
            </div>

            <div>
              <label className='mb-2 block text-sm font-medium text-gray-700'>
                Profile Photo
              </label>

              <div className='flex h-28 flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-white'>
                <FiUploadCloud className='mb-2 text-2xl text-gray-500' />

                <p className='text-sm font-medium'>Click to upload</p>

                <p className='text-xs text-gray-400'>JPG, PNG (Max. 2MB)</p>
              </div>
            </div>

            <div>
              <label className='mb-2 block text-sm font-medium text-gray-700'>
                Phone Number
              </label>

              <div className='relative'>
                <FiPhone className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400' />

                <div className='flex h-11 items-center rounded-lg border border-gray-300 bg-white pl-10 pr-4 text-sm text-gray-400'>
                  Enter phone number
                </div>
              </div>
            </div>

            <div>
              <label className='mb-2 block text-sm font-medium text-gray-700'>
                Status <span className='text-red-500'>*</span>
              </label>

              <select className='w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm outline-none'>
                <option>Select Permission Level</option>
                <option>Administrator</option>
                <option>Manager</option>
                <option>Supervisor</option>
                <option>Employee</option>
              </select>
            </div>
          </div>
        </section>

        {/* ================= Job Information ================= */}
        <section className='rounded-xl border border-gray-200 p-5'>
          <h2 className='mb-5 text-lg font-semibold text-green-700'>
            Job Information
          </h2>

          <div className='grid grid-cols-1 gap-5 md:grid-cols-2'>
            <div>
              <label className='mb-2 block text-sm font-medium text-gray-700'>
                Role <span className='text-red-500'>*</span>
              </label>

              <select className='w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm outline-none'>
                <option>Select Role</option>
                <option>Estate Manager</option>
                <option>HR Manager</option>
                <option>Field Supervisor</option>
                <option>Factory Manager</option>
                <option>Accounts Officer</option>
                <option>Security Officer</option>
                <option>System Administrator</option>
              </select>
            </div>

            <div>
              <label className='mb-2 block text-sm font-medium text-gray-700'>
                Department <span className='text-red-500'>*</span>
              </label>

              <select className='w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm outline-none'>
                <option>Select Department</option>
                <option>Administration</option>
                <option>Human Resources</option>
                <option>Field Operations</option>
                <option>Factory</option>
                <option>Accounts & Finance</option>
                <option>Security</option>
                <option>IT Support</option>
              </select>
            </div>

            <div>
              <label className='mb-2 block text-sm font-medium text-gray-700'>
                Designation
              </label>

              <div className='relative'>
                <FiUser className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400' />

                <div className='flex h-11 items-center rounded-lg border border-gray-300 bg-white pl-10 pr-4 text-sm text-gray-400'>
                  Enter designation
                </div>
              </div>
            </div>

            <div>
              <label className='mb-2 block text-sm font-medium text-gray-700'>
                Employee ID
              </label>

              <div className='relative'>
                <FiUser className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400' />

                <div className='flex h-11 items-center rounded-lg border border-gray-300 bg-white pl-10 pr-4 text-sm text-gray-400'>
                  Enter employee ID (Optional)
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= Security ================= */}
        <section className='rounded-xl border border-gray-200 p-5'>
          <h2 className='mb-5 text-lg font-semibold text-green-700'>
            Security
          </h2>

          <div className='grid grid-cols-1 gap-5 md:grid-cols-2'>
            <div>
              <label className='mb-2 block text-sm font-medium text-gray-700'>
                Password <span className='text-red-500'>*</span>
              </label>

              <div className='relative'>
                <FiUser className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400' />

                <div className='flex h-11 items-center justify-between rounded-lg border border-gray-300 bg-white pl-10 pr-4 text-sm text-gray-400'>
                  <span>Enter password</span>

                  <span>👁️</span>
                </div>
              </div>
            </div>

            <div>
              <label className='mb-2 block text-sm font-medium text-gray-700'>
                Confirm Password <span className='text-red-500'>*</span>
              </label>

              <div className='relative'>
                <FiUser className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400' />

                <div className='flex h-11 items-center justify-between rounded-lg border border-gray-300 bg-white pl-10 pr-4 text-sm text-gray-400'>
                  <span>Confirm password</span>

                  <span>👁️</span>
                </div>
              </div>
            </div>

            <div>
              <label className='mb-2 block text-sm font-medium text-gray-700'>
                Password Rules
              </label>

              <div className='rounded-lg border border-gray-300 bg-white p-4'>
                <p className='mb-2 text-sm font-medium text-blue-600'>
                  Password must contain:
                </p>

                <ul className='space-y-1 text-xs text-gray-600'>
                  <li>✔ At least 8 characters</li>
                  <li>✔ One uppercase letter (A-Z)</li>
                  <li>✔ One lowercase letter (a-z)</li>
                  <li>✔ One number (0-9)</li>
                  <li>✔ One special character (!@#$%^&*)</li>
                </ul>
              </div>
            </div>

            <div className='space-y-5'>
              <div>
                <label className='mb-2 block text-sm font-medium text-gray-700'>
                  Two-Factor Authentication
                </label>

                <div className='rounded-lg border border-gray-300 bg-white p-4'>
                  <div className='flex items-center gap-3'>
                    <input
                      type='checkbox'
                      checked
                      readOnly
                      className='checkbox checkbox-success checkbox-sm'
                    />

                    <span className='text-sm'>Enable 2FA for this user</span>
                  </div>
                </div>
              </div>

              <div>
                <label className='mb-2 block text-sm font-medium text-gray-700'>
                  Login Access <span className='text-red-500'>*</span>
                </label>

                <select className='w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm outline-none'>
                  <option>Select Login Access</option>
                  <option>Full Access</option>
                  <option>Limited Access</option>
                  <option>Read Only</option>
                  <option>No Login Access</option>
                </select>
              </div>
            </div>
          </div>
        </section>

        {/* ================= Permissions ================= */}
        <section className='rounded-xl border border-gray-200 p-5'>
          <h2 className='mb-5 text-lg font-semibold text-green-700'>
            Permissions
          </h2>

          <div className='grid grid-cols-1 gap-5 md:grid-cols-2'>
            <div>
              <label className='mb-2 block text-sm font-medium text-gray-700'>
                Permission Level <span className='text-red-500'>*</span>
              </label>

              <select className='w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm outline-none'>
                <option>Select Permission Level</option>
                <option>Administrator</option>
                <option>Manager</option>
                <option>Supervisor</option>
                <option>Employee</option>
              </select>

              <p className='mt-2 text-xs text-gray-500'>
                Choose a role to load permission automatically
              </p>
            </div>

            <div>
              <label className='mb-2 block text-sm font-medium text-gray-700'>
                Additional Permissions
              </label>

              <div className='rounded-lg border border-gray-300 bg-white p-4'>
                <div className='flex items-center gap-3'>
                  <input
                    type='checkbox'
                    className='checkbox checkbox-sm'
                    readOnly
                  />

                  <span className='text-sm'>Custom Permissions</span>
                </div>

                <p className='mt-2 text-xs text-gray-500'>
                  You can customize permissions after user creation.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ================= Footer ================= */}
        <div className='flex justify-end gap-3 border-t border-gray-200 pt-5'>
          <button
            type='button'
            className='rounded-lg border border-gray-300 bg-white px-5 py-2 text-sm font-medium hover:bg-gray-50'
          >
            Cancel
          </button>

          <button
            type='submit'
            className='rounded-lg bg-green-700 px-5 py-2 text-sm font-medium text-white hover:bg-green-800'
          >
            Create User
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddUserForm;
