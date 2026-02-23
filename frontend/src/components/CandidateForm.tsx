import { useState } from 'react';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { Alert } from './ui/Alert';
import { apiService } from '../services/api';
import type { Candidate } from '../types';

interface CandidateFormProps {
    onSuccess: (candidate: Candidate) => void;
}

export const CandidateForm: React.FC<CandidateFormProps> = ({ onSuccess }) => {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) {
            setError('Por favor, ingresa tu email');
            return;
        }

        setIsLoading(true);
        setError(null);

        const result = await apiService.getCandidateByEmail(email);

        if (result.error || !result.data) {
            setError(result.error || 'No se pudo obtener la información del candidato');
        } else {
            onSuccess(result.data);
        }

        setIsLoading(false);
    };

    return (
        <div className="bg-white p-8 sm:p-10 rounded-2xl shadow-xl shadow-zinc-200/40 border border-zinc-100 max-w-md mx-auto w-full transition-all">
            <div className="text-center mb-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-zinc-950 mb-3 tracking-tight">Bienvenido</h2>
                <p className="text-zinc-500 text-sm sm:text-base leading-relaxed">
                    Ingresa tu email para continuar con el challenge de Nimble Gravity
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
                <Input
                    type="email"
                    label="Email Registrado"
                    placeholder="tu.email@ejemplo.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                {error && <Alert type="error" message={error} />}
                <div className="pt-2">
                    <Button
                        type="submit"
                        className="w-full text-base py-2.5 font-semibold"
                        isLoading={isLoading}
                    >
                        Continuar
                    </Button>
                </div>
            </form>
        </div>
    );
};
