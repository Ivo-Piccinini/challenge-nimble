import type { Candidate, Job, ApplicationPayload, ApiResponse } from '../types';

const BASE_URL = 'https://botfilter-h5ddh6dye8exb7ha.centralus-01.azurewebsites.net';

export const apiService = {
    getCandidateByEmail: async (email: string): Promise<ApiResponse<Candidate>> => {
        try {
            const response = await fetch(`${BASE_URL}/api/candidate/get-by-email?email=${encodeURIComponent(email)}`);

            if (!response.ok) {
                const errorData = await response.text();
                return { error: errorData || 'Error al obtener los datos del candidato' };
            }

            const data: Candidate = await response.json();
            return { data };
        } catch (error) {
            return { error: error instanceof Error ? error.message : 'Error de red desconocido' };
        }
    },
    getJobsList: async (): Promise<ApiResponse<Job[]>> => {
        try {
            const response = await fetch(`${BASE_URL}/api/jobs/get-list`);

            if (!response.ok) {
                const errorData = await response.text();
                return { error: errorData || 'Error al obtener las posiciones' };
            }

            const data: Job[] = await response.json();
            return { data };
        } catch (error) {
            return { error: error instanceof Error ? error.message : 'Error de red desconocido' };
        }
    },
    applyToJob: async (payload: ApplicationPayload): Promise<ApiResponse<{ ok: boolean }>> => {
        try {
            const response = await fetch(`${BASE_URL}/api/candidate/apply-to-job`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                const errorData = await response.text();
                return { error: errorData || 'Error al enviar la postulación' };
            }

            const data = await response.json();
            return { data };
        } catch (error) {
            return { error: error instanceof Error ? error.message : 'Error de red desconocido' };
        }
    },
};
