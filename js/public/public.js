class Public{
    constructor(){
        // this.dialogDom
    }

    // dialog弹窗
    dialog(dom,msg='是否删除此元素',cancel='取消',confirm='确认'){
        $('#dialog').remove()
        var dialog = `
            <div id='dialog'>
                <div class='zzc'></div>

                <div class='dialogContent'>
                    <div class='content'>
                        ${msg}
                    </div>
                    <div class='button'>
                        <div class='cancel'>${cancel}</div>
                        <div class='confirm'>${confirm}</div>
                    </div>
                </div>
            </div>
        `
        $('body').append(dialog)

        $('#dialog .zzc,#dialog .cancel').on('click',function(){
            $('#dialog').remove()
        })

        $('#dialog .confirm').on('click',function(){
            $('#dialog').remove()
            // $('#msg>.msgBox').empty()
            $(dom).remove() 
        })
    }
}


const PublicFun = new Public()