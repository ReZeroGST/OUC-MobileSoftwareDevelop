// pages/index/index.js
var common = require('../../utils/common.js') //引用公共JS文件
Page({
    data: {
        //幻灯片素材
        swiperImg: [{
                src: 'https://news.ouc.edu.cn/_upload/article/images/dd/19/ede76a4a4ebdb1d3ab278a12fdd8/9bb154f8-e33b-421a-b453-82c758a32405.jpg'
            },
            {
                src: 'https://news.ouc.edu.cn/_upload/article/images/3a/4d/73b22a9b404f93e907238f2a2325/55606b28-53b8-412f-9420-74c7a30657b6.jpg'
            },
            {
                src: 'https://news.ouc.edu.cn/_upload/article/images/94/9e/509119874e5287e8c56ef708865b/11604054-e936-468b-a50e-a4233e475a53.jpg'
            }
        ],
    },

    imageLoad: function(e) {
      const { width, height } = e.detail;
      wx.getSystemInfoAsync({
        success: (res) => {
          const windowWidth = res.windowWidth;
          const swiperHeight = (windowWidth * height) / width;
          this.setData({
            swiperHeight
          });
        }
      });
    },

    goToDetail: function (e) {
        //获取携带的data-id数据
        let id = e.currentTarget.dataset.id;
        //携带新闻id进行页面跳转
        var islogin = wx.getStorageSync('islogin')
        if (islogin) {
            wx.navigateTo({
                url: '../detail/detail?id=' + id
            })
        } else {
            wx.showModal({
                title: '提示',
                content: '你还没有登陆，将跳转至登录界面',
                success: (res) => {
                    if (res.confirm) { //这里是点击了确定以后
                        wx.switchTab({
                            url: '../my/my',
                        })
                    } else { //这里是点击了取消以后
                        console.log('用户点击取消')
                    }
                }
            })
        }
    },
    
    onLoad: function (options) {
        //获取新闻列表
        let list = common.getNewsList()
        //更新列表数据
        this.setData({
            newsList: list,
        })
    },
})