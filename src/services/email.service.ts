import axios from 'axios';

const EMAIL_URL = 'https://notifcationservice.onrender.com';


export const emailService = {
    sendEmail: async (to: string, subject: string, text: string) => {
        try {
            const response = await axios.get(`${EMAIL_URL}/send-email`, {
                params: { to, subject, text }
            });
            return response.data;
        } catch (error) {
            console.error('Error sending email:', error);
            throw error;
        }
    }
};
