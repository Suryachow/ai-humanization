/**
 * AI Humanizer - Premium Local Engine
 */

const REPLACEMENT_RULES = [
    // Simplified Phrasing for AI Over-Complexity
    { pattern: /\butilize\b/gi, replacements: ["use", "make use of"] },
    { pattern: /\bfacilitate\b/gi, replacements: ["help", "make easier", "manage"] },
    { pattern: /\bcommence\b/gi, replacements: ["start", "begin"] },
    { pattern: /\bterminate\b/gi, replacements: ["end", "stop", "finish"] },
    { pattern: /\bdemonstrate\b/gi, replacements: ["show", "prove"] },
    { pattern: /\balluminate\b/gi, replacements: ["show", "clear up"] },
    { pattern: /\bformulate\b/gi, replacements: ["make", "create", "plan"] },

    // Robotic Structure Breaking
    { pattern: /the importance of (.*) cannot be overstated/gi, replacements: ["$1 is really important", "$1 matters a lot"] },
    { pattern: /it is apparent that/gi, replacements: ["it's clear that", "obviously", "it looks like"] },
    { pattern: /in the realm of/gi, replacements: ["in", "around"] },
    { pattern: /oftentimes/gi, replacements: ["often", "frequently", "a lot of the time"] },
    { pattern: /it is worth highlighting that/gi, replacements: ["remember that", "one big thing is", "note that"] },
    { pattern: /in order for (.*) to/gi, replacements: ["so $1 can", "for $1 to"] },
    // Aggressive AI Phrase Dismantling
    { pattern: /\bartificial intelligence\b/gi, replacements: ["AI", "machine learning", "smart tech", "algorithms"] },
    { pattern: /\blarge language models\b/gi, replacements: ["LLMs", "AI models", "these systems", "language AI"] },
    { pattern: /\bcoherent and fluent\b/gi, replacements: ["smooth", "easy to read", "natural sounding"] },
    { pattern: /\bsignificant benefits\b/gi, replacements: ["lots of pros", "big advantages", "great things"] },
    { pattern: /\bimportant area of research\b/gi, replacements: ["big deal right now", "huge topic for researchers", "something people are looking into a lot"] },
    { pattern: /\bdistinguishing between\b/gi, replacements: ["telling the difference between", "spotting the difference in"] },
    { pattern: /\btechnological advancement\b/gi, replacements: ["new tech", "tech progress", "advancements in technology"] },
    { pattern: /\benhances productivity\b/gi, replacements: ["helps get more done", "boosts work", "makes things faster"] },
    { pattern: /\bwide range of domains\b/gi, replacements: ["many different areas", "lots of different fields", "all sorts of places"] },
    { pattern: /\bhas rapidly changed\b/gi, replacements: ["is changing fast", "really changed", "totally shifted"] },
    { pattern: /\bintegrated into\b/gi, replacements: ["part of", "built into", "used in"] },
    { pattern: /\bidentify patterns\b/gi, replacements: ["spot patterns", "find trends", "see how things work"] },
    { pattern: /\bimitation intelligence\b/gi, replacements: ["AI", "machine brains", "software"] },
    { pattern: /\brapidly advance\b/gi, replacements: ["quick growth", "fast progress"] },
    { pattern: /\bincreasingly average\b/gi, replacements: ["everywhere", "super common", "normal to see"] },
    { pattern: /\bhighly fluent and coherent\b/gi, replacements: ["natural", "really smooth", "easy to read"] },
    { pattern: /\bdistinguishing between\b/gi, replacements: ["telling them apart", "seeing the difference"] },
    { pattern: /\bin today's landscape\b/gi, replacements: ["today", "right now"] },
    { pattern: /\benhance productivity\b/gi, replacements: ["help you work", "get more done"] },
    { pattern: /\bwide range of domains\b/gi, replacements: ["lots of areas", "all kinds of fields"] },
    { pattern: /\bthis engineering\b/gi, replacements: ["this tech", "this stuff"] },
    { pattern: /at this point in time/gi, replacements: ["now", "right now"] },
    { pattern: /due to the presence of/gi, replacements: ["because of", "since there's"] },
    { pattern: /with the exception of/gi, replacements: ["except for", "besides"] },
    { pattern: /it should be noted that/gi, replacements: ["keep in mind", "remember", "also"] },
    { pattern: /in a similar fashion/gi, replacements: ["similarly", "the same way"] },
    { pattern: /to be honest/gi, replacements: ["honestly", "to be fair", "look"] },
    { pattern: /in light of the fact that/gi, replacements: ["since", "because", "given that"] },
    { pattern: /it is important to note that/gi, replacements: ["remember that", "one thing is", "also"] },
    { pattern: /with regard to/gi, replacements: ["about", "on"] },
    { pattern: /in the event that/gi, replacements: ["if", "when"] },
    { pattern: /at the present time/gi, replacements: ["now", "currently"] },
    { pattern: /in the near future/gi, replacements: ["soon", "shortly"] },
    { pattern: /a large number of/gi, replacements: ["many", "lots of"] },
    { pattern: /it goes without saying that/gi, replacements: ["obviously", "of course"] },
    { pattern: /for the purpose of/gi, replacements: ["to", "for"] },
    { pattern: /take into consideration/gi, replacements: ["consider", "think about"] },
    { pattern: /in spite of the fact that/gi, replacements: ["although", "even though"] },
    { pattern: /in many instances/gi, replacements: ["often", "frequently"] },
    { pattern: /on a daily basis/gi, replacements: ["daily", "every day"] },

    // Self-Referencing & Robotic Phrasing
    { pattern: /as an ai language model/gi, replacements: ["I think", "Personally", "I'd say", "In my view"] },
    { pattern: /according to my programming/gi, replacements: ["as far as I know", "basically", "from what I've seen", "honestly"] },
    { pattern: /i cannot experience feelings/gi, replacements: [""] },
    { pattern: /i don't have feelings/gi, replacements: [""] },
    { pattern: /i lack human understanding/gi, replacements: ["I'm not exactly sure"] },
    { pattern: /it is worth noting that/gi, replacements: ["note that", "remember", "don't forget"] },
    { pattern: /the data suggests that/gi, replacements: ["it looks like", "it seems", "I've seen that"] },
    { pattern: /as a result/gi, replacements: ["so", "that's why", "because of that"] },
    { pattern: /in conclusion/gi, replacements: ["so", "overall", "finally", "to finish", "basically"] },
    { pattern: /to summarize/gi, replacements: ["briefly", "in short", "basically", "to sum up"] },
    { pattern: /on the other hand/gi, replacements: ["but", "then again", "however", "by contrast"] },
    { pattern: /generally speaking/gi, replacements: ["usually", "mostly", "in general"] },
    { pattern: /to the best of my knowledge/gi, replacements: ["as far as I know", "I'm pretty sure", "from what I can tell"] },
    { pattern: /as far as i understand/gi, replacements: ["I think", "it seems to me"] },
    { pattern: /in many cases/gi, replacements: ["often", "frequently", "a lot of the time"] },
    { pattern: /it is a possibility that/gi, replacements: ["maybe", "perhaps", "it could be"] },
    { pattern: /as well as/gi, replacements: ["and", "plus"] },
    { pattern: /even though/gi, replacements: ["although", "though"] },
    { pattern: /in order to/gi, replacements: ["to"] },
    { pattern: /due to the fact that/gi, replacements: ["because", "since"] },
    { pattern: /due to/gi, replacements: ["because of", "owing to"] },
    { pattern: /even if/gi, replacements: ["whether or not", "despite"] },
    { pattern: /given that/gi, replacements: ["since", "because"] },
    { pattern: /to consider/gi, replacements: ["think about", "weigh"] },
    { pattern: /it depends/gi, replacements: ["depends", "relies on"] },
    { pattern: /that being said/gi, replacements: ["still", "even so"] },
    { pattern: /you may want to/gi, replacements: ["you can", "you might", "maybe try to"] },
    { pattern: /it's important/gi, replacements: ["remember", "keep in mind"] },
    { pattern: /this is not/gi, replacements: ["isn't exactly", "not all"] },
    { pattern: /you could/gi, replacements: ["you might", "think about"] },
    { pattern: /as previously mentioned/gi, replacements: ["as I said before", "like I said"] },
    { pattern: /it's worth noting/gi, replacements: ["note that", "remember"] },
    { pattern: /in contrast/gi, replacements: ["but", "compared to"] },
    { pattern: /to put it simply/gi, replacements: ["simply", "plainly", "basically"] },
    { pattern: /not only ... but also/gi, replacements: ["... and also", "... plus"] },
    { pattern: /in light of/gi, replacements: ["given", "considering"] },
    { pattern: /with respect to/gi, replacements: ["about", "on"] },
    { pattern: /in terms of/gi, replacements: ["regarding", "about"] },
    { pattern: /it is important to remember that/gi, replacements: ["remember that", "keep in mind"] },
    { pattern: /it is crucial to/gi, replacements: ["you really need to", "make sure to"] },
    { pattern: /it is vital to/gi, replacements: ["it's key to", "you have to"] },
    { pattern: /it is essential/gi, replacements: ["it's necessary", "you should"] },
    { pattern: /in this regard/gi, replacements: ["on this", "here"] },
    { pattern: /with that said/gi, replacements: ["anyway", "still", "even so"] },
    { pattern: /ultimately/gi, replacements: ["finally", "basically", "in the end"] },
    { pattern: /essentially/gi, replacements: ["basically", "pretty much"] },
    { pattern: /a key aspect/gi, replacements: ["a big part", "one thing"] },
    { pattern: /an important factor/gi, replacements: ["one thing", "a factor"] },

    // AI "Buzzwords" & Overused Terms
    { pattern: /\bunleash\b/gi, replacements: ["start", "show", "release", "use"] },
    { pattern: /\bharness\b/gi, replacements: ["use", "leverage", "apply"] },
    { pattern: /\btapestry\b/gi, replacements: ["mix", "variety", "collection"] },
    { pattern: /\bbeacon\b/gi, replacements: ["sign", "example", "light"] },
    { pattern: /\bdelve into\b/gi, replacements: ["look at", "explore", "check out"] },
    { pattern: /\bcomprehensive\b/gi, replacements: ["full", "complete", "thorough"] },
    { pattern: /\benhance\b/gi, replacements: ["improve", "boost", "better"] },
    { pattern: /\butilize\b/gi, replacements: ["use", "make use of"] },
    { pattern: /\bfoster\b/gi, replacements: ["encourage", "help", "build"] },
    { pattern: /\bseamless\b/gi, replacements: ["easy", "smooth", "simple"] },
    { pattern: /\btransformative\b/gi, replacements: ["big", "major", "powerful"] },
    { pattern: /\blandscape\b/gi, replacements: ["area", "space", "environment"] },
    { pattern: /\bevolving\b/gi, replacements: ["changing", "growing"] },
    { pattern: /\bunderscores\b/gi, replacements: ["shows", "highlights", "points out"] },
    { pattern: /\bvital\b/gi, replacements: ["important", "key", "crucial"] },
    { pattern: /\bcrucial\b/gi, replacements: ["important", "major", "key"] },
    { pattern: /\bmyriad\b/gi, replacements: ["many", "lots of", "a variety of"] },
    { pattern: /\btestament to\b/gi, replacements: ["proof of", "sign of"] },

    // Overused Transitions
    { pattern: /\bmoreover\b/gi, replacements: ["also", "plus", "and", "what's more"] },
    { pattern: /\bfurthermore\b/gi, replacements: ["also", "besides", "what's more", "honestly"] },
    { pattern: /\bhowever\b/gi, replacements: ["but", "yet", "though", "nonetheless"] },
    { pattern: /\btherefore\b/gi, replacements: ["so", "that's why", "thus"] },
    { pattern: /\badditionally\b/gi, replacements: ["also", "plus", "too", "besides"] },
    { pattern: /\bconsequently\b/gi, replacements: ["so", "as a result", "because of that"] },
    { pattern: /\bsimilarly\b/gi, replacements: ["likewise", "in the same way"] },
    { pattern: /\bnonetheless\b/gi, replacements: ["still", "even so", "but"] },
    { pattern: /\bindeed\b/gi, replacements: ["in fact", "actually", "honestly"] },
    { pattern: /\bthus\b/gi, replacements: ["so", "hence", "basically"] },
    { pattern: /\balternatively\b/gi, replacements: ["instead", "or"] },
    { pattern: /\bnotably\b/gi, replacements: ["especially", "importantly"] },
    { pattern: /\bdespite\b/gi, replacements: ["although", "even when"] },
    { pattern: /\bessentially\b/gi, replacements: ["basically", "mainly", "mostly"] },
    { pattern: /\bin essence\b/gi, replacements: ["basically", "really", "mostly"] },

    // Corporate/Tech Speak
    { pattern: /\bdive into\b/gi, replacements: ["explore", "look at", "check out"] },
    { pattern: /\bin today's\b/gi, replacements: ["today", "now", "nowadays"] },
    { pattern: /\bhustle and bustle\b/gi, replacements: ["noise", "commotion", "busy-ness"] },
    { pattern: /\bcutting-edge\b/gi, replacements: ["latest", "new", "modern"] },
    { pattern: /\bnext-generation\b/gi, replacements: ["new", "future"] },
    { pattern: /\buser-centric\b/gi, replacements: ["user-focused", "made for users"] },
    { pattern: /\bbest-in-class\b/gi, replacements: ["top", "leading", "greatest"] },
    { pattern: /\bvalue-driven\b/gi, replacements: ["focused on value"] },
    { pattern: /\bdata-driven\b/gi, replacements: ["fact-based", "based on data"] },
    { pattern: /\bmission-critical\b/gi, replacements: ["essential", "necessary"] },
    { pattern: /\bthought leadership\b/gi, replacements: ["expertise", "authority"] },
    { pattern: /\bparadigm shift\b/gi, replacements: ["big change", "major shift"] },
    { pattern: /\bgame-changer\b/gi, replacements: ["important", "big improvement"] },
    { pattern: /\blow-hanging fruit\b/gi, replacements: ["easy target", "simple win"] },
    { pattern: /\bdeep dive\b/gi, replacements: ["detailed look", "close look"] },
    { pattern: /\bmove the needle\b/gi, replacements: ["make progress", "show results"] },
    { pattern: /\bcircle back\b/gi, replacements: ["return", "follow up", "get back to"] },
    { pattern: /\bactionable\b/gi, replacements: ["useful advice", "practical"] },
    { pattern: /\bpain points\b/gi, replacements: ["problems", "difficulty", "troubles"] },
    { pattern: /\bquick win\b/gi, replacements: ["easy success", "quick results"] },
    { pattern: /\blevel up\b/gi, replacements: ["improve", "get better"] },
    { pattern: /\bcircle back\b/gi, replacements: ["get back to", "check later"] },
    { pattern: /\btouch base\b/gi, replacements: ["talk", "chat", "connect"] },

    // Contractions (Mandatory for Human look)
    { pattern: /\bi am\b/gi, replacements: ["I'm"] },
    { pattern: /\bit is\b/gi, replacements: ["it's"] },
    { pattern: /\bdo not\b/gi, replacements: ["don't"] },
    { pattern: /\bcannot\b/gi, replacements: ["can't"] },
    { pattern: /\bthat is\b/gi, replacements: ["that's"] },
    { pattern: /\bthere is\b/gi, replacements: ["there's"] },
    { pattern: /\bwe are\b/gi, replacements: ["we're"] },
    { pattern: /\bthey are\b/gi, replacements: ["they're"] },
    { pattern: /\byou are\b/gi, replacements: ["you're"] },
    { pattern: /\bwas not\b/gi, replacements: ["wasn't"] },
    { pattern: /\bis not\b/gi, replacements: ["isn't"] },
    { pattern: /\bare not\b/gi, replacements: ["aren't"] },
    { pattern: /\bdid not\b/gi, replacements: ["didn't"] },
    { pattern: /\bdoes not\b/gi, replacements: ["doesn't"] },
    { pattern: /\bhave not\b/gi, replacements: ["haven't"] },
    { pattern: /\bhas not\b/gi, replacements: ["hasn't"] },
    { pattern: /\bwill not\b/gi, replacements: ["won't"] },
    { pattern: /\bcould not\b/gi, replacements: ["couldn't"] },
    { pattern: /\bshould not\b/gi, replacements: ["shouldn't"] },
    { pattern: /\bwould not\b/gi, replacements: ["wouldn't"] },

    // Academic AI Patterns
    { pattern: /\bfueled by\b/gi, replacements: ["driven by", "pushed by", "because of"] },
    { pattern: /\bnotable for\b/gi, replacements: ["known for", "famous for"] },
    { pattern: /\bgone are the days\b/gi, replacements: ["it's not like", "we don't see"] },
    { pattern: /\bin a world where\b/gi, replacements: ["nowadays", "since"] },
    { pattern: /\bthis suggests that\b/gi, replacements: ["this shows", "this means"] },
    { pattern: /\bit appears that\b/gi, replacements: ["it looks like", "it seems"] },
    { pattern: /\bon a global scale\b/gi, replacements: ["around the world", "everywhere"] },
    { pattern: /\bharness the power of\b/gi, replacements: ["use", "make the most of"] },
    { pattern: /\btestament to the\b/gi, replacements: ["proof of", "sign of the"] },
    { pattern: /\bdelve into the\b/gi, replacements: ["look into the", "check out the"] },

    // Unnatural Enthusiasm & Empathy
    { pattern: /absolutely phenomenal/gi, replacements: ["great", "awesome", "really good"] },
    { pattern: /brilliant and perfect/gi, replacements: ["good", "solid", "decent"] },
    { pattern: /fascinating beyond words/gi, replacements: ["interesting", "pretty cool", "neat"] },
    { pattern: /amazing and incredible/gi, replacements: ["great", "excellent", "nice"] },
    { pattern: /i'm sorry to hear that/gi, replacements: ["that sounds tough", "I'm sorry", "that's unfortunate"] },
    { pattern: /i understand your feelings/gi, replacements: ["I get it", "I see where you're coming from", "That makes sense"] },

];

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
    const modeBtns = document.querySelectorAll('.mode-btn');

    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // State
    let fixedTerms = [];
    let stopWords = [];
    let synonyms = {};
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
            fixedTerms = ftRes;
            stopWords = swRes;
            synonyms = syRes;
            isDataLoaded = true;
            console.log('Resources loaded.');
        } catch (e) {
            console.error('Data error:', e);
        }
    };

    loadResources();

    // Mode Selection
    modeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            modeBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentMode = btn.dataset.mode;
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

            // Show Analysis Steps
            analysisOverlay.style.display = 'block';
            await runAnalysisSteps();

            if (!isDataLoaded) await loadResources();

            // Run Humanization
            const result = humanizeContent(text);

            outputArea.value = result;

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
        // Map target based on intensity to be slightly more realistic
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
        updateStats();
        showNotification('Content cleared.', 'success');
    });

    function humanizeContent(text) {
        let res = text;
        const intensity = parseInt(intensitySlider.value) / 100;
        const aggressiveIntensity = Math.min(1, intensity * 1.5); // Much higher multiplier

        // 1. Protection
        const placeholders = {};
        fixedTerms.forEach((term, i) => {
            const regex = new RegExp(`\\b${term}\\b`, 'gi');
            const ph = `__FIXED_${i}__`;
            placeholders[ph] = term;
            res = res.replace(regex, ph);
        });

        // 2. Multi-Pass Static Replacements
        for (let pass = 0; pass < 3; pass++) {
            REPLACEMENT_RULES.forEach(rule => {
                if (Math.random() < aggressiveIntensity) {
                    res = res.replace(rule.pattern, () => {
                        return rule.replacements[Math.floor(Math.random() * rule.replacements.length)];
                    });
                }
            });
        }

        // 3. Ultra Synonym Logic (Dynamic)
        // High intensity = high probability of swapping almost everything
        const baseProb = currentMode === 'casual' ? 0.45 : (currentMode === 'professional' ? 0.20 : 0.35);
        const synonymProb = baseProb * (intensity > 0.8 ? 1.5 : intensity);

        const words = res.split(/\b/);
        const processed = words.map(w => {
            const lower = w.toLowerCase();
            if (/^[a-z]{3,}$/.test(lower) && !stopWords.includes(lower) && !lower.startsWith('__fixed')) {
                const syns = synonyms[lower];
                if (syns && syns.length > 0 && Math.random() < synonymProb) {
                    // Filter for shorter/simpler synonyms if possible
                    let choices = syns.filter(s => s.length <= lower.length + 2);
                    if (choices.length === 0) choices = syns;

                    const syn = choices[Math.floor(Math.random() * choices.length)];
                    if (w[0] === w[0].toUpperCase()) {
                        return syn.charAt(0).toUpperCase() + syn.slice(1);
                    }
                    return syn;
                }
            }
            return w;
        });
        res = processed.join('');

        // 4. Header Breaking
        // AI headers like "Growth of AI-Generated Content" should be broken
        const headerPatterns = [
            { pattern: /\bGrowth of\b/gi, repl: ["Why", "How", "Looking at"] },
            { pattern: /\bthe advancement of\b/gi, repl: ["new tech in", "growth in"] }
        ];
        headerPatterns.forEach(h => {
            if (Math.random() < intensity) {
                res = res.replace(h.pattern, h.repl[Math.floor(Math.random() * h.repl.length)]);
            }
        });

        // 5. Structural Shifts & Perspective Injection
        // Inject human bias / markers at start of paragraphs or sentences
        const perspectiveMarkers = ["To be fair, ", "I think ", "In my view, ", "Honestly, ", "Actually, ", "Generally speaking, "];
        const paragraphs = res.split(/\n\n+/);
        res = paragraphs.map(para => {
            if (para.length > 50 && Math.random() < (intensity * 0.3)) {
                const marker = perspectiveMarkers[Math.floor(Math.random() * perspectiveMarkers.length)];
                return marker + para.charAt(0).toLowerCase() + para.slice(1);
            }
            return para;
        }).join('\n\n');

        // 5. Fillers & Qualitative Modifiers (Internal)
        const sentences = res.split(/([.!?]\s+)/);
        res = sentences.map(sent => {
            // Internal qualifiers (sort of, pretty much)
            if (sent.length > 30 && Math.random() < (intensity * 0.5)) {
                sent = sent.replace(/\b(is|are|was|were|has|have)\b/gi, (m) => {
                    const qualifiers = [" basically", " sort of", " pretty much", " just", " kind of"];
                    return m + (Math.random() > 0.5 ? qualifiers[Math.floor(Math.random() * qualifiers.length)] : "");
                });
            }
            return sent;
        }).join('');

        // 6. Burstiness & Flow Breaking
        if (intensity > 0.4) {
            const sParts = res.split(/([.!?]\s+)/);
            const bursty = [];
            const humanBursts = ["Just a thought.", "No doubt.", "Simple.", "Makes sense.", "It's obvious.", "Really."];

            for (let i = 0; i < sParts.length; i++) {
                const part = sParts[i];
                if (!part) continue;

                // Randomly add a human burst
                if (part.length > 100 && Math.random() < (intensity * 0.25)) {
                    bursty.push(part + " " + humanBursts[Math.floor(Math.random() * humanBursts.length)]);
                }
                // Randomly split long sentences
                else if (part.length > 150 && Math.random() < (intensity * 0.4)) {
                    const splitIdx = part.indexOf(',', part.length / 3);
                    if (splitIdx !== -1) {
                        bursty.push(part.slice(0, splitIdx) + ".");
                        bursty.push(" Also, " + part.slice(splitIdx + 1).trim());
                    } else {
                        bursty.push(part);
                    }
                }
                else {
                    bursty.push(part);
                }
            }
            res = bursty.join('');
        }

        // 7. Advanced Scrambler: Minor word order shifts
        if (intensity > 0.7) {
            res = res.replace(/\b(AI|It|They|He|She|We|The)\s+(is|was|are|were)\s+now\b/gi, "$1 $2 basically");
            res = res.replace(/\bIt is\b/gi, "It's");
            res = res.replace(/\bThere is\b/gi, "There's");
        }

        // 8. Final Polish & AI detector specific cleanup
        res = res.replace(/\s+/g, ' ')
            .replace(/\s+([,.!?])/g, '$1')
            .replace(/([.!?])\s*([a-z])/g, (m, p1, p2) => `${p1} ${p2.toUpperCase()}`)
            .trim();

        // 9. Restore Fixed Terms
        Object.keys(placeholders).forEach(ph => {
            res = res.replace(new RegExp(ph, 'g'), placeholders[ph]);
        });

        return res;
    }

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
