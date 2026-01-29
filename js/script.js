document.addEventListener('DOMContentLoaded', function() {
    // Menu mobile : overlay = .navbar (contient nav-links)
    const menuToggle = document.querySelector('.menu-toggle');
    const navbar = document.querySelector('.navbar');
    const body = document.body;

    function closeMenu() {
        if (!navbar) return;
        navbar.classList.remove('active');
        body.style.overflow = '';
        if (menuToggle) menuToggle.innerHTML = '<i class="fas fa-bars" aria-hidden="true"></i>';
    }

    function isMenuOpen() {
        return navbar && navbar.classList.contains('active');
    }

    if (menuToggle && navbar) {
        menuToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            navbar.classList.toggle('active');
            body.style.overflow = isMenuOpen() ? 'hidden' : '';
            menuToggle.innerHTML = isMenuOpen() ? '<i class="fas fa-times" aria-hidden="true"></i>' : '<i class="fas fa-bars" aria-hidden="true"></i>';
        });

        document.querySelectorAll('.nav-links a').forEach(function(link) {
            link.addEventListener('click', closeMenu);
        });

        document.addEventListener('click', function(e) {
            if (!isMenuOpen()) return;
            if (!menuToggle.contains(e.target) && !navbar.contains(e.target)) closeMenu();
        });

        window.addEventListener('resize', function() {
            if (window.innerWidth > 768) closeMenu();
        });
    }
    
    // Header scroll avec throttling pour mobile
    const header = document.querySelector('.header');
    let ticking = false;
    
    function updateHeader() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        ticking = false;
    }
    
    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(updateHeader);
            ticking = true;
        }
    });
    
    // Amélioration de l'expérience tactile
    if ('ontouchstart' in window) {
        document.body.classList.add('touch-device');
        
        // Améliorer les interactions tactiles
        const touchElements = document.querySelectorAll('.btn, .service-card, .portfolio-item, .feature-card');
        touchElements.forEach(element => {
            element.addEventListener('touchstart', function() {
                this.style.transform = 'scale(0.98)';
            });
            
            element.addEventListener('touchend', function() {
                this.style.transform = '';
            });
        });
    }
    
    // Back to top button
    const backToTop = document.querySelector('.back-to-top');
    if (backToTop) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                backToTop.classList.add('active');
            } else {
                backToTop.classList.remove('active');
            }
        });
        
        backToTop.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Filtre portfolio
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    if (filterButtons.length > 0 && portfolioItems.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Retirer la classe active de tous les boutons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                // Ajouter la classe active au bouton cliqué
                this.classList.add('active');
                
                const filterValue = this.getAttribute('data-filter');
                
                portfolioItems.forEach(item => {
                    if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }
    
    // Animation des chiffres
    const statNumbers = document.querySelectorAll('.stat-number');
    
    function animateNumbers() {
        statNumbers.forEach(number => {
            const target = parseInt(number.getAttribute('data-count'));
            const duration = 2000; // 2 secondes
            const step = target / (duration / 16); // 16ms pour 60fps
            
            let current = 0;
            const increment = () => {
                current += step;
                if (current < target) {
                    number.textContent = Math.floor(current);
                    requestAnimationFrame(increment);
                } else {
                    number.textContent = target;
                }
            };
            
            increment();
        });
    }
    
    // Observer pour l'animation des chiffres
    const aboutSection = document.querySelector('.about');
    if (aboutSection && statNumbers.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateNumbers();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(aboutSection);
    }
    
    // Chatbot
    const chatbotToggle = document.querySelector('.chatbot-toggle');
    const chatbotContainer = document.querySelector('.chatbot-container');
    const chatbotClose = document.querySelector('.chatbot-close');
    const chatbotInput = document.querySelector('.chatbot-input input');
    const chatbotSend = document.querySelector('.chatbot-input button');
    const chatbotMessages = document.querySelector('.chatbot-messages');
    
    if (chatbotToggle && chatbotContainer) {
        chatbotToggle.addEventListener('click', function() {
            chatbotContainer.classList.toggle('active');
        });
    }
    
    if (chatbotClose && chatbotContainer) {
        chatbotClose.addEventListener('click', function() {
            chatbotContainer.classList.remove('active');
        });
    }
    
    function addBotMessage(html) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('chatbot-message', 'bot');
        messageElement.innerHTML = `<p>${html}</p>`;
        if (chatbotMessages) { chatbotMessages.appendChild(messageElement); chatbotMessages.scrollTop = chatbotMessages.scrollHeight; }
    }
    
    function addUserMessage(message) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('chatbot-message', 'user');
        const p = document.createElement('p');
        p.textContent = message;
        messageElement.appendChild(p);
        if (chatbotMessages) { chatbotMessages.appendChild(messageElement); chatbotMessages.scrollTop = chatbotMessages.scrollHeight; }
    }
    
    function handleChatbotSend() {
        const message = chatbotInput.value.trim();
        if (!message) return;
        addUserMessage(message);
        chatbotInput.value = '';
        const typing = document.createElement('div');
        typing.className = 'chatbot-message bot chatbot-typing';
        typing.innerHTML = '<p><span></span><span></span><span></span></p>';
        if (chatbotMessages) chatbotMessages.appendChild(typing);
        if (chatbotMessages) chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
        setTimeout(() => {
            if (typing.parentNode) typing.remove();
            const { reply } = getBotReply(message);
            addBotMessage(reply);
        }, 400 + Math.min(message.length * 15, 400));
    }
    
    if (chatbotSend && chatbotInput) {
        chatbotSend.addEventListener('click', handleChatbotSend);
        chatbotInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                handleChatbotSend();
            }
        });
    }
    
    // Animation au scroll
    const animateElements = document.querySelectorAll('.fade-in');
    
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                scrollObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    animateElements.forEach(element => {
        scrollObserver.observe(element);
    });
    
    // Formulaire de contact sans backend
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(contactForm);
            const name = formData.get('name');
            const email = formData.get('email');
            const phone = formData.get('phone');
            const message = formData.get('message');
            
            // Créer le message pour WhatsApp
            const whatsappMessage = `Bonjour, j'ai un message pour SmartShift :

Nom : ${name}
Email : ${email}
Téléphone : ${phone}

Message :
${message}

Merci !`;
            
            // Créer le message pour email
            const emailSubject = `Nouveau message de ${name}`;
            const emailBody = `Bonjour,

Vous avez reçu un nouveau message de contact :

Nom : ${name}
Email : ${email}
Téléphone : ${phone}

Message :
${message}

Cordialement,
${name}`;
            
            // Encoder les messages pour les liens
            const encodedWhatsapp = encodeURIComponent(whatsappMessage);
            const encodedEmailSubject = encodeURIComponent(emailSubject);
            const encodedEmailBody = encodeURIComponent(emailBody);
            
            // Créer les liens
            const whatsappLink = `https://wa.me/33689306432?text=${encodedWhatsapp}`;
            const emailLink = `mailto:smartshift12@gmail.com?subject=${encodedEmailSubject}&body=${encodedEmailBody}`;
            
            // Afficher les options
            const choice = confirm(`Votre message a été préparé ! 

Choisissez comment l'envoyer :
- OK : Envoyer par WhatsApp
- Annuler : Envoyer par email

Ou contactez-nous directement au +33 6 89 30 64 32`);
            
            if (choice) {
                // Ouvrir WhatsApp
                window.open(whatsappLink, '_blank');
            } else {
                // Ouvrir email
                window.open(emailLink, '_blank');
            }
            
            contactForm.reset();
        });
    }
    
    // Accordéon FAQ
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(btn => {
        btn.addEventListener('click', function() {
            const expanded = this.getAttribute('aria-expanded') === 'true';
            // Fermer toutes les autres
            faqQuestions.forEach(q => q.setAttribute('aria-expanded', 'false'));
            // Ouvrir/cacher celle cliquée
            this.setAttribute('aria-expanded', expanded ? 'false' : 'true');
        });
    });

    // Loader
    const loader = document.getElementById('loader');
    if (loader) {
        window.addEventListener('load', function() {
            setTimeout(() => {
                loader.classList.add('hidden');
            }, 600);
        });
    }

    // ——— Assistant SmartShift : conversationnel, maîtrise du contenu ———
    const SMARTSHIFT_KB = {
      services: [
        { id: 'web', name: 'Création de sites web', short: 'sites web', link: 'pages/service-web.html', details: 'Sites vitrines, e-commerce, applications web sur mesure, optimisation SEO.' },
        { id: 'mobile', name: 'Applications mobiles', short: 'apps mobiles', link: 'pages/service-mobile.html', details: 'Apps iOS et Android, applications métier, géolocalisation, suivi en temps réel, interfaces intuitives.' },
        { id: 'digital', name: 'Accompagnement à la digitalisation', short: 'digitalisation', link: 'pages/service-digital.html', details: 'Stratégie digitale, formation des équipes, optimisation des processus, conseil et suivi.' },
        { id: 'ia', name: 'IA & automatisation des tâches', short: 'IA et automatisation', link: 'pages/service-automation.html', details: 'Intégration de l\'IA en entreprise, automatisation de processus, chatbots, orchestration d\'outils.' },
        { id: 'logistics', name: 'Logistique', short: 'logistique', link: 'pages/service-logistics.html', details: 'Gestion logistique, suivi des marchandises, codes-barres et QR codes, optimisation des flux.' },
        { id: 'transport', name: 'Transport', short: 'transport', link: 'pages/service-transport.html', details: 'Applications de transport, gestion de flotte, suivi en temps réel, optimisation des trajets.' }
      ],
      values: [
        { name: 'Innovation', desc: 'Technologies actuelles (IA, digitalisation, apps) pour des solutions performantes.' },
        { name: 'Qualité', desc: 'Livrables soignés : sites, apps, accompagnement, maintenance.' },
        { name: 'Proximité', desc: 'À l\'écoute, à vos côtés de la conception au suivi.' },
        { name: 'Engagement', desc: 'Objectif : satisfaire le plus de clients et réaliser le plus de projets possibles.' }
      ],
      about: "SmartShift est votre partenaire pour les sites web, applications mobiles, l'accompagnement à la digitalisation, l'intégration de l'IA pour automatiser vos tâches, la logistique et le transport. Notre objectif : satisfaire le plus de clients et réaliser le plus de projets possibles, avec des solutions sur mesure.",
      contact: { phone: '+33 6 89 30 64 32', email: 'smartshift12@gmail.com', horaires: 'Du lundi au vendredi, 9h à 18h. N\'hésitez pas à nous écrire ou à demander un devis en ligne à tout moment.' },
      objectives: 'Nos objectifs : 500+ clients satisfaits, 1000+ projets réalisés, 20+ experts à votre service.',
      devis: 'Pour un devis personnalisé, rendez-vous sur la page <a href="pages/devis.html">Devis</a> ou cliquez sur « Demandez un devis » dans la section d\'accueil. Nous vous répondons rapidement.',
      faq: {
        accompagnement: 'Oui. Nous assurons suivi, maintenance et formation après livraison pour garantir la réussite de votre projet.',
        pme: 'Absolument. Nous adaptons nos offres à la taille et aux besoins de chaque entreprise, de la startup à la grande société.'
      },
      team: 'Nous sommes une équipe d\'environ <b>20 experts</b> structurée en hiérarchie claire : <b>Direction</b> (CEO, CTO, Chef de projet digital), <b>Développement Web</b> (5), <b>Applications mobiles</b> (4), <b>IA & automatisation</b> (4), <b>Design & UX</b> (2), <b>Marketing & Support</b> (2). Détails et organigramme sur la page <a href="pages/equipe.html">Équipe</a>.'
    };

    let chatbotState = { lastIntent: null, lastService: null, turnCount: 0 };

    function normalize(msg) {
      return (msg || '').trim().toLowerCase().replace(/\s+/g, ' ');
    }

    function match(msg, ...patterns) {
      const n = normalize(msg);
      for (const p of patterns) {
        if (typeof p === 'string' && n.includes(p)) return true;
        if (p instanceof RegExp && p.test(n)) return true;
      }
      return false;
    }

    function detectService(msg) {
      const n = normalize(msg);
      const map = [
        ['site', 'web', 'e-commerce', 'seo', 'vitrine'], 'web',
        ['app', 'mobile', 'ios', 'android', 'application mobile'], 'mobile',
        ['digitalis', 'digital', 'transformation digitale', 'stratégie digital'], 'digital',
        ['ia', 'automatis', 'robot', 'chatbot', 'automatisation'], 'ia',
        ['logistique', 'logistics', 'marchandise', 'flux', 'codes-barres', 'qr'], 'logistics',
        ['transport', 'flotte', 'trajet', 'livraison'], 'transport'
      ];
      for (let i = 0; i < map.length; i += 2) {
        const keywords = map[i];
        for (const k of keywords) if (n.includes(k)) return map[i + 1];
      }
      return null;
    }

    function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

    function getBotReply(userMessage) {
      const msg = userMessage.trim();
      const n = normalize(msg);
      const state = chatbotState;
      state.turnCount += 1;

      // Réponses variées selon le contexte (follow-up)
      const followUp = n.length <= 50 && (
        /^(et|puis|d'accord|ok|ouais|oui)\s+(les?|la|le|pour|sur|en)|^(et|alors)\s+(ça|tu|vous)|^(c'est quoi|ça fait quoi|ça comprend|détails?|en savoir plus|plus d'infos?)/i.test(n) ||
        /^et\s*\?|^ok\s*$|^d'accord\s*$/i.test(n)
      );

      // ——— Salutations ———
      if (match(msg, /^bonjour|^salut|^hello|^coucou|^hey|^bien le bonjour|^bonsoir/i) && !match(msg, /services?|devis|contact|équipe|valeurs?/i)) {
        state.lastIntent = 'greeting';
        const opts = [
          "Bonjour ! Je suis l'assistant SmartShift. Je peux vous parler de nos services (sites web, apps mobiles, digitalisation, IA, logistique, transport), de nos valeurs, ou vous indiquer comment nous contacter ou demander un devis. Par quoi souhaitez-vous commencer ?",
          "Bonjour ! Comment puis-je vous aider ? Vous pouvez me demander nos services, un devis, nos coordonnées ou en savoir plus sur SmartShift.",
          "Bonjour ! Posez-moi vos questions sur SmartShift : nos offres, nos valeurs, le contact ou comment obtenir un devis."
        ];
        return { reply: pick(opts), intent: 'greeting' };
      }

      // ——— Remerciements / au revoir ———
      if (match(msg, /merci|thanks|super|parfait|génial|top|nickel|ok c'est bon|ça va|^ok\s*$/i) && !/devis|contact|service|prix/i.test(n)) {
        state.lastIntent = 'thanks';
        return { reply: pick(["Avec plaisir ! N'hésitez pas si vous avez d'autres questions.", "Je vous en prie ! Revenez quand vous voulez.", "Content d'avoir pu vous aider. À bientôt !"]), intent: 'thanks' };
      }
      if (match(msg, /^au revoir|^à bientôt|^bye|^à plus|^ciao/i)) {
        state.lastIntent = 'bye';
        return { reply: "Au revoir ! N'hésitez pas à revenir pour toute question. À bientôt !", intent: 'bye' };
      }

      // ——— Aide / que pouvez-vous faire ———
      if (match(msg, /aide|help|que peux-tu|que pouvez-vous|tu fais quoi|comment ça marche|tu sais faire/i)) {
        state.lastIntent = 'help';
        return {
          reply: "Je peux vous aider sur tout ce qui concerne SmartShift : <b>services</b> (sites web, apps mobiles, digitalisation, IA, logistique, transport), <b>valeurs</b>, <b>équipe</b>, <b>contact</b> (téléphone, email, adresse) et <b>devis</b>. Dites-moi simplement ce qui vous intéresse !",
          intent: 'help'
        };
      }

      // ——— Devis / prix / tarifs ———
      if (match(msg, /devis|prix|tarif|coût|combien|quote|estimation/i) || (followUp && state.lastIntent === 'devis')) {
        state.lastIntent = 'devis';
        return { reply: SMARTSHIFT_KB.devis + " Si vous voulez, on peut aussi discuter de vos besoins avant.", intent: 'devis' };
      }

      // ——— Contact ———
      if (match(msg, /contact|joindre|téléphone|email|mail|appeler|écrire|tél\s*:/i) || (followUp && state.lastIntent === 'contact')) {
        state.lastIntent = 'contact';
        const c = SMARTSHIFT_KB.contact;
        return {
          reply: `Vous pouvez nous joindre par <b>téléphone</b> : ${c.phone}, par <b>email</b> : ${c.email}. ${c.horaires ? c.horaires + ' ' : ''}Utilisez notre <a href="pages/contact.html">formulaire de contact</a> ou demandez un <a href="pages/devis.html">devis</a> en ligne.`,
          intent: 'contact'
        };
      }
      if (match(msg, /adresse|où\s*êtes|localisation|situés|conakry|guinée/i)) {
        state.lastIntent = 'contact';
        return { reply: `Nous sommes en <b>France</b>. Vous pouvez nous appeler au ${SMARTSHIFT_KB.contact.phone} ou nous écrire à ${SMARTSHIFT_KB.contact.email}.`, intent: 'contact' };
      }
      if (match(msg, /horaires?|ouvert|fermé|heures?|répondez|disponible/i)) {
        state.lastIntent = 'contact';
        return { reply: SMARTSHIFT_KB.contact.horaires, intent: 'contact' };
      }

      // ——— Équipe ———
      if (match(msg, /équipe|fondateurs?|qui travaille|qui fait|nema|elisee|kourouma/i)) {
        state.lastIntent = 'team';
        return { reply: SMARTSHIFT_KB.team, intent: 'team' };
      }

      // ——— Valeurs ———
      if (match(msg, /valeurs?|principes?|engagement|qualité|innovation|proximité/i)) {
        state.lastIntent = 'values';
        const v = SMARTSHIFT_KB.values.map(x => `<b>${x.name}</b> : ${x.desc}`).join(' ');
        return { reply: `Nos valeurs : ${v} Souhaitez-vous des détails sur un service ou sur nous contacter ?`, intent: 'values' };
      }

      // ——— À propos / qui êtes-vous ———
      if (match(msg, /qui êtes-vous|qui est smartshift|qu'est-ce que smartshift|à propos|présentation|entreprise/i)) {
        state.lastIntent = 'about';
        return { reply: SMARTSHIFT_KB.about + ' ' + SMARTSHIFT_KB.objectives + ' Vous voulez en savoir plus sur nos services ou nous contacter ?', intent: 'about' };
      }

      // ——— FAQ ———
      if (match(msg, /accompagnement|après livraison|maintenance|suivi après|formation/i)) {
        state.lastIntent = 'faq';
        return { reply: SMARTSHIFT_KB.faq.accompagnement, intent: 'faq' };
      }
      if (match(msg, /pme|tpe|startup|petite entreprise|adapté|grande société/i)) {
        state.lastIntent = 'faq';
        return { reply: SMARTSHIFT_KB.faq.pme, intent: 'faq' };
      }

      // ——— Service spécifique ———
      const svcId = detectService(msg);
      const wantDetail = /détail|en savoir plus|ça comprend|ça fait|concrètement|quoi exactement|explique|décris/i.test(n);
      if (svcId || (followUp && state.lastService)) {
        const id = svcId || state.lastService;
        const svc = SMARTSHIFT_KB.services.find(s => s.id === id);
        if (svc) {
          state.lastIntent = 'service';
          state.lastService = svc.id;
          const detail = wantDetail ? ' ' + svc.details : '';
          const link = ` <a href="${svc.link}">En savoir plus</a>`;
          return { reply: `<b>${svc.name}</b> : ${svc.short}.${detail}${link} Autre question ?`, intent: 'service' };
        }
      }

      // ——— Liste des services (général) ———
      if (match(msg, /services?|offres?|proposez|vous faites quoi|que faites-vous|domaines?/i) || (followUp && state.lastIntent === 'services')) {
        state.lastIntent = 'services';
        const list = SMARTSHIFT_KB.services.map(s => `<b>${s.name}</b>`).join(', ');
        return {
          reply: `Nous proposons : ${list}. Dites-moi un service qui vous intéresse (par ex. "site web", "app mobile", "IA") et je vous en dis plus.`,
          intent: 'services'
        };
      }

      // ——— Fallback ———
      state.lastIntent = null;
      state.lastService = null;
      return {
        reply: "Je n'ai pas bien saisi. Je peux vous parler des <b>services</b> (sites web, apps, digitalisation, IA, logistique, transport), des <b>valeurs</b>, du <b>contact</b> ou d'un <b>devis</b>. Reformulez ou demandez « aide » pour voir ce que je peux faire.",
        intent: 'fallback'
      };
    }

    // Formulaire newsletter sans backend
    const newsletterForms = document.querySelectorAll('.newsletter-form');
    newsletterForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = form.querySelector('input[type="email"]').value;
            
            // Créer le message pour email
            const emailSubject = `Inscription Newsletter - SmartShift`;
            const emailBody = `Bonjour,

Je souhaite m'inscrire à votre newsletter.

Email : ${email}

Merci !`;
            
            // Encoder le message pour le lien
            const encodedEmailSubject = encodeURIComponent(emailSubject);
            const encodedEmailBody = encodeURIComponent(emailBody);
            
            // Créer le lien email
            const emailLink = `mailto:smartshift12@gmail.com?subject=${encodedEmailSubject}&body=${encodedEmailBody}`;
            
            // Afficher confirmation
            alert(`Merci pour votre inscription ! 

Un email de confirmation a été préparé. Cliquez sur OK pour l'envoyer.`);
            
            // Ouvrir email
            window.open(emailLink, '_blank');
            
            // Vider le formulaire
            form.reset();
        });
    });

    // Gestion des erreurs de chargement d'images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('error', function() {
            // Remplacer par une image par défaut ou masquer l'image
            this.style.display = 'none';
            console.warn('Image failed to load:', this.src);
        });
        
        // Améliorer le lazy loading
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                            img.removeAttribute('data-src');
                        }
                        observer.unobserve(img);
                    }
                });
            });
            
            imageObserver.observe(img);
        }
    });

    // Gestion globale des erreurs
    window.addEventListener('error', function(e) {
        console.warn('JavaScript error handled:', e.error);
        // Éviter que les erreurs cassent l'expérience utilisateur
        return false;
    });

    // SUPPRESSION de la logique doublonnée : on utilise addUserMessage/addBotMessage déjà définies plus haut
});