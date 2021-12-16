import { Component, OnInit } from '@angular/core';

declare var $: any;
// declare var mA: any;
// declare var mL:any;
@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [],
})
export class PagesComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {

    $('body').tooltip({
      selector: '[data-toggle="tooltip"]'
  });
    // Sidebar overlay
    var $wrapper = $('.main-wrapper');
    var $slimScrolls = $('.slimscroll');
    $(document).on('click', '#mobile_btn', function () {
      $wrapper.toggleClass('slide-nav');
      $('.sidebar-overlay').toggleClass('opened');
      $('html').addClass('menu-opened');
      return false;
    });
    $('.sidebar-overlay').on('click', function () {
      $wrapper.removeClass('slide-nav');
      $('.sidebar-overlay').removeClass('opened');
      $('html').removeClass('menu-opened');
    });

    var Sidemenu = function () {
      this.$menuItem = $('#sidebar-menu a');
    };
    function init() {
      var $this = Sidemenu;
      $('#sidebar-menu a').on('click', function (e) {
        if ($(this).parent().hasClass('submenu')) {
          e.preventDefault();
        }
        if (!$(this).hasClass('subdrop')) {
          $('ul', $(this).parents('ul:first')).slideUp(350);
          $('a', $(this).parents('ul:first')).removeClass('subdrop');
          $(this).next('ul').slideDown(350);
          $(this).addClass('subdrop');
        } else if ($(this).hasClass('subdrop')) {
          $(this).removeClass('subdrop');
          $(this).next('ul').slideUp(350);
        }
      });
      $('#sidebar-menu ul li.submenu a.active')
        .parents('li:last')
        .children('a:first')
        .addClass('active')
        .trigger('click');
    }
    init();

    //PARA CUANDO ES RESPONSIVE SE PUEDA DESLISAR EL NAV
    $('.main-nav a').on('click', function (e) {
      if ($(this).parent().hasClass('has-submenu')) {
        e.preventDefault();
      }
      if (!$(this).hasClass('submenu')) {
        $('ul', $(this).parents('ul:first')).slideUp(350);
        $('a', $(this).parents('ul:first')).removeClass('submenu');
        $(this).next('ul').slideDown(350);
        $(this).addClass('submenu');
      } else if ($(this).hasClass('submenu')) {
        $(this).removeClass('submenu');
        $(this).next('ul').slideUp(350);
      }
    });
    // Sidebar Slimscroll
    if ($slimScrolls.length > 0) {
      $slimScrolls.slimScroll({
        height: 'auto',
        width: '100%',
        position: 'right',
        size: '7px',
        color: '#ccc',
        allowPageScroll: false,
        wheelStep: 10,
        touchScrollStep: 100,
      });
      var wHeight = $(window).height() - 60;
      $slimScrolls.height(wHeight);
      $('.sidebar .slimScrollDiv').height(wHeight);
      $(window).resize(function () {
        var rHeight = $(window).height() - 60;
        $slimScrolls.height(rHeight);
        $('.sidebar .slimScrollDiv').height(rHeight);
      });
    }
    // // Small Sidebar
    // $(document).on('click', '#toggle_btn', function() {
    //   if($('body').hasClass('mini-sidebar')) {
    //     $('body').removeClass('mini-sidebar');
    //     $('.subdrop + ul').slideDown();
    //   } else {
    //     $('body').addClass('mini-sidebar');
    //     $('.subdrop + ul').slideUp();
    //   }
    //   // setTimeout(function(){ 
    //   //   mA.redraw();
    //   //   mL.redraw();
    //   // }, 300);
    //   return false;
    // });
    $(document).on('mouseover', function(e) {
      e.stopPropagation();
      if($('body').hasClass('mini-sidebar') && $('#toggle_btn').is(':visible')) {
        var targ = $(e.target).closest('.sidebar').length;
        if(targ) {
          $('body').addClass('expand-menu');
          $('.subdrop + ul').slideDown();
        } else {
          $('body').removeClass('expand-menu');
          $('.subdrop + ul').slideUp();
        }
        return false;
      }
    });


    // Select 2

    if ($('.select').length > 0) {
      $('.select').select2({
        minimumResultsForSearch: -1,
        width: '100%',
      });
    }

    // Datetimepicker

    if ($('.datetimepicker').length > 0) {
      $('.datetimepicker').datetimepicker({
        format: 'DD/MM/YYYY',
        icons: {
          up: 'fa fa-angle-up',
          down: 'fa fa-angle-down',
          next: 'fa fa-angle-right',
          previous: 'fa fa-angle-left',
        },
      });
      $('.datetimepicker')
        .on('dp.show', function () {
          $(this)
            .closest('.table-responsive')
            .removeClass('table-responsive')
            .addClass('temp');
        })
        .on('dp.hide', function () {
          $(this)
            .closest('.temp')
            .addClass('table-responsive')
            .removeClass('temp');
        });
    }

    if ($(window).width() > 767) {
      if ($('.theiaStickySidebar').length > 0) {
        $('.theiaStickySidebar').theiaStickySidebar({
          // Settings
          additionalMarginTop: 30,
        });
      }
    }
  }
}
