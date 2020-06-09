var lottery = {
    ch:0
};

function clickBtn() {
    var n1 = Math.floor(Math.random()*8 + 1);
    var n2 = Math.floor(Math.random()*4 + 4);
    lottery.ch = 45*n1 + 360*n2;
    $(this).unbind().css('cursor','wait');
    $('.lottery').css({
        'transition': 'all 8s ease',
        'transform':'rotate('+lottery.ch+'deg)',
        '-webkit-transform':'rotate('+lottery.ch+'deg)',
    });
    setTimeout(function () {
        var resultnum = 9 - n1;
        var resultDiv = document.getElementById('No'+ resultnum);
        msg = resultDiv.innerHTML;
        var result = document.getElementById('result');
        result.innerHTML = '结果是：' + msg;
    },8000);


}
