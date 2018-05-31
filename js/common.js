/**
 * Created by Administrator on 2018/3/24 0024.
 */
$(function () {
    $(window).on('resize',function(){
        var width=$(window).width();
        var fontSize=(width/320)*100;
        $('html').css('font-size',fontSize)
    }).trigger('resize')
})