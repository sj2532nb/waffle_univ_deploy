(function($, window, document, undefined){

    const waffleUniv = {
        init(){
            this.header();
            this.section1();
            this.section3();
            this.section5();
        },
        header(){

            // 1. 스무스 스크롤링
            $(`.main-btn`).on({
                click(){
                    let pos = $(this).attr(`href`);
                    $(`html, body`).animate({ scrollTop: $( pos ).offset().top }, 500);
                }
            });

            // 2. 패럴럭스
            let newScroll = $(window).scrollTop();
            let section2Top = $(`#section2`).offset().top;

            $(window).scroll(function(){
                newScroll = $(window).scrollTop();

                if(newScroll>section2Top){
                    $('#header').show();
                    $('#header').addClass('off');
                    $('#header').removeClass('on');
                }
                if(newScroll<section2Top){
                    $('#header').addClass('on');
                    $('#header').removeClass('off');
                }

            });
        },

        section1(){
            const $slide = $(`#section1 .slide`);
            let setId = 0;
            let cnt = 0;

            // 1. 메인슬라이드함수(페이드인)
            function mainSlide(){
                $slide                    .css({zIndex: 1, opacity:1});
                $slide.eq(cnt===0 ? 2 : cnt-1).css({zIndex: 2});
                $slide.eq(cnt)            .css({zIndex: 3}).stop().animate({opacity:0}, 0).animate({opacity:1}, 4000);
            }

            // 2. 다음카운트함수
            function nextCount(){
                cnt++;
                if(cnt>2){
                    cnt=0;
                }
                mainSlide();
            }

            // 3. 자동타이머함수
            function autoTimer(){
                setId = setInterval(nextCount, 4000);
            }
            autoTimer();

        },

        section3(){
            let cnt=0;
            let setId = 0;

            // 1. 메인슬라이드함수
            function mainSlide(){
                $(`#section3 .slide-wrap`).stop().animate({left: `${-25*cnt}%`}, 1000, 'easeInOutCirc', function(){
                    if(cnt>12) cnt=0;
                    $(`#section3 .slide-wrap`).stop().animate({left: `${-25*cnt}%`}, 0);
                });

                pageNation();
            }

            // 2. 다음카운트함수
            function nextCount(){
                cnt++;
                mainSlide();
            }

            // 3. 자동타이머함수
            function autoTimer(){
                setId = setInterval(nextCount, 2000);
            }
            autoTimer();

            // 4. 슬라이드 박스에 마우스 올리면 자동타이머 중지
            $(`#section3 .slide-wrap`).on({
                mouseenter(){
                    clearInterval(setId);
                },
                mouseleave(){
                    autoTimer();
                }
            });

             // 5. 터치 스와이프
            let touchStart = 0;
            let touchEnd = 0;
            let mouseDown = false;
            let dragStart = 0;
            let dragEnd = 0;
            let winWidth = $(window).innerWidth();

            $(`#section3`).on({
                mousedown(e){
                    winWidth = $(window).innerWidth();
                    clearInterval(setId);
                    mouseDown=true;
                    touchStart = e.clientX;
                    dragStart = e.clientX - $(`#section3 .slide-wrap`).offset().left-winWidth;
                },
                mouseup(e){
                    touchEnd = e.clientX;
                    if(touchStart - touchEnd > 0){
                        if( !$(`#section3 .slide-wrap`).is(`:animated`) ){
                            nextCount();
                        }
                    }
                    if(touchStart - touchEnd < 0){
                        if( !$(`#section3 .slide-wrap`).is(`:animated`) ){
                            prevCount();
                        }
                    }
                    mouseDown=false;

                },
                mousemove(e){
                    if(mouseDown!==true)return;
                    dragEnd = e.clientX;
                    $(`#section3 .slide-wrap`).css({left: dragEnd - dragStart});
                }
            });

            // 6. 페이지네이션
            function pageNation(){
                $(`#section3 .page-nation-btn`).removeClass(`on`);
                $(`#section3 .page-nation-btn`).eq(cnt>-1 && cnt<4 ? 0 : 10000).addClass(`on`);
                $(`#section3 .page-nation-btn`).eq(cnt>=4 && cnt<8 ? 1 : 10000).addClass(`on`);
                $(`#section3 .page-nation-btn`).eq(cnt>=8 && cnt<12 ? 2 : 10000).addClass(`on`);
                $(`#section3 .page-nation-btn`).eq(cnt===12 ? 3 : 10000).addClass(`on`);
            }

            $(`#section3 .page-nation-btn`).eq(0).on({
                click(e){
                    e.preventDefault();
                    clearInterval(setId);
                    cnt=0;

                    mainSlide();
                }
            });
            $(`#section3 .page-nation-btn`).eq(1).on({
                click(e){
                    e.preventDefault();
                    clearInterval(setId);
                    cnt=4;

                    mainSlide();
                }
            });
            $(`#section3 .page-nation-btn`).eq(2).on({
                click(e){
                    e.preventDefault();
                    clearInterval(setId);
                    cnt=8;

                    mainSlide();
                }
            });
            $(`#section3 .page-nation-btn`).eq(3).on({
                click(e){
                    e.preventDefault();
                    clearInterval(setId);
                    cnt=12;

                    mainSlide();
                }
            });

            // 3. 베스트메뉴 클릭 이벤트
            $(`#section3 .menu-btn`).eq(0).on({
                click(e){
                    e.preventDefault();
                    cnt=0;

                    mainSlide();
                    $(`.page-nation-btn`).stop().fadeIn(0);
                }
            });
            $(`#section3 .menu-btn`).eq(1).on({
                click(e){
                    e.preventDefault();
                    clearInterval(setId);
                    cnt=0;

                    mainSlide();
                    $(`.page-nation-btn`).stop().fadeOut(0);
                }
            });
            $(`#section3 .menu-btn`).eq(2).on({
                click(e){
                    e.preventDefault();
                    clearInterval(setId);
                    cnt=4;

                    mainSlide();
                    $(`.page-nation-btn`).stop().fadeOut(0);
                }
            });
            $(`#section3 .menu-btn`).eq(3).on({
                click(e){
                    e.preventDefault();
                    clearInterval(setId);
                    cnt=8;

                    mainSlide();
                    $(`.page-nation-btn`).stop().fadeOut(0);
                }
            });
            $(`#section3 .menu-btn`).eq(4).on({
                click(e){
                    e.preventDefault();
                    clearInterval(setId);
                    cnt=12;

                    mainSlide();
                    $(`.page-nation-btn`).stop().fadeOut(0);
                }
            });

        },

        section5(){
            let cnt=0;
            let setId = 0;

            // 1. 메인슬라이드함수
            function mainSlide(){
                $(`#section5 .slide-wrap`).stop().animate({left: `${-33.33333*cnt}%`}, 1000, 'easeInOutCirc', function(){
                    if(cnt>5) cnt=0;
                    $(`#section5 .slide-wrap`).stop().animate({left: `${-33.33333*cnt}%`}, 0);
                });

                pageNation();
            }

            // 2. 다음카운트함수
            function nextCount(){
                cnt++;
                mainSlide();
            }

            // 3. 자동타이머함수
            function autoTimer(){
                setId = setInterval(nextCount, 2000);
            }
            autoTimer();

            // 4. 슬라이드 박스에 마우스 올리면 자동타이머 중지
            $(`#section5 .slide-wrap`).on({
                mouseenter(){
                    clearInterval(setId);
                },
                mouseleave(){
                    autoTimer();
                }
            });



            // 5. 페이지네이션 함수
            function pageNation(){
                $(`#section5 .page-btn`).removeClass(`on`);
                $(`#section5 .page-btn`).eq(cnt>2 && cnt<6 ? 1 : 0).addClass(`on`);
            }
            // 클릭했을때
            $(`#section5 .page-btn`).eq(0).on({
                click(e){
                    e.preventDefault();
                    clearInterval(setId);
                    cnt=0;
                    mainSlide();
                }
            });
            $(`#section5 .page-btn`).eq(1).on({
                click(e){
                    e.preventDefault();
                    clearInterval(setId);
                    cnt=3;
                    mainSlide();
                }
            });

            // 6. 터치 스와이프
            let touchStart = 0;
            let touchEnd = 0;
            let mouseDown = false;
            let dragStart = 0;
            let dragEnd = 0;
            let winWidth = $(window).innerWidth();

            $(`#section5`).on({
                mousedown(e){
                    winWidth = $(window).innerWidth();
                    clearInterval(setId);
                    mouseDown=true;
                    touchStart = e.clientX;
                    dragStart = e.clientX - $(`#section5 .slide-wrap`).offset().left-winWidth;
                },
                mouseup(e){
                    touchEnd = e.clientX;
                    if(touchStart - touchEnd > 0){
                        if( !$(`#section5 .slide-wrap`).is(`:animated`) ){
                            nextCount();
                        }
                    }
                    if(touchStart - touchEnd < 0){
                        if( !$(`#section5 .slide-wrap`).is(`:animated`) ){
                            prevCount();
                        }
                    }
                    mouseDown=false;
                },
                mousemove(e){
                    if(mouseDown!==true)return;
                    dragEnd = e.clientX;
                    $(`#section5 .slide-wrap`).css({left: dragEnd - dragStart});
                }
            });

        }
    }
    
    waffleUniv.init();


})(jQuery, window, document, undefined);