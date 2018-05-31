/**
 * Created by Administrator on 2018/3/24 0024.
 */
$(function () {
    //顶部固定栏关闭事件
    var topfix = $('.fixtopheader');
    //获取关闭按钮
    var btnTopClose = $('.fixtopheader').find('span').eq(0);
    btnTopClose.click(function () {
        topfix.hide();
    });

    //轮播图开始
    //获取轮播盒子
    var banner = document.querySelector('.ullistbox');
    var bannerwidth = banner.offsetWidth;
    //获取滑动列表
    var ulistbox = banner.querySelector('ul:first-of-type');
    //获取滑动列表中第一项和最后一项
    var firstLi = ulistbox.querySelector("li:first-of-type");
    var lastbLi = ulistbox.querySelector("li:last-of-type");
    //获取最初图片数量
    var countstart = ulistbox.querySelectorAll("li").length;
    //然后将第一项和最后一项克隆并放入列表中
    //第一项克隆到末尾，最后一项克隆到第一个之前
    ulistbox.appendChild(firstLi.cloneNode(true));
    ulistbox.insertBefore(lastbLi.cloneNode(true), ulistbox.firstChild);
    var index = 1;
    //获取图片数量
    var count = ulistbox.querySelectorAll("li").length;
    //创建轮播按钮
    //获取按钮列表
    var ulistbtnbox = banner.querySelector('ul:last-of-type');
    for (var i = 0; i < countstart; i++) {
        var lis = $('<li></li>');
        $(ulistbtnbox).append(lis);
    }

    var indexbtn = 0;
    //初始化按钮样式
    selectbtn(indexbtn);
    //封装按钮高亮显示函数
    function selectbtn(index) {
        $(ulistbtnbox).find('li').eq(index).addClass('active').siblings('li').removeClass('active');
    }
    //设置滑动列表宽度
    ulistbox.style.width = count * bannerwidth + 'px';
    //设置每个li的宽度
    $('.ullistbox').find('ul').eq(0).find('li').css('width', bannerwidth + 'px');
    //设置默认偏移
    ulistbox.style.left = - bannerwidth + 'px';

    //当屏幕大小改变时重新计算并设置宽度
    window.onresize = function () {
        bannerwidth = banner.offsetWidth;
        console.log(bannerwidth);
        //设置滑动列表宽度
        ulistbox.style.width = count * bannerwidth + 'px';
        //设置每个li的宽度
        $('.ullistbox').find('ul').eq(0).find('li').css('width', bannerwidth + 'px');
        //设置默认偏移
        ulistbox.style.left = -index * bannerwidth + 'px';
    }

    //滑动列表偏移函数
    function listboxglide() {
        index++;
        selectbtn(index - 1);
        //添加过渡效果
        ulistbox.style.transition = 'all 0.5s linear';
        ulistbox.style.left = -index * bannerwidth + 'px';
        //延迟瞬移
        setTimeout(function () {
            if (index == count - 1) {//当到达最后一张时候
                index = 1;
                //清除过渡效果
                ulistbox.style.transition = 'none';
                selectbtn(0);
                //将滑动列表瞬移到第一个图片位置
                ulistbox.style.left = -index * bannerwidth + 'px';
            }
        }, 500)
    }

    //设置定时器
    var timeil;
    timeil = setInterval(function () {
        listboxglide();
    }, 2000);

    //手动轮播
    //定义变量:触摸起始位置、移动时的坐标、移动距离
    var startX, moveX, diceX;
    //定义节流阀，保证每次只有一个手指对象操作
    var isEnd = true;
    ulistbox.addEventListener('touchstart', function (e) {
        //鼠标触摸后清除定时器
        //if (isEnd) {
            clearInterval(timeil);
            startX = e.targetTouches[0].clientX;
            //isEnd = false;
        //}
    });

    ulistbox.addEventListener('touchmove', function (e) {
        if (isEnd) {
            moveX = e.targetTouches[0].clientX;
            diceX = moveX - startX;
            //清除过度效果
            ulistbox.style.transition = 'none';
            //设置偏移
            ulistbox.style.left = -index * bannerwidth + diceX + 'px';
        }
    });
    ulistbox.addEventListener('touchend', function (e) {
        isEnd = false;
        //判断移动距离
        //大于100是翻页
        if (Math.abs(diceX) > 100) {
            //判断是上一页还是下一页
            if (diceX > 0) {//上一页
                index--;
            } else {//下一页
                index++;
            }
            selectbtn(index - 1);
            ulistbox.style.transition = 'all 0.5s linear';
            ulistbox.style.left = -index * bannerwidth + 'px';
        } else if (Math.abs(diceX) > 0) {//排除只点击情况
            selectbtn(index - 1);
            //回弹
            //添加过度效果
            ulistbox.style.transition = 'all 0.5s linear';
            ulistbox.style.left = -index * bannerwidth + 'px';
        }
        //复位：
        startX = 0;
        moveX = 0;
        diceX = 0;
    });

    //当过渡效果结束之后都要判断是否到最后或者第一张
    //并重启定时器
    ulistbox.addEventListener('webkitTransitionEnd', function () {
        if (index == count - 1) {
            index = 1;
            //清除过渡效果
            ulistbox.style.transition = 'none';
            selectbtn(0);
            //将滑动列表瞬移到第一个图片位置
            ulistbox.style.left = -index * bannerwidth + 'px';
        } else if (index == 0) {
            index = count - 2;
            //清除过渡效果
            ulistbox.style.transition = 'none';
            selectbtn(index - 1);
            //将滑动列表瞬移到第一个图片位置
            ulistbox.style.left = -index * bannerwidth + 'px';
        }

        //过度效果执行完毕再启动
        setTimeout(function () {
            isEnd = true;//重启节流阀
            clearInterval(timeil);//先清除之前定时器
            //重启定时器
            timeil = setInterval(function () {
                listboxglide();
            }, 2000);
        }, 500)
    })

    //初始化回到顶部按钮
    window.onscroll = function () {
        //获取下滚的高度
        var scrolltop = parseInt(this.scrollY);
        var viepwheight = parseInt($(this).height());
        //当滚动到一个屏幕宽度时显示回到顶部按钮
        if (scrolltop - viepwheight >= 0) {
            $('.toTop').show();
        } else if (scrolltop - viepwheight < 0) {
            $('.toTop').hide();
        }
    }
    //回到顶部
    var timerid = null;
    $('.toTop').click(function () {
        if (timerid) {
            clearInterval(timerid);
            timerid = null;
        }

        timerid = setInterval(function () {
            // 步进 每次移动的距离
            var step = 100;
            // 目标位置
            var target = 0;

            // 获取当前位置
            var current = parseInt(window.scrollY);

            if (current > target) {
                step = -Math.abs(step);
            }

            // 判断当前是否到达目标位置
            if (Math.abs(current - target) <= Math.abs(step)) {
                clearInterval(timerid);
                document.body.scrollTop = target;
                document.documentElement.scrollTop = target;
                return;
            }

            current += step;
            document.body.scrollTop = current;
            document.documentElement.scrollTop = current;
        }, 20);
    })


    //添加手指滑动事件(真机运行没问题，pc端浏览器运行不兼容)
    //$(ulistbox).on("swipeLeft", function () {
    //    console.log('1');
    //    //清除定时器
    //    clearInterval(timeil);
    //    index++;
    //    listboxglide();
    //});
    //$(ulistbox).on("swipeRight", function () {
    //    //清除定时器
    //    clearInterval(timeil);
    //    index--;
    //    listboxglide();
    //})
})