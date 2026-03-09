import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { AIHumanizerEngine } from './engine.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json({ limit: '5mb' }));

// Initialize Engine State
let engine = null;
let isReady = false;

async function initEngine() {
    try {
        const ftRes = JSON.parse(fs.readFileSync(path.join(__dirname, 'fixedterms.json'), 'utf8'));
        const swRes = JSON.parse(fs.readFileSync(path.join(__dirname, 'stop_words.json'), 'utf8'));
        const syRes = JSON.parse(fs.readFileSync(path.join(__dirname, 'eng_synonyms.json'), 'utf8'));

        engine = new AIHumanizerEngine({
            fixedTerms: ftRes,
            stopWords: swRes,
            synonyms: syRes
        });

        isReady = true;
        console.log('AI Humanizer Engine Ready.');
    } catch (err) {
        console.error('Failed to initialize engine:', err);
    }
}

initEngine();

// API Endpoints
app.post('/api/humanize', async (req, res) => {
    if (!isReady) {
        return res.status(503).json({ error: 'Engine is still warming up.' });
    }

    const { text, intensity, mode } = req.body;

    if (!text) {
        return res.status(400).json({ error: 'No text provided.' });
    }

    if (text.length > 20000) {
        return res.status(400).json({ error: 'Text too long (max 20k chars).' });
    }

    try {
        // Set mode if provided
        if (mode && ['standard', 'casual', 'professional'].includes(mode)) {
            engine.mode = mode;
        }

        const result = engine.humanize(text, intensity || 75);
        res.json(result);
    } catch (err) {
        console.error('Humanization Error:', err);
        res.status(500).json({ error: 'Internal server error during humanization.' });
    }
});

// Health Check
app.get('/health', (req, res) => {
    res.json({ status: isReady ? 'UP' : 'INITIALIZING', version: '1.0.0' });
});

app.listen(PORT, () => {
    console.log(`AI Humanizer Backend running on port ${PORT}`);
});
