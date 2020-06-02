class Main{
    constructor(){}

    // 初始化组件
    initialization(phone){
        var _this=this
        $('.modular').off('click')
        $(phone).on('dblclick','.modular',function(){
            PublicFun.dialog(this)
            // $(this).remove()
        })
        $(phone).on('click','.modular',function(){
            _this.initializationClick(this)
        })
    }

    // 每次拖入组件后给组件动态绑定事件
    initializationClick(dom){
        // 获取当前点击的元素 进行判断后绑定点击组件的事件
        var domClass = $(dom).attr('class').split(' ')

        switch(domClass[0]){
            // 首页banner组件
            case 'shopBannerBox':
                ComShop.bannerClick(dom)
                break;
            // 首页选项卡组件
            case 'shopMainTab':
                ComShop.mainTabClick(dom)
                break;
            // 首页精钢位组件
            case 'shopTabBanner':
                ComShop.mainTabBannerClick(dom)
                break;
            // 首页胶囊广告位点击事件
            case 'shopMainAdvert':
                ComShop.mainAdvertClick(dom)
                break;
            // 首页推荐商品点击事件
            case 'shopMainCommodity':
                ComShop.mainCommodityClick(dom)
                break;
            // 首页推荐商品点击事件
            case 'shopMainHeader':
                ComShop.mainHeaderClick(dom)
                break;  
            // 酒店头部组件点击事件
            case 'hotelMainHeader':
                HotelCom.hotelHeaderClick(dom)
                break;  
            // 大礼包头部组件点击事件
            case 'giftMainHeader':
                GiftCom.giftHeaderClick(dom)
                break;      
            // 大礼包Vip组件点击事件
            case 'giftMainVip':
                GiftCom.giftVipClick(dom)
                break;      
                
        }
    }
}

const MainFun = new Main()