import { ReactNode } from 'react';

interface SettingsSectionProps {
  icon: ReactNode;
  title: string;
  description: string;
  children: ReactNode;
}

export function SettingsSection({ icon, title, description, children }: SettingsSectionProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center mb-4">
        <div className="flex-shrink-0">
          <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center text-indigo-600">
            {icon}
          </div>
        </div>
        <div className="ml-4">
          <h3 className="text-lg font-medium text-gray-900">{title}</h3>
          <p className="text-sm text-gray-500">{description}</p>
        </div>
      </div>
      <div className="mt-6">{children}</div>
    </div>
  );
}