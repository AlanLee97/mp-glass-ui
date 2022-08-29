// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    showNoticeBar: false,
  },
  toggleNoticeBar() {
    this.setData({
      showNoticeBar: !this.data.showNoticeBar
    })
  },
  noticeClosed() {
    // console.log('noticeClosed');
    this.setData({
      showNoticeBar: false
    })
  },
  onLoad() {

  },

  testTap() {
    console.log('testTap')
  }

})
