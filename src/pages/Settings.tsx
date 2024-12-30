import { useState } from 'react';
import { Bell, CircleDashed, Lock, Palette, User } from 'lucide-react';
import { SettingsSection } from '../components/SettingsSection';
import { Toggle } from '../components/Toggle';


interface SubmitClickProps{
  e: React.MouseEvent
}


export default function Settings() {

  // const submitClickHandler = ({e}:SubmitClickProps)=>{
  //   e.preventDefault()
  //   e.target?.firstElementChild?.classList.add("md:hidden")
  //   e.target?.firstElementChild?.nextElementSibling?.classList.remove("md:hidden")
  // }

  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      push: false,
      marketing: true,
    },
    privacy: {
      profileVisibility: 'public',
      activityStatus: true,
      showPurchases: false,
    },
    preferences: {
      language: 'en',
      theme: 'light',
      currency: 'USD',
    },
  });

  const handleSettingChange = (category: string, setting: string, value: any) => {
    setSettings((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [setting]: value,
      },
    }));
  };

  return (
    <div className="min-h-screen-minus-64 bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Account Settings</h1>

          <div className="space-y-6">
            <SettingsSection
              icon={<User className="h-6 w-6" />}
              title="User Preferences"
              description="Customize your account settings and preferences"
            >
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Language
                  </label>
                  <select
                    value={settings.preferences.language}
                    onChange={(e) => handleSettingChange('preferences', 'language', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="en">English</option>
                    <option value="es">Español</option>
                    <option value="fr">Français</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Currency
                  </label>
                  <select
                    value={settings.preferences.currency}
                    onChange={(e) => handleSettingChange('preferences', 'currency', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="USD">USD ($)</option>
                    <option value="EUR">EUR (€)</option>
                    <option value="GBP">GBP (£)</option>
                  </select>
                </div>
              </div>
            </SettingsSection>

            <SettingsSection
              icon={<Bell className="h-6 w-6" />}
              title="Notifications"
              description="Manage your notification preferences"
            >
              <div className="space-y-4">
                <Toggle
                  label="Email Notifications"
                  description="Receive important updates via email"
                  checked={settings.notifications.email}
                  onChange={(value) => handleSettingChange('notifications', 'email', value)}
                />
                <Toggle
                  label="Push Notifications"
                  description="Get instant notifications on your device"
                  checked={settings.notifications.push}
                  onChange={(value) => handleSettingChange('notifications', 'push', value)}
                />
                <Toggle
                  label="Marketing Communications"
                  description="Receive news about products and special offers"
                  checked={settings.notifications.marketing}
                  onChange={(value) => handleSettingChange('notifications', 'marketing', value)}
                />
              </div>
            </SettingsSection>

            <SettingsSection
              icon={<Lock className="h-6 w-6" />}
              title="Privacy"
              description="Control your privacy settings"
            >
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Profile Visibility
                  </label>
                  <select
                    value={settings.privacy.profileVisibility}
                    onChange={(e) => handleSettingChange('privacy', 'profileVisibility', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="public">Public</option>
                    <option value="private">Private</option>
                    <option value="friends">Friends Only</option>
                  </select>
                </div>
                <Toggle
                  label="Online Status"
                  description="Show when you're active"
                  checked={settings.privacy.activityStatus}
                  onChange={(value) => handleSettingChange('privacy', 'activityStatus', value)}
                />
                <Toggle
                  label="Purchase History"
                  description="Allow others to see your purchases"
                  checked={settings.privacy.showPurchases}
                  onChange={(value) => handleSettingChange('privacy', 'showPurchases', value)}
                />
              </div>
            </SettingsSection>

            <SettingsSection
              icon={<Palette className="h-6 w-6" />}
              title="Appearance"
              description="Customize the look and feel"
            >
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Theme
                  </label>
                  <select
                    value={settings.preferences.theme}
                    onChange={(e) => handleSettingChange('preferences', 'theme', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                    <option value="system">System</option>
                  </select>
                </div>
              </div>
            </SettingsSection>
          </div>

          <div className="mt-8 flex justify-end">
            <button
              type="button"
              className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              // onClick={(e)=>{
              //   submitClickHandler({e}) 
              // }}
            >
              <span>Save Changes</span>
              <CircleDashed className='md:hidden loader'/>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}