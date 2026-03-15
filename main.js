/* 
=============================================
   AI강사사관학교 랜딩페이지 JS
============================================= 
*/

document.addEventListener('DOMContentLoaded', () => {

    /* --- 1. Navbar Scroll Effect & Mobile Menu --- */
    const navbar = document.getElementById('navbar');
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    // 네비게이션 스크롤 시 배경 변화
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 햄버거 메뉴 토글 동작
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');

            // 아이콘 변경 (햄버거 ⇄ X 모양)
            const icon = hamburger.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // 모바일 메뉴 링크 클릭 시 메뉴 닫기
    const links = document.querySelectorAll('.nav-links a');
    links.forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                const icon = hamburger.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });


    /* --- 2. Scroll Animation (Intersection Observer) --- */
    // 화면에 요소가 등장할 때 fade-up 클래스를 visible 상태로 만듦
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // 15% 이상 보일 때
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // 한번 나타난 후에는 관찰 해제 (최적화)
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const fadeElements = document.querySelectorAll('.fade-up');
    fadeElements.forEach(el => {
        observer.observe(el);
    });

    // 헤더 파트 요소들은 페이지 로드 시 바로 애니메이션 발동
    setTimeout(() => {
        const heroElements = document.querySelectorAll('#hero .fade-up');
        heroElements.forEach(el => el.classList.add('visible'));
    }, 100);


    /* --- 3. FAQ Accordion --- */
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const questionBtn = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');

        questionBtn.addEventListener('click', () => {
            // 현재 열려있는 상태 판별
            const isActive = item.classList.contains('active');

            // 모든 아코디언 닫기
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
                otherItem.querySelector('.faq-answer').style.maxHeight = null;
            });

            // 클릭된 아이템이 닫혀있었다면 열기
            if (!isActive) {
                item.classList.add('active');
                // 콘텐츠 실제 높이에 맞춰 max-height 값을 동적으로 할당하여 트랜지션 효과 적용
                answer.style.maxHeight = answer.scrollHeight + 40 + "px"; // 40은 여백(padding)
            }
        });
    });


    /* --- 4. Smooth Scrolling Update (Active State for Nav Links) --- */
    // 스크롤 위치에 따라 네비게이션 활성화(Highlight) 상태 변경
    const sections = document.querySelectorAll('section, header');

    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            // 스크롤 보정값 (네비게이션 높이 등 고려)
            if (pageYOffset >= (sectionTop - parseInt(sectionHeight / 3))) {
                current = section.getAttribute('id');
            }
        });

        links.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });
});
