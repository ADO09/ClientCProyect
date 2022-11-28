// Variables for login theme
let showMenu = true;
const mainConatiner = $('#theme-main-container');
const leftNav = $('#theme-left-nav');
const layoutWithMenuClass = 'dsc-main-container';
const layoutWithoutMenuClass = 'dsc-main-container-full';

// Method to hide or show menu
$('.js-hide-show-menu').on('click', function() {
    showMenu = !showMenu;
    if(!showMenu) {
        mainConatiner.removeClass(layoutWithMenuClass).addClass(layoutWithoutMenuClass);
        leftNav.css('display', 'none');
    } else {
        mainConatiner.removeClass(layoutWithoutMenuClass).addClass(layoutWithMenuClass);
        leftNav.css('display', 'block');
    }
});