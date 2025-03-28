import axios from 'axios';
import { HistoryItem } from '../typings/history';

interface PostPromptParams {
    model: string;
    prompt: string;
    history: HistoryItem[];
    systemMessage: string;
}

export async function postPrompt({ model, prompt, history, systemMessage }: PostPromptParams): Promise<string| undefined> {
    try {
        const response = await axios.post('http://localhost:3000/prompt', {
            headers: {
                'Content-Type': 'application/json',
            },
            model,
            prompt,
            history,
            systemMessage,
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
