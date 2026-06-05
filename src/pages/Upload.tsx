import React, { useState, useEffect } from 'react';
import { 
  UploadCloud, 
  FileText, 
  AlertCircle, 
  Sparkles, 
  ArrowRight
} from 'lucide-react';
import { GlassCard } from '../components/GlassCard';
import { MOCK_DOCUMENTS } from '../data/mockData';
import type { MockDocument } from '../data/mockData';

interface UploadProps {
  onUploadSuccess: (doc: MockDocument) => void;
}

export const Upload: React.FC<UploadProps> = ({ onUploadSuccess }) => {
  const [isDragActive, setIsDragActive] = useState(false);
  const [uploadingFile, setUploadingFile] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [selectedDoc, setSelectedDoc] = useState<MockDocument | null>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragActive(true);
    } else if (e.type === "dragleave") {
      setIsDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      // Simulate uploading the first file
      startUploadSimulation(e.dataTransfer.files[0].name, MOCK_DOCUMENTS[0]);
    }
  };

  const startUploadSimulation = (fileName: string, documentData: MockDocument) => {
    setUploadingFile(fileName);
    setSelectedDoc(documentData);
    setUploadProgress(0);
  };

  // Simulate progress counting up
  useEffect(() => {
    if (uploadingFile && uploadProgress < 100) {
      const interval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 95) {
            clearInterval(interval);
            return 100;
          }
          return prev + Math.floor(Math.random() * 20) + 5;
        });
      }, 150);
      return () => clearInterval(interval);
    }
  }, [uploadingFile, uploadProgress]);

  // Once upload hits 100%, trigger success callback
  useEffect(() => {
    if (uploadProgress === 100 && selectedDoc) {
      const timeout = setTimeout(() => {
        onUploadSuccess(selectedDoc);
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [uploadProgress, selectedDoc, onUploadSuccess]);

  const handleSelectPreset = (doc: MockDocument) => {
    startUploadSimulation(doc.name, doc);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-10">
      
      {/* Page Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-blue/10 border border-brand-blue/20 text-brand-blue">
          <Sparkles size={14} className="animate-spin-slow" />
          <span className="text-xs font-semibold tracking-wide uppercase">AI Tizim orqali skanerlash</span>
        </div>
        <h3 className="text-3xl font-extrabold text-white">Yuridik Hujjatingizni Yuklang</h3>
        <p className="text-sm text-slate-400 max-w-xl mx-auto font-light leading-relaxed">
          Sotish shartnomalari, nikoh nizolari, mehnat shartnomalari kabi hujjatlarni yuklang. AI tizimimiz ularni tahlil qilib, qonunbuzarliklarni yoki muhim faktlarni aniqlaydi.
        </p>
      </div>

      {/* Main Upload Zone */}
      <div className="relative">
        <div
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-3xl p-10 md:p-14 text-center transition-all relative ${
            isDragActive 
              ? 'border-brand-blue bg-brand-blue/5 scale-[1.01]' 
              : 'border-white/10 bg-white/[0.02] hover:border-white/20'
          }`}
        >
          {uploadingFile ? (
            /* Upload Progress Animation Screen */
            <div className="space-y-6 max-w-md mx-auto py-8">
              <div className="w-16 h-16 rounded-2xl bg-brand-blue/15 text-brand-blue flex items-center justify-center mx-auto relative overflow-hidden">
                <FileText size={32} className="animate-pulse" />
                <div className="absolute inset-0 bg-brand-blue/10 animate-pulse-slow" />
              </div>
              
              <div className="space-y-2">
                <h5 className="font-semibold text-white truncate">{uploadingFile}</h5>
                <p className="text-xs text-slate-400">Tizimga yuklanmoqda...</p>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-white/5 rounded-full h-2.5 overflow-hidden">
                <div 
                  className="bg-brand-blue h-full rounded-full transition-all duration-150" 
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
              
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>{uploadProgress}%</span>
                <span>{uploadProgress === 100 ? 'Muvaffaqiyatli yuklandi!' : 'Hujjat tahlilga tayyorlanmoqda...'}</span>
              </div>
            </div>
          ) : (
            /* Normal Upload Prompt */
            <div className="space-y-6">
              <div className="w-20 h-20 rounded-3xl bg-white/5 text-slate-400 flex items-center justify-center mx-auto transition-transform hover:scale-105">
                <UploadCloud size={38} className="text-slate-300" />
              </div>
              
              <div className="space-y-1.5">
                <h4 className="text-lg font-bold text-white">Faylni sudrab bu yerga tashlang yoki tanlang</h4>
                <p className="text-xs text-slate-400">Tafsiya etilgan formatlar: PDF, DOCX, PNG, JPG (Maksimal hajmi: 15 MB)</p>
              </div>

              <input 
                type="file" 
                id="file-upload" 
                className="hidden" 
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    startUploadSimulation(e.target.files[0].name, MOCK_DOCUMENTS[0]);
                  }
                }}
              />
              <label 
                htmlFor="file-upload" 
                className="inline-flex items-center justify-center font-semibold rounded-xl bg-brand-blue hover:bg-blue-600 text-white shadow-lg px-6 py-3 cursor-pointer transition-all hover:scale-102 active:scale-98 text-sm"
              >
                Fayl tanlash
              </label>
            </div>
          )}
        </div>
      </div>

      {/* Preset Mock Documents Section for Demo */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-base font-bold text-slate-300">Tezkor Demo Yuklashlar</h4>
          <span className="text-xs text-slate-500">Tizimni sinash uchun tayyor shablonlarni tanlang:</span>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {MOCK_DOCUMENTS.map((doc) => (
            <GlassCard 
              key={doc.id}
              onClick={() => handleSelectPreset(doc)}
              className="p-5 flex flex-col justify-between border-white/5 bg-white/[0.01] hover:border-brand-blue/30 text-left transition-all"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="p-2 rounded-lg bg-white/5 text-brand-blue">
                    <FileText size={18} />
                  </div>
                  <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded text-slate-300 font-medium uppercase">{doc.type}</span>
                </div>
                <div>
                  <h5 className="font-bold text-sm text-white line-clamp-1">{doc.name}</h5>
                  <p className="text-[11px] text-slate-400 mt-1.5 line-clamp-2 leading-relaxed">{doc.description}</p>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-white/5 flex items-center justify-between text-xs text-slate-400">
                <span>{doc.size}</span>
                <span className="text-brand-blue font-semibold inline-flex items-center gap-1 group-hover:underline">
                  Tahlil qilish <ArrowRight size={12} />
                </span>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>

      {/* Trust Badge Info */}
      <div className="flex items-center justify-center gap-2 text-xs text-slate-500">
        <AlertCircle size={14} className="text-slate-600" />
        <span>Hujjatlar shifrlangan holda uzatiladi va shaxsingiz oshkor etilmaydi.</span>
      </div>

    </div>
  );
};
