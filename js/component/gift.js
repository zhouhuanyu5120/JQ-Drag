class Gift {
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
        this.giftHeader()
        this.giftVip()
    }

    // 分割线
    mainLine() {
        var dom = `
            <div class="module">
                <div class='title'>分割线</div>
                <div class='MainLine modular sortable' type='giftLine'></div>
            </div>
        `
        $('.moduleBox').append(dom)
    }

    
    // 头部和搜索框
    giftHeader() {
        var dom = `
            <div class="module">
                <div class='title'>头部组件</div>
                <div class='giftMainHeader modular sortable' type='hotelHeader' title='这里是标题' bgColor=''>
                    <div class='bg'></div>
                    <div class='head'>
                         <img src='https://yuetao-1300766538.cos.ap-beijing.myqcloud.com/yuetao/image/2020-05-29/15/yuelvhuioWymc0mL7D1590738341.png'/>
                    </div>
                </div>
            </div>
        `
        $('.moduleBox').append(dom)
    }

    // 头部点击事件
    giftHeaderClick(dom){
        var _this = this
        // 获取当前点击的元素
        this.index = $(dom).index()
        var thisDom = $('#phone').find('.modular').eq(this.index)
        
        // 请求全部tab
        Http.get('http://localhost:8080/saasAdmin/json/tabList.json').then(res => {
    
            // 清空msg元素和保存按钮（防止按钮事件冲突）
            $('#msg>.msgBox').empty()
            $('#sub').remove();
    
            var sub = `<div class='giftheadSub' id="sub">保存设置</div>`
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

            var tabList = []
            var allList = res
            // allList = res

            // 获取Phone中选中的权益的数据
            for (let i = 0; i < thisDom.find('li').length; i++) {
                tabList.push(thisDom.find('li').eq(i).text())
            }

            // 将Phone中的数据按照顺序展示在右侧
            var showList = []
            showList = tabList.concat(allList).filter(function (v, i, arr) {
                return arr.indexOf(v) === arr.lastIndexOf(v);
            });

            // 选项卡列表容器
            var listDom = `
                        <div class='tabList'>
                            <div>权益列表：</div>
                            <div class='list'>
                                <ul>
                                </ul>
                            </div>
                        </div>
                    `

            $('#msg>.msgBox').append(listDom)

            // 先添加Phone内的权益列表
            for (let j in tabList) {
                var li = `<li class='chose' check='1'>${tabList[j]}</li>`
                $('.tabList>.list>ul').append(li)
            }
            // 再添加剩余没有选中的权益列表
            for (let j in showList) {
                var li = `<li>${showList[j]}</li>`
                $('.tabList>.list>ul').append(li)
            }

            // 给list绑定点击事件
            $('.tabList>.list>ul').find('li').on('click', function () {
                var index = $(this).index()
                var domCheck = $(this).attr('check')
                if (domCheck == '1') {
                    $(this).attr('check', '0')
                    $(this).removeClass('chose');
                } else {
                    $(this).attr('check', '1')
                    $(this).addClass('chose');
                }
            })

            // 设定右侧栏点击保存后的逻辑
            $('#msg').on('click', '.tabSub', function () {
            })
            // 设定右侧栏点击保存后的逻辑
            $('#msg').on('click', '.giftheadSub', function () {
                var title = $('.headTitle').find('input').val()
                var color = $('.headColor').find('input').val()
                
                $('#phone').find('.modular').eq(_this.index).attr('title', title)
                $('#phone').find('.modular').eq(_this.index).attr('bgColor', color)
                $('#phone').find('.modular').eq(_this.index).find('.bg').css('background-color',color)

                $('#phone').find('.modular').eq(_this.index).find('ul').empty()
    
                var msgBox = $('.tabList>.list>ul').find('li')
                for (let i = 0; i < msgBox.length; i++) {
                    var check = msgBox.eq(i).attr('check')
                    if (check == '1') {
                        var li = `
                                        <li>${msgBox.eq(i).text()}</li>
                                `
    
                        $('#phone').find('.modular').eq(_this.index).find('ul').append(li)
                    }
                }
    
                $('#phone').find('.modular').eq(_this.index).attr('color', color)
            })

            // 设置容器内可拖拽   
            $(".tabList>.list>ul").sortable({
                revert: true
            });
        })
    }

    // 大礼包vip
    giftVip(){
        var dom = `
            <div class="module">
                <div class='title'>vip组件</div>
                <div class='giftMainVip modular sortable' type='hotelHeader' title='这里是标题' bgColor=''>
                    <div class='head'>
                        <img src='https://yuetao-1300766538.cos.ap-beijing.myqcloud.com/yuetao/image/2020-05-29/15/yuelvhui0qaBvIPAME1590738451.jpeg'/>
                    </div>
                </div>
            </div>
        `
        $('.moduleBox').append(dom)
    }


    // 头部点击事件
    giftVipClick(dom){
        var _this = this
        // 获取当前点击的元素
        this.index = $(dom).index()
        var thisDom = $('#phone').find('.modular').eq(this.index)
        
        // 请求全部tab
        Http.get('http://localhost:8080/saasAdmin/json/tabList.json').then(res => {
    
            // 清空msg元素和保存按钮（防止按钮事件冲突）
            $('#msg>.msgBox').empty()
            $('#sub').remove();

            var sub = `<div class='giftheadSub' id="sub">保存设置</div>`
            $('#msg').append(sub)

            var tabList = []
            var allList = res
            // allList = res

            // 获取Phone中选中的权益的数据
            for (let i = 0; i < thisDom.find('li').length; i++) {
                tabList.push(thisDom.find('li').eq(i).text())
            }

            // 将Phone中的数据按照顺序展示在右侧
            var showList = []
            showList = tabList.concat(allList).filter(function (v, i, arr) {
                return arr.indexOf(v) === arr.lastIndexOf(v);
            });

            // 选项卡列表容器
            var listDom = `
                        <div class='tabList'>
                            <div>礼包列表：</div>
                            <div class='list'>
                                <ul>
                                </ul>
                            </div>
                        </div>
                    `

            $('#msg>.msgBox').append(listDom)

            // 先添加Phone内的礼包列表
            for (let j in tabList) {
                var li = `<li class='chose' check='1'>${tabList[j]}</li>`
                $('.tabList>.list>ul').append(li)
            }
            // 再添加剩余没有选中的礼包列表
            for (let j in showList) {
                var li = `<li>${showList[j]}</li>`
                $('.tabList>.list>ul').append(li)
            }

            // 给list绑定点击事件
            $('.tabList>.list>ul').find('li').on('click', function () {
                var index = $(this).index()
                var domCheck = $(this).attr('check')
                if (domCheck == '1') {
                    $(this).attr('check', '0')
                    $(this).removeClass('chose');
                } else {
                    $(this).attr('check', '1')
                    $(this).addClass('chose');
                }
            })

            // 设定右侧栏点击保存后的逻辑
            $('#msg').on('click', '.tabSub', function () {
            })
            // 设定右侧栏点击保存后的逻辑
            $('#msg').on('click', '.giftheadSub', function () {
                var title = $('.headTitle').find('input').val()
                var color = $('.headColor').find('input').val()
                
                $('#phone').find('.modular').eq(_this.index).attr('title', title)
                $('#phone').find('.modular').eq(_this.index).attr('bgColor', color)
                $('#phone').find('.modular').eq(_this.index).find('.bg').css('background-color',color)

                $('#phone').find('.modular').eq(_this.index).find('ul').empty()
    
                var msgBox = $('.tabList>.list>ul').find('li')
                for (let i = 0; i < msgBox.length; i++) {
                    var check = msgBox.eq(i).attr('check')
                    if (check == '1') {
                        var li = `
                                        <li>${msgBox.eq(i).text()}</li>
                                `
    
                        $('#phone').find('.modular').eq(_this.index).find('ul').append(li)
                    }
                }
    
                $('#phone').find('.modular').eq(_this.index).attr('color', color)
            })

            // 设置容器内可拖拽   
            $(".tabList>.list>ul").sortable({
                revert: true
            });
        })
    }
}

const GiftCom = new Gift()