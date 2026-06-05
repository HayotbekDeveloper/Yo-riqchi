import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Landing } from './pages/Landing';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { Upload } from './pages/Upload';
import { Analysis } from './pages/Analysis';
import { Discovery } from './pages/Discovery';
import { Profile } from './pages/Profile';
import { Booking } from './pages/Booking';
import { Consultations } from './pages/Consultations';
import type { ConsultationItem } from './pages/Consultations';
import { Settings } from './pages/Settings';
import type { Lawyer, MockDocument } from './data/mockData';

type ViewType = 
  | 'landing' 
  | 'dashboard' 
  | 'upload' 
  | 'analysis' 
  | 'discovery' 
  | 'profile' 
  | 'booking' 
  | 'consultations' 
  | 'settings';

function App() {
  const [view, setView] = useState<ViewType>('landing');
  const [selectedLawyer, setSelectedLawyer] = useState<Lawyer | null>(null);
  const [activeAnalysisDoc, setActiveAnalysisDoc] = useState<MockDocument | null>(null);
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('');
  const [consultations, setConsultations] = useState<ConsultationItem[]>([]);

  const handleUploadSuccess = (doc: MockDocument) => {
    setActiveAnalysisDoc(doc);
    setView('analysis');
  };

  const handleBookingSuccess = (details: {
    lawyer: Lawyer;
    date: Date;
    time: string;
    type: 'online' | 'offline';
  }) => {
    const newConsultation: ConsultationItem = {
      id: `c-${Date.now()}`,
      lawyer: details.lawyer,
      date: details.date,
      time: details.time,
      type: details.type,
      status: 'active'
    };
    setConsultations([newConsultation, ...consultations]);
    setView('consultations');
  };

  const handleFindLawyer = () => {
    setSelectedCategoryFilter('');
    setView('discovery');
  };

  const pageTransition = {
    initial: { opacity: 0, y: 15 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -15 },
    transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] as const }
  };

  const renderViewContent = () => {
    switch (view) {
      case 'dashboard':
        return (
          <motion.div key="dashboard" {...pageTransition}>
            <Dashboard 
              setView={(v) => setView(v as ViewType)} 
              activeRequestsCount={activeAnalysisDoc ? 1 : 0}
              consultationsCount={consultations.length}
              aiAnalysesCount={activeAnalysisDoc ? 1 : 0}
            />
          </motion.div>
        );
      case 'upload':
        return (
          <motion.div key="upload" {...pageTransition}>
            <Upload onUploadSuccess={handleUploadSuccess} />
          </motion.div>
        );
      case 'analysis':
        return (
          <motion.div key="analysis" {...pageTransition}>
            <Analysis 
              documentData={activeAnalysisDoc} 
              onFindLawyer={() => {
                setSelectedCategoryFilter(activeAnalysisDoc?.analysis.category || '');
                setView('discovery');
              }}
              onResetUpload={() => setView('upload')}
            />
          </motion.div>
        );
      case 'discovery':
        return (
          <motion.div key="discovery" {...pageTransition}>
            <Discovery 
              onSelectLawyer={(lawyer) => {
                setSelectedLawyer(lawyer);
                setView('profile');
              }}
              onBookLawyer={(lawyer) => {
                setSelectedLawyer(lawyer);
                setView('booking');
              }}
              initialCategoryFilter={selectedCategoryFilter}
            />
          </motion.div>
        );
      case 'profile':
        return (
          <motion.div key="profile" {...pageTransition}>
            <Profile 
              lawyer={selectedLawyer} 
              onBack={() => setView('discovery')}
              onBook={() => setView('booking')}
            />
          </motion.div>
        );
      case 'booking':
        return (
          <motion.div key="booking" {...pageTransition}>
            <Booking 
              lawyer={selectedLawyer} 
              onBack={() => setView('profile')}
              onBookingSuccess={handleBookingSuccess}
            />
          </motion.div>
        );
      case 'consultations':
        return (
          <motion.div key="consultations" {...pageTransition}>
            <Consultations 
              consultations={consultations} 
              setView={(v) => setView(v as ViewType)} 
            />
          </motion.div>
        );
      case 'settings':
        return (
          <motion.div key="settings" {...pageTransition}>
            <Settings />
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="App selection:bg-brand-blue/30 selection:text-white">
      <AnimatePresence mode="wait">
        {view === 'landing' ? (
          <motion.div 
            key="landing-page"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Landing 
              onStartDemo={() => setView('dashboard')} 
              onFindLawyer={handleFindLawyer}
            />
          </motion.div>
        ) : (
          <Layout 
            currentView={view} 
            setView={(v) => setView(v as ViewType)}
            onLogout={() => setView('landing')}
          >
            <AnimatePresence mode="wait">
              {renderViewContent()}
            </AnimatePresence>
          </Layout>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
