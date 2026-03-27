window.addEventListener('load', () => {
    // nav 스크롤
    let lastScrollY = 0;
    const nav = document.querySelector("nav");

    window.addEventListener("scroll", () => {
        const currentScrollY = window.scrollY;

        if (currentScrollY > lastScrollY && currentScrollY > 100) {
            nav.classList.add("hide");
            nav.classList.remove("show");
        } else {
            nav.classList.add("show");
            nav.classList.remove("hide");
        }

        if (currentScrollY === 0) {
            nav.classList.remove("show");
            nav.style.backgroundColor = "transparent";
        }
        lastScrollY = currentScrollY;
    });


    // 햄버거버튼
    const menuToggle = document.getElementById('mobile-menu');
    const menuList = document.querySelector('.menu-list');
    const navTag = document.querySelector('nav');

    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        menuList.classList.toggle('active');
        navTag.classList.toggle('active');
    });

    // 메뉴 링크 클릭 시 메뉴 닫기 
    document.querySelectorAll('.menu-list li a').forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            menuList.classList.remove('active');
        });
    });


    const tl = gsap.timeline();

    // 메인 타이틀이 아래에서 위로 슥 올라옴
    tl.to(".reveal-text", {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: "power4.out",
        stagger: 0.2 
    })
    // 서브 텍스트가 서서히 나타남
    .to(".sub-text", {
        opacity: 1,
        duration: 0.8
    }, "-=0.5"); 

    gsap.registerPlugin(ScrollTrigger);

    // About 섹션의 요소들이 스크롤될 때 하나씩 올라오는 효과
    gsap.to(".about-grid > div", {
        scrollTrigger: {
            trigger: ".about",      
            start: "top 80%",       
            toggleActions: "play none none reverse" 
        },
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.3,               
        ease: "power2.out"
    });

    ScrollTrigger.matchMedia({
        // 769px 이상인 경우에만 가로 스크롤 실행
        "(min-width: 769px)": function() {
            gsap.to(".works-container", {
                xPercent: -50,
                ease: "none",
                scrollTrigger: {
                    id: "worksTrigger",
                    trigger: ".works",
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 1,
                    pin: true,
                }
            });
        },
        // 768px 이하(모바일)인 경우 애니메이션 비활성화
        "(max-width: 768px)": function() {
            const items = gsap.utils.toArray(".works-item");
            
            items.forEach((item) => {
                gsap.to(item, {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: item,
                        start: "top 85%", 
                        toggleActions: "play none none reverse" 
                    }
                });
            });
        }
    });

    // works 뒤로가기시 scroll 위치지정
    const lastIdx = sessionStorage.getItem('lastProjectIndex');

    if (lastIdx !== null) {
    
    if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
    }

    setTimeout(() => {
        
        ScrollTrigger.refresh();
        
        const worksST = ScrollTrigger.getById("worksTrigger");
        
        if (worksST) {
            const start = worksST.start; 
            const end = worksST.end;     
            const totalScroll = end - start; 

            const targetScroll = start + (parseInt(lastIdx) * (totalScroll / 2));

            window.scrollTo({
                top: targetScroll,
                behavior: 'auto' 
            });
            
            console.log("이동 타겟:", targetScroll); 
        }
        
        sessionStorage.removeItem('lastProjectIndex');
    }, 500); 
}

});