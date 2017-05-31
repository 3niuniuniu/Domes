/**
 * ���õĵ������
 * @author helijun
 * @return {[]} [depend jquery]
 */
;(function($){
    $.alert = function(opts){
        //һЩĬ������
        var defaultOpts = {
            title: '',//����
            content: '',//����  ���� || html
            height: 50,//Ĭ����Ļ����������50%
            width: 80,//Ĭ����Ļ����������80%
            type: 'alert-default',//��������
            effect: 'fadeIn',//����Ч����Ĭ���µ���
            delayTime: 500,//Ч����ʱʱ�䣬Ĭ��.5s
            autoClose: false,//�Զ��ر�
            autoTime: 2000, //�Զ��ر�ʱ��Ĭ��2s
            autoEffect: 'default',//�ر�Ч��
            ok: 'ȷ��',
            okCallback: function(){},//ȷ���ص�
            cancel: 'ȡ��',
            cancelCallback: function(){},//ȡ���ص�
            before : function() {
                console.log('before')
            },
            close: function() {
                console.log('close')
            },
            blankclose: false//�հ״�����ر�
        };

        for (i in defaultOpts) {
            if (opts[i] === undefined) {
                opts[i] = defaultOpts[i]
            }
        }
        opts.before && opts.before();

        //DOM�ṹ
        var alertHtml = [
            '<section class="alert-main" id="alertMain">',
            '<div class="alert-mask li-opacity" id="alertMask"></div>',
            '<div class="alert-content '+ opts.type +'" id="alertContent">',
            opts.content +'</div>',
            '</section>'
        ];

        $('body').append(alertHtml.join(''));
        //console.log('alertHtml',alertHtml.join(''));

        //���ø߿��ˣ�ˮƽ��ֱ����
        var $alertContent = $('#alertContent'),
            $alertMain = $('#alertMain');
        $alertContent.css({
            'height': opts.height + '%',
            'top': (100 - opts.height)/2 + '%',
            'width': opts.width + '%',
            'left': (100 - opts.width)/2 + '%'
        });
        $('.li-opacity').css({
            '-webkit-animation-duration' : opts.delayTime/1000 + 's'
        });

        //����Ч��
        var effect = {
            'fadeIn': 'top',
            'fadeInStart': '-100%',
            'fadeInValue': (100 - opts.height)/2 + '%',
            'sideLeft': 'left',
            'sideLeftStart': '-100%',
            'sideLeftValue': (100 - opts.width)/2 + '%',
            'scale': '-webkit-transform',
            'scaleStart': 'scale(0)',
            'scaleValue': 'scale(1)',
            'info': '-webkit-transform',
            'infoStart': 'scale(1.2)',
            'infoValue': 'scale(1)'
        };
        setTimeout(function(){
            $alertContent.css(effect[opts.effect],effect[opts.effect + 'Start']).addClass('alert-show')

            setTimeout(function(){
                $alertContent.css(effect[opts.effect], effect[opts.effect + 'Value'])
                opts.close && opts.close()
            },10)
        },opts.delayTime);

        //�հ״�����ر�
        if(opts.blankclose) {
            $('.alert-main :not(.alert-content)').on('click',function(event){
                $alertMain.remove();
                opts.close && opts.close();
                event.stopPropagation();
                event.preventDefault()
            })
        }

        //�Զ��ر�
        if(opts.autoClose && opts.autoTime > 0) {
            setTimeout(function(){$alertMain.remove()},opts.autoTime)
            opts.close && opts.close()
        }
    }
})(jQuery);