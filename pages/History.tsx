import React, { useState, useEffect } from 'react';
import { useHistory } from '../context/HistoryContext';
import { HistoryItem } from '../types';
import AnalysisResultDisplay from '../components/AnalysisResultDisplay';

const History: React.FC = () => {
  const { history, clearHistory } = useHistory();
  const [selectedItem, setSelectedItem] = useState<HistoryItem | null>(null);

  useEffect(() => {
    // If history is not empty and no item is selected, select the first one.
    if (history.length > 0 && !selectedItem) {
      setSelectedItem(history[0]);
    }
  }, [history, selectedItem]);

  // If the selected item is no longer in the history (e.g., after clearing), deselect it.
  useEffect(() => {
    if (selectedItem && !history.find(item => item.id === selectedItem.id)) {
      setSelectedItem(null);
    }
  }, [history, selectedItem]);

  const handleClearHistory = () => {
    // The window.confirm() call is blocked in the sandboxed environment.
    // It has been removed. Clicking the button now immediately clears the history.
    setSelectedItem(null); 
    clearHistory();
  };

  if (history.length === 0) {
    return (
      <div className="text-center py-10 bg-white dark:bg-slate-900 p-8 rounded-xl shadow-lg border-2 border-slate-200 dark:border-slate-800">
        <h2 className="text-2xl font-bold mb-2">Geçmiş Boş</h2>
        <p className="text-slate-500 dark:text-slate-400">Henüz hiçbir soru analizi yapmadınız.</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50">Analiz Geçmişi</h2>
        <button
          onClick={handleClearHistory}
          className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300 text-sm shadow-md hover:shadow-lg">
          Geçmişi Temizle
        </button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 bg-white dark:bg-slate-900 p-4 rounded-xl shadow-lg border-2 border-slate-200 dark:border-slate-800 h-full max-h-[80vh] overflow-y-auto">
          <ul className="space-y-2">
            {history.map(item => (
              <li key={item.id}>
                <button
                  onClick={() => setSelectedItem(item)}
                  className={`w-full text-left p-3 rounded-lg transition-colors duration-200 ${selectedItem?.id === item.id ? 'bg-brand-primary text-white shadow-md' : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700'}`}
                >
                  <p className="font-semibold truncate text-sm">{item.question}</p>
                  <p className={`text-xs ${selectedItem?.id === item.id ? 'opacity-80' : 'text-slate-500 dark:text-slate-400'}`}>{item.timestamp}</p>
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-2 bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-xl shadow-lg border-2 border-slate-200 dark:border-slate-800 max-h-[80vh] overflow-y-auto">
          {selectedItem ? (
            <div>
              <div className="mb-4">
                <h4 className="font-semibold text-slate-600 dark:text-slate-400 mb-2">Soru:</h4>
                <p className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg whitespace-pre-wrap font-mono text-sm">{selectedItem.question}</p>
              </div>
              <AnalysisResultDisplay result={selectedItem.analysis} />
            </div>
          ) : (
            <div className="flex items-center justify-center h-full">
              <p className="text-slate-500 dark:text-slate-400 text-lg">Detayları görmek için bir analiz seçin.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default History;