// index.js
//随机获得颜色
function getRandomColor() {
  let rgb = []
  for (let i = 0; i < 3; ++i) {
      let color = Math.floor(Math.random() * 256).toString(16)
      color = color.length == 1 ? '0' + color : color
      rgb.push(color)
  }
  return '#' + rgb.join('')
}

Page({
  data: {
    src: '',
    danmuText: '',
    list: [
      {
      id: '001',
      title: '杨国宜先生口述校史实录',
      videoUrl: 'http://arch.ahnu.edu.cn/__local/6/CB/D1/C2DF3FC847F4CE2ABB67034C595_025F0082_ABD7AE2.mp4?e=.mp4'
      },
      {
        id: '002',
        title: '唐成伦先生口述校史实录',
        videoUrl: 'http://arch.ahnu.edu.cn/__local/E/31/EB/2F368A265E6C842BB6A63EE5F97_425ABEDD_7167F22.mp4?e=.mp4'
      },
      {
        id: '003',
        title: '倪光明先生口述校史实录',
        videoUrl: 'http://arch.ahnu.edu.cn/__local/9/DC/3B/35687573BA2145023FDAEBAFE67_AAD8D222_925F3FF.mp4?e=.mp4'
      },
      {
        id: '004',
        title: '吴仪兴先生口述校史实录',
        videoUrl: 'http://arch.ahnu.edu.cn/__local/5/DA/BD/7A27865731CF2B096E90B522005_A29CB142_6525BCF.mp4?e=.mp4'
      }
    ]
  },

  playVideo: function(e) {
    console.log(e); 
    this.videoCtx.stop();
    this.setData({
        src: e.currentTarget.dataset.url 
    });
    this.videoCtx.play();
  },

  getDanmu:function(e){
    this.setData({
      danmuText: e.detail.value
    })
  },

  sendDanmu:function(e){
    let text = this.data.danmuText
    this.videoCtx.sendDanmu({
      text: text,
      color: getRandomColor()
    })
    // 发送弹幕之后应该清空输入框
    this.setData({
      danmuText: ''
    })
  },

  // 页面加载时调用
  onLoad(options) {
    this.videoCtx=wx.createVideoContext('myVideo')
  },

  // 页面初次渲染完成时调用
  onReady: function() {
    this.videoCtx = wx.createVideoContext('myVideo');
    // 自动播放第一个视频
    if (this.data.list.length > 0) {
        this.setData({
            src: this.data.list[0].videoUrl
        }, () => {
            this.videoCtx.play();
        });
    }
  },

  onShow() {}, // 页面显示时调用

  onHide() {}, // 页面隐藏时调用

  onUnload() {}, // 页面卸载时调用

  onPullDownRefresh() {}, // 用户下拉动作时调用

  onReachBottom() {}, // 页面上拉触底事件的处理函数

  onShareAppMessage() {} // 用户点击右上角分享时调用


})
