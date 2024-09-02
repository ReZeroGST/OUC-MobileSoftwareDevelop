// pages/my/my.js
Page({
  data: {
    num: 0,
    isLogin: false,
    src: '',
    nickName: '',
    inputValue: '',
    newsList: [] // 确保初始化
  },

  onChooseAvatar: function (e) {
    const { avatarUrl } = e.detail;
    this.setData({
      src: avatarUrl,
      isLogin: true
    });
    wx.setStorageSync('islogin', true);
    this.getMyFavorites();
  },

  onNicknameBlur: function (e) {
    const { value } = e.detail;
    this.setData({
      nickName: value,
      inputValue: '' // 清空输入框
    });
  },

  goLogout() {
    wx.showModal({
      title: '提示',
      content: '您确定要退出登录吗',
      success: (res) => {
        if (res.confirm) {
          console.log('用户点击确定');
          wx.setStorageSync('islogin', false);
          this.setData({
            src: '',
            nickName: '',
            isLogin: false
          });
        } else {
          console.log('用户点击取消');
        }
      }
    });
  },

  getMyFavorites: function () {
    let info = wx.getStorageInfoSync();
    let keys = info.keys;
    let num = keys.length - 1;
    let myList = [];
    for (var i = 0; i < num; i++) {
      let obj = wx.getStorageSync(keys[i]);
      myList.push(obj);
    }
    this.setData({
      newsList: myList,
      num: num
    });
  },

  goToDetail: function (e) {
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../detail/detail?id=' + id,
    });
  },

  onLoad(options) {},

  onShow: function () {
    if (this.data.isLogin) {
      this.getMyFavorites();
    }
  },

  // 新增方法处理取消收藏操作
  onUnfavorite: function (e) {
    const { id } = e.currentTarget.dataset;
    wx.showModal({
      title: '提示',
      content: '您确定要取消收藏吗',
      success: (res) => {
        if (res.confirm) {
          console.log('用户点击确定');
          // 从存储中移除该项
          wx.removeStorageSync(id);
          // 更新收藏列表
          this.getMyFavorites();
          // 返回到“我的”页面
          wx.navigateBack();
        } else {
          console.log('用户点击取消');
        }
      }
    });
  }
});
