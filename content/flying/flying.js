//全局变量部分
let x = 0; // 全局变量 计算行走的步数
let eventList1 = ['脱下一件衣服','这个随机事件变成鸽子飞走了~','学习猫叫并录音','调高跳蛋的档位一档','M字开腿自慰至高潮，并进行录像','请插上按摩棒并调整至中等档位','脱下内衣和内裤','提起裙子站立五分钟','用绳子捆绑自己（自缚or他人都可以）','戴上跳蛋','调高所有情趣玩具的档位','戴上手铐和脚铐','这个随机事件变成了鸽子！','取下身上所佩戴的所有情趣玩具','M字开腿自慰至高潮，并进行录像'];
let eventList2 = ['穿上一件衣服', '将跳蛋调整至最高档位，持续10分钟，期间不可高潮', '插上按摩棒', '脱光身上的所有衣服', 'M字开腿自慰至高潮，并进行录像', '戴上手铐，同时跳蛋频率调到最高', '夹上乳夹', '这个随机事件什么都没有发生', '观看自慰录像，如果没有则进行M字开腿自慰（录像至少5分钟以上）', '被挠脚心5分钟（如果一个人的话则无事发生）', '脱下所有衣服，M字开腿自慰至高潮，并进行录像', '脱下除内衣以外所有衣物', '脱掉一件衣服，调高跳蛋的档位一档', '指定包括自己在内的一个人，让她脱掉一件衣服', '脱下所有衣服后戴上口球'];
let eventList3 = ['将跳蛋频率调高一档，同时夹上乳夹','播放自慰录像的同时进行桌角自慰','学习猫叫并录音','脱下所有衣服','将跳蛋频率调整到最高，同时阅读本游戏规则，如果读错一个字，就从头开始再读一遍','戴上口球，被挠10分钟脚心。','脱下裙子和内裤，M字开腿自慰至高潮，并进行录像','戴上口球和手铐','M字开腿自慰至高潮，并进行录像','指定包括自己在内的一个人，令她戴上任意一件情趣玩具','用绳子捆绑自己','进行一场脱衣舞表演（要求脱光）','脱下一件衣服','再执行一次上一回合所执行过的随机事件','取下所有的情趣道具，但需要脱光所有的衣服'];
let diceResult = $('#dice-result');
let stepResult = $('#step-result');
let checkResult = $('#check-result');
let a,b,c,d,e,f;
//基础功能
//按下“游戏开始”，随机生成事件格子，按下骰子，按骰子前进对应步数，走到事件格子，触发事件
//游戏开始、游戏重置，以及经过起点，都会触发随机事件格子重置



function eventSet(){  //设置事件格子
    a = Math.ceil(Math.random()*19);
    b = Math.ceil(Math.random()*19);
    c = Math.ceil(Math.random()*19);
    d = Math.ceil(Math.random()*19);
    e = Math.ceil(Math.random()*19);
    f = Math.ceil(Math.random()*19);
    g = Math.ceil(Math.random()*19);
    h = Math.ceil(Math.random()*19);
    i = Math.ceil(Math.random()*19);
    $('.checkerboard').each(function () {
        $(this).removeClass('event1 event2 event3'); //先清空所有事件格子
        if($(this).attr('id') == 'No.'+ a || $(this).attr('id') == 'No.'+ b || $(this).attr('id') == 'No.'+ c ){
            $(this).addClass('event1'); //对应格子加入事件1
        }
        else if($(this).attr('id') == 'No.'+ d || $(this).attr('id') == 'No.'+ e || $(this).attr('id') == 'No.'+ f){
            $(this).addClass('event2');//对应格子加入事件2
        }else if($(this).attr('id') == 'No.'+ g || $(this).attr('id') == 'No.'+ h || $(this).attr('id') == 'No.'+ i){
            $(this).addClass('event3');//对应格子加入事件3
        }
    })
}

function reset(){
    x = 0;
    eventSet();
    diceResult.html('');
    stepResult.html('');
    checkResult.html('');
}



// 骰子部分代码
let num,R1,R2,R3;
let dice = $('.dice');
dice.on('click',function () {
    num = Math.ceil(Math.random()*6); // 这个是骰子
    dice.css('cursor','default');
    console.log(num);
    dice.css('background-image','url(dice_f.jpg');
    setTimeout(function(){
        dice.css('background-image','url(dice_s.jpg');
    },200);
    setTimeout(function () {
        dice.css('background-image','url(dice_t.jpg');
    },200);
    setTimeout(function () {
        dice.css('background-image','url(dice_' + num +'.jpg');
    },200);
    goFoward();
});

//内容结果显示部分
function goFoward() {
    if (num == 6) {
        diceResult.html('<p>你投掷到了6，请脱下一件衣服或调高跳蛋频率一档</p>');
    } else {
        diceResult.html('<p>你投掷到了' + num + '</p>');
        x = x + num;
        if (x > 20) {
            eventSet();
            x = x - 20;
        }
        stepResult.html('<p>你目前在第'+ x +'格</p>');
        let Xcheck = $('#No.' + x);
        console.log(Xcheck);
        if (x == a || x == b || x == c) {
            R1 = Math.ceil(Math.random() * 15) - 1;
            console.log(eventList1[R1]);
            checkResult.html('<p><strong>随机事件：</strong>' + eventList1[R1] + '</p>');
        } else if (x == d || x == e || x == f) {
            R2 = Math.ceil(Math.random() * 15) - 1;
            console.log(eventList2[R2]);
            checkResult.html('<p><strong>随机事件：</strong>' + eventList2[R2] + '</p>');
        } else if (x == g || x == h || x == i) {
            R3 = Math.ceil(Math.random() * 15) - 1;
            console.log(eventList1[R3]);
            checkResult.html('<p><strong>随机事件：</strong>' + eventList3[R3] + '</p>');
    }else{
            checkResult.html('<p>无事发生</p>');
        }
    }
    if(x === 20){
       checkResult.html('<p>恭喜你到达了终点</p>');
    }
}