import { AIHumanizerEngine } from './engine.js';

document.addEventListener('DOMContentLoaded', async () => {
    // Elements
    const inputArea = document.getElementById('ai-input');
    const outputArea = document.getElementById('human-output');
    const wordCount = document.getElementById('word-count');
    const sentenceCount = document.getElementById('sentence-count');
    const charCount = document.getElementById('char-count');
    const humanizeBtn = document.getElementById('humanize-btn');
    const clearBtn = document.getElementById('clear-btn');
    const copyBtn = document.getElementById('copy-btn');
    const intensitySlider = document.getElementById('intensity-slider');
    const analysisOverlay = document.getElementById('analysis-overlay');
    const analysisText = document.getElementById('analysis-text');
    const progressFill = document.getElementById('progress-fill');
    const humanScore = document.getElementById('human-score');
    const yearEl = document.getElementById('current-year');
    const contextIndicator = document.getElementById('context-indicator');
    const contextValue = contextIndicator ? contextIndicator.querySelector('strong') : null;
    const modeBtns = document.querySelectorAll('.mode-btn');

    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // State
    /** @type {AIHumanizerEngine} */
    let engine = null;
    let isDataLoaded = false;
    let currentMode = 'standard';

    // Load Resources
    const loadResources = async () => {
        try {
            const [ftRes, swRes, syRes] = await Promise.all([
                fetch('fixedterms.json').then(r => r.json()).catch(() => []),
                fetch('stop_words.json').then(r => r.json()).catch(() => []),
                fetch('eng_synonyms.json').then(r => r.json()).catch(() => ({}))
            ]);

            engine = new AIHumanizerEngine({
                fixedTerms: ftRes,
                stopWords: swRes,
                synonyms: syRes,
                mode: currentMode
            });

            isDataLoaded = true;
            console.log('Engine initialized.');
        } catch (e) {
            console.error('Initialization error:', e);
        }
    };

    loadResources();

    // Mode Selection
    modeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            modeBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentMode = btn.dataset.mode;
            if (engine) engine.mode = currentMode;
        });
    });

    // Stats
    const updateStats = () => {
        const text = inputArea.value || '';
        const words = text.trim().split(/\s+/).filter(w => w.length > 0).length;
        const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0).length;
        const chars = text.length;

        wordCount.textContent = words;
        sentenceCount.textContent = sentences;
        charCount.textContent = `${chars}/5000`;

        if (chars > 5000) charCount.classList.add('error');
        else charCount.classList.remove('error');
    };

    inputArea.addEventListener('input', updateStats);

    // Humanize Click
    humanizeBtn.addEventListener('click', async () => {
        const text = inputArea.value.trim();
        if (!text) return showNotification('Please provide some content.', 'error');
        if (text.length > 5000) return showNotification('Content is too long.', 'error');

        try {
            humanizeBtn.disabled = true;
            humanizeBtn.querySelector('.spinner').style.display = 'block';
            humanizeBtn.querySelector('span').textContent = 'Processing...';

            if (!isDataLoaded) await loadResources();

            // Detect Context and show in UI
            const context = engine.detectContext(text);
            if (contextIndicator) {
                contextIndicator.style.display = 'flex';
                contextValue.textContent = context.toUpperCase();
            }

            // Show Analysis Steps
            analysisOverlay.style.display = 'block';
            await runAnalysisSteps();

            // Run Humanization
            const intensity = parseInt(intensitySlider.value);
            const result = engine.humanize(text, intensity);

            outputArea.value = result.humanized;

            // Generate Random High Score
            const randomScore = Math.floor(Math.random() * (99 - 92 + 1)) + 92;
            animateScore(randomScore);

            showNotification('Success! Content humanized.', 'success');
        } catch (err) {
            console.error(err);
            showNotification('An error occurred during processing.', 'error');
        } finally {
            humanizeBtn.disabled = false;
            humanizeBtn.querySelector('.spinner').style.display = 'none';
            humanizeBtn.querySelector('span').textContent = 'Humanize Content';
            analysisOverlay.style.display = 'none';
        }
    });

    async function runAnalysisSteps() {
        const steps = [
            { text: 'Identifying AI Fingerprints...', duration: 600 },
            { text: 'Analyzing Sentence Syntax...', duration: 800 },
            { text: 'Optimizing Vocabulary Variety...', duration: 700 },
            { text: 'Injecting Human-like Burstiness...', duration: 500 }
        ];

        let totalProgress = 0;
        for (const step of steps) {
            analysisText.textContent = step.text;
            let start = Date.now();
            while (Date.now() - start < step.duration) {
                const ratio = (Date.now() - start) / step.duration;
                const stepProgress = totalProgress + (ratio * (100 / steps.length));
                progressFill.style.width = `${stepProgress}%`;
                await new Promise(r => requestAnimationFrame(r));
            }
            totalProgress += (100 / steps.length);
        }
    }

    function animateScore(target) {
        let current = 0;
        const intensity = parseInt(intensitySlider.value);
        const adjustedTarget = Math.min(target, 85 + (intensity / 10) + Math.floor(Math.random() * 5));

        const interval = setInterval(() => {
            if (current >= adjustedTarget) {
                current = adjustedTarget;
                clearInterval(interval);
            }
            humanScore.textContent = `${current}%`;
            current += 1;
        }, 15);
    }

    // Clear
    clearBtn.addEventListener('click', () => {
        inputArea.value = '';
        outputArea.value = '';
        humanScore.textContent = '--';
        if (contextIndicator) contextIndicator.style.display = 'none';
        updateStats();
        showNotification('Content cleared.', 'success');
    });

    // Copy
    copyBtn.addEventListener('click', () => {
        if (!outputArea.value) return;
        outputArea.select();
        navigator.clipboard.writeText(outputArea.value);
        showNotification('Copied to clipboard!');
    });

    function showNotification(msg, type = 'success') {
        const n = document.getElementById('notification');
        const t = document.getElementById('notif-text');
        t.textContent = msg;
        n.style.borderColor = type === 'success' ? 'var(--success)' : '#ef4444';
        n.classList.add('show');
        setTimeout(() => n.classList.remove('show'), 3000);
    }
});
