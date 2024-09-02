// pages/detail/detail.js
var common = require('../../utils/common')

Page({
  data: {},

  onLoad: function (options) {
      let id = options.id;

      // 检查当前新闻是否在收藏夹中
      var article = wx.getStorageSync(id);
      if (article != '') {
          this.setData({
              article: article,
              isAdd: true
          });
      } else {
          let result = common.getNewsDetail(id);
          if (result.code == '200') {
              this.setData({
                  article: result.news
              });
          }
      }
  },

  addFavorites: function () {
      let article = this.data.article;
      wx.setStorageSync(article.id, article);
      this.setData({
          isAdd: true
      });
  },
  
  cancelFavorites: function () {
      let article = this.data.article;
      wx.showModal({
          title: '提示',
          content: '你确定要取消收藏吗？',
          success: (res) => {
              if (res.confirm) {
                  wx.removeStorageSync(article.id);
                  this.setData({
                      isAdd: false
                  });
              }
          }
      });
  }
});
