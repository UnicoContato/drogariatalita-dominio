document.addEventListener('DOMContentLoaded', () => {
    
    // --- Lógica Avançada do Header (Glassmorphism Dinâmico) ---
    const navbar = document.getElementById('navbar');
    const navbarBg = document.getElementById('navbar-bg');
    const navbarHeight = document.getElementById('navbar-height');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            // Estado "Scrollado": Vidro fosco branco, menor altura
            navbarBg.classList.remove('bg-white/0');
            navbarBg.classList.add('bg-white/90', 'backdrop-blur-md', 'shadow-sm');
            navbarHeight.classList.remove('h-24');
            navbarHeight.classList.add('h-16');
        } else {
            // Estado "Topo": Transparente, altura original
            navbarBg.classList.add('bg-white/0');
            navbarBg.classList.remove('bg-white/90', 'backdrop-blur-md', 'shadow-sm');
            navbarHeight.classList.remove('h-16');
            navbarHeight.classList.add('h-24');
        }
    });

    // --- Menu Mobile Animado ---
    const btn = document.getElementById('mobile-menu-btn');
    const menu = document.getElementById('mobile-menu');
    const bar1 = document.getElementById('bar1');
    const bar2 = document.getElementById('bar2');
    const bar3 = document.getElementById('bar3');
    const links = document.querySelectorAll('.mobile-link');
    let isMenuOpen = false;

    function toggleMenu() {
        isMenuOpen = !isMenuOpen;
        if (isMenuOpen) {
            menu.classList.remove('translate-x-full');
            // Animação do ícone hamburguer para X
            bar1.classList.add('rotate-45', 'translate-y-2');
            bar2.classList.add('opacity-0');
            bar3.classList.add('-rotate-45', '-translate-y-2');
            document.body.style.overflow = 'hidden';
        } else {
            menu.classList.add('translate-x-full');
            // Volta ícone
            bar1.classList.remove('rotate-45', 'translate-y-2');
            bar2.classList.remove('opacity-0');
            bar3.classList.remove('-rotate-45', '-translate-y-2');
            document.body.style.overflow = 'auto';
        }
    }

    btn.addEventListener('click', toggleMenu);
    links.forEach(link => link.addEventListener('click', toggleMenu));

    // --- Intersection Observer para Animações de Scroll (Performance Superior) ---
    const observerOptions = {
        threshold: 0.15, // Ativa quando 15% do elemento está visível
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Anima apenas uma vez
            }
        });
    }, observerOptions);

    const elementsToReveal = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');
    elementsToReveal.forEach(el => observer.observe(el));

    // --- Modal Logic ---
    const modal = document.getElementById('privacy-modal');
    const openBtn = document.getElementById('open-privacy');
    const closeBtn = document.getElementById('close-privacy');
    const backdrop = document.getElementById('modal-backdrop');

    const toggleModal = (state) => {
        if(state) {
            modal.classList.remove('hidden');
            setTimeout(() => {
                modal.firstElementChild.nextElementSibling.classList.remove('opacity-0', 'scale-95'); // Animação suave de entrada
            }, 10);
        } else {
            modal.classList.add('hidden');
        }
    };

    openBtn.addEventListener('click', (e) => { e.preventDefault(); toggleModal(true); });
    closeBtn.addEventListener('click', () => toggleModal(false));
    backdrop.addEventListener('click', () => toggleModal(false));
});