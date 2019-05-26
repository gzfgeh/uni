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
function pageup(p1,p2,fun){
    $('.'+p2).toggleClass('hidden');
    $('.'+p1).animate({'margin-left':'-750px'},500,'linear',fun);
    $('.'+p2).animate({'margin-left':'0px'},500,'linear',fun);
    setTimeout(function(){
        $('.'+p1).toggleClass('hidden');

    },500)
}
function pageups(p1,p2,fun){
    $('.'+p2).toggleClass('hidden');
    $('.'+p1).animate({'margin-left':'750px'},500,'linear',fun);
    $('.'+p2).animate({'margin-left':'0px'},500,'linear',fun);
    setTimeout(function(){
        $('.'+p1).toggleClass('hidden');

    },500)
}
videoJS('video','http://zhidingfun.test.qingcdn.com/wykl2.mp4');
document.addEventListener('DOMContentLoaded', function () {
    function audioAutoPlay() {

        videoJS('video','http://zhidingfun.test.qingcdn.com/wykl2.mp4');
        document.addEventListener("WeixinJSBridgeReady", function () {
            videoJS('video','http://zhidingfun.test.qingcdn.com/wykl2.mp4');

        }, false);
    }
    audioAutoPlay();
});

$(function(){
    $('#my_video').load();
    var video_true=0;
    var video_true1=0;
    function loop(){
        myVid=document.getElementById("my_video");
        //console.log(myVid.currentTime);
        var loops=setTimeout(loop,50);
        if(myVid.currentTime>6){
            if(video_true==0){
                video_true=1;
                videoJS.pause();
                $('.hd').show();
                $('.btn').show();
            }

        }

        if(myVid.currentTime>192){
            videoJS.pause();
            //$('#video').remove();


            setTimeout(function(){
                if(video_true1==0){
                    video_true1=1;
                    $('#video').animate({'opacity':'0'},1000,'linear','');
                        setTimeout(function(){
                            $('#video').remove();
                        },1000)

                    $('.p2').removeClass('hidden');
                    if(state==1){
                        $('.endbtn1').hide();
                        $('.endbtn2').css('top','72%');
                        $('.endbtn3').css('top','72%');
                        $('.endbtn2').show();
                        $('.endbtn3').show();
                    }else{
                        $('.endbtn1').show();
                        $('.endbtn2').show();
                        $('.endbtn3').show();
                    }


                }


            },1500)

            clearTimeout(loops);

        }
    }
    var loops=setTimeout(loop,50);


    $('.btn').on('click',function(){
        videoJS.play();
        $('.hd').hide();
        $('.btn').hide();
    });
    $('.indexbtn').on('click',function(){
        videoJS.play();
        $('.indexbtn').hide();
        $('.index').hide();
        $('.video').show();
        setTimeout(function(){
            videoJS.play();
        },500)

    });

    $('.endbtn1').on('click',function(){
       window.location.href="https://m.kaola.com/activity/h5/37755.shtml?tag=172ca9cd8c9d85f7a0c222e0cb84d47c&__da_e6b4a91b_57fec95791833c80";
    });
    $('.endbtn2').on('click',function(){
      window.location=location;
    });
    $('.endbtn3').on('click',function(){
        $('.share').show();
    });
    $('.share').on('click',function(){
        $('.share').hide();
    });


})