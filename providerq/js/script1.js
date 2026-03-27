$( window ).resize(function() { 
   //창크기 변화 감지
    var windowWidth = $( window ).width();  //이걸로 가로길이 확인하고
    
    var width_size = window.outerWidth;
    
   if(width_size>1024){//1024(햄버거나올때)
       
       $('header').mouseover(function(){                                    $('header').stop().animate({height : '320px'},200);
              $('header .innerHeader .gnb ul li .dept01').css("display","block"); 
        });
        
       //마우스 떼면
        $('header').mouseleave(function(){
            $('header').stop().animate({height : '90px'},200);
            $('header .innerHeader .gnb ul li .dept01').css("display","none"); 
        });
       
    }else if(width_size<=414){//전체창모드
        
        //마우스올리면
        $('header').mouseover(function(){                                    $('header').stop().animate({height : '60px'},200);
                  $('header .innerHeader .gnb ul li .dept01').css("display","none"); 
        });
        //마우스 떼면
        $('header').mouseleave(function(){
            $('header').stop().animate({height : '60px'},200);
            $('header .innerHeader .gnb ul li .dept01').css("display","none"); 
        });
    }else if(414<width_size<=1024){
        $('header').mouseover(function(){                                    $('header').stop().animate({height : '90px'},200);
                  $('header .innerHeader .gnb ul li .dept01').css("display","none"); 
        });
        //마우스 떼면
        $('header').mouseleave(function(){
            $('header').stop().animate({height : '90px'},200);
            $('header .innerHeader .gnb ul li .dept01').css("display","none");
         });
    }
}); 


$(document).ready(function(){
    var width_size = window.outerWidth;
    
   if(width_size>1024){//1024(햄버거나올때)
       
       $('header').mouseover(function(){                                    $('header').stop().animate({height : '320px'},200);
              $('header .innerHeader .gnb ul li .dept01').css("display","block"); 
        });
        
       //마우스 떼면
        $('header').mouseleave(function(){
            $('header').stop().animate({height : '90px'},200);
            $('header .innerHeader .gnb ul li .dept01').css("display","none"); 
        });
       
    }else if(width_size<=414){//전체창모드
        
        //마우스올리면
        $('header').mouseover(function(){                                    $('header').stop().animate({height : '60px'},200);
                  $('header .innerHeader .gnb ul li .dept01').css("display","none"); 
        });
        //마우스 떼면
        $('header').mouseleave(function(){
            $('header').stop().animate({height : '60px'},200);
            $('header .innerHeader .gnb ul li .dept01').css("display","none"); 
        });
    }else if(414<width_size<=1024){
        $('header').mouseover(function(){                                    $('header').stop().animate({height : '90px'},200);
                  $('header .innerHeader .gnb ul li .dept01').css("display","none"); 
        });
        //마우스 떼면
        $('header').mouseleave(function(){
            $('header').stop().animate({height : '90px'},200);
            $('header .innerHeader .gnb ul li .dept01').css("display","none");
         });
    }
    
    
    
    
    
    //햄버거 사이드메뉴에서 li클릭하면 하위메뉴 나오기
    $(".menu_wrap>ul>li>ul").hide();
    $(".menu_wrap>ul>li").click(function(){
        $("ul",this).slideToggle("fast");
    });
})



//모바일 햄버거버튼 메뉴 슬라이드
function barButtonAction() {
    console.log("BarButtonAction");
    showMenu();
}

function showMenu() {
    
    $(".menu_wrap").animate({
        right:"0px"},
        500,
        function(){
            $("#cover_close_button").css("display","block");
        });
        
}

function hideMenu() {
    
    console.log("hideMenu");
    $(".menu_wrap").animate({
        right:"-100%"
    },
    500,
    function() {
        $("#cover_close_button").css("display","none");
    });    
}
