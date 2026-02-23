import { useEffect, useState } from 'react';
import type { Job, Candidate } from '../types';
import { apiService } from '../services/api';
import { JobItem } from './JobItem';
import { Spinner } from './ui/Spinner';
import { Alert } from './ui/Alert';

interface JobListProps {
    candidate: Candidate;
}

export const JobList: React.FC<JobListProps> = ({ candidate }) => {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchJobs = async () => {
            setIsLoading(true);
            const result = await apiService.getJobsList();

            if (result.error || !result.data) {
                setError(result.error || 'Error al obtener la lista de posiciones');
            } else {
                setJobs(result.data);
            }
            setIsLoading(false);
        };

        fetchJobs();
    }, []);

    if (isLoading) {
        return (
            <div className="py-20 flex flex-col items-center justify-center space-y-4 text-gray-500">
                <Spinner size="lg" />
                <p>Cargando posiciones disponibles...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="py-10">
                <Alert type="error" title="Error" message={error} />
            </div>
        );
    }

    return (
        <div className="space-y-8 transition-all duration-700">
            <div className="border-b border-zinc-200 pb-6 mb-8 flex flex-col sm:flex-row sm:items-end justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-zinc-950 sm:text-3xl tracking-tight">
                        Posiciones Abiertas
                    </h2>
                    <p className="mt-2 max-w-2xl text-base text-zinc-500">
                        Selecciona la posición a la que deseas aplicar e ingresa la URL de tu repositorio con el código del challenge.
                    </p>
                </div>
            </div>

            {jobs.length === 0 ? (
                <Alert type="info" message="No hay posiciones abiertas en este momento." />
            ) : (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {jobs.map((job, index) => (
                        <div key={job.id} className="transition-all duration-500" style={{ animationDelay: `${index * 100}ms` }}>
                            <JobItem job={job} candidate={candidate} />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
