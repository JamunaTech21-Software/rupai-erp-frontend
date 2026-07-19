import React from "react";
import { useForm } from "react-hook-form";

const UserMngAddUser = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);

    reset();

    document.getElementById("my_modal_1").close();
  };
  return (
    <div>
      <button
        className='btn'
        onClick={() => document.getElementById("my_modal_1").showModal()}
      >
        Add User
      </button>

      <dialog id='my_modal_1' className='modal'>
        <div className='modal-box'>
          <h3 className='mb-5 text-xl font-bold'>Add New User</h3>

          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Name */}
            <div className='mb-4'>
              <label className='mb-1 block'>Full Name</label>

              <input
                type='text'
                placeholder='Enter full name'
                className='input input-bordered w-full'
                {...register("name", {
                  required: "Name is required",
                })}
              />

              {errors.name && (
                <p className='mt-1 text-sm text-red-500'>
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div className='mb-4'>
              <label className='mb-1 block'>Email</label>

              <input
                type='email'
                placeholder='Enter email'
                className='input input-bordered w-full'
                {...register("email", {
                  required: "Email is required",
                })}
              />

              {errors.email && (
                <p className='mt-1 text-sm text-red-500'>
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Role */}
            <div className='mb-4'>
              <label className='mb-1 block'>Role</label>

              <select
                className='select select-bordered w-full'
                {...register("role")}
              >
                <option>User</option>
                <option>Manager</option>
                <option>Admin</option>
              </select>
            </div>

            {/* Buttons */}
            <div className='modal-action'>
              <button
                type='button'
                className='btn'
                onClick={() => document.getElementById("my_modal_1").close()}
              >
                Cancel
              </button>

              <button type='submit' className='btn btn-success'>
                Save User
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default UserMngAddUser;
