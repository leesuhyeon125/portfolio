window.addEventListener('DOMContentLoaded', function() {

    /* ==========================================
       1. GNB & 레이아웃 (PC 호버 및 모바일 클릭 통합)
       ========================================== */
    const headerEl = document.querySelector(".header");
    const gnbEl = document.querySelector(".gnb");
    const menu1List = document.querySelectorAll(".menu1>li");
    // 새로 만든 햄버거 버튼 선택
    const menuBtn = document.querySelector(".m_menu_btn"); 

    // 메뉴 닫기 함수 (공통 사용)
    function closeMenu() {
        if (headerEl && gnbEl) {
            headerEl.classList.remove("on");
            gnbEl.classList.remove("on"); 
            if (menuBtn) menuBtn.classList.remove("open"); 
            document.body.style.overflow = "auto";
        }
    }

    // PC 버전: GNB 마우스 호버 로직
    if (gnbEl) {
        gnbEl.addEventListener('mouseenter', function() {
            if (window.innerWidth >= 1440) {
                headerEl.classList.add("on"); 
            }
        });

        menu1List.forEach(function(li) {
            li.addEventListener("mouseenter", function() {
                if (window.innerWidth >= 1440) {
                    li.classList.add("on");
                }
            });
            li.addEventListener("mouseleave", function() {
                if (window.innerWidth >= 1440) {
                    li.classList.remove("on");
                }
            });
        });

        headerEl.addEventListener('mouseleave', function() {
            if (window.innerWidth >= 1440) {
                headerEl.classList.remove("on");
            }
        });
    }

    // 모바일 버전: 햄버거 버튼 클릭 (토글) 로직
    if (menuBtn) {
        menuBtn.onclick = function(e) {
            e.preventDefault();
            
            // 이미 열려있다면 닫고, 닫혀있다면 열기
            if (this.classList.contains("open")) {
                closeMenu();
            } else {
                this.classList.add("open"); 
                headerEl.classList.add("on"); 
                gnbEl.classList.add("on"); 
            }
        };
    }

    // 모바일 아코디언 메뉴 (1439px 이하)
    var menuLinks = document.querySelectorAll(".menu1 > li > a");

menuLinks.forEach(function(link) {
    link.onclick = function(e) {
        if (window.innerWidth <= 1439) {
            var parentLi = this.parentElement;
            var subMenu = this.nextElementSibling;

            
            if (subMenu && subMenu.classList.contains("menu2")) {
                e.preventDefault(); 
                e.stopPropagation();

                
                var isOpen = parentLi.classList.contains("on");

                
                document.querySelectorAll(".menu1 > li").forEach(function(li) {
                    li.classList.remove("on");
                });

                
                if (!isOpen) {
                    parentLi.classList.add("on");
                }
                
            }
        }
    };
});

// 리사이즈 시 초기화
window.addEventListener('resize', function() {
    if (window.innerWidth >= 1440) {
        closeMenu();
        
        document.querySelectorAll(".menu2").forEach(function(m2) {
            m2.style.display = ""; 
        });
    }
});

// top menu 
const $header = $('.header');
const $gnb = $('.gnb');
const $menu1 = $('.menu1');
const $topMenu = $('.top_menu');

function responsiveMenu() {
    var windowWidth = $(window).width();

    if (windowWidth <= 767) {
        // [모바일] menu1의 자식으로 이동
        if ($menu1.find('.top_menu').length === 0) {
            $menu1.append($topMenu);
            console.log("모바일: 유틸메뉴 이동됨");
        }
    } else {
        // [PC] gnb 바로 뒤로 복구
        // 수현님 HTML 구조상 .header 바로 아래, .gnb 뒤에 위치해야 함
        if ($header.find('> .top_menu').length === 0) {
            $topMenu.insertAfter($gnb); 
            console.log("PC: 유틸메뉴 복구됨");
        }
    }
}

// 초기 실행 및 리사이즈 이벤트 연결
responsiveMenu();
$(window).on('resize', function() {
    responsiveMenu();
});

// 언어 지원 서비스 클릭 토글 (이벤트 위임 방식으로 중복 방지)
$(document).off('click', '.top_menu1').on('click', '.top_menu1', function(e) {
    e.preventDefault();
    e.stopPropagation(); 

    var $parentLi = $(this).closest('li');
    $parentLi.toggleClass('on').siblings().removeClass('on');
});

    // 외부 영역 클릭 시 메뉴 닫기 
    $(document).on('click', function() {
        $('.top_menu li').removeClass('on');
    });

    /* ==========================================
       2. 패밀리 사이트
       ========================================== */
    var familyBtn = document.querySelector(".family_btn");
    var familyList = document.querySelector(".family_site ul");
    if(familyBtn && familyList){
        familyBtn.onclick = function(e){
            e.preventDefault();
            e.stopPropagation();
            familyList.classList.toggle("on");
            familyBtn.classList.toggle("on");
            
        };
        document.onclick = function(){ 
            familyList.classList.remove("on"); 
            familyBtn.classList.remove("on");
        };
    }


    /* ==========================================
       3. 탭 메뉴
       ========================================== */
    function initTab(btnS, conS) {
        var btns = document.querySelectorAll(btnS);
        btns.forEach(function(btn) {
            btn.onclick = function() {
                var tid = this.getAttribute("aria-controls");
                document.querySelectorAll(btnS).forEach(function(b){ b.classList.remove("on"); });
                document.querySelectorAll(conS).forEach(function(c){ c.classList.remove("on"); });
                var accordions = document.querySelectorAll(".faq_accordian .item");
                if (accordions.length > 0) {
                    accordions.forEach(function(item) {
                        item.classList.remove("on");
                    });
                }
                this.classList.add("on");
                if(document.getElementById(tid)) document.getElementById(tid).classList.add("on");
            };
        });
    }
    
    initTab(".benefit_tabs", ".benefit_tab");
    initTab(".fininfo_tabs", ".fininfo_tab");
    initTab(".publicinfo_tabs", ".publicinfo_tab");
    initTab(".faq_tabs", ".faq_tab");
    initTab(".ptn_tabs", ".ptn_tab");
    initTab(".press_tabs", ".press_tab");


    /* ==========================================
       4. top btn
       ========================================== */
    const topBtn = document.getElementById('backToTop');

    // 1. 스크롤 감지에 따른 버튼 노출
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            topBtn.classList.add('show');
        } else {
            topBtn.classList.remove('show');
        }
    });

    // 2. 버튼 클릭 시 상단으로 부드럽게 이동
    topBtn.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth' 
        });
    });

    
});