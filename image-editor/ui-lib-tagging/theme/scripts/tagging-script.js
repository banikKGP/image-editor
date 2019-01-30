$(function() {
	//add BT DD show event
	$(".tag-file-card--menu").on("show.bs.dropdown", function() {
		//var $ddHolder = $(this).find(".dropdown")
		var $btnDropDown = $(this).find(".dropdown-toggle");
	  	var $listHolder = $(this).find(".dropdown-menu");
	  	var $cardLeft = $(this).parent('.tag-file-card');
	  $(this).css("position", "static");
	  $listHolder.css({
		 "top": ($btnDropDown.offset().top + $btnDropDown.outerHeight(true)) + "px",
		 //"right": ($(this).offset().left - $cardLeft.offset().left) + "px"
		 "left": ($btnDropDown.position().left - 107) + "px"
		 //"left": $btnDropDown.offset().left + "px"
		//"top": 0 + "px",
		//"left": 0 + "px"
	  });
	  $listHolder.data("open", true);
	});
	$(".dropdown").on("hidden.bs.dropdown", function() {
	  var $listHolder = $(this).find(".dropdown-menu");
	  $listHolder.data("open", false);
	});
	
  });
//document ready
$(document).ready(function () {
     //$('.tag-icon').hide();
     $('.create-doc-tagging-btn').click(function () {
         $('.create-doc-tagging-modal').modal({backdrop: false});
         //$('.tag-icon').show();
     });
     $('.tag-icon').click(function () {
		 $('.view-doc-tagging-modal').modal({ backdrop: false });
     });
	 $('.add-equipment-btn').click(function(){
		 //$('.add-equipment-modal').modal({ backdrop: false; });
		 $('.add-equipment-modal').modal();
		 
	 });


	 //keyboard accessible
	 $('#edit-photo .picture-list ul li img').on('click', function() {
		 //$('.edit-photo-modal').modal({backdrop: false});
		 $('.edit-photo-modal').modal();
	 });

	//  $('.photo-video-area .picture-list ul li').on('focusin hover', function() {
	// 	 alert('hi');
	// 	$('.gallery-more-option').hide();
    // 	$(this).find('.gallery-more-option').show();
	// });
	

	//  $('.photo-video-area .picture-list ul li img').keypress(function (e) {
	// 	var key = e.which;
	// 	if(key == 13)
	// 	 {
	// 	   $('.photo-video-area .picture-list ul li img').click();
	// 	   return false;  
	// 	 }
	//    });

	   //jquery for keybord navigation
		$(".asset-list-box-checkbox .checkmark").keypress(function(e){
			if(e.which == 13) {
				var chkbox =  $(this).siblings();
				
				if (chkbox.is(':checked')) {
					chkbox.prop('checked',false);    
				}else{
					chkbox.prop('checked',true); 
				}
			}
		});


	 
	 
	 
	 $('.add-linked-files').click(function () {
		//$('.add-linked-files-modal').modal({backdrop: false});
		$('#linkedFiles').modal();
	});
	$('.add-reports').click(function () {
		//$('.add-reports-modal').modal({backdrop: false});
		$('.add-reports-modal').modal();
	});
	$('#add-from-skysite, #add-from-skysite2').click(function () {
		$('#addFromSkysite').modal();
	});
	$('#folder-list').click (function(){
		$(this).hide();
		$('.file-list').removeClass('hide');
		$('.modal-footer').removeClass('hide');
	});
	// $(".attributes-tool li a").click(function(){		
	// 	if($(".attributes-form").css("right") == "-360px")
	// 	{  
	// 		$(".attributes-form").animate({
	// 			right: '0'
	// 		});
	// 		$(".annotate-toolbar").hide("slow");
	// 	}
	// 	else{
	// 		$(".auto-hyperlink-pan").animate({
	// 			right: '-350px'
	// 		});
	// 		$(".viewer-action").show("slow");
	// 		$(".auto-hyperlink-pan").find(".left-arrow i").removeClass("icon-chevron-right");
	// 		$(".auto-hyperlink-pan").find(".left-arrow i").addClass("icon-chevron-left");
	// 	}
	// });
	// $(".attributes-tool li a").click(function(){		
	// 	$(".attributes-form").animate({
	// 		right: '0'
	// 	});
	// 	$(".annotate-toolbar").hide("slow");
	// });
	$(".hide-attributes-btn").click(function(){		
		$(".attributes-form").animate({
			right: '-380px'
		});
		$(".annotate-toolbar").show("slow");
	});
//$('.dropdown-toggle').dropdown();
	$('#setting-popover').popover({ 
		animation: true,
		placement: "bottom",
		html: true, 
	content: function() {
		return $('#color-picker').html();
		}
	}).click(function(e) {
		removeTitle();
		e.preventDefault();
	  });

	  $(document).on('show.bs.modal', '.modal', function (event) {
		var zIndex = 1040 + (10 * $('.modal:visible').length);
		$(this).css('z-index', zIndex);
		setTimeout(function () {
			$('.modal-backdrop').not('.modal-stack').css('z-index', zIndex - 1).addClass('modal-stack');
		}, 0);
	});
	//$('.popover-content').on('click', function() {
	//	alert('hi');
	//})

	//$('.color-box').click(function() {
	//	alert('hi');
    //    $('.color-list ul li').addClass('active');
    //}).blur(function() {
    //    $('.color-list ul li').removeClass('active');
    //});
	$('body').on('input', ".search-equipment input", function() {
		if($(this).val().length) {
		  $('.search-reset-btn').show();
		} else {
			$('.search-reset-btn').hide();
		}
	  });
	  
	$('.search-reset-btn').click (function(){
		if($('.search-equipment input').val().length) {
			$('.search-equipment input').val("");
			$(this).hide();
		}
	});
$('.select-list ul li').click (function(){
	if($(this).hasClass('selected')) {
		$(this).removeClass('selected');
	}
	else {
		$(this).addClass('selected');
	}
});
$('.expanded-report, .view-equip-btn').click (function(event){
	event.stopPropagation();
});

$('.active-icon').on('click', function (event) {
    $(this).parent().toggleClass('open');
});
$('.change-icon .dropdown-menu ul li a').on('click', function (event) {
    $(this).parents('.change-icon').toggleClass('open');
});
$('body').on('click', function (e) {
	if($('.change-icon.dropdown.open').has(e.target).length === 0){
		$('.change-icon.dropdown').removeClass('open');
	}
});
 });
//document ready end
function removeTitle(){
	$('.popover-title').remove();
  }
  
  

//modal body scroll

var modalBodyScroll1 = document.querySelector('.view-doc-tagging-modal .tag-custom-scroll');
new PerfectScrollbar(modalBodyScroll1, {
	suppressScrollX: true
});
modalBodyScroll1.addEventListener('ps-scroll-y', () => {
	$('.tag-file-card--menu.dropdown.open .dropdown-toggle').dropdown('toggle');
});

var modalBodyScroll = document.querySelector('.create-doc-tagging-modal .tag-custom-scroll');
new PerfectScrollbar(modalBodyScroll, {
	suppressScrollX: true
});
modalBodyScroll.addEventListener('ps-scroll-y', () => {
	$('.tag-file-card--menu.dropdown.open .dropdown-toggle').dropdown('toggle');
});

var modalBodyScroll = document.querySelector('.tag-custom-scroll');
new PerfectScrollbar(modalBodyScroll, {
	suppressScrollX: true
});

modalBodyScroll.addEventListener('ps-scroll-y', () => {
	$('.tag-file-card--menu.dropdown.open .dropdown-toggle').dropdown('toggle');
});

//report modal body
var modalBodyScroll2 = document.querySelector('.add-reports-modal .modal-body');
new PerfectScrollbar(modalBodyScroll2, {
	suppressScrollX: true
});

//linked modal body
var modalBodyScroll3 = document.querySelector('.add-linked-files-modal .modal-body');
new PerfectScrollbar(modalBodyScroll3, {
	suppressScrollX: true
});

//add from skysite
var modalBodyScroll4 = document.querySelector('#addFromSkysite .modal-body');
new PerfectScrollbar(modalBodyScroll4, {
	suppressScrollX: true
});

//add equipment
// var modalBodyScroll5 = document.querySelector('.add-equipment-modal .modal-body');
// new PerfectScrollbar(modalBodyScroll5, {
// 	suppressScrollX: true
// });

//photo video gallery
var containers = document.querySelectorAll('.tag-gallery-scroll');
new PerfectScrollbar(containers[0], {
	useBothWheelAxes: true,
	suppressScrollY: true
	
});
new PerfectScrollbar(containers[1], {
	useBothWheelAxes: true,
	suppressScrollY: true
});

var containers2 = document.querySelector('.tag-file-card-scroll');
new PerfectScrollbar(containers2, {
	useBothWheelAxes: true,
	suppressScrollY: true	
});
var fileList = document.querySelector('.scroll-list');
new PerfectScrollbar(fileList, {
	suppressScrollX: true	
});
containers2.addEventListener('ps-scroll-x', () => {
	$('.tag-file-card--menu.dropdown.open .dropdown-toggle').dropdown('toggle');
});
var dropDownScroll = document.querySelector('.change-icon .dropdown-menu ul');
new PerfectScrollbar(dropDownScroll, {
	suppressScrollX: true
});
		   
// var el = document.querySelector('.container');

// Ps.initialize(el);

// document.addEventListener('ps-y-reach-end', (event)=> {
// 		console.log('Why this is printing multiple times when I reach Bottom, I wanted it to be single fire')
// 		});		   
$('.edit-photo-modal').on('show.bs.modal', function () {
	//flexSli();
	//$(window).trigger( 'resize' );
});

$('.edit-photo-modal').on('shown.bs.modal', function () {
	var winHeight = $(window).height();
    var modalHeader = $(this).find('.modal-header').innerHeight();
    var modalFooter = $(this).find('.modal-footer').innerHeight();
    var modalTotaldeduct = (modalHeader + modalFooter + 44);
    var modalHeight = (winHeight - modalTotaldeduct);
	$(this).find('.modal-body').css('max-height', modalHeight);
	$(this).find('.modal-body').css('height', 'auto');
	$('.annotate-pic .main-pic-area').css('max-height', modalHeight - 20);
	//flexSli();
	//$(window).trigger( 'resize' );
	//alert('hi');
});

$('.document-tagging').on('shown.bs.modal', function () {
	var winHeight = $(window).height();
    var modalHeader = $(this).find('.modal-header').innerHeight();
	var modalFooter = $(this).find('.modal-footer').innerHeight();
	var searchHeight = $(this).find('.search-equipment').outerHeight(true);
    var modalTotaldeduct = (modalHeader + modalFooter + 44);
    var modalHeight = (winHeight - modalTotaldeduct);
	$(this).find('.modal-body').css('max-height', modalHeight);
	if($(".document-tagging .scroll-list").hasClass('scroll-list')){
		//$(this).find('.modal-body').css('max-height', 'inherit');
	}
	$(this).find('.scroll-list').css('max-height', modalHeight - searchHeight - 15);
});

function flexSli() {
	$('.flexslider').flexslider({
        animation: "slide",
        animationLoop: false,
        itemWidth: 90,
        itemMargin: 5,
		controlNav: false,
        pausePlay: false,
		pauseOnHover: true,
		video: true,
		start: function(slider){
			$('.flexslider').resize();
		}
    });
}


      



