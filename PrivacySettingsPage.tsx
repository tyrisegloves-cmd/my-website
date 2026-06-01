import { useState } from 'react';
import { ArrowLeft, Shield, Eye, Cookie, Mail, Bell, Database, Trash2, Download, Lock } from 'lucide-react';
import { useStore } from '../store';

interface PrivacySettingsPageProps {
  onBack?: () => void;
}

interface Toggle {
  id: string;
  title: string;
  description: string;
  enabled: boolean;
  icon: any;
}

export function PrivacySettingsPage({ onBack }: PrivacySettingsPageProps) {
  const showToast = useStore((s) => s.showToast);

  const [dataSharing, setDataSharing] = useState<Toggle[]>([
    { id: 'analytics', title: 'Usage Analytics', description: 'Help improve Igris by sharing anonymous usage data', enabled: true, icon: Database },
    { id: 'personalization', title: 'Personalized Recommendations', description: 'Allow AI to tailor product suggestions based on browsing', enabled: true, icon: Eye },
    { id: 'marketing', title: 'Marketing Communications', description: 'Receive emails about new products and exclusive offers', enabled: false, icon: Mail },
    { id: 'notifications', title: 'Push Notifications', description: 'Get real-time alerts for orders and appointments', enabled: true, icon: Bell },
  ]);

  const [cookies, setCookies] = useState<Toggle[]>([
    { id: 'essential', title: 'Essential Cookies', description: 'Required for core platform functionality', enabled: true, icon: Lock },
    { id: 'performance', title: 'Performance Cookies', description: 'Help us understand how visitors interact with the site', enabled: true, icon: Cookie },
    { id: 'functional', title: 'Functional Cookies', description: 'Enable enhanced features like saved preferences', enabled: true, icon: Cookie },
    { id: 'targeting', title: 'Targeting Cookies', description: 'Used to deliver relevant ads and content', enabled: false, icon: Cookie },
  ]);

  const toggleItem = (list: Toggle[], setList: any, id: string) => {
    setList(list.map(item =>
      item.id === id ? { ...item, enabled: !item.enabled } : item
    ));
    const item = list.find(i => i.id === id);
    if (item) {
      showToast(`${item.title} ${item.enabled ? 'disabled' : 'enabled'}`, 'success');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#121212]">
      {/* Header with back button */}
      <div className="bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 dark:from-[#121212] dark:via-[#1E1E1E] dark:to-[#121212] text-white py-10 border-b border-blue-400/20 dark:border-[#2F2F2F]">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            {onBack && (
              <button
                onClick={onBack}
                className="flex items-center justify-center h-10 w-10 rounded-xl bg-white/15 dark:bg-[#2F2F2F] hover:bg-white/30 dark:hover:bg-[#3a3a3a] border border-white/25 dark:border-[#2F2F2F] text-white transition-all duration-300 hover:scale-105 active:scale-95 flex-shrink-0"
                title="Back to Profile"
              >
                <ArrowLeft size={20} />
              </button>
            )}
            <div className="flex items-center gap-4 flex-1">
              <Shield size={32} className="text-white/80 dark:text-[#00FF85] flex-shrink-0" />
              <div>
                <h1 className="text-3xl font-bold text-white" style={{ fontFamily: 'Space Grotesk' }}>
                  Privacy Settings
                </h1>
                <p className="text-white/80 dark:text-white/70 text-sm mt-1">
                  Control how your data is used and shared
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Data Sharing Section */}
        <section className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Database size={20} className="text-blue-600 dark:text-[#00FF85]" />
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white" style={{ fontFamily: 'Space Grotesk' }}>
              Data Sharing
            </h2>
          </div>
          <div className="bg-white dark:bg-[#1E1E1E] rounded-xl border border-blue-100 dark:border-[#2F2F2F] overflow-hidden">
            {dataSharing.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={item.id} className={`flex items-center justify-between p-4 ${idx !== 0 ? 'border-t border-gray-200 dark:border-[#2F2F2F]' : ''}`}>
                  <div className="flex items-center gap-3 flex-1">
                    <div className="h-10 w-10 rounded-lg bg-blue-100 dark:bg-[#00FF85]/10 flex items-center justify-center flex-shrink-0">
                      <Icon size={18} className="text-blue-600 dark:text-[#00FF85]" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">{item.title}</p>
                      <p className="text-sm text-gray-500 dark:text-white/60">{item.description}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => toggleItem(dataSharing, setDataSharing, item.id)}
                    className={`relative w-12 h-6 rounded-full transition-colors ${item.enabled ? 'bg-[#00FF85]' : 'bg-gray-300 dark:bg-[#2F2F2F]'}`}
                    aria-label={`Toggle ${item.title}`}
                  >
                    <span className={`absolute top-0.5 left-0.5 h-5 w-5 bg-white rounded-full shadow transition-transform ${item.enabled ? 'translate-x-6' : ''}`} />
                  </button>
                </div>
              );
            })}
          </div>
        </section>

        {/* Cookies Section */}
        <section className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Cookie size={20} className="text-blue-600 dark:text-[#00FF85]" />
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white" style={{ fontFamily: 'Space Grotesk' }}>
              Cookie Preferences
            </h2>
          </div>
          <div className="bg-white dark:bg-[#1E1E1E] rounded-xl border border-blue-100 dark:border-[#2F2F2F] overflow-hidden">
            {cookies.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={item.id} className={`flex items-center justify-between p-4 ${idx !== 0 ? 'border-t border-gray-200 dark:border-[#2F2F2F]' : ''}`}>
                  <div className="flex items-center gap-3 flex-1">
                    <div className="h-10 w-10 rounded-lg bg-blue-100 dark:bg-[#00FF85]/10 flex items-center justify-center flex-shrink-0">
                      <Icon size={18} className="text-blue-600 dark:text-[#00FF85]" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">{item.title}</p>
                      <p className="text-sm text-gray-500 dark:text-white/60">{item.description}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => toggleItem(cookies, setCookies, item.id)}
                    disabled={item.id === 'essential'}
                    className={`relative w-12 h-6 rounded-full transition-colors ${item.id === 'essential' ? 'bg-gray-200 dark:bg-[#2F2F2F] cursor-not-allowed opacity-50' : item.enabled ? 'bg-[#00FF85]' : 'bg-gray-300 dark:bg-[#2F2F2F]'}`}
                    aria-label={`Toggle ${item.title}`}
                  >
                    <span className={`absolute top-0.5 left-0.5 h-5 w-5 bg-white rounded-full shadow transition-transform ${item.enabled || item.id === 'essential' ? 'translate-x-6' : ''}`} />
                  </button>
                </div>
              );
            })}
          </div>
        </section>

        {/* Data Management Section */}
        <section className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Database size={20} className="text-blue-600 dark:text-[#00FF85]" />
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white" style={{ fontFamily: 'Space Grotesk' }}>
              Your Data
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button
              onClick={() => showToast('Preparing your data download...', 'info')}
              className="flex items-center gap-3 p-4 bg-white dark:bg-[#1E1E1E] border border-blue-100 dark:border-[#2F2F2F] rounded-xl hover:bg-blue-50 dark:hover:bg-[#2F2F2F] transition-colors text-left"
            >
              <Download size={20} className="text-blue-600 dark:text-[#00FF85]" />
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Download Data</p>
                <p className="text-xs text-gray-500 dark:text-white/60">Export all your data</p>
              </div>
            </button>
            <button
              onClick={() => showToast('Account deletion request submitted', 'info')}
              className="flex items-center gap-3 p-4 bg-white dark:bg-[#1E1E1E] border border-red-200 dark:border-red-900/30 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors text-left"
            >
              <Trash2 size={20} className="text-red-500" />
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Delete Account</p>
                <p className="text-xs text-gray-500 dark:text-white/60">Permanently remove data</p>
              </div>
            </button>
          </div>
        </section>

        {/* Save Changes */}
        <div className="flex gap-3 pt-4 border-t border-gray-200 dark:border-[#2F2F2F]">
          <button
            onClick={onBack}
            className="flex-1 px-4 py-3 border border-gray-300 dark:border-[#2F2F2F] text-gray-700 dark:text-white rounded-xl hover:bg-gray-50 dark:hover:bg-[#2F2F2F] transition-colors font-medium"
          >
            Cancel
          </button>
          <button
            onClick={() => { showToast('Privacy settings saved successfully', 'success'); onBack?.(); }}
            className="flex-1 px-4 py-3 bg-blue-600 dark:bg-[#00FF85] text-white dark:text-[#0b1e17] rounded-xl hover:bg-blue-700 dark:hover:bg-[#22ff97] transition-colors font-semibold"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
