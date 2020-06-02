class Hotel {
    constructor() {
        // 用来获取点击的组件的下标（和内存有关系所以在这里定义）
        this.index
    }

    initialization() {
        // 清空组件容器
        $('.moduleBox').empty()
        $("#phone").empty()
        $(".msgBox").empty()
        
        this.mainLine()
        this.hotelHeader()
    }

    // 分割线
    mainLine() {
        var dom = `
            <div class="module">
                <div class='title'>分割线</div>
                <div class='MainLine modular sortable' type='hotelLine'></div>
            </div>
        `
        $('.moduleBox').append(dom)
    }

    
    // 头部和搜索框
    hotelHeader() {
        var dom = `
            <div class="module">
                <div class='title'>头部组件</div>
                <div class='hotelMainHeader modular sortable' type='hotelHeader' title='这里是标题' bgColor=''>
                    <div class='bg'></div>
                    <div class='head'>
                         <img src='https://yuetao-1300766538.cos.ap-beijing.myqcloud.com/yuetao/image/2020-05-29/14/yuelvhuiw7ep24CF2R1590733833.jpg'/>
                    </div>
                </div>
            </div>
        `
        $('.moduleBox').append(dom)
    }
    // 头部点击事件
    hotelHeaderClick(dom){
        var _this = this
        // 获取当前点击的元素
        this.index = $(dom).index()
        var thisDom = $('#phone').find('.modular').eq(this.index)

        // 清空msg元素和保存按钮（防止按钮事件冲突）
        $('#msg>.msgBox').empty()
        $('#sub').remove();

        var sub = `<div class='hotelheadSub' id="sub">保存设置</div>`
        $('#msg').append(sub)

        var domColor = $('#phone').find('.modular').eq(this.index).attr('bgColor')
        var domTitle = $('#phone').find('.modular').eq(this.index).attr('title')

        // 设置页面标题
        var colorDom = `
            <div class='inputBox headTitle'>
                <div>页面标题：</div>
                <input type='text' value='${domTitle}' placeholder="输入页面标题"/>
            </div>
        `
        $('#msg>.msgBox').append(colorDom)  

        // 设置页面背景色
        var colorDom = `
            <div class='inputBox headColor'>
                <div>背景颜色：</div>
                <input type='text' value='${domColor}' placeholder="输入背景颜色，例如#ffffff"/>
            </div>
        `
        $('#msg>.msgBox').append(colorDom)  


        // 设定右侧栏点击保存后的逻辑
        $('#msg').on('click', '.hotelheadSub', function () {
            var title = $('.headTitle').find('input').val()
            var color = $('.headColor').find('input').val()

            $('#phone').find('.modular').eq(_this.index).attr('title', title)
            $('#phone').find('.modular').eq(_this.index).attr('bgColor', color)
            $('#phone').find('.modular').eq(_this.index).find('.bg').css('background-color',color)
        })
    }

}

const HotelCom = new Hotel()