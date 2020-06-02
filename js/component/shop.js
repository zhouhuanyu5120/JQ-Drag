class Shop {
    constructor() {
        // 用来获取点击的组件的下标（和内存有关系所以在这里定义）
        this.index
    }

    initialization() {
        // 清空组件容器
        $('.moduleBox').empty()
        $("#phone").empty()
        $(".msgBox").empty()

        this.mainHeader()
        this.mainTab()
        this.banner()
        this.mainTabBanner()
        this.mainAdvert()
        this.mainCommodity()
        this.mainLine()

    }

    // 分割线
    mainLine() {
        var dom = `
            <div class="module">
                <div class='title'>分割线</div>
                <div class='MainLine modular sortable' type='MainLine'></div>
            </div>
        `
        $('.moduleBox').append(dom)
    }

    // 背景色
    mainBg() {
        var dom = `
            <div class="module">
                <div class='title'>背景色</div>
                <div class='ShopMainBg modular sortable' type='MainBg'>
                </div>
            </div>
        `
        $('.moduleBox').append(dom)
    }

    // 头部和搜索框
    mainHeader() {
        var dom = `
            <div class="module" style='height:100px;overflow:hidden;'>
                <div class='title'>头部组件</div>
                <div class='shopMainHeader modular sortable' type='MainHeader' title='这里是标题' bgColor=''>
                    <div class='bg'></div>
                    <div class='head'>
                        <div class='user'>
                            <div class='userCover'>
                                <img src='https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=256660427,1966353460&fm=26&gp=0.jpg'/>
                            </div>
                            <div class='userMsg'>
                                <div class='name'>大宇哥</div>
                                <div class='brief'>体验师</div>
                            </div>
                        </div>
                        <div class='search'>
                            <div class='searchIcon'><i class='iconfont icon-sousuo'></i></div>
                            <input type='text' placeholder="输入您要搜索的内容"/>
                        </div>
                        <div class='cart'>
                            <i class='iconfont icon-gouwuche'></i>
                        </div>
                    </div>
                </div>
            </div>
        `
        $('.moduleBox').append(dom)
    }
    // 头部点击事件
    mainHeaderClick(dom){
        var _this = this
        // 获取当前点击的元素
        this.index = $(dom).index()
        var thisDom = $('#phone').find('.modular').eq(this.index)

        // 清空msg元素和保存按钮（防止按钮事件冲突）
        $('#msg>.msgBox').empty()
        $('#sub').remove();

        var sub = `<div class='headSub' id="sub">保存设置</div>`
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
        $('#msg').on('click', '.headSub', function () {
            var title = $('.headTitle').find('input').val()
            var color = $('.headColor').find('input').val()

            $('#phone').find('.modular').eq(_this.index).attr('title', title)
            $('#phone').find('.modular').eq(_this.index).attr('bgColor', color)
            $('#phone').find('.modular').eq(_this.index).find('.bg').css('background-color',color)
        })
    }

    // 选项卡
    mainTab() {
        var dom = `
            <div class="module">
                <div class='title'>选项卡</div>
                <div class='shopMainTab modular sortable' type='MainTab' color=''>
                    <ul>
                        <li>精选推荐</li>
                        <li>线上体验店</li>
                        <li>爆款拼团</li>
                        <li>美妆个护</li>
                        <li>食品零食</li>
                    </ul>
                </div>
            </div>
        `
        $('.moduleBox').append(dom)
    }

    // 选项卡点击事件
    mainTabClick(dom) {
        var _this = this
        // 获取当前点击的元素
        this.index = $(dom).index()
        var thisDom = $('#phone').find('.modular').eq(this.index)

        // 请求全部tab
        Http.get('http://localhost:8080/saasAdmin/json/tabList.json').then(res => {

            // 清空msg元素和保存按钮（防止按钮事件冲突）
            $('#msg>.msgBox').empty()
            $('#sub').remove();

            var sub = `<div class='tabSub' id="sub">保存设置</div>`
            $('#msg').append(sub)

            var tabList = []
            var allList = res
            // allList = res

            // 获取Phone中选中的选项卡的数据
            for (let i = 0; i < thisDom.find('li').length; i++) {
                tabList.push(thisDom.find('li').eq(i).text())
            }

            // 将Phone中的数据按照顺序展示在右侧
            var showList = []
            showList = tabList.concat(allList).filter(function (v, i, arr) {
                return arr.indexOf(v) === arr.lastIndexOf(v);
            });

            var domColor = $('#phone').find('.modular').eq(this.index).attr('color')
            // 设置选项卡颜色输入框
            var colorDom = `
                        <div class='inputBox'>
                            <div>字体颜色：</div>
                            <input type='text' value='${domColor}' placeholder="输入字体颜色，例如#ffffff"/>
                        </div>
                    `
            $('#msg>.msgBox').append(colorDom)

            // 选项卡列表容器
            var listDom = `
                        <div class='tabList'>
                            <div>选项卡列表：</div>
                            <div class='list'>
                                <ul>
                                </ul>
                            </div>
                        </div>
                    `

            $('#msg>.msgBox').append(listDom)

            // 先添加Phone内的选项卡列表
            for (let j in tabList) {
                var li = `<li class='chose' check='1'>${tabList[j]}</li>`
                $('.tabList>.list>ul').append(li)
            }
            // 再添加剩余没有选中的选项卡列表
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
                var color = $('.inputBox').find('input').val()
                $('#phone').find('.modular').eq(_this.index).find('ul').empty()

                var msgBox = $('.tabList>.list>ul').find('li')
                for (let i = 0; i < msgBox.length; i++) {
                    var check = msgBox.eq(i).attr('check')
                    if (check == '1') {
                        var li = `
                                        <li style='color:${color}'>${msgBox.eq(i).text()}</li>
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

    // 商城轮播渲染
    banner() {
        var dom = `
            <div class="module">
                <div class='title'>轮播图</div>
                <div class='shopBannerBox modular sortable' type='Banner'>
                    <div class='shopBanner'>
                        <div><img src='https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=256660427,1966353460&fm=26&gp=0.jpg'/></div>
                    </div>
                </div>
            </div>
        `

        $('.moduleBox').append(dom)
    }

    // 商城轮播点击
    bannerClick(dom) {
        var _this = this
        // 获取当前点击的元素
        this.index = $(dom).index()
        // var domClass = $(dom).attr('class').split(' ')
        // alert(this.index)
        // var thisDom = $('#phone').find(`.${domClass[0]}`).eq(this.index)
        var thisDom = $('#phone').find('.modular').eq(this.index)

        // 下面进行逻辑处理

        // 获取banner页数
        var page = thisDom.attr('page')
        // 获取banner图片列表
        var imgList = []

        for (let i = 0; i < thisDom.find('.shopBanner').length; i++) {
            imgList.push(thisDom.find('.shopBanner').eq(i).find('img').attr('src'))
        }

        // 清空msg元素和保存按钮（防止按钮事件冲突）
        $('#msg>.msgBox').empty()
        $('#sub').remove();

        var sub = `<div class='bannerSub' id="sub">保存设置</div>`
        $('#msg').append(sub)

        for (let i in imgList) {
            var bannerMsg = `
                <div class='bannerList'>
                    <div class='bannerImg'>
                        <img src='${imgList[i]}'/>
                    </div>
                    <div class='imgUpload'>
                        修改封面
                        <input type='file' class='inputUpload' />
                    </div>
                </div>
            `

            $('#msg>.msgBox').append(bannerMsg)
        }

        // banner双击删除
        $('.bannerList').on('dblclick', function () {
            PublicFun.dialog(this)
        })

        // banner修改封面
        $('.inputUpload').on('change', function (el) {
            var reader;
            var _this = this;
            if (window.FileReader) {
                reader = new FileReader();
            } else {
                alert("您的设备不支持图片预览功能，如需该功能请升级您的设备！");
            }
            var file = el.target.files[0];
            console.log(file)
            var imageType = /^image\//;
            //是否是图片
            if (!imageType.test(file.type)) {
                alert("请选择图片！");
                return;
            }
            //读取完成
            reader.onload = function (e) {
                //图片路径设置为读取的图片
                $(_this).parent().parent().find('img').attr('src', e.target.result);
            };
            reader.readAsDataURL(file);
        })

        // 添加增加banner按钮
        var imgAdd = `<div class='imgAdd'> 增加banner+ </div>`
        $('#msg>.msgBox').append(imgAdd)

        // 增加banner事件
        $('.imgAdd').click(function () {
            var bannerMsg = `
                <div class='bannerList'>
                    <div class='bannerImg'>
                        <img src=''/>
                    </div>
                    <div class='imgUpload'>
                        修改封面
                        <input type='file' class='inputUpload' />
                    </div>
                </div>
            `
            $('#msg>.msgBox').prepend(bannerMsg)

            // banner双击删除
            $('.bannerList').on('dblclick', function () {
                PublicFun.dialog(this)
            })

            // banner修改封面
            $('.inputUpload').on('change', function (el) {
                var reader;
                var _this = this;
                if (window.FileReader) {
                    reader = new FileReader();
                } else {
                    alert("您的设备不支持图片预览功能，如需该功能请升级您的设备！");
                }
                var file = el.target.files[0];
                console.log(file)
                var imageType = /^image\//;
                //是否是图片
                if (!imageType.test(file.type)) {
                    alert("请选择图片！");
                    return;
                }
                //读取完成
                reader.onload = function (e) {
                    //图片路径设置为读取的图片
                    $(_this).parent().parent().find('img').attr('src', e.target.result);
                };
                reader.readAsDataURL(file);

            })

        })

        // 设置容器内可拖拽   
        $("#msg>.msgBox").sortable({
            revert: true
        });

        // 设定右侧栏点击保存后的逻辑
        $('#msg').on('click', '.bannerSub', function () {
            $('#phone').find('.modular').eq(_this.index).empty()

            var msgBox = $('#msg>.msgBox').find('.bannerList')
            for (let i = 0; i < msgBox.length; i++) {
                var bannerList = `
                    <div class='shopBanner'>
                        <div><img src='${msgBox.eq(i).find('img').attr('src')}'/></div>
                    </div>
                `

                $('#phone').find('.modular').eq(_this.index).append(bannerList)
            }
        })
    }

    // 精钢位
    mainTabBanner() {
        var dom = `
            <div class="module">
                <div class='title'>精钢位</div>
                <div class='shopTabBanner modular sortable' type='MainTabBanner'>
                    <div class='page'>
                        <div class='tab'>
                            <div class='cover'>
                                <img src='https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=256660427,1966353460&fm=26&gp=0.jpg'/>
                            </div>
                            <div class='title'>标题1</div>
                        </div>

                        <div class='tab'>
                            <div class='cover'>
                                <img src='https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=256660427,1966353460&fm=26&gp=0.jpg'/>
                            </div>
                            <div class='title'>标题</div>
                        </div>

                        <div class='tab'>
                            <div class='cover'>
                                <img src='https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=256660427,1966353460&fm=26&gp=0.jpg'/>
                            </div>
                            <div class='title'>标题</div>
                        </div>

                        <div class='tab'>
                            <div class='cover'>
                                <img src='https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=256660427,1966353460&fm=26&gp=0.jpg'/>
                            </div>
                            <div class='title'>标题</div>
                        </div>

                        <div class='tab'>
                            <div class='cover'>
                                <img src='https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=256660427,1966353460&fm=26&gp=0.jpg'/>
                            </div>
                            <div class='title'>标题</div>
                        </div>

                        <div class='tab'>
                            <div class='cover'>
                                <img src='https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=256660427,1966353460&fm=26&gp=0.jpg'/>
                            </div>
                            <div class='title'>标题</div>
                        </div>

                        <div class='tab'>
                            <div class='cover'>
                                <img src='https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=256660427,1966353460&fm=26&gp=0.jpg'/>
                            </div>
                            <div class='title'>标题</div>
                        </div>

                        <div class='tab'>
                            <div class='cover'>
                                <img src='https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=256660427,1966353460&fm=26&gp=0.jpg'/>
                            </div>
                            <div class='title'>标题</div>
                        </div>

                        <div class='tab'>
                            <div class='cover'>
                                <img src='https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=256660427,1966353460&fm=26&gp=0.jpg'/>
                            </div>
                            <div class='title'>标题</div>
                        </div>

                        <div class='tab'>
                            <div class='cover'>
                                <img src='https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=256660427,1966353460&fm=26&gp=0.jpg'/>
                            </div>
                            <div class='title'>标题</div>
                        </div>

                    </div>
                </div>
            </div>
        `
        $('.moduleBox').append(dom)
    }

    // 精钢位点击事件
    mainTabBannerClick(dom) {
        var _this = this
        // 获取当前点击的元素
        this.index = $(dom).index()
        var thisDom = $('#phone').find('.modular').eq(this.index)

        // 请求所有tab
        Http.get('http://localhost:8080/saasAdmin/json/tabBanner.json').then(res => {
            // 清空msg元素和保存按钮（防止按钮事件冲突）
            $('#msg>.msgBox').empty()
            $('#sub').remove();

            var sub = `<div class='tabBannerButton' id="sub">保存设置</div>`
            $('#msg').append(sub)

            // 获取页数和每页的列表
            var pageTab = []
            var pageIndex = thisDom.find('.page').length
            // 总列表
            var allTab = res

            // 可以拖拽页
            $('#msg>.msgBox').sortable({
                revert: true
            });
            // 循环取出当前页的数据
            for (let i = 0; i < thisDom.find('.page').length; i++) {
                pageTab.push([])
                for (let j = 0; j < thisDom.find('.page').eq(i).find('.tab').length; j++) {
                    var data = {
                        id: '',
                        name: thisDom.find('.page').eq(i).find('.tab').eq(j).find('.title').text(),
                        img: thisDom.find('.page').eq(i).find('.tab').eq(j).find('img').attr('src'),
                    }
                    pageTab[i].push(data)
                }
            }

            // 渲染右侧列表
            for (let i = 0; i < pageTab.length; i++) {
                var tabDom = `
                    <div class='tabBanner'>
                        <div class='page'></div>
                        <div class='button'>
                            <div class='add'>修改tab</div>
                            <div class='del'>删除此页</div>
                        </div>
                    </div>
                `
                $('#msg>.msgBox').append(tabDom)
                for (let j = 0; j < pageTab[i].length; j++) {
                    var tab = `
                        <div class='tab'>
                            <div class='cover'>
                                <img src='${pageTab[i][j].img}'/>
                            </div>
                            <div class='title'>${pageTab[i][j].name}</div>
                        </div>
                    `

                    $('#msg>.msgBox').find('.tabBanner').eq(i).find('.page').append(tab)

                }
                // 设置容器内可拖拽   
                $('#msg>.msgBox').find('.tabBanner').eq(i).find('.page').sortable({
                    revert: true
                });
            }

            // 增加右侧列表增加页数按钮
            var addPage = `<div class='addPage'>增加一页</div>`
            $('#msg>.msgBox').append(addPage)

            // 页数删除
            $('.tabBanner>.button>.del').on('click', function () {
                PublicFun.dialog($(this).parent().parent())
            })

            // 设定右侧栏点击保存后的逻辑
            $('#msg').on('click', '.tabBannerButton', function () {
                $('#phone').find('.modular').eq(_this.index).empty()

                // 获取右侧数据
                var phoneTab = getMsgBox()

                // 再把右侧的添加到phone中
                for (let i in phoneTab) {
                    var page = `<div class='page'></div>`

                    $('#phone').find('.modular').eq(_this.index).append(page)
                    for (let j in phoneTab[i]) {
                        var tab = `
                            <div class='tab'>
                                <div class='cover'>
                                    <img src='${phoneTab[i][j].img}'/>
                                </div>
                                <div class='title'>${phoneTab[i][j].name}</div>
                            </div>
                        `
                        $('#phone').find('.modular').eq(_this.index).find('.page').eq(i).append(tab)
                    }
                }
            })

            // 获取右侧数据
            var getMsgBox = function () {
                var msgBox = $('#msg>.msgBox').find('.tabBanner')

                var list = []
                // 先把右侧的取出来
                for (let i = 0; i < msgBox.length; i++) {
                    list.push([])
                    for (let j = 0; j < msgBox.eq(i).find('.tab').length; j++) {
                        var data = {
                            id: msgBox.eq(i).find('.tab').eq(j).attr('id'),
                            img: msgBox.eq(i).find('.tab').eq(j).find('img').attr('src'),
                            name: msgBox.eq(i).find('.tab').eq(j).find('.title').text()
                        }

                        list[i].push(data)
                    }
                }

                return list
            }

            // 点击修改tab的事件封装
            var tabBannerAddClick = function () {
                var index = $(this).parent().parent().index()

                pageTab = getMsgBox()

                $('#dialog').remove()
                var dialog = `
                <div id='dialog'>
                    <div class='zzc'></div>

                    <div class='dialogContent' style='height:400px'>
                        <div class='tabList'>
                        </div>
                        <div class='button'>
                            <div class='cancel'>取消</div>
                            <div class='confirm'>确定</div>
                        </div>
                    </div>
                </div>
            `
                $('body').append(dialog)

                // 在弹窗中显示所有tab和被选中的
                for (let j in allTab) {
                    var tab = ` 
                    <div class='tab' id='>${allTab[j].id}'>
                        <div class='cover'>
                            <img src='${allTab[j].img}'/>
                        </div>
                        <div class='title'>${allTab[j].name}</div>
                    </div>
                `
                    for (let i in pageTab[index]) {
                        if (allTab[j].name == pageTab[index][i].name) {
                            tab = ` 
                            <div class='tab chose' check='1' id='>${allTab[j].id}'>
                                <div class='cover'>
                                    <img src='${allTab[j].img}'/>
                                </div>
                                <div class='title'>${allTab[j].name}</div>
                            </div>
                        `
                        }
                    }
                    $('#dialog').find('.tabList').append(tab)
                }

                // 给弹窗中的tab绑定点击事件
                $('#dialog').find('.tab').on('click', function () {
                    var check = $(this).attr('check')
                    if (check == '1') {
                        $(this).removeClass('chose');
                        $(this).attr('check', '');
                    } else {
                        $(this).addClass('chose');
                        $(this).attr('check', '1');
                    }
                })

                // 弹窗取消点击事件
                $('#dialog .zzc,#dialog .cancel').on('click', function () {
                    $('#dialog').remove()
                })

                // 弹窗确定点击事件
                $('#dialog .confirm').on('click', function () {
                    var dialogTabList = []
                    for (let i = 0; i < $('#dialog').find('.tab').length; i++) {
                        if ($('#dialog').find('.tab').eq(i).attr('check') == '1') {
                            var data = {
                                id: $('#dialog').find('.tab').eq(i).attr('id'),
                                img: $('#dialog').find('.tab').eq(i).find('img').attr('src'),
                                name: $('#dialog').find('.tab').eq(i).find('.title').text()
                            }

                            dialogTabList.push(data)
                        }
                    }
                    if (dialogTabList.length > 10) {
                        alert('每页tab不可超过10个')
                        return
                    }

                    // 清空选择页数的tab
                    $('#msg>.msgBox').find('.tabBanner').eq(index).find('.page').empty()

                    // 重新填入tab
                    for (let i in dialogTabList) {
                        var tab = `
                        <div class='tab'>
                            <div class='cover'>
                                <img src='${dialogTabList[i].img}'/>
                            </div>
                            <div class='title'>${dialogTabList[i].name}</div>
                        </div>
                    `

                        $('#msg>.msgBox').find('.tabBanner').eq(index).find('.page').append(tab)
                    }
                    pageTab[index] = dialogTabList
                    $('#dialog').remove()
                })
            }

            // 添加页按钮事件
            $('#msg>.msgBox .addPage').on('click', function () {
                var tabDom = `
                    <div class='tabBanner'>
                        <div class='page'></div>
                        <div class='button'>
                            <div class='add'>修改tab</div>
                            <div class='del'>删除此页</div>
                        </div>
                    </div>
                `
                $('#msg>.msgBox').prepend(tabDom)
                $('.tabBanner>.button>.add').on('click', tabBannerAddClick)

                // 设置容器内可拖拽   
                $('#msg>.msgBox').find('.tabBanner').find('.page').sortable({
                    revert: true
                });
            })


            // 添加tab添加事件
            $('.tabBanner>.button>.add').on('click', tabBannerAddClick)

        })
    }

    // 胶囊广告位
    mainAdvert() {
        var dom = `
            <div class="module">
                <div class='title'>胶囊广告</div>
                <div class='shopMainAdvert modular sortable' type='MainAdvert'>
                    <div class='advert'>
                        <div><img src='https://yuetao-1300766538.cos.ap-beijing.myqcloud.com/yuetao/image/2020-04-19/19/yuelvhuipvVCqFoP7Q1587297233.png' /></div>
                        <div><img src='https://yuetao-1300766538.cos.ap-beijing.myqcloud.com/yuetao/image/2020-04-19/19/yuelvhui6CLa1oDd4F1587297255.png' /></div>
                        <div><img src='https://yuetao-1300766538.cos.ap-beijing.myqcloud.com/yuetao/image/2020-04-19/19/yuelvhuipvVCqFoP7Q1587297233.png' /></div>
                        <div><img src='https://yuetao-1300766538.cos.ap-beijing.myqcloud.com/yuetao/image/2020-04-19/19/yuelvhuipvVCqFoP7Q1587297233.png' /></div>
                    </div>
                </div>
            </div>
        `

        $('.moduleBox').append(dom)
    }

    // 胶囊广告位点击事件
    mainAdvertClick(dom) {
        var _this = this
        // 获取当前点击的元素
        this.index = $(dom).index()
        var thisDom = $('#phone').find('.modular').eq(this.index)

        var num = $('#phone').find('.modular').eq(this.index).find('.advert').find('div').length

        // 清空msg元素和保存按钮（防止按钮事件冲突）
        $('#msg>.msgBox').empty()
        $('#sub').remove();

        var sub = `<div class='AdvertButton' id="sub">保存设置</div>`
        $('#msg').append(sub)

        var msgDom = `
            <div class='AdvertList'>
                <div class='title'>胶囊广告位设置:</div>
                <div class='Advertbox'>
                    <div class='list' num='2'>
                        <div class='cir ${num==2?'chose':''}'></div> <div>2张</div>
                    </div>
                    <div class='list' num='4'>
                        <div class='cir ${num==4?'chose':''}'></div> <div>4张</div>
                    </div>
                    <div class='list' num='6'>
                        <div class='cir ${num==6?'chose':''}'></div> <div>6张</div>
                    </div>
                    <div class='list' num='8'>
                        <div class='cir ${num==8?'chose':''}'></div> <div>8张</div>
                    </div>
                </div>
            </div>
        `
        $('#msg>.msgBox').append(msgDom)

        $('#msg>.msgBox').find('.list').on('click',function(){
            num = $(this).attr('num')
            $('#msg>.msgBox').find('.list').find('.cir').removeClass('chose');
            $(this).find('.cir').addClass('chose');
        })

        // 设定右侧栏点击保存后的逻辑
        $('#msg').on('click', '.AdvertButton', function () {
            $('#phone').find('.modular').eq(_this.index).find('.advert').empty()
            // 再把右侧的添加到phone中
            for (let i = 0;i<num;i++) {
                var list = `
                    <div><img src='https://yuetao-1300766538.cos.ap-beijing.myqcloud.com/yuetao/image/2020-04-19/19/yuelvhuipvVCqFoP7Q1587297233.png' /></div>
                `

                $('#phone').find('.modular').eq(_this.index).find('.advert').append(list)
            }
        })
    }

    // 推荐商品
    mainCommodity(){
        var dom = `
            <div class="module">
                <div class='title'>推荐商品</div>
                <div class='shopMainCommodity modular sortable' type='MainCommodity' tagList='美妆个护,食品零食'>
                    <div class='commodity'>
                        <div><img src='https://yuetao-1300766538.cos.ap-beijing.myqcloud.com/yuetao/image/2020-05-27/14/yuelvhui2xcLqwu8sj1590560762.jpg' /></div>
                        <div><img src='https://yuetao-1300766538.cos.ap-beijing.myqcloud.com/yuetao/image/2020-05-27/14/yuelvhui2xcLqwu8sj1590560762.jpg' /></div>
                        <div><img src='https://yuetao-1300766538.cos.ap-beijing.myqcloud.com/yuetao/image/2020-05-27/14/yuelvhui2xcLqwu8sj1590560762.jpg' /></div>
                        <div><img src='https://yuetao-1300766538.cos.ap-beijing.myqcloud.com/yuetao/image/2020-05-27/14/yuelvhui2xcLqwu8sj1590560762.jpg' /></div>
                    </div>
                </div>
            </div>
        `
        $('.moduleBox').append(dom)
    }


    // 推荐商品点击事件
    mainCommodityClick(dom) {
        var _this = this
        // 获取当前点击的元素
        this.index = $(dom).index()
        var thisDom = $('#phone').find('.modular').eq(this.index)
        Http.get('http://localhost:8080/saasAdmin/json/tabList.json').then(res => {
            var tagList = res

            var modularTagList = $('#phone').find('.modular').eq(this.index).attr('tagList')

            modularTagList = modularTagList.split(',')
    
            // 清空msg元素和保存按钮（防止按钮事件冲突）
            $('#msg>.msgBox').empty()
            $('#sub').remove();
    
            var sub = `<div class='CommodityButton' id="sub">保存设置</div>`
            $('#msg').append(sub)
    
    
            var msgDom = `
                <div class='CommodityList'>
                    <div class='title'>推荐商品设置设置:</div>
                    <div class='Commoditytbox'>
                    </div>
                </div>
            `
            $('#msg>.msgBox').append(msgDom)

            for(let i in tagList){
                var list = `
                    <div class='list'>
                        <div class='cir'></div> <div class='name'>${tagList[i]}</div>
                    </div>
                `
                for(let j in modularTagList){
                    if(tagList[i] == modularTagList[j]){
                        list = `
                            <div class='list' check='1'>
                                <div class='cir chose'></div> <div class='name'>${tagList[i]}</div>
                            </div>
                        `
                    }
                }

                $('#msg>.msgBox').find('.Commoditytbox').append(list)
            }
    
            $('#msg>.msgBox').find('.list').on('click',function(){
                var check = $(this).attr('check')
                if(check=='1'){
                    $(this).find('.cir').removeClass('chose');
                    $(this).attr('check','0')
                }else{
                    $(this).find('.cir').addClass('chose');
                    $(this).attr('check','1')
                }
            })
    
            // 设定右侧栏点击保存后的逻辑
            $('#msg').on('click', '.CommodityButton', function () {
                $('#phone').find('.modular').eq(_this.index).find('.advert').empty()
                var choseTagList = []
                // 再把右侧的添加到phone中
                for (let i = 0;i<$('#msg>.msgBox').find('.list').length;i++) {
                    if($('#msg>.msgBox').find('.list').eq(i).attr('check')=='1'){
                        choseTagList.push($('#msg>.msgBox').find('.list').eq(i).find('.name').text())
                        $('#phone').find('.modular').eq(_this.index).attr('tagList',choseTagList.join(','))
                    }
                }
            })
        })
    }
}

const ComShop = new Shop()