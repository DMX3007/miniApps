import axios from 'axios'

const API_URL = 'http://localhost:3000';

export const requestContact = async (chatId: string, messageText:string, buttonText:string) => {
    try {
        const response = await axios.post(`${API_URL}/request-contact`, {
            chatId,
            messageText,
            buttonText
        });
        return response.data;
    } catch (error) {
        console.error('Error requesting contact:', error);
        throw error;
    }
};



