var flag = 0; 
$(function(){
    resizeWindowEvt($( window ).width());

    $( window ).resize( function() {
        resizeWindowEvt($(this).width());
    });

    $('.menu_btn>a').on('click', function(){
        $('.menu_bg').show(); 
        $('.sidebar_menu').show().animate({
            right:0
        });  
    });
    $('.close_btn, .menu_bg').on('click', function(){
        $('.sidebar_menu').animate({
            right: '-' + 50 + '%'
        },function(){
            $('.sidebar_menu').hide();   
            $('.menu_bg').hide();        
        });  
    });
    $('.menu_bg, .sidebar_menu').on('scroll touchmove mousewheel', function(event) {
        event.preventDefault();
        event.stopPropagation();
        return false;
    });

    $(".mobile_menu > li > a").click(function(){
        $(this).siblings("ul").slideToggle(300);
        $(this).parents("li").toggleClass("on")
    })
    
    // 메뉴 hover event
    $(".mainMenu div").mouseenter(function(){
        flag = 0;
        if(!$(this).find("a").hasClass("on")){
            $(".subMenu").slideUp(100);
            $(".mainMenu div a").removeClass("on");
            $(this).find("a").addClass("on");
            $("." + $(this).find("a").attr("id") + "_sub").slideDown(300); 
            ++flag;
        }
    });
    
    $('.mainMenu div').click(function(){
        ++flag;
        if(flag > 2) {
            if(!$(this).find("a").hasClass("on")){
                $("." + $(this).find("a").attr("id") + "_sub").slideDown(300); 
            } else{
                $("." + $(this).find("a").attr("id") + "_sub").slideUp(300); 
                $(this).find("a").removeClass("on");
            }
        }
    })

    $(".subMenu").hover(function(){
        $(this).css("display", "block");
    }, function(){
        if($('.mainMenu div:hover').length < 1){
            $(this).slideUp(100);
            $(".mainMenu div a").removeClass("on");
        }
    });
    
})

function resizeWindowEvt(w){
    if(w > 1024){ // WEB
        $(".menu_bg, .sidebar_menu, .mShowTr").hide();
        $(".wShowTr").show();
        $(".chgColTd").attr("colspan", "1");
    } else{ // MOBILE
        $(".subMeni, .wShowTr").hide();
        $(".mShowTr").show();
        $(".chgColTd").attr("colspan", "3");
    }
}