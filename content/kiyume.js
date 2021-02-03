var r18notice = document.getElementById('notice');
r18notice.addEventListener('click',function () {
    alert('即将进入梦之图书馆，请确认已经年满18周岁')
},false);

$(function(){
    $('.toplist > li').hover(function(){
        $(this).children('ul.catalog').stop().slideDown()
    }, function(){
        $(this).children('ul.catalog').stop().slideUp()
    })
})