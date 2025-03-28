import axios from 'axios';
import { Model } from '../typings/model';

export type ModelsResponse = Model[];

export async function getModels(): Promise<ModelsResponse | undefined> {
    try {
        const response = await axios.get('http://localhost:3000/models', {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Error fetching models:', error.response?.data || error.message);
        } else {
            console.error('Error fetching models:', error);
        }
    }
}
