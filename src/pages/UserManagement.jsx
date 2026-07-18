import {
  Users,
  UserCheck,
  ShieldCheck,
  Shield,
  Lock,
  Clock3,
} from "lucide-react";

import { userManagementData } from "../data/userManagementData";

const iconMap = {
  Users,
  UserCheck,
  ShieldCheck,
  Shield,
  Lock,
  Clock3,
};

const UserManagement = () => {
  return (
    <section className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-6'>
      {userManagementData.summaryCards.map((card) => {
        const Icon = iconMap[card.icon];

        return (
          <div
            key={card.id}
            className='cursor-pointer rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:shadow-lg'
          >
            <div className='flex items-center gap-3'>
              <div
                className={`flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full ${card.bgColor}`}
              >
                <Icon className={`h-5 w-5 ${card.iconColor}`} />
              </div>

              <div className='min-w-0 flex-1'>
                <p className='truncate text-[11px] font-medium uppercase tracking-wide text-slate-500'>
                  {card.title}
                </p>

                <h2 className='mt-1 text-2xl font-bold leading-none text-slate-900 md:text-3xl'>
                  {card.value}
                </h2>

                <p className='mt-1 text-[10px] leading-4 text-slate-500 md:text-xs'>
                  {card.description}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
};

export default UserManagement;
