(function() {
        // ===== CURSEUR ULTIME =====
        const cursorMain = document.getElementById('cursorMain');
        const cursorTrail = document.getElementById('cursorTrail');
        let mouseX = 0,
            mouseY = 0;
        let trailX = 0,
            trailY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            cursorMain.style.left = mouseX + 'px';
            cursorMain.style.top = mouseY + 'px';
        });

        function animateTrail() {
            trailX += (mouseX - trailX) * 0.15;
            trailY += (mouseY - trailY) * 0.15;
            cursorTrail.style.left = trailX + 'px';
            cursorTrail.style.top = trailY + 'px';
            requestAnimationFrame(animateTrail);
        }
        animateTrail();

        const hoverElements = document.querySelectorAll(
            'a, button, .project-card, .blog-card, .tool-card, .btn, .nav-link, .enter-btn, .android-full-container, .filter-btn, .skill-card, .tiktok-item, .tag, input, textarea'
            );
        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursorMain.classList.add('hover');
                cursorTrail.classList.add('hover');
            });
            el.addEventListener('mouseleave', () => {
                cursorMain.classList.remove('hover');
                cursorTrail.classList.remove('hover');
            });
        });

        // ===== PARTICULES CANVAS =====
        const canvas = document.getElementById('particles-canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const particles = [];
        const particleCount = 60;

        class Particle {
            constructor() {
                this.reset();
            }
            reset() {
                this.x = Math.random() * canvas.width;
                this.y = canvas.height + Math.random() * 100;
                this.size = Math.random() * 3 + 1;
                this.speedY = -(Math.random() * 1.5 + 0.5);
                this.speedX = (Math.random() - 0.5) * 0.5;
                this.opacity = Math.random() * 0.6 + 0.2;
                this.color = Math.random() > 0.5 ? '#ff2d55' : '#00e5ff';
            }
            update() {
                this.y += this.speedY;
                this.x += this.speedX;
                if (this.y < -20) this.reset();
            }
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = this.color;
                ctx.globalAlpha = this.opacity;
                ctx.fill();
                ctx.shadowBlur = 15;
                ctx.shadowColor = this.color;
                ctx.fill();
                ctx.shadowBlur = 0;
                ctx.globalAlpha = 1;
            }
        }

        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }

        function animateParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => {
                p.update();
                p.draw();
            });
            requestAnimationFrame(animateParticles);
        }
        animateParticles();

        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });

        // ===== AUDIO VISUALIZER (simulé) =====
        const visualizer = document.getElementById('audioVisualizer');
        for (let i = 0; i < 64; i++) {
            const bar = document.createElement('div');
            bar.classList.add('audio-bar');
            visualizer.appendChild(bar);
        }

        function animateVisualizer() {
            const bars = visualizer.querySelectorAll('.audio-bar');
            bars.forEach(bar => {
                const h = Math.random() * 20 + 2;
                bar.style.height = h + 'px';
            });
            requestAnimationFrame(() => setTimeout(animateVisualizer, 150));
        }
        animateVisualizer();

        // ===== INTRO =====
        const introOverlay = document.getElementById('intro-overlay');
        const enterBtn = document.getElementById('enterBtn');
        const introSkip = document.getElementById('introSkip');

        function hideIntro() {
            introOverlay.classList.add('hidden');
            document.body.style.cursor = 'none';
        }
        enterBtn.addEventListener('click', hideIntro);
        introSkip.addEventListener('click', hideIntro);

        // ===== THEME =====
        const themeToggle = document.getElementById('themeToggle');
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('light-mode');
            localStorage.setItem('holsen-theme',
                document.body.classList.contains('light-mode') ? 'light' : 'dark');
        });
        if (localStorage.getItem('holsen-theme') === 'light') {
            document.body.classList.add('light-mode');
        }

        // ===== LANGUE =====
        let currentLang = 'fr';
        const langToggle = document.getElementById('langToggle');
        langToggle.addEventListener('click', () => {
            currentLang = currentLang === 'fr' ? 'en' : 'fr';
            document.querySelectorAll('[data-lang-fr][data-lang-en]').forEach(el => {
                el.textContent = currentLang === 'fr' ? el.getAttribute('data-lang-fr') : el.getAttribute(
                    'data-lang-en');
            });
            langToggle.textContent = currentLang === 'fr' ? 'FR/EN' : 'EN/FR';
        });

        // ===== SCROLL REVEAL =====
        const sections = document.querySelectorAll('.section');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    // Animer les jauges de skills
                    entry.target.querySelectorAll('.skill-fill').forEach(fill => {
                        fill.style.width = fill.getAttribute('data-width');
                    });
                }
            });
        }, { threshold: 0.25, rootMargin: '0px 0px -80px 0px' });
        sections.forEach(s => observer.observe(s));

        // ===== ANDROID INTERACTIF =====
        const android = document.getElementById('androidBot');
        const bubble = document.getElementById('androidBubble');
        const screen = document.getElementById('androidScreen');
        const messages = [
            'Prêt à dominer !',
            'Holsen-sama approuve.',
            'Lance une invocation !',
            'Code > Tout.',
            'Tu es dans la matrice.',
            'Mode combat activé !',
            'K0D4-X en ligne.',
            'Front-end suprême.'
        ];
        let msgIndex = 0;
        let combatMode = false;

        android.addEventListener('click', () => {
            bubble.textContent = messages[msgIndex % messages.length];
            msgIndex++;
            screen.textContent = 'HELLO';
            android.style.animation = 'none';
            android.offsetHeight;
            if (combatMode) {
                android.classList.add('combat-mode');
                setTimeout(() => android.classList.remove('combat-mode'), 2000);
            }
            android.style.animation = combatMode ?
                'androidFloatIdle 0.5s ease, androidCombat 2s ease-in-out 0.5s infinite' :
                'androidFloatIdle 0.5s ease, androidFloatIdle 4s ease-in-out 0.5s infinite';
            setTimeout(() => { screen.textContent = 'AWAKE'; }, 1500);
        });

        // Double-clic = mode combat
        android.addEventListener('dblclick', () => {
            combatMode = !combatMode;
            if (combatMode) {
                android.classList.add('combat-mode');
                bubble.textContent = 'MODE COMBAT !';
                screen.textContent = 'COMBAT';
                document.body.style.setProperty('--android-color', '#ff0000');
                document.body.style.setProperty('--android-glow', '#ff4444');
            } else {
                android.classList.remove('combat-mode');
                bubble.textContent = 'Mode normal.';
                screen.textContent = 'AWAKE';
                document.body.style.setProperty('--android-color', '#ff2d55');
                document.body.style.setProperty('--android-glow', '#ff6482');
            }
        });

        // ===== FILTRE PROJETS =====
        const filterBtns = document.querySelectorAll('.filter-btn');
        const projectCards = document.querySelectorAll('.project-card');

        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                const filter = btn.getAttribute('data-filter');
                projectCards.forEach(card => {
                    if (filter === 'all' || card.getAttribute('data-category') === filter) {
                        card.style.display = 'block';
                        card.style.animation = 'fadeInUp 0.5s ease both';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });

        // ===== LIGHTBOX =====
        const lightbox = document.getElementById('lightbox');
        const lightboxContent = document.getElementById('lightboxContent');
        const lightboxClose = document.getElementById('lightboxClose');

        const projectDetails = {
            '1': {
                title: 'Interface clinique intelligente',
                desc: 'Dashboard prédictif complet avec IA intégrée.<br><br><strong>Problème :</strong> Dispersion des données patients.<br><strong>Solution :</strong> Centralisation et prédictions en temps réel.<br><strong>Résultat :</strong> -60% de temps de consultation.',
                tech: 'React • Node.js • TensorFlow'
            },
            '2': {
                title: 'Système UX immersif',
                desc: 'Expérience narrative révolutionnaire.<br><br><strong>Problème :</strong> Taux d\'abandon élevé.<br><strong>Solution :</strong> Storytelling par scroll avec Three.js.<br><strong>Résultat :</strong> -40% d\'abandon, +65% d\'engagement.',
                tech: 'Three.js • GSAP • WebGL'
            },
            '3': {
                title: 'Mini réseau social',
                desc: 'Plateforme exclusive basée sur les passions.<br><br><strong>Problème :</strong> Algorithmes froids des réseaux actuels.<br><strong>Solution :</strong> Connexion humaine par centres d\'intérêt.<br><strong>Résultat :</strong> 5000 utilisateurs beta.',
                tech: 'Vue.js • Firebase • WebSocket'
            }
        };

        projectCards.forEach(card => {
            card.addEventListener('click', () => {
                const projectId = card.getAttribute('data-project');
                const detail = projectDetails[projectId];
                lightboxContent.innerHTML = `
                    <h2 style="font-family:'Orbitron',sans-serif;margin-bottom:1rem;">${detail.title}</h2>
                    <p style="margin-bottom:1rem;">${detail.desc}</p>
                    <p style="color:var(--primary-glow);font-weight:700;">${detail.tech}</p>
                `;
                lightbox.classList.add('active');
            });
        });

        const caseDetails = {
            '1': {
                title: 'Refonte UX pour app santé',
                desc: 'Rebranding complet, parcours simplifié, et nouveau dashboard patient. Résultat : +32% de rétention et satisfaction utilisateur accrue.',
                tech: 'React · Figma · Firebase'
            },
            '2': {
                title: 'Site e-commerce premium',
                desc: 'Landing haut de gamme, tunnel de conversion optimisé et checkout express. Résultat : +18% panier moyen et +24% revenus.',
                tech: 'Vue.js · Stripe · Tailwind'
            },
            '3': {
                title: 'Landing viral pour créateur',
                desc: 'Narration immersive, micro-interactions et micro-animations. Résultat : +400% d\'engagement et +15% de leads.',
                tech: 'Animation CSS · UX · Storytelling'
            }
        };

        const caseCards = document.querySelectorAll('.case-card');
        caseCards.forEach(card => {
            card.addEventListener('click', () => {
                const caseId = card.getAttribute('data-case');
                const detail = caseDetails[caseId];
                lightboxContent.innerHTML = `
                    <h2 style="font-family:'Orbitron',sans-serif;margin-bottom:1rem;">${detail.title}</h2>
                    <p style="margin-bottom:1rem;">${detail.desc}</p>
                    <p style="color:var(--primary-glow);font-weight:700;">${detail.tech}</p>
                `;
                lightbox.classList.add('active');
            });
        });

        lightboxClose.addEventListener('click', () => lightbox.classList.remove('active'));
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) lightbox.classList.remove('active');
        });

        // ===== COMPTEUR FOLLOWERS =====
        const followerEl = document.getElementById('followerCount');
        let followers = 0;
        const targetFollowers = 12847;

        function animateFollowers() {
            if (followers < targetFollowers) {
                followers += Math.ceil((targetFollowers - followers) / 50);
                followerEl.textContent = followers.toLocaleString();
                requestAnimationFrame(() => setTimeout(animateFollowers, 50));
            } else {
                followerEl.textContent = targetFollowers.toLocaleString();
            }
        }
        setTimeout(animateFollowers, 2000);

        // ===== FORMULAIRE =====
        const contactForm = document.getElementById('contactForm');
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button');
            btn.textContent = 'Invocation en cours...';
            btn.style.background = 'var(--gold)';
            setTimeout(() => {
                btn.textContent = 'Invocation réussie !';
                btn.style.background = 'var(--accent)';
                contactForm.reset();
                setTimeout(() => {
                    btn.textContent = 'Lancer l\'invocation';
                    btn.style.background = 'var(--primary)';
                }, 2500);
            }, 2000);
        });

        // ===== KONAMI CODE =====
        const konamiCode = [
            'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
            'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
            'b', 'a'
        ];
        let konamiIndex = 0;

        document.addEventListener('keydown', (e) => {
            if (e.key === konamiCode[konamiIndex]) {
                konamiIndex++;
                if (konamiIndex === konamiCode.length) {
                    activateSecretMode();
                    konamiIndex = 0;
                }
            } else {
                konamiIndex = 0;
            }
        });

        function activateSecretMode() {
            document.body.classList.add('secret-mode');
            const badge = document.createElement('div');
            badge.classList.add('secret-badge');
            badge.textContent = 'SECRET MODE ACTIVÉ';
            document.body.appendChild(badge);
            setTimeout(() => badge.remove(), 3000);
            // Changer toutes les couleurs
            document.body.style.setProperty('--primary', '#ff00ff');
            document.body.style.setProperty('--primary-glow', '#ff66ff');
            document.body.style.setProperty('--accent', '#ffff00');
            document.body.style.setProperty('--accent-glow', '#ffff66');
            document.body.style.setProperty('--gold', '#00ff00');
            document.body.style.setProperty('--gold-light', '#66ff66');
            setTimeout(() => {
                document.body.style.setProperty('--primary', '#ff2d55');
                document.body.style.setProperty('--primary-glow', '#ff6482');
                document.body.style.setProperty('--accent', '#00e5ff');
                document.body.style.setProperty('--accent-glow', '#18ffff');
                document.body.style.setProperty('--gold', '#ffd700');
                document.body.style.setProperty('--gold-light', '#ffed4a');
                document.body.classList.remove('secret-mode');
            }, 5000);
        }

        // ===== RADAR CHART =====
        function drawRadarChart() {
            const radarCanvas = document.getElementById('radarChart');
            if (!radarCanvas) return;
            const rctx = radarCanvas.getContext('2d');
            const centerX = 150,
                centerY = 150,
                radius = 100;
            const skills = ['React', 'UI/UX', 'Animation', 'Node.js', 'TikTok', 'Story'];
            const values = [95, 90, 85, 80, 88, 92];

            rctx.clearRect(0, 0, 300, 300);

            // Grille
            for (let i = 1; i <= 5; i++) {
                rctx.beginPath();
                for (let j = 0; j < 6; j++) {
                    const angle = (Math.PI * 2 / 6) * j - Math.PI / 2;
                    const x = centerX + (radius * i / 5) * Math.cos(angle);
                    const y = centerY + (radius * i / 5) * Math.sin(angle);
                    if (j === 0) rctx.moveTo(x, y);
                    else rctx.lineTo(x, y);
                }
                rctx.closePath();
                rctx.strokeStyle = 'rgba(255,45,85,0.3)';
                rctx.stroke();
            }

            // Axes
            for (let i = 0; i < 6; i++) {
                const angle = (Math.PI * 2 / 6) * i - Math.PI / 2;
                const x = centerX + radius * Math.cos(angle);
                const y = centerY + radius * Math.sin(angle);
                rctx.beginPath();
                rctx.moveTo(centerX, centerY);
                rctx.lineTo(x, y);
                rctx.strokeStyle = 'rgba(255,255,255,0.2)';
                rctx.stroke();
                // Label
                rctx.fillStyle = '#fff';
                rctx.font = '10px Rajdhani, sans-serif';
                rctx.fillText(skills[i], x + 8, y + 4);
            }

            // Zone de données
            rctx.beginPath();
            values.forEach((val, i) => {
                const angle = (Math.PI * 2 / 6) * i - Math.PI / 2;
                const x = centerX + (radius * val / 100) * Math.cos(angle);
                const y = centerY + (radius * val / 100) * Math.sin(angle);
                if (i === 0) rctx.moveTo(x, y);
                else rctx.lineTo(x, y);
            });
            rctx.closePath();
            rctx.fillStyle = 'rgba(255,45,85,0.4)';
            rctx.fill();
            rctx.strokeStyle = '#ff2d55';
            rctx.lineWidth = 2;
            rctx.stroke();
        }
        drawRadarChart();

        // ===== BLOG ARTICLES =====
        const blogArticles = {
            '1': {
                title: 'Les 7 patterns React que 99% des devs ignorent',
                desc: '<strong>1. Compound Components</strong><br>Créer des composants qui fonctionnent ensemble en partageant un état implicit.<br><br><strong>2. Custom Hooks</strong><br>Extraire la logique réutilisable dans des fonctions légers.<br><br><strong>3. Render Props</strong><br>Un pattern pour partager une logique entre composants.<br><br><strong>4. HOC (Higher-Order Component)</strong><br>Envelopper un composant pour ajouter une logique.<br><br><strong>5. Provider Pattern</strong><br>Distribuer les données globales sans prop drilling.<br><br><strong>6. Container/Presentational</strong><br>Séparer la logique (container) de la vue (presentational).<br><br><strong>7. State Reducer</strong><br>Laisser l\'utilisateur du composant contrôler la logique d\'état.<br><br>Ressources : Epic React, Udemy React Patterns<br>Formation complète : <a href="#" style="color:var(--accent);">S\'inscrire</a>',
                affiliation: true
            },
            '2': {
                title: 'Comment j\'ai percé sur TikTok en parlant de code',
                desc: '<strong>La formule secrète :</strong><br><br><strong>Hook 3 secondes (CRUCIAL)</strong><br>Dans les 3 premières secondes, capte l\'attention. Utilisez : une question, une affirmation choc, ou une transformation visuelle.<br><br><strong>Duels de code</strong><br>"Comment je ferais ça vs comment tu le ferais" → 10M+ views<br><br><strong>Transformation avant/après</strong><br>"Portfolio simple vs domination" → engagement massif<br><br><strong>Pattern viral</strong><br>- Son addictif (utilisen les trending sounds)<br>- Transition abrupte<br>- Texte petit + légende complète<br>- Appel à l\'action (follow, like, comment)<br><br><strong>Fréquence</strong><br>3-5 vidéos/semaine minimum pour les algorithmes<br><br><strong>Outils recommandés</strong><br>Matériel : Micro rode, ring light, caméra 4K<br>Montage : CapCut (gratuit), DaVinci Resolve<br><br>Monétisation : TikTok Creator Fund + Marque + Produits',
                affiliation: true
            },
            '3': {
                title: 'Intègre l\'IA dans tes apps sans être un génie',
                desc: '<strong>Les outils à connaître :</strong><br><br><strong>1. OpenAI API</strong><br>ChatGPT, completion, embedding... L\'API la plus complète.<br>Coût : $0.0015 par 1000 tokens pour GPT-3.5<br><br><strong>2. Stable Diffusion</strong><br>Génération d\'images locales (ou via API Replicate)<br>Parfait pour les assets automatiques<br><br><strong>3. Whisper (OpenAI)</strong><br>Transcription audio ultra-précise<br>Parfait pour les applis de dictée<br><br><strong>4. TensorFlow.js</strong><br>ML directement dans le navigateur (pas de serveur)<br>Détection d\'objets, classification d\'images<br><br><strong>5. LangChain</strong><br>Framework pour construire des apps IA complexes<br>Chaînage de prompts, mémoire, retrieval<br><br><strong>Code exemple :</strong><br><code>const response = await fetch("https://api.openai.com/v1/chat/completions", {<br>&nbsp;&nbsp;method: "POST",<br>&nbsp;&nbsp;headers: { "Authorization": `Bearer ${API_KEY}` },<br>&nbsp;&nbsp;body: JSON.stringify({<br>&nbsp;&nbsp;&nbsp;&nbsp;model: "gpt-3.5-turbo",<br>&nbsp;&nbsp;&nbsp;&nbsp;messages: [{ role: "user", content: "Hello" }]<br>&nbsp;&nbsp;})<br>});</code>',
                affiliation: false
            },
            '4': {
                title: 'Pourquoi ton UI est nulle : les 5 erreurs qui tuent',
                desc: '<strong>Erreur #1 : Contraste faible</strong><br>Texte gris sur fond gris = cauchemar d\'accessibilité<br>Utilise le ratio 7:1 minimum (WCAG AAA)<br><br><strong>Erreur #2 : Hiérarchie inexistante</strong><br>Tous les éléments ont la même taille/couleur = perte<br>Titre > Sous-titre > Texte corps (en taille ET couleur)<br><br><strong>Erreur #3 : Animations sans feedback</strong><br>Ton formulaire s\'envoie sans indication<br>Toujours : loading état → succès/erreur<br><br><strong>Erreur #4 : Ignorer le mobile</strong><br>60% du traffic vient du mobile en 2026<br>Mobile-first design (commence par mobile)<br><br><strong>Erreur #5 : Trop d\'animations</strong><br>Tout qui bouge = distraction, c\'est cancertogène<br>Utilise les animations pour guider (max 2-3 animations par page)<br><br><strong>Checkliste rapide :</strong><br>- Contraste OK ?<br>- Hiérarchie claire ?<br>- Mobile responsive ?<br>- Feedback sur interactions ?<br>- Moins de 3 animations ?',
                affiliation: false
            },
            '5': {
                title: 'De 0 à 5000€/mois en freelance : ma méthode',
                desc: '<strong>Mois 1-2 : Fondation (500-1000€/mois)</strong><br>- Construis un portfolio<br>- Premiers clients via réseaux persos<br>- Taux : 25-35€/h<br><br><strong>Mois 3-4 : Croissance (1500-2500€/mois)</strong><br>- Augmente le taux à 45-50€/h<br>- Demande des références/avis<br>- Lance une simple landing<br><br><strong>Mois 5-8 : Scaling (3000-4000€/mois)</strong><br>- Taux : 60€/h (packagé en jours)<br>- Ciblage de niches<br>- Partenariats d\'agences<br><br><strong>Mois 9+ : Domination (5000+€/mois)</strong><br>- Taux : 80-100€/h (ou value-based)<br>- Retainer clients<br>- Sous-traitance (tu délègues, tu prends 30%)<br><br><strong>Templates de négociation :</strong><br><code>"Avec X années d\'expérience et mes résultats mesurables<br>(+40% conversion sur votre projet), mon tarif est 70€/h.<br>C\'est 30% moins cher qu\'une agence + tu gagnes en flexibilité."</code><br><br><strong>Outils recommandés :</strong><br>Facturation : Stripe + Lemonsqueezy<br>Gestion : Asana, Notion<br>Contrat : Template légal personnalisable',
                affiliation: true
            },
            '6': {
                title: 'Ma routine de dev qui écrase tout : 4h de deep work',
                desc: '<strong>La routine que j\'utilise tous les jours :</strong><br><br><strong>6h00 - Réveil naturel</strong><br>Pas d\'alarme (ça tue la productivité)<br>Verre d\'eau + étirement 2 min<br><br><strong>6h00-6h45 - Ritual du matin (45 min)</strong><br>- 10 min : Méditation/respiration<br>- 20 min : Gym (cardio léger ou yoga)<br>- 15 min : Douche froide + café<br><br><strong>7h00-7h15 - Planification (15 min)</strong><br>Regarde les 3 tâches du jour<br>Définit la priorité absolue<br><br><strong>7h15-11h15 - Deep Work Session 1 (4h)</strong><br>Sans aucune distraction :<br>- Téléphone en avion (NO NOTIFICATIONS)<br>- Slack fermée<br>- Musique focus (lofi/ambient)<br>- Eau à proximité<br><br>Stratégie Pomodoro inversé :<br>- 50 min de travail<br>- 10 min de break (étirement, marche, eau)<br><br><strong>11h15-12h - Mini pause (45 min)</strong><br>- Déjeuner complet (protéine + féculent + légume)<br>- 15 min de soleil/fenêtre<br>- 5 min review des messages accumulés<br><br><strong>12h-14h30 - Deep Work Session 2 (2h30)</strong><br>Même format que session 1<br>(Le cerveau est plus lent l\'après-midi, donc session plus courte)<br><br><strong>14h30-16h - Admin/relation (1h30)</strong><br>- Emails<br>- Slack/Messages<br>- Appels clients<br>- Revues de PR<br><br><strong>16h-17h - Fin de journée (1h)</strong><br>Wrap-up :<br>- Done-list (ce que j\'ai accompli)<br>- Todo pour demain<br>- Context switching pour mental<br><br><strong>Setup matériel :</strong><br>Moniteur 27" (calibré 100% sRGB)<br>Mécanique (Keychron, GMMK)<br>Ergonomique (Secret Lab, Herman Miller)<br>Casque fermé (Sony WH-1000XM5)<br>Bureau près de la fenêtre (lumière naturelle = +25% productivité)<br><br><strong>Résultat :</strong><br>4h de deep work réel = 8h de production classique<br>Earning/jour : 2400€ (100€/h × 24h équivalent)'
            }
        };

        // Lightbox Blog
        const blogCards = document.querySelectorAll('.blog-card');
        blogCards.forEach(card => {
            card.addEventListener('click', () => {
                const blogId = card.getAttribute('data-blog');
                const article = blogArticles[blogId];
                lightboxContent.innerHTML = `
                    <h2 style="font-family:'Orbitron',sans-serif;margin-bottom:1rem;text-align:left;">${article.title}</h2>
                    <div style="text-align:left;color:var(--text-secondary);line-height:1.8;margin-bottom:1rem;">${article.desc}</div>
                    ${article.affiliation ? '<p style="margin-top:2rem;padding-top:2rem;border-top:1px solid var(--border);font-size:0.9rem;color:var(--gold-light);">⭐ Liens d\'affiliation partenaires inclus</p>' : ''}
                `;
                lightbox.classList.add('active');
            });
        });

        const blogFilterBtns = document.querySelectorAll('.blog-filter-btn');
        const blogSearch = document.getElementById('blogSearch');

        function filterBlogCards() {
            const activeFilter = document.querySelector('.blog-filter-btn.active').getAttribute('data-filter');
            const query = blogSearch.value.toLowerCase();

            blogCards.forEach(card => {
                const title = card.querySelector('h3').textContent.toLowerCase();
                const description = card.querySelector('p').textContent.toLowerCase();
                const category = card.getAttribute('data-category');
                const matchesFilter = activeFilter === 'all' || category === activeFilter;
                const matchesSearch = !query || title.includes(query) || description.includes(query);
                if (matchesFilter && matchesSearch) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeInUp 0.5s ease both';
                } else {
                    card.style.display = 'none';
                }
            });
        }

        blogFilterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                blogFilterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                filterBlogCards();
            });
        });

        blogSearch.addEventListener('input', filterBlogCards);

        const cvToggle = document.getElementById('cvToggle');
        const cvPreview = document.getElementById('cvPreview');
        const cvClose = document.getElementById('cvClose');

        cvToggle.addEventListener('click', () => cvPreview.classList.add('active'));
        cvClose.addEventListener('click', () => cvPreview.classList.remove('active'));
        cvPreview.addEventListener('click', (e) => {
            if (e.target === cvPreview) cvPreview.classList.remove('active');
        });

        // ===== CALCULATEUR FREELANCE =====
        const calcRate = document.getElementById('calcRate');
        const calcDays = document.getElementById('calcDays');
        const calcExpenses = document.getElementById('calcExpenses');
        const calcResult = document.getElementById('calcResult');

        function updateCalculator() {
            const rate = parseFloat(calcRate.value) || 0;
            const days = parseFloat(calcDays.value) || 0;
            const expenses = parseFloat(calcExpenses.value) || 0;
            const revenue = (rate * days) - (rate * days * expenses / 100);
            calcResult.textContent = revenue.toLocaleString('fr-FR') + ' €';
        }

        calcRate.addEventListener('input', updateCalculator);
        calcDays.addEventListener('input', updateCalculator);
        calcExpenses.addEventListener('input', updateCalculator);
        updateCalculator();

        // ===== WIDGET CONTACT FLOTTANT =====
        const floatingContact = document.getElementById('floatingContact');
        const floatingToggle = document.getElementById('floatingToggle');
        
        if (floatingToggle) {
            floatingToggle.addEventListener('click', () => {
                floatingContact.classList.toggle('active');
            });

            // Fermer le menu au clic sur un lien
            document.querySelectorAll('.floating-link').forEach(link => {
                link.addEventListener('click', () => {
                    floatingContact.classList.remove('active');
                });
            });

            // Fermer le menu si clic en dehors
            document.addEventListener('click', (e) => {
                if (!floatingContact.contains(e.target)) {
                    floatingContact.classList.remove('active');
                }
            });
        }

        console.log('%cHolsen-sama Portfolio Ultimate %cACTIVÉ',
            'font-size:20px;color:#ff2d55;', 'color:#00e5ff;');
        console.log('%cK0D4-X en ligne. Toutes les modifications appliquées.',
            'color:#ffd700;font-size:14px;');
        console.log('%cKonami Code : ↑↑↓↓←→←→ B A', 'color:#aaa;font-size:10px;');
    })();