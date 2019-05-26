/**
 * Founded in 2017/5/26, the author .
 */

/**
 * 初始化
 * @param panerId { String | <video>id }
 */
__VideoHTML = null;


function videoJS( panerId , src ){
    var $video = '<video id="my_video" style="object-fit:fill"  preload="load" playsinline="true" webkit-playsinline="true" x-webkit-airplay="allow" airplay="allow" x5-video-player-type="h5" x5-video-player-fullscreen="true" x5-video-orientation="portrait" src=""></video>';
    $('#'+panerId ).append( $video );

    __VideoHTML = $( '#my_video' );

    videoJS.setWidthAndHeight( 100 , 100 );
    videoJS.setSrc( src );
}


/**
 * 设置视频尺寸 默认为 750 * 1206
 * @param width
 * @param height
 */
videoJS.setWidthAndHeight = function ( width , height ){
    __VideoHTML.css( 'width' , width + '%' );
    __VideoHTML.css( 'height' , height + '%' );
};

/**
 * 播放
 */

videoJS.play = function (){
    document.getElementById( 'my_video' ).play();
};

videoJS.pause = function (){
    document.getElementById( 'my_video' ).pause();
};


videoJS.setSrc = function ( src ){
    document.getElementById( 'my_video' ).src = src;
};
