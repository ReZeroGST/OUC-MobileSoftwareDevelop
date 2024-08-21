Page({
  data: {
    region: ['山东省', '青岛市', '黄岛区'], // 默认地区
    location: '山东省青岛市黄岛区', // 地理位置
    id: 101120206, // 城市ID
    now: '' // 当前天气信息
  },

  // 当地区改变时调用
  changeRegion: function(e) {
    this.setData({
      region: e.detail.value // 更新地区数据
    });
    // 先获取城市ID，再获取天气信息
    this.getLocationId().then(() => {
      this.getWeather();
    });
  },

  // 获取城市ID
  getLocationId: function() {
    let that = this;
    return new Promise((resolve, reject) => {
      wx.request({
        url: 'https://geoapi.qweather.com/v2/city/lookup',
        data: {
          location: that.data.region, // 使用当前地区数据
          key: '674d4d8178564885ae871230753faa69' 
        },
        success(res) {
          if (res.data && res.data.location && res.data.location[0]) {
            that.setData({
              id: res.data.location[0].id // 设置城市ID
            });
            resolve(); // 成功后调用resolve
          } else {
            reject('Location ID not found'); // 如果未找到城市ID，调用reject
          }
        },
        fail(err) {
          reject(err); // 请求失败时调用reject
        }
      });
    });
  },

  // 获取当前天气信息
  getWeather: function() {
    let that = this;
    wx.request({
      url: 'https://devapi.qweather.com/v7/weather/now',
      data: {
        location: that.data.id, // 使用获取到的城市ID
        key: '674d4d8178564885ae871230753faa69' 
      },
      success(res) {
        that.setData({
          now: res.data.now // 设置当前天气信息
        });
        console.log(res.data); // 打印天气信息
      }
    });
  },

  // 页面加载时调用
  onLoad(options) {
    this.getLocationId().then(() => {
      this.getWeather();
    });
  },

  onReady() {}, // 页面初次渲染完成时调用

  onShow() {}, // 页面显示时调用

  onHide() {}, // 页面隐藏时调用

  onUnload() {}, // 页面卸载时调用

  onPullDownRefresh() {}, // 用户下拉动作时调用

  onReachBottom() {}, // 页面上拉触底事件的处理函数

  onShareAppMessage() {} // 用户点击右上角分享时调用
});