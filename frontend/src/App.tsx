import { useState } from 'react';
import { CandidateForm } from './components/CandidateForm';
import { JobList } from './components/JobList';
import type { Candidate } from './types';

function App() {
  const [candidate, setCandidate] = useState<Candidate | null>(null);

  const handleLogout = () => {
    setCandidate(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-zinc-50/50 selection:bg-indigo-100 selection:text-indigo-900">
      <header className="sticky top-0 z-50 w-full border-b border-zinc-200/80 bg-white/80 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center transition-all">
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-900 flex items-center gap-2">
            <span className="bg-clip-text text-transparent bg-linear-to-r from-indigo-600 to-violet-600">
              Nimble Gravity
            </span>
          </h1>
          {candidate && (
            <div className="flex items-center space-x-3 sm:space-x-5">
              <span className="hidden sm:inline-block text-sm text-zinc-500 font-medium">
                Postulando como <span className="font-semibold text-zinc-900">{candidate.email}</span>
              </span>
              <button
                onClick={handleLogout}
                className="cursor-pointer text-sm font-medium text-indigo-600 hover:text-indigo-700 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 rounded-md px-2 py-1"
              >
                Cambiar Email
              </button>
            </div>
          )}
        </div>
      </header>
      <main className="transition-opacity duration-500 grow">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:py-16 sm:px-6 lg:px-8">
          {!candidate ? (
            <div className="mt-4 sm:mt-10">
              <CandidateForm onSuccess={setCandidate} />
            </div>
          ) : (
            <JobList candidate={candidate} />
          )}
        </div>
      </main>
      <footer className="w-full border-t border-zinc-200/80 bg-white/50 py-6 text-center mt-auto">
        <p className="text-sm text-zinc-500 font-medium">Desarrollado por Ivo Piccinini</p>
      </footer>
    </div>
  );
}

export default App;
