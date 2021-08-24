$(function(){
	// admin web menu
    $(".ico_leftArrow>a").click(function(){
      if(($(this).next(".menu")).length > 0) $(this).next(".menu").addClass("on");
    })
    $(".ico_leftArrow .back").click(function(){
      $(this).parent().removeClass("on");
    })

    $("#sidebar .menu ul li > a").click(function(e) {
      if($(this).next().is('.menu')){
        e.preventDefault();
        $(this).next().addClass('on');
      }
    });

    $("#sidebar .menu .back").click(function(e) {
      e.preventDefault();
      $(this).parent().removeClass('on');
    });

	// admin mobile menu
	$(".m_show.m_menu_icon").click(function(){
		$(this).hide();
		$(".m_menu_closeBtn").show();
		ShowMenu();
		// $(".m_show.m_menu").slideDown();
	})
	$(".m_menu_closeBtn").click(function(){
		$(this).hide();
		$(".m_show.m_menu_icon").show();
		HideMenu();
		// $(".m_show.m_menu").slideUp();
	})
	$(".m_show.m_menu>ul>li>a").click(function(){
		var thisSubMenu = $(this).parent().find(".m_sub_menu");		
		thisSubMenu.slideToggle();
		$(this).toggleClass("m_menu_on")
	})
})
function ShowMenu(){
	$('.m_menu').animate({left:"0"}, 500);
}

function HideMenu(){
	$('.m_menu' ).animate( {left:"-100%"}, 500);
}