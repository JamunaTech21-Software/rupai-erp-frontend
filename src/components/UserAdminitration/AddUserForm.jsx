import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import toast from "react-hot-toast";
import {
  FiMail,
  FiPhone,
  FiUploadCloud,
  FiUser,
  FiBriefcase,
  FiShield,
  FiLock,
} from "react-icons/fi";
import { MdOutlineAlternateEmail } from "react-icons/md";

const AddUserForm = () => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const password = useWatch({
    control,
    name: "password",
  });
  const [showPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleFormSubmit = async () => {
    try {

      await new Promise((resolve) => setTimeout(resolve, 3000));

      toast.success("User created successfully");

      reset();
    } catch (error) {
      toast.error("Something went wrong");

      console.error(error);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit(handleFormSubmit)} className='space-y-6'>
        {/* ================= Personal Information ================= */}
        <section className='rounded-xl border border-gray-200 p-5'>
          <h2 className='mb-5 flex items-center gap-2 text-lg font-semibold text-green-700'>
            <FiUser className='text-xl' />
            Personal Information
          </h2>

          <div className='grid grid-cols-1 gap-5 md:grid-cols-2'>
            <div>
              <label className='mb-2 block text-sm font-medium text-gray-700'>
                Full Name <span className='text-red-500'>*</span>
              </label>

              <div className='relative'>
                <FiUser className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400' />

                <input
                  type='text'
                  placeholder='Enter full name'
                  {...register("fullName", {
                    required: "Full Name is required",
                    minLength: {
                      value: 3,
                      message: "Full Name must be at least 3 characters",
                    },
                  })}
                  className='h-11 w-full rounded-lg border border-gray-300 bg-white pl-10 pr-4 text-sm outline-none focus:border-green-600'
                />
                {errors.fullName && (
                  <p className='mt-1 text-sm text-red-500'>
                    {errors.fullName.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label className='mb-2 block text-sm font-medium text-gray-700'>
                Username <span className='text-red-500'>*</span>
              </label>

              <div className='relative'>
                <MdOutlineAlternateEmail className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400' />

                <input
                  type='text'
                  placeholder='Enter username'
                  {...register("username", {
                    required: "Username is required",
                    minLength: {
                      value: 4,
                      message: "Username must be at least 4 characters",
                    },
                    pattern: {
                      value: /^[a-zA-Z0-9_]+$/,
                      message:
                        "Only letters, numbers and underscore are allowed",
                    },
                  })}
                  className='h-11 w-full rounded-lg border border-gray-300 bg-white pl-10 pr-4 text-sm outline-none focus:border-green-600'
                />
              </div>

              {errors.username && (
                <p className='mt-1 text-sm text-red-500'>
                  {errors.username.message}
                </p>
              )}
            </div>

            <div>
              <label className='mb-2 block text-sm font-medium text-gray-700'>
                Email Address <span className='text-red-500'>*</span>
              </label>

              <div className='relative'>
                <FiMail className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400' />

                <input
                  type='email'
                  placeholder='Enter email address'
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^\S+@\S+\.\S+$/,
                      message: "Please enter a valid email address",
                    },
                  })}
                  className='h-11 w-full rounded-lg border border-gray-300 bg-white pl-10 pr-4 text-sm outline-none focus:border-green-600'
                />
              </div>

              {errors.email && (
                <p className='mt-1 text-sm text-red-500'>
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label className='mb-2 block text-sm font-medium text-gray-700'>
                Profile Photo
              </label>

              <label className='flex h-20 w-full cursor-pointer items-center justify-center gap-2 rounded-lg border-2 border-dashed border-gray-300 bg-white transition hover:border-green-600 hover:bg-green-50'>
                <FiUploadCloud className='text-3xl text-gray-400' />

                <div>
                  <p className='text-sm font-medium text-gray-700'>
                    Click to upload or drag and drop
                  </p>

                  <p className='mt-1 text-xs text-gray-500'>
                    JPG, PNG (Max. 2MB)
                  </p>
                </div>

                <input
                  type='file'
                  accept='image/*'
                  {...register("profilePhoto", {
                    required: "Profile photo is required",
                  })}
                  className='hidden'
                />
              </label>

              {errors.profilePhoto && (
                <p className='mt-1 text-sm text-red-500'>
                  {errors.profilePhoto.message}
                </p>
              )}
            </div>

            <div>
              <label className='mb-2 block text-sm font-medium text-gray-700'>
                Phone Number
              </label>

              <div className='relative'>
                <FiPhone className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400' />

                <input
                  type='tel'
                  placeholder='Enter phone number'
                  {...register("phone", {
                    required: "Phone number is required",
                    pattern: {
                      value: /^(?:\+8801|01)[3-9]\d{8}$/,
                      message: "Enter a valid Bangladeshi phone number",
                    },
                  })}
                  className='h-11 w-full rounded-lg border border-gray-300 bg-white pl-10 pr-4 text-sm outline-none focus:border-green-600'
                />
              </div>

              {errors.phone && (
                <p className='mt-1 text-sm text-red-500'>
                  {errors.phone.message}
                </p>
              )}
            </div>

            <div>
              <label className='mb-2 block text-sm font-medium text-gray-700'>
                Status <span className='text-red-500'>*</span>
              </label>

              <select
                {...register("status", {
                  required: "Please select a status",
                })}
                className='w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-green-600 cursor-pointer'
              >
                <option value=''>Select Status</option>
                <option value='Active'>Active</option>
                <option value='Inactive'>Inactive</option>
                <option value='Suspended'>Suspended</option>
              </select>

              {errors.status && (
                <p className='mt-1 text-sm text-red-500'>
                  {errors.status.message}
                </p>
              )}
            </div>
          </div>
        </section>

        {/* ================= Job Information ================= */}
        <section className='rounded-xl border border-gray-200 p-5'>
          <h2 className='mb-5 flex items-center gap-2 text-lg font-semibold text-green-700'>
            <FiBriefcase className='text-xl' />
            Job Information
          </h2>

          <div className='grid grid-cols-1 gap-5 md:grid-cols-2'>
            <div>
              <label className='mb-2 block text-sm font-medium text-gray-700'>
                Role <span className='text-red-500'>*</span>
              </label>

              <select
                {...register("role", {
                  required: "Please select a role",
                })}
                className='w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-green-600 cursor-pointer'
              >
                <option value=''>Select Role</option>
                <option value='Estate Manager'>Estate Manager</option>
                <option value='HR Manager'>HR Manager</option>
                <option value='Field Supervisor'>Field Supervisor</option>
                <option value='Factory Manager'>Factory Manager</option>
                <option value='Accounts Officer'>Accounts Officer</option>
                <option value='Security Officer'>Security Officer</option>
                <option value='System Administrator'>
                  System Administrator
                </option>
              </select>

              {errors.role && (
                <p className='mt-1 text-sm text-red-500'>
                  {errors.role.message}
                </p>
              )}
            </div>

            <div>
              <label className='mb-2 block text-sm font-medium text-gray-700'>
                Department <span className='text-red-500'>*</span>
              </label>

              <select
                {...register("department", {
                  required: "Please select a department",
                })}
                className='w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-green-600 cursor-pointer'
              >
                <option value=''>Select Department</option>
                <option value='Administration'>Administration</option>
                <option value='Human Resources'>Human Resources</option>
                <option value='Field Operations'>Field Operations</option>
                <option value='Factory'>Factory</option>
                <option value='Accounts & Finance'>Accounts & Finance</option>
                <option value='Security'>Security</option>
                <option value='IT Support'>IT Support</option>
              </select>

              {errors.department && (
                <p className='mt-1 text-sm text-red-500'>
                  {errors.department.message}
                </p>
              )}
            </div>

            <div>
              <label className='mb-2 block text-sm font-medium text-gray-700'>
                Designation
              </label>

              <div className='relative'>
                <FiUser className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400' />

                <input
                  type='text'
                  placeholder='Enter designation'
                  {...register("designation", {
                    required: "Designation is required",
                  })}
                  className='h-11 w-full rounded-lg border border-gray-300 bg-white pl-10 pr-4 text-sm outline-none focus:border-green-600'
                />
              </div>

              {errors.designation && (
                <p className='mt-1 text-sm text-red-500'>
                  {errors.designation.message}
                </p>
              )}
            </div>

            <div>
              <label className='mb-2 block text-sm font-medium text-gray-700'>
                Employee ID
              </label>

              <div className='relative'>
                <FiUser className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400' />

                <input
                  type='text'
                  placeholder='Enter employee ID'
                  {...register("employeeId")}
                  className='h-11 w-full rounded-lg border border-gray-300 bg-white pl-10 pr-4 text-sm outline-none focus:border-green-600'
                />
              </div>
            </div>
          </div>
        </section>

        {/* ================= Security ================= */}
        <section className='rounded-xl border border-gray-200 p-5'>
          <h2 className='mb-5 flex items-center gap-2 text-lg font-semibold text-green-700'>
            <FiShield className='text-xl' />
            Security
          </h2>

          <div className='grid grid-cols-1 gap-5 md:grid-cols-2'>
            <div>
              <label className='mb-2 block text-sm font-medium text-gray-700'>
                Password <span className='text-red-500'>*</span>
              </label>

              <div className='relative'>
                <FiUser className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400' />

                <input
                  type={showPassword ? "text" : "password"}
                  placeholder='Enter password'
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters",
                    },
                    pattern: {
                      value:
                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).+$/,
                      message:
                        "Password must contain uppercase, lowercase, number and special character",
                    },
                  })}
                  className='h-11 w-full rounded-lg border border-gray-300 bg-white pl-10 pr-12 text-sm outline-none focus:border-green-600'
                />

                <button
                  type='button'
                  className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-400'
                >
                  👁️
                </button>
              </div>

              {errors.password && (
                <p className='mt-1 text-sm text-red-500'>
                  {errors.password.message}
                </p>
              )}
            </div>

            <div>
              <label className='mb-2 block text-sm font-medium text-gray-700'>
                Confirm Password <span className='text-red-500'>*</span>
              </label>

              <div className='relative'>
                <FiUser className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400' />

                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder='Confirm password'
                  {...register("confirmPassword", {
                    required: "Confirm Password is required",

                    validate: (value) => {
                      return value === password || "Passwords do not match";
                    },
                  })}
                  className='h-11 w-full rounded-lg border border-gray-300 bg-white pl-10 pr-12 text-sm outline-none focus:border-green-600'
                />

                <button
                  type='button'
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-400'
                >
                  {showConfirmPassword ? "🙈" : "👁️"}
                </button>
              </div>

              {errors.confirmPassword && (
                <p className='mt-1 text-sm text-red-500'>
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            <div>
              <label className='mb-2 block text-sm font-medium text-gray-700'>
                Password Rules
              </label>

              <div className='rounded-lg border border-gray-300 bg-white p-4'>
                <p className='mb-2 text-sm font-medium text-blue-600 cursor-pointer'>
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
                  <div className='flex items-center gap-3 '>
                    <input
                      type='checkbox'
                      {...register("twoFactor")}
                      className='checkbox checkbox-success checkbox-sm cursor-pointer'
                    />

                    <span className='text-sm '>Enable 2FA for this user</span>
                  </div>
                </div>
              </div>

              <div>
                <label className='mb-2 block text-sm font-medium text-gray-700'>
                  Login Access <span className='text-red-500'>*</span>
                </label>

                <select
                  {...register("loginAccess", {
                    required: "Please select login access",
                  })}
                  className='w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-green-600 cursor-pointer'
                >
                  <option value=''>Select Login Access</option>
                  <option value='Full Access'>Full Access</option>
                  <option value='Limited Access'>Limited Access</option>
                  <option value='Read Only'>Read Only</option>
                  <option value='No Login Access'>No Login Access</option>
                </select>

                {errors.loginAccess && (
                  <p className='mt-1 text-sm text-red-500'>
                    {errors.loginAccess.message}
                  </p>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ================= Permissions ================= */}
        <section className='rounded-xl border border-gray-200 p-5'>
          <h2 className='mb-5 flex items-center gap-2 text-lg font-semibold text-green-700'>
            <FiLock className='text-xl' />
            Permissions
          </h2>

          <div className='grid grid-cols-1 gap-5 md:grid-cols-2'>
            <div>
              <label className='mb-2 block text-sm font-medium text-gray-700'>
                Permission Level <span className='text-red-500'>*</span>
              </label>

              <select
                {...register("permissionLevel", {
                  required: "Please select permission level",
                })}
                className='w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-green-600 cursor-pointer'
              >
                <option value=''>Select Permission Level</option>
                <option value='Administrator'>Administrator</option>
                <option value='Manager'>Manager</option>
                <option value='Supervisor'>Supervisor</option>
                <option value='Employee'>Employee</option>
              </select>

              <p className='mt-2 text-xs text-gray-500'>
                Choose a role to load permission automatically.
              </p>

              {errors.permissionLevel && (
                <p className='mt-1 text-sm text-red-500'>
                  {errors.permissionLevel.message}
                </p>
              )}
            </div>

            <div>
              <label className='mb-2 block text-sm font-medium text-gray-700'>
                Additional Permissions
              </label>

              <div className='rounded-lg border border-gray-300 bg-white p-4'>
                <div className='flex items-center gap-3'>
                  <input
                    type='checkbox'
                    {...register("customPermission")}
                    className='checkbox checkbox-sm'
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
            className='rounded-lg border border-gray-300 bg-white px-5 py-2 text-sm font-medium hover:bg-gray-50 cursor-pointer'
          >
            Cancel
          </button>

          <button
            type='submit'
            disabled={isSubmitting}
            className='rounded-lg bg-green-700 px-5 py-2 text-sm font-medium text-white hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer'
          >
            {isSubmitting ? "Creating..." : "Create User"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddUserForm;
