window.addEventListener("load", function() {
    if (typeof gsap !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
    const section = document.querySelector(".pc_mockup");
    const frame = section?.querySelector(".inner_img");
    const mainImg = section?.querySelector(".inner_img img");

    if (section && frame && mainImg) {
        const initMockup = () => {
            // 기존 트윈 제거 (리사이징 시 중첩 방지)
            ScrollTrigger.getAll().filter(st => st.trigger === section).forEach(st => st.kill());

            const scrollAmount = mainImg.offsetHeight - frame.offsetHeight;

            // 768px 이상(PC/태블릿)에서만 핀 고정 및 스크롤 실행
            if (window.innerWidth > 768 && scrollAmount > 0) {
                gsap.to(mainImg, {
                    y: -scrollAmount,
                    ease: "none",
                    scrollTrigger: {
                        trigger: section,
                        start: "top top",
                        end: () => `+=${scrollAmount}`,
                        pin: true,
                        scrub: 0.5,
                        invalidateOnRefresh: true,
                        refreshPriority: 1 // 계산 우선순위 상향
                    }
                });
            } else {
                // 모바일에서는 핀 고정 없이 이미지만 살짝 움직이거나 정적으로 유지
                gsap.set(mainImg, { y: 0 }); 
            }
        };

        // 이미지 로드 대기 및 실행
        if (mainImg.complete) {
            initMockup();
        } else {
            mainImg.addEventListener('load', initMockup);
        }

        // 리사이징 대응 (디바운스 처리 권장)
        window.addEventListener('resize', () => {
            ScrollTrigger.refresh();
        });
    }
}

    // 2. 고정 버튼(TOP & BACK) 스크롤 이벤트
    const topBtn = document.querySelector('.btn_top');
    const backBtn = document.querySelector('.btn_back'); 

    window.addEventListener('scroll', function() {
        const scrollY = window.scrollY;

        // TOP 버튼 제어
        if (topBtn) {
            if (scrollY > 300) topBtn.classList.add('on');
            else topBtn.classList.remove('on');
        }

        
    });
    if (backBtn) {
    backBtn.addEventListener('click', function(e) {
        e.preventDefault();
        const path = window.location.pathname;
        const pageName = path.split("/").pop(); 

        
        let projectIndex = 0;
        if (pageName.includes('clio')) {
            projectIndex = 0; 
        } else if (pageName.includes('providerq')) {
            projectIndex = 1; 
        }
        
        sessionStorage.setItem('lastProjectIndex', projectIndex);
        history.back();
    });
}
// clio section 공통 애니메이션
const fadeUpElements = document.querySelectorAll('section .txt_area, .swot_container, .analysis_container, .persona_card');

fadeUpElements.forEach((el) => {
    gsap.from(el, {
        scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none reverse" 
        },
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power2.out"
    });
});
// clio 개별 애니메이션
const animateSections = [
    { target: ".strategy_card", trigger: ".strategy_container" },
    { target: ".icon_item .img_box", trigger: ".kit_wrap" },
    { target: ".swot_item", trigger: ".swot_container" },
    { target: ".keyword_wrap, .moodboard_grid", trigger: ".concept_content" },
    { target: ".identity-card", trigger: ".identity-grid" },
    { target: ".comp_item", trigger: ".kit_wrap" }
];

animateSections.forEach((item) => {
    const triggerEl = document.querySelector(item.trigger);
    const targetEls = document.querySelectorAll(item.target);

    if (triggerEl && targetEls.length > 0) {
        gsap.from(targetEls, {
            scrollTrigger: {
                trigger: triggerEl,
                start: "top 80%", 
                toggleActions: "play none none none",
                
            },
            opacity: 0,
            y: 30,
            scale: 0.9,
            duration: 0.6,
            stagger: 0.1, 
            ease: "back.out(1.7)",
            clearProps: "all"
        });
    }
});

// clio 포지셔닝맵
const mapContainer = document.querySelector(".map_container");
if (mapContainer) {
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: mapContainer,
            start: "top 70%",
            toggleActions: "play none none none"
        }
    });

    tl.from(".axis_x, .axis_y", { scale: 0, duration: 0.8, ease: "power3.out" })
      .from(".axis_label", { opacity: 0, duration: 0.5 }, "-=0.3")
      .from(".brand:not(.clio)", { 
          opacity: 0, 
          y: 20, 
          stagger: 0.1, 
          duration: 0.5 
      }, "-=0.2")
      .from(".brand.clio", { 
          scale: 0, 
          opacity: 0, 
          duration: 0.8, 
          ease: "back.out(2)" 
      }, "+=0.2"); // 
}
// clio mockup
const mobileItems = document.querySelectorAll(".mobile_item");
if (mobileItems.length > 0) {
    gsap.from(mobileItems, {
        scrollTrigger: {
            trigger: ".mobile_wrap",
            start: "top 80%",
            toggleActions: "play none none none"
        },
        opacity: 0,
        y: 100,
        duration: 1,
        stagger: 0.3,
        ease: "power2.out"
    });
}

    
});