/**
 * Created by Administrator on 2017/5/26.
 */
var touch = ("createTouch" in document);
var start = touch ? "touchstart" : "mousedown";
var move = touch ? "touchmove" : "mousemove";
var end = touch ? "touchend" : "mouseup";

function evTurn(e) {
    return touch ? e.originalEvent.targetTouches[0] : e
}

// function pageup(p1, p2, fun) {
//     $('.' + p2).toggleClass('hidden');
//     $('.' + p1).animate({ 'margin-left': '-750px' }, 500, 'linear', fun);
//     $('.' + p2).animate({ 'margin-left': '0px' }, 500, 'linear', fun);
//     setTimeout(function() {
//         $('.' + p1).toggleClass('hidden');

//     }, 500)
// }

// function pageups(p1, p2, fun) {
//     $('.' + p2).toggleClass('hidden');
//     $('.' + p1).animate({ 'margin-left': '750px' }, 500, 'linear', fun);
//     $('.' + p2).animate({ 'margin-left': '0px' }, 500, 'linear', fun);
//     setTimeout(function() {
//         $('.' + p1).toggleClass('hidden');

//     }, 500)
// }

videoJS('video', 'http://project.youzewang.com/wangyi/tesila.mp4');
document.addEventListener('DOMContentLoaded', function() {
    function audioAutoPlay() {

        videoJS('video', 'http://project.youzewang.com/wangyi/tesila.mp4');
        document.addEventListener("WeixinJSBridgeReady", function() {
            videoJS('video', 'http://project.youzewang.com/wangyi/tesila.mp4');

        }, false);
    }
    audioAutoPlay();
});

$(function() {
    $('#my_video').load();
    var video_true = 0;
    var video_true1 = 0;

    function loop() {
        myVid = document.getElementById("my_video");
        //console.log(myVid.currentTime);
        var loops = setTimeout(loop, 50);
        if (myVid.currentTime > 41) {
            if (video_true == 0) {
                video_true = 1;
                videoJS.pause();
                // $('.hd').show();
                $('.btn').show();
            }
        }

        if (myVid.currentTime > 83) {
            if (video_true == 1) {
                video_true = 2;
                videoJS.pause();
                // $('.hd').show();
                $('.btn').show();
            }
        }

        if (myVid.currentTime > 118) {
            if (video_true == 2) {
                video_true = 3;
                videoJS.pause();
                // $('.hd').show(); 175
                $('.btn').show();
            }
        }

        if (myVid.currentTime > 172) {
            videoJS.pause();
            //$('#video').remove();


            setTimeout(function() {
                if (video_true1 == 0) {
                    video_true1 = 1;
                    $('#video').animate({ 'opacity': '0' }, 1000, 'linear', '');
                    setTimeout(function() {
                        $('#video').remove();
                    }, 1000)

                    $('.p2').removeClass('hidden');
                    if (state == 1) {
                        $('.endbtn1').hide();
                        $('.endbtn2').css('top', '72%');
                        $('.endbtn3').css('top', '72%');
                        $('.endbtn2').show();
                        $('.endbtn3').show();
                    } else {
                        $('.endbtn1').show();
                        $('.endbtn2').show();
                        $('.endbtn3').show();
                    }


                }


            }, 1500)

            clearTimeout(loops);

        }
    }
    var loops = setTimeout(loop, 50);


    $('.btn').on('click', function() {
        videoJS.play();
        $('.hd').hide();
        $('.btn').hide();
    });

    $('#p1').on('click', function() {
        // actionOut("#p1", 'action_translateY', 1, "");

        setTimeout(function() {

            videoJS.play();
            $('.indexbtn').hide();
            $('.index').hide();
            $('.video').show();
            setTimeout(function() {
                videoJS.play();
            }, 50)

        }, 1000);
    });

    $('.endbtn1').on('click', function() {
        window.location.href = "https://jinshuju.net/f/cajgoa";
    });
    $('.endbtn2').on('click', function() {
        $('.share_bg').show();
    });
    $('.endbtn3').on('click', function() {
        $('.share').show();
        // sendMessage();
    });
    $('.share_bg').on('click', function() {
        $('.share_bg').hide();
    });
    $('.share').on('click', function() {
        $('.share').hide();
    });

    /*obj,actionName,speed都是 string,time(秒)是int类型*/
    function actionOut(obj, actionName, time, speed) {
        $(obj).css({ "animation": actionName + " " + time + "s" + " " + speed });
        var setInt_obj = setInterval(function() {
            $(obj).hide();
            clearInterval(setInt_obj);
        }, time * 1000);
    }
})