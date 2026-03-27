window.addEventListener('DOMContentLoaded', function() {

    /* ==========================================
   슬라이더 (메인 비주얼)
   ========================================== */
    try {
        // --- 메인 슬라이더 영역 ---
        if ($('.gallery-top').length > 0 && $('.gallery-thumbs').length > 0) {
            var MAIN_SPEED = 800; 
            var MAIN_DELAY = 4000;

            var galleryTop = new Swiper('.gallery-top', {
                effect: "fade",
                fadeEffect: { crossFade: true },
                allowTouchMove: false,
                speed: MAIN_SPEED,
                loop: true,
                loopedSlides: 3, 
            });

            var isMobile = $(window).width() <= 1439;
            var galleryThumbs = new Swiper('.gallery-thumbs', {
            slidesPerView: 1.05,
            spaceBetween: 20,
            centeredSlides: false,
            loop: true,
            loopAdditionalSlides: 0,
            loopedSlides: 3,
            breakpoints: {
        
                0: {
                    slidesPerView: 1,
                    spaceBetween: 0,
                },
                1440: {
                    slidesPerView: 1.05,
                    spaceBetween: 20,
                }
            },
            slidesOffsetBefore: 0, 
            slidesOffsetAfter: 0,
            watchSlidesProgress: true,
            roundLengths: true,
            normalizeSlideIndex: true,
            observer: true,
            observeParents: true,
            speed: MAIN_SPEED,
            autoplay: {
                delay: MAIN_DELAY,
                disableOnInteraction: false,
            },
            allowTouchMove: true,
            pagination: { el: ".main-pagination", clickable: true },
            on: {
                slideChangeTransitionStart: function () {
                    var realIdx = this.realIndex;
                    
                    if (galleryTop && typeof galleryTop.slideToLoop === 'function') {
                        galleryTop.slideToLoop(realIdx, MAIN_SPEED);
                    }
                    
                    $('.txt_item').removeClass('on').eq(realIdx).addClass('on');
                } 
            } 
        }); 
    } 


        // --- 브랜드 슬라이더 영역  ---
        if (document.querySelector('.mySwiper')) {
            new Swiper(".mySwiper", {
                navigation: { nextEl: ".brands_next_btn", prevEl: ".brands_prev_btn" },
                slidesPerView: 3.8,
                centeredSlides: true,
                spaceBetween: 30,
                loop: true,
                autoplay: { delay: 3000 }, 
                observer: true, 
                observeParents: true,
                breakpoints: {
                    320: { slidesPerView: 1.2, spaceBetween: 15 },
                    768: { slidesPerView: 2.5, spaceBetween: 20 },
                    1440: { slidesPerView: 3.8, spaceBetween: 30 }
                }
            });
        }
    } catch (e) {
        console.warn("슬라이더 실행 오류:", e);
    }


    // 뉴스섹션 슬라이드
    let currentIdx = 0; 

    
    const newsSwiper = new Swiper('.mo_news_wrap', {
        loop: false,
        slidesPerView: 1.2,
        spaceBetween: 20,
        observer: true,
        observeParents: true,
        breakpoints: {
            768: { slidesPerView: 2.2, spaceBetween: 20 }
        },
    });

    // 해상도별 레이아웃 제어 함수
    function checkLayout() {
        let winW = window.innerWidth;
        if (winW >= 1440) {
            $('.pc_view_area').show();
            $('.mo_swiper_container').hide();
            $('.pc_view_area .news_tab').hide().eq(currentIdx).show();
        } else {
            $('.pc_view_area').hide();
            $('.mo_swiper_container').show();
            $('.mo_news_wrap').hide().removeClass('on');
            $('.mo_news_wrap').eq(currentIdx).show().addClass('on');
            
            if (newsSwiper.length > 0) {
                newsSwiper[currentIdx].update();
            }
        }
    }

    // 탭 버튼 클릭 이벤트
    $('.news_tabs').on('click', function() {
        currentIdx = $(this).index();
        $('.news_tabs').removeClass('on');
        $(this).addClass('on');

        $('.pc_view_area .news_tab, .mo_news_wrap').hide().removeClass('on');
        $('.pc_view_area .news_tab').eq(currentIdx).show().addClass('on');
        $('.mo_news_wrap').eq(currentIdx).show().addClass('on');

        if (newsSwiper.length > 0) {
            newsSwiper[currentIdx].update();
        } else if (newsSwiper.update) {
            newsSwiper.update();
        }
    });

    // 초기 실행 및 리사이즈 감지
    checkLayout();
    window.addEventListener('resize', checkLayout);
    



    // 팝업창
    if (getCookie("today_notice") !== "done") {
        const popup = document.getElementById("notice_popup");
        if (popup) popup.style.display = "flex";
    }
    
});

function setCookie(name, value, expiredays) {
    let todayDate = new Date();
    todayDate.setDate(todayDate.getDate() + expiredays);
    document.cookie = name + "=" + escape(value) + "; path=/; expires=" + todayDate.toGMTString() + ";";
}

function getCookie(name) {
    let nameOfCookie = name + "=";
    let x = 0;
    while (x <= document.cookie.length) {
        let y = (x + nameOfCookie.length);
        if (document.cookie.substring(x, y) === nameOfCookie) {
            let endOfCookie = document.cookie.indexOf(";", y);
            if (endOfCookie === -1) endOfCookie = document.cookie.length;
            return unescape(document.cookie.substring(y, endOfCookie));
        }
        x = document.cookie.indexOf(" ", x) + 1;
        if (x === 0) break;
    }
    return "";
}

function closePopup() {
    const check = document.getElementById("today_check");
    if (check && check.checked) {
        setCookie("today_notice", "done", 1); // 1일 저장
    }
    const popup = document.getElementById("notice_popup");
    if (popup) popup.style.display = "none";
}

