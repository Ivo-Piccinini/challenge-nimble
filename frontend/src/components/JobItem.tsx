import { useState } from 'react';
import type { Job, Candidate } from '../types';
import { apiService } from '../services/api';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { Alert } from './ui/Alert';



interface JobItemProps {
    job: Job;
    candidate: Candidate;
}

export const JobItem: React.FC<JobItemProps> = ({ job, candidate }) => {
    const [repoUrl, setRepoUrl] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    const handleApply = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!repoUrl) {
            setErrorMessage('La URL del repositorio es obligatoria');
            setStatus('error');
            return;
        }
        try {
            new URL(repoUrl);
        } catch {
            setErrorMessage('Por favor, ingresa una URL válida');
            setStatus('error');
            return;
        }

        setStatus('loading');
        setErrorMessage('');

        const payload = {
            uuid: candidate.uuid,
            candidateId: candidate.candidateId,
            applicationId: candidate.applicationId,
            jobId: job.id,
            repoUrl
        };

        const result = await apiService.applyToJob(payload);

        if (result.error || (result.data && !result.data.ok)) {
            setErrorMessage(result.error || 'Ocurrió un error al enviar la postulación');
            setStatus('error');
        } else {
            setStatus('success');
        }
    };

    return (
        <div className="bg-white p-6 sm:p-7 rounded-2xl shadow-sm border border-zinc-200/60 flex flex-col h-full hover:shadow-xl hover:-translate-y-1 hover:border-indigo-100 transition-all duration-300 group">
            <div className="mb-5 grow">
                <div className="flex justify-between items-start mb-3 gap-2">
                    <h3 className="text-xl font-bold text-zinc-900 leading-tight group-hover:text-indigo-700 transition-colors">{job.title}</h3>
                    <span className="shrink-0 inline-flex items-center rounded-full bg-zinc-100 px-2.5 py-0.5 text-xs font-semibold text-zinc-600 ring-1 ring-inset ring-zinc-500/10">
                        ID: {job.id}
                    </span>
                </div>
            </div>

            {status === 'success' ? (
                <div className="transition-all duration-300 transform scale-100">
                    <Alert
                        type="success"
                        title="¡Postulación Exitosa!"
                        message="Tu postulación ha sido enviada correctamente."
                    />
                </div>
            ) : (
                <form onSubmit={handleApply} className="space-y-4">
                    <Input
                        placeholder="https://github.com/tu-usuario/tu-repo"
                        value={repoUrl}
                        onChange={(e) => setRepoUrl(e.target.value)}
                        disabled={status === 'loading'}
                        aria-label="URL del repositorio de GitHub"
                        className="transition-all"
                    />

                    {status === 'error' && errorMessage && (
                        <Alert type="error" message={errorMessage} />
                    )}

                    <div className="pt-1">
                        <Button
                            type="submit"
                            className="w-full font-semibold py-2.5 shadow-sm"
                            isLoading={status === 'loading'}
                        >
                            Enviar Postulación
                        </Button>
                    </div>
                </form>
            )}
        </div>
    );
};
