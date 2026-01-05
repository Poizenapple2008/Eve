
import React, { useState, useEffect } from 'react';
import { UserProfile, SymptomEntry } from './types';
import Navigation from './components/Navigation';
import Onboarding from './components/Onboarding';
import Dashboard from './components/Dashboard';
import EvaChat from './components/EvaChat';
import Library from './components/Library';
import Tracker from './components/Tracker';
import EmergencyGuide from './components/EmergencyGuide';

const App: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [activeTab, setActiveTab] = useState<'home' | 'chat' | 'tracker' | 'library'>('home');
  const [showEmergency, setShowEmergency] = useState(false);
  const [history, setHistory] = useState<SymptomEntry[]>([]);

  useEffect(() => {
    const savedProfile = localStorage.getItem('eva_profile');
    const savedHistory = localStorage.getItem('eva_history');
    if (savedProfile) setProfile(JSON.parse(savedProfile));
    if (savedHistory) setHistory(JSON.parse(savedHistory));
  }, []);

  const handleCompleteSetup = (newProfile: UserProfile) => {
    setProfile(newProfile);
    localStorage.setItem('eva_profile', JSON.stringify(newProfile));
  };

  const handleLogSymptom = (entry: SymptomEntry) => {
    const newHistory = [entry, ...history];
    setHistory(newHistory);
    localStorage.setItem('eva_history', JSON.stringify(newHistory));
  };

  if (!profile || !profile.isSetupComplete) {
    return <Onboarding onComplete={handleCompleteSetup} />;
  }

  const Header = () => (
    <div className="pt-8 pb-4 flex flex-col items-center justify-center bg-white border-b border-slate-50 sticky top-0 z-40">
      <div className="text-4xl filter drop-shadow-sm mb-1">🍎</div>
      <h1 className="text-xl font-black text-violet-600 tracking-widest uppercase italic" style={{ fontFamily: 'serif' }}>
        Ева
      </h1>
      <div className="h-0.5 w-8 bg-violet-100 rounded-full mt-1"></div>
    </div>
  );

  const renderContent = () => {
    if (showEmergency) return <EmergencyGuide onClose={() => setShowEmergency(false)} />;

    switch (activeTab) {
      case 'home':
        return <Dashboard 
          profile={profile} 
          onEmergencyClick={() => setShowEmergency(true)} 
          history={history}
        />;
      case 'chat':
        return <EvaChat profile={profile} />;
      case 'tracker':
        return <Tracker history={history} onLog={handleLogSymptom} />;
      case 'library':
        return <Library ageGroup={profile.ageGroup} />;
      default:
        return <Dashboard profile={profile} onEmergencyClick={() => setShowEmergency(true)} history={history} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F7FF] pb-24 text-slate-800">
      <main className="max-w-md mx-auto min-h-screen relative shadow-2xl bg-white overflow-hidden flex flex-col">
        {!showEmergency && <Header />}
        <div className="flex-1 overflow-y-auto">
          {renderContent()}
        </div>
        
        {!showEmergency && (
          <Navigation 
            activeTab={activeTab} 
            setActiveTab={setActiveTab} 
          />
        )}
      </main>
    </div>
  );
};

export default App;
