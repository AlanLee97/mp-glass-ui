// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    cpnList: [
      {
        name: 'nav-bar',
        zhName: '导航栏',
      },
      {
        name: 'notice-bar',
        zhName: '通知栏',
      },
      {
        name: 'popup',
        zhName: '弹窗',
      },
      {
        name: 'calendar',
        zhName: '日历',
      }
    ],
  },

  onLoad() {

  },

  goPage(e) {
    console.log(e)
    const {cpnname} = e.currentTarget.dataset
    wx.navigateTo({
      url: `/pages/demo/demo-${cpnname}/index`,
    })
  }

})
