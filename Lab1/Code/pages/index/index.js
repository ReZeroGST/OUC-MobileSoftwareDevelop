// pages/index/index.js
Page({
  data: {
    // 初始化昵称
    nickName: 'Hello World!',
    // 初始化头像路径
    src: '/images/WechatLogo.jpg',
    newName: ''
  },

  // 获取用户头像信息
  getMyInfo: function(e) {
    console.log("avatarUrl", e.detail.avatarUrl);
    let info = e.detail;
    // 更新昵称和头像
    this.setData({
      nickName: info.nickName,
      src: info.avatarUrl
    });
  },

  // 绑定输入框输入事件
  bindInput: function(e) {
    // 更新昵称
    this.setData({
      nickName: e.detail.value
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})
