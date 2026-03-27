window.addEventListener('DOMContentLoaded', function() {

    // 1. 연혁 스크롤
$(function () {
    if ($('.history_container').length > 0) {
        $(window).on('scroll', function () {
            let scrollTop = $(window).scrollTop();
            let windowHeight = $(window).height();
            let windowWidth = $(window).width();
            let scrollMiddle = scrollTop + (windowHeight / 2);

            
            let headerOffset = windowWidth <= 1024 ? 120 : 80;

            $('.timeline').each(function () {
                
                let targetTop = $(this).offset().top - headerOffset;
                let targetBottom = targetTop + $(this).outerHeight();
                let id = $(this).attr('id');

                if (scrollTop >= targetTop && scrollTop < targetBottom) {
                    let $activeBtn = $('.timeline_btn[href="#' + id + '"]');

                    if (!$activeBtn.hasClass('on')) {
                        $('.timeline_btn').removeClass('on');
                        $activeBtn.addClass('on');

                        if (windowWidth <= 1024) {
                            scrollToActiveBtn($activeBtn);
                        }
                    }
                }
            });

            // 오렌지색 선 애니메이션
            let $container = $('.history_container');
            if ($container.length > 0) {
                let containerTop = $container.offset().top;
                let containerHeight = $container.outerHeight();

                
                let startGap = windowWidth <= 767 ? 10 : 32;
                let endGap = windowWidth <= 767 ? 20 : 48;

                let progress = scrollMiddle - (containerTop + startGap);
                let totalPath = containerHeight - endGap;

                let scrollPercent = (progress / totalPath) * 100;

                
                scrollPercent = Math.min(Math.max(scrollPercent, 0), 100);

                $container.css('--line-height', scrollPercent + '%');
            }
        }); 
    } 

    // 활성화된 버튼을 가로 메뉴 중앙으로 스크롤시키는 함수
    function scrollToActiveBtn(target) {
        let $wrap = $('.timeline_btn_wrap ul');
        if ($wrap.length === 0) return;

        let targetLeft = target.position().left;
        let wrapScrollLeft = $wrap.scrollLeft();
        let wrapWidth = $wrap.width();
        let targetWidth = target.outerWidth();

        let moveScroll = wrapScrollLeft + targetLeft - (wrapWidth / 2) + (targetWidth / 2);

        $wrap.stop().animate({
            scrollLeft: moveScroll
        }, 300);
    }
    });

    // 2. culture-복리후생 슬라이드
    const tabs = document.querySelectorAll('.benefit_tabs');
    const container = document.querySelector('.benefit_tab_container');

    tabs.forEach((tab) => {
        tab.addEventListener('click', function() {
            
            tabs.forEach(t => t.classList.remove('on'));
            this.classList.add('on');

            
            const targetId = this.getAttribute('aria-controls');
            const targetContent = document.getElementById(targetId);
            
            
            document.querySelectorAll('.benefit_tab').forEach(content => {
                content.classList.remove('on');
            });
            targetContent.classList.add('on');

            
            const currentSwiper = targetContent.querySelector('.benefit_swiper').swiper;
            if (currentSwiper) {
                currentSwiper.slideTo(0, 0); 
            }

            this.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
        });
    });

    // Swiper 초기화 설정 
    if (typeof Swiper !== 'undefined' && document.querySelector('.benefit_swiper')) {
        const benefitSwiper = new Swiper('.benefit_swiper', {
            slidesPerView: 4.5,
            spaceBetween: 20,
            observer: true,
            observeParents: true,
            roundLengths: true,
            loop: false,
            breakpoints: {
                320: { slidesPerView: 1.2, spaceBetween: 15 },
                768: { slidesPerView: 2.5, spaceBetween: 20 },
                1440: { slidesPerView: 4.5, spaceBetween: 20 }
            }
        });
    }

    // 3. 재무정보 테이블 스크롤
    const scrollWraps = document.querySelectorAll('.scroll_wrap');

    scrollWraps.forEach((scrollWrap) => {
        
        const scrollContainer = scrollWrap.parentElement;

        
        if (scrollContainer && scrollContainer.classList.contains('scroll_container')) {
            
            function updateShadows() {
                const { scrollLeft, scrollWidth, clientWidth } = scrollWrap;

                
                if (scrollLeft > 0) {
                    scrollContainer.classList.add('is-left');
                } else {
                    scrollContainer.classList.remove('is-left');
                }

                
                if (scrollLeft < scrollWidth - clientWidth - 5) {
                    scrollContainer.classList.add('is-right');
                } else {
                    scrollContainer.classList.remove('is-right');
                }
            }

            
            scrollWrap.addEventListener('scroll', updateShadows);
            
            window.addEventListener('resize', updateShadows);
            
            updateShadows();
        }
    });


    // 4. 재무정보 막대 그래프
    const getChartSettings = () => {
        const width = window.innerWidth;
        return {
            fontSize: width < 768 ? 12 : 16,        
            barThickness: width < 768 ? 25 : 40,   
            paddingTop: width < 768 ? 20 : 30     
        };
    };

    const settings = getChartSettings();
    const barCtx = document.getElementById('barChart');
    if (barCtx) {
        const barChart = new Chart(barCtx.getContext('2d'), {
            type: 'bar',
            
            plugins: [ChartDataLabels], 
            data: {
                labels: ['2021년', '2022년', '2023년', '2024년'],
                datasets: [{
                    label: '배당금 (백만 원)',
                    data: [2534, 3502, 7004, 7010],
                    backgroundColor: ['#d9d9d9', '#d9d9d9', '#d9d9d9', '#f57820'],
                    borderRadius: 5,
                    barThickness: 40,
                    datalabels: {
                        color: '#1D1D1F', 
                        anchor: 'end',
                        align: 'top',  
                        offset: 5,     
                        font: {
                            weight: 'bold',
                            size: 16
                        },
                        
                        formatter: function(value) {
                            return value.toLocaleString();
                        }
                    }
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                layout: {
                    
                    padding: { top: 30 } 
                },
                scales: {
                    x: {
                        offset: true
                    },
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) { return value.toLocaleString(); }
                        }
                    }
                },
                plugins: {
                    
                    legend: { display: false }, 
                    datalabels: {
                        display: true 
                    }
                }
            }
        });
    }
    //재무정보 꺾은 선 그래프
    const divCtx = document.getElementById('lineChart'); 
    if (divCtx) {
        const lineChart = new Chart(divCtx.getContext('2d'), {
            type: 'line',
            
            plugins: [ChartDataLabels], 
            data: {
                labels: ['2021년', '2022년', '2023년', '2024년'],
                datasets: [{
                    label: '배당성향 (%)',
                    data: [27.3, 34.6, 25.6, 25.8],
                    borderColor: '#f57820',
                    backgroundColor: 'rgba(245, 120, 32, 0.05)', 
                    borderWidth: 3,
                    pointBackgroundColor: '#fff',
                    pointBorderColor: '#f57820',
                    pointRadius: 6,
                    pointHoverRadius: 8,
                    fill: true,
                    tension: 0.3,
                    datalabels: {
                        color: '#f57820', 
                        align: 'top',      
                        offset: 10,        
                        font: {
                            weight: 'bold',
                            size: 16
                        },
                        formatter: function(value) {
                            return value + '%'; 
                        }
                    }
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                layout: {
                    
                    padding: { top: 30, left: 10, right: 10 }
                },
                scales: {
                    x: {
                        offset: true,
                    },
                    y: {
                        beginAtZero: true,
                        max: 45, 
                        ticks: {
                            callback: function(value) { return value + '%'; }
                        }
                    }
                },
                plugins: {
                    legend: { display: false }, 
                    datalabels: {
                        display: true, 
                    }
                }
            }
        });
    }

    //5. 서브페이지 게시판 통합 관리//
    {
        // [1]페이징 처리
        const applyPagination = (container, items, itemsPerPage, currentPage) => {
            const numWrap = container.querySelector('.pagination_wrap .num');
            const prevBtn = container.querySelector('.pg_prev_btn');
            const nextBtn = container.querySelector('.pg_next_btn');
            if (!numWrap || !prevBtn || !nextBtn) return;

            const totalPages = Math.ceil(items.length / itemsPerPage) || 1;
            const pageCount = 5; 

            
            const currentGroup = Math.ceil(currentPage / pageCount);
            let startPage = (currentGroup - 1) * pageCount + 1;
            let endPage = Math.min(startPage + pageCount - 1, totalPages);

            numWrap.innerHTML = '';
            for (let i = startPage; i <= endPage; i++) {
                const link = document.createElement('a');
                link.className = `pg_link ${i === currentPage ? 'on' : ''}`;
                link.innerText = i;
                link.href = "#none";
                link.onclick = (e) => {
                    e.preventDefault();
                    
                    container.dispatchEvent(new CustomEvent('pageChange', { detail: i }));
                };
                numWrap.appendChild(link);
            }

            prevBtn.classList.toggle('disabled', currentPage === 1);
            nextBtn.classList.toggle('disabled', currentPage === totalPages);

            
            const start = (currentPage - 1) * itemsPerPage;
            const end = start + itemsPerPage;

            items.forEach((item, index) => {
                if (index >= start && index < end) {
                    
                    item.style.display = (item.tagName === 'TR') ? 'table-row' : 'flex';
                    
                    if (item.tagName === 'TR' && item.cells[0]) {
                        item.cells[0].innerText = items.length - index;
                    }
                } else {
                    item.style.display = 'none';
                }
            });
        };

    
    // 공시자료 게시판 (필터 및 원본 데이터 유지 로직)
    const publicInfoArea = document.querySelector('#publicinfo_tab1');
    if (publicInfoArea) {
        const tableBody = publicInfoArea.querySelector('tbody');
        const filterForm = publicInfoArea.querySelector('.filter_form');
        const datePreset = document.getElementById('date_preset');
        const startDateInp = document.getElementById('start_date');
        const endDateInp = document.getElementById('end_date');
        const boardInfoCount = publicInfoArea.querySelector('.board_info span');
        
        
        const originalRows = Array.from(tableBody.querySelectorAll('tr')).map(row => row.cloneNode(true));
        
        let currentPage = 1;
        const itemsPerPage = 10;
        let filteredData = [...originalRows];


        if (typeof flatpickr !== 'undefined') {
            flatpickr(".inp_date", {
                dateFormat: "Y.m.d",
                locale: "ko", 
                allowInput: true,
                onChange: function(selectedDates, dateStr, instance) {
                    
                }
            });
        }

        //기간 선택 시 날짜 자동 계산 로직 ---
        datePreset.addEventListener('change', function() {
            const val = this.value;
            const today = new Date();
            let start = new Date();

            if (val === 'all') {
                start = new Date("2016-11-09");
            } else if (val === '1w') {
                start.setDate(today.getDate() - 7);
            } else if (val === '6m') {
                start.setMonth(today.getMonth() - 6);
            } else if (val === '1y') {
                start.setFullYear(today.getFullYear() - 1);
            }

            
            const fpStart = startDateInp._flatpickr;
            const fpEnd = endDateInp._flatpickr;

            if (fpStart && fpEnd) {
                
                fpStart.setDate(start, false);
                fpEnd.setDate(today, false);
            } else {
                
                const formatDate = (date) => {
                    const y = date.getFullYear();
                    const m = String(date.getMonth() + 1).padStart(2, '0');
                    const d = String(date.getDate()).padStart(2, '0');
                    return `${y}.${m}.${d}`;
                };
                startDateInp.value = formatDate(start);
                endDateInp.value = formatDate(today);
            }

            
            currentPage = 1;
            
        });

        // --- 필터 및 화면 갱신 함수 ---
        const updatePublicBoard = () => {
            const startVal = startDateInp.value;
            const endVal = endDateInp.value;
            const disclosureSelect = document.getElementById('disclosure');
            const selectedTypeText = disclosureSelect.options[disclosureSelect.selectedIndex].text;

            // 필터링 (유형 + 날짜)
            filteredData = originalRows.filter(row => {
                const rowType = row.cells[1].innerText.trim();
                const rowDate = row.cells[3].innerText.trim();
                
                const matchType = (disclosureSelect.value === "" || disclosureSelect.value === "all" || rowType === selectedTypeText);
                
                let matchDate = true;
                if (startVal && endVal) matchDate = (rowDate >= startVal && rowDate <= endVal);
                else if (startVal) matchDate = (rowDate >= startVal);
                else if (endVal) matchDate = (rowDate <= endVal);

                return matchType && matchDate;
            });

            // 최신순 정렬 및 개수 업데이트
            filteredData.sort((a, b) => b.cells[3].innerText.localeCompare(a.cells[3].innerText));
            if (boardInfoCount) boardInfoCount.innerText = filteredData.length;
            
            // 테이블 갱신
            tableBody.innerHTML = '';
            if (filteredData.length === 0) {
                tableBody.innerHTML = '<tr><td colspan="4" style="text-align:center; padding:50px 0;">검색 결과가 없습니다.</td></tr>';
            } else {
                filteredData.forEach(row => tableBody.appendChild(row));
            }

        // 페이지네이션 호출
            applyPagination(publicInfoArea, filteredData, itemsPerPage, currentPage);
        };

        
        publicInfoArea.addEventListener('pageChange', (e) => {
            currentPage = e.detail;
            updatePublicBoard();
        });

        publicInfoArea.querySelector('.pg_prev_btn').onclick = (e) => {
            e.preventDefault();
            if (currentPage > 1) { currentPage--; updatePublicBoard(); }
        };

        publicInfoArea.querySelector('.pg_next_btn').onclick = (e) => {
            e.preventDefault();
            const totalPages = Math.ceil(filteredData.length / itemsPerPage) || 1;
            if (currentPage < totalPages) { currentPage++; updatePublicBoard(); }
        };

        if (filterForm) {
            filterForm.onsubmit = (e) => {
                e.preventDefault();
                currentPage = 1;
                updatePublicBoard();
            };
        }

        updatePublicBoard(); 
    }

        // 일반 리스트 게시판 (전자공고, 실적자료)
        const initSimpleBoard = (selector) => {
        const container = document.querySelector(selector);
        if (!container) return;

        
        const listContainer = container.querySelector('ul') || container.querySelector('tbody') || container.querySelector('.press_grid_container');;
        if (!listContainer) return;

        
        const allItems = Array.from(listContainer.children); 
        
        let currentPage = 1;
        const itemsPerPage = 10;

        const render = () => applyPagination(container, allItems, itemsPerPage, currentPage);

        container.addEventListener('pageChange', (e) => { currentPage = e.detail; render(); });
        
        
        const prevBtn = container.querySelector('.pg_prev_btn');
        const nextBtn = container.querySelector('.pg_next_btn');
        
        if(prevBtn) prevBtn.onclick = (e) => { e.preventDefault(); if (currentPage > 1) { currentPage--; render(); } };
        if(nextBtn) nextBtn.onclick = (e) => { e.preventDefault(); if (currentPage < Math.ceil(allItems.length / itemsPerPage)) { currentPage++; render(); } };

        render();
    };

        initSimpleBoard('#publicinfo_tab2'); // 전자공고
        initSimpleBoard('.ir_earnings');     // 실적자료
        initSimpleBoard('.notice_wrap');     // 공지사항
        initSimpleBoard('#pressTab1', 8); //뉴스
        initSimpleBoard('#pressTab2', 8);
        initSimpleBoard('#pressTab3', 8);
    }


    // 6. faq 아코디언
    $('.faq_q_btn').click(function() {
        const targetItem = $(this).closest('.item');
        const isOpen = targetItem.hasClass('on');
        
        $(this).attr('aria-expanded', isOpen);  
        
        if (targetItem.hasClass('on')) {
            targetItem.removeClass('on');
        } else {
            $('.item').removeClass('on'); 
            targetItem.addClass('on'); 
        }
    });


    // 7. 파일 선택시 파일명 표시 로직
    const fileTarget = document.querySelector('#ptn_file');

    if (fileTarget) {
        fileTarget.addEventListener('change', function() {
            if (window.FileReader) {
                
                var filename = $(this)[0].files[0].name;
            } else {
                
                var filename = $(this).val().split('/').pop().split('\\').pop();
            }

            
            document.querySelector('#ptn_file_name').value = filename;
        });
    }

// 8. 실시간 유효성 검사
    $(document).on('input change', '[required]', function() {
        const $el = $(this);
        const id = $el.attr('id');
        const val = $.trim($el.val());
        const $err = $('#err_' + id);
        let isSpecValid = true;
        let customMsg = "";

        if (val === "") {
            isSpecValid = false;
        } 
        // [휴대폰 번호 세분화]
        else if (id.indexOf('phone') !== -1) {
            const isNumeric = /^[0-9]+$/.test(val);
            if (!isNumeric) {
                isSpecValid = false;
                customMsg = "숫자만 입력 가능합니다.";
            } else if (val.length < 10 || val.length > 11) {
                isSpecValid = false;
                customMsg = "휴대폰 번호는 10~11자리여야 합니다.";
            }
        }
        // [비밀번호 복잡도 세분화]
        else if (id === 'report_pwd' || id === 'resultPw') {
            // 영문, 숫자, 특수문자 포함 4~20자
            const pwdReg = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+|~={}\[\]:;<>?,./]).{8,20}$/;
            if (!pwdReg.test(val)) {
                isSpecValid = false;
                customMsg = "영문, 숫자, 특수문자 포함 8~20자 내로 입력해야 합니다.";
            }
        }
        // [비밀번호 확인 일치]
        else if (id === 'report_pwd_confirm') {
            if (val !== $('#report_pwd').val()) {
                isSpecValid = false;
                customMsg = "비밀번호가 일치하지 않습니다.";
            }
        }
        // [이메일 형식]
        else if (id.indexOf('email') !== -1) {
            const reg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            if(!reg.test(val)) {
                isSpecValid = false;
                customMsg = "올바른 이메일 형식이 아닙니다.";
            }
        }

        // 결과 반영
        if (isSpecValid) {
            $err.hide().text("");
            $el.closest('.input_item').removeClass('is_error');
        } else if (val !== "") {
            // 값이 있는데 형식이 틀린 경우 실시간으로 메시지 교체
            $err.text(customMsg).show();
            $el.closest('.input_item').addClass('is_error');
        }
    });

    // 비밀번호 연동
    $('#report_pwd').on('input', function() {
        $('#report_pwd_confirm').trigger('input');
    });

    // 2. [전송 시] 최종 검사 
    $('form').on('submit', function(e) {
        const $form = $(this);
        let isValid = true;
        let $firstErr = null;

        $form.find('[required]').each(function() {
            const $el = $(this);
            const id = $el.attr('id');
            const val = $.trim($el.val());
            const $err = $('#err_' + id);
            let msg = "필수 입력 항목입니다.";
            let isItemValid = true;

            if ($el.is(':checkbox') && !$el.is(':checked')) {
                isItemValid = false;
                msg = "내용에 동의해 주세요.";
            } else if (val === "") {
                isItemValid = false;
            } else {
                
                if (id.indexOf('phone') !== -1) {
                    if (!/^[0-9]+$/.test(val)) { isItemValid = false; msg = "숫자만 입력 가능합니다."; }
                    else if (val.length < 10 || val.length > 11) { isItemValid = false; msg = "휴대폰 번호는 10~11자리여야 합니다."; }
                } else if (id === 'report_pwd' || id === 'resultPw') {
                    const pwdReg = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+|~={}\[\]:;<>?,./]).{8,20}$/;
                    if (!pwdReg.test(val)) { isItemValid = false; msg = "영문, 숫자, 특수문자 포함 8~20자 내로 입력해야 합니다."; }
                } else if (id === 'report_pwd_confirm') {
                    if (val !== $('#report_pwd').val()) { isItemValid = false; msg = "비밀번호가 일치하지 않습니다."; }
                } else if (id.indexOf('email') !== -1) {
                    const reg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
                    if(!reg.test(val)) { isItemValid = false; msg = "올바른 이메일 형식이 아닙니다."; }
                }
            }

            if (!isItemValid) {
                isValid = false;
                if ($err.length) $err.text(msg).show();
                $el.closest('.input_item').addClass('is_error');
                if (!$firstErr) $firstErr = $el;
            }
        });

        if (!isValid) {
            e.preventDefault();
            $firstErr.focus();
            return false;
        }else {
        
            e.preventDefault(); 
            const formId = $form.attr('id');

            if (formId === 'ptnCheckForm') {
                location.href = "partner_result.html";
            } 
            else if (formId === 'checkForm') {
                location.href = "report_result.html";
            }
            else if (formId === 'ptnForm') {
                alert("제휴 협력 문의가 성공적으로 접수되었습니다.");
            }
            else if (formId === 'reportForm') {
                alert("성공적으로 제보되었습니다.");
            }
        }

        
    });
    

    // 9. 서브페이지 상세 게시판(NEWS & SUPPORT) 통합 관리 ---
    const urlParams = new URLSearchParams(window.location.search);
    const boardType = urlParams.get('type');
    const postId = parseInt(urlParams.get('id'));

    
    if (boardType && !isNaN(postId)) {
        
        // 게시판 타입별 상단 타이틀 및 목록 버튼 세팅
        if (boardType === 'news') {
            $('#board_title').text('NEWS');
            $('#board_desc').text('클리오의 공식 보도자료와 미디어 소식을 확인하세요.');
            $('.subpage_header').addClass('press'); 
            $('#back_to_list').attr('href', 'news.html');
        } else {
            $('#board_title').text('공지사항');
            $('#board_desc').text('클리오의 새로운 소식과 주요 안내 사항을 확인하세요.');
            $('.subpage_header').addClass('notice'); 
            $('#back_to_list').attr('href', 'notice.html');
        }

        
        const jsonPath = boardType === 'news' ? './data/news.json' : './data/notice.json';

        $.getJSON(jsonPath, function(data) {
            const currentIndex = data.findIndex(item => item.id === postId);
            const currentItem = data[currentIndex];

            if (currentItem) {
                
                $('.detail_cate').text(boardType === 'news' ? 'NEWS' : 'NOTICE');
                $('.detail_title').text(currentItem.title);
                $('.detail_date').text(currentItem.date);
                $('.text_area').html(currentItem.content);
                
                // 이미지 처리
                if (currentItem.img && currentItem.img !== "") {
                    
                    $('.detail_img img').attr('src', currentItem.img).attr('alt', currentItem.title);
                    
                    $('.detail_img').show(); 
                } else {
                    
                    $('.detail_img').hide();
                }

                // 이전글 / 다음글 세팅
                
                if (currentIndex > 0) {
                    const next = data[currentIndex - 1];
                    $('.move_row_next a').attr('href', `board_detail.html?type=${boardType}&id=${next.id}`);
                    $('.move_row_next .move_title').text(next.title);
                    $('.move_row_next').removeClass('no_data');
                } else {
                    $('.move_row_next').addClass('no_data').find('.move_title').text('다음 글이 없습니다.');
                }

                
                if (currentIndex < data.length - 1) {
                    const prev = data[currentIndex + 1];
                    $('.move_row_prev a').attr('href', `board_detail.html?type=${boardType}&id=${prev.id}`);
                    $('.move_row_prev .move_title').text(prev.title);
                    $('.move_row_prev').removeClass('no_data');
                } else {
                    $('.move_row_prev').addClass('no_data').find('.move_title').text('이전 글이 없습니다.');
                }
            }
        });
    }
});



