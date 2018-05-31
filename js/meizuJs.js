/**
 * Created by Administrator on 2018/3/24 0024.
 */
$(function () {
    //�����̶����ر��¼�
    var topfix = $('.fixtopheader');
    //��ȡ�رհ�ť
    var btnTopClose = $('.fixtopheader').find('span').eq(0);
    btnTopClose.click(function () {
        topfix.hide();
    });

    //�ֲ�ͼ��ʼ
    //��ȡ�ֲ�����
    var banner = document.querySelector('.ullistbox');
    var bannerwidth = banner.offsetWidth;
    //��ȡ�����б�
    var ulistbox = banner.querySelector('ul:first-of-type');
    //��ȡ�����б��е�һ������һ��
    var firstLi = ulistbox.querySelector("li:first-of-type");
    var lastbLi = ulistbox.querySelector("li:last-of-type");
    //��ȡ���ͼƬ����
    var countstart = ulistbox.querySelectorAll("li").length;
    //Ȼ�󽫵�һ������һ���¡�������б���
    //��һ���¡��ĩβ�����һ���¡����һ��֮ǰ
    ulistbox.appendChild(firstLi.cloneNode(true));
    ulistbox.insertBefore(lastbLi.cloneNode(true), ulistbox.firstChild);
    var index = 1;
    //��ȡͼƬ����
    var count = ulistbox.querySelectorAll("li").length;
    //�����ֲ���ť
    //��ȡ��ť�б�
    var ulistbtnbox = banner.querySelector('ul:last-of-type');
    for (var i = 0; i < countstart; i++) {
        var lis = $('<li></li>');
        $(ulistbtnbox).append(lis);
    }

    var indexbtn = 0;
    //��ʼ����ť��ʽ
    selectbtn(indexbtn);
    //��װ��ť������ʾ����
    function selectbtn(index) {
        $(ulistbtnbox).find('li').eq(index).addClass('active').siblings('li').removeClass('active');
    }
    //���û����б���
    ulistbox.style.width = count * bannerwidth + 'px';
    //����ÿ��li�Ŀ��
    $('.ullistbox').find('ul').eq(0).find('li').css('width', bannerwidth + 'px');
    //����Ĭ��ƫ��
    ulistbox.style.left = - bannerwidth + 'px';

    //����Ļ��С�ı�ʱ���¼��㲢���ÿ��
    window.onresize = function () {
        bannerwidth = banner.offsetWidth;
        console.log(bannerwidth);
        //���û����б���
        ulistbox.style.width = count * bannerwidth + 'px';
        //����ÿ��li�Ŀ��
        $('.ullistbox').find('ul').eq(0).find('li').css('width', bannerwidth + 'px');
        //����Ĭ��ƫ��
        ulistbox.style.left = -index * bannerwidth + 'px';
    }

    //�����б�ƫ�ƺ���
    function listboxglide() {
        index++;
        selectbtn(index - 1);
        //��ӹ���Ч��
        ulistbox.style.transition = 'all 0.5s linear';
        ulistbox.style.left = -index * bannerwidth + 'px';
        //�ӳ�˲��
        setTimeout(function () {
            if (index == count - 1) {//���������һ��ʱ��
                index = 1;
                //�������Ч��
                ulistbox.style.transition = 'none';
                selectbtn(0);
                //�������б�˲�Ƶ���һ��ͼƬλ��
                ulistbox.style.left = -index * bannerwidth + 'px';
            }
        }, 500)
    }

    //���ö�ʱ��
    var timeil;
    timeil = setInterval(function () {
        listboxglide();
    }, 2000);

    //�ֶ��ֲ�
    //�������:������ʼλ�á��ƶ�ʱ�����ꡢ�ƶ�����
    var startX, moveX, diceX;
    //�������������֤ÿ��ֻ��һ����ָ�������
    var isEnd = true;
    ulistbox.addEventListener('touchstart', function (e) {
        //��괥���������ʱ��
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
            //�������Ч��
            ulistbox.style.transition = 'none';
            //����ƫ��
            ulistbox.style.left = -index * bannerwidth + diceX + 'px';
        }
    });
    ulistbox.addEventListener('touchend', function (e) {
        isEnd = false;
        //�ж��ƶ�����
        //����100�Ƿ�ҳ
        if (Math.abs(diceX) > 100) {
            //�ж�����һҳ������һҳ
            if (diceX > 0) {//��һҳ
                index--;
            } else {//��һҳ
                index++;
            }
            selectbtn(index - 1);
            ulistbox.style.transition = 'all 0.5s linear';
            ulistbox.style.left = -index * bannerwidth + 'px';
        } else if (Math.abs(diceX) > 0) {//�ų�ֻ������
            selectbtn(index - 1);
            //�ص�
            //��ӹ���Ч��
            ulistbox.style.transition = 'all 0.5s linear';
            ulistbox.style.left = -index * bannerwidth + 'px';
        }
        //��λ��
        startX = 0;
        moveX = 0;
        diceX = 0;
    });

    //������Ч������֮��Ҫ�ж��Ƿ������ߵ�һ��
    //��������ʱ��
    ulistbox.addEventListener('webkitTransitionEnd', function () {
        if (index == count - 1) {
            index = 1;
            //�������Ч��
            ulistbox.style.transition = 'none';
            selectbtn(0);
            //�������б�˲�Ƶ���һ��ͼƬλ��
            ulistbox.style.left = -index * bannerwidth + 'px';
        } else if (index == 0) {
            index = count - 2;
            //�������Ч��
            ulistbox.style.transition = 'none';
            selectbtn(index - 1);
            //�������б�˲�Ƶ���һ��ͼƬλ��
            ulistbox.style.left = -index * bannerwidth + 'px';
        }

        //����Ч��ִ�����������
        setTimeout(function () {
            isEnd = true;//����������
            clearInterval(timeil);//�����֮ǰ��ʱ��
            //������ʱ��
            timeil = setInterval(function () {
                listboxglide();
            }, 2000);
        }, 500)
    })

    //��ʼ���ص�������ť
    window.onscroll = function () {
        //��ȡ�¹��ĸ߶�
        var scrolltop = parseInt(this.scrollY);
        var viepwheight = parseInt($(this).height());
        //��������һ����Ļ���ʱ��ʾ�ص�������ť
        if (scrolltop - viepwheight >= 0) {
            $('.toTop').show();
        } else if (scrolltop - viepwheight < 0) {
            $('.toTop').hide();
        }
    }
    //�ص�����
    var timerid = null;
    $('.toTop').click(function () {
        if (timerid) {
            clearInterval(timerid);
            timerid = null;
        }

        timerid = setInterval(function () {
            // ���� ÿ���ƶ��ľ���
            var step = 100;
            // Ŀ��λ��
            var target = 0;

            // ��ȡ��ǰλ��
            var current = parseInt(window.scrollY);

            if (current > target) {
                step = -Math.abs(step);
            }

            // �жϵ�ǰ�Ƿ񵽴�Ŀ��λ��
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


    //�����ָ�����¼�(�������û���⣬pc����������в�����)
    //$(ulistbox).on("swipeLeft", function () {
    //    console.log('1');
    //    //�����ʱ��
    //    clearInterval(timeil);
    //    index++;
    //    listboxglide();
    //});
    //$(ulistbox).on("swipeRight", function () {
    //    //�����ʱ��
    //    clearInterval(timeil);
    //    index--;
    //    listboxglide();
    //})
})