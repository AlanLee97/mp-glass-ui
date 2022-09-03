// components/nav-bar/index.js
Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多 slot 支持
  },
  /**
   * 组件的属性列表
   */
  properties: {
    customBack: {
      type: Boolean,
      value: false
    },
    glassable: {
      type: Boolean,
      value: true
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    menuInfo: {

    },
    navbar: {
      height: 0
    }
  },

  lifetimes: {
    attached() {
      const menuInfo = wx.getMenuButtonBoundingClientRect()
      this.setData({
        menuInfo,
        navbar: {
          height: menuInfo.top + menuInfo.height
        }
      })
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    navBack() {
      wx.navigateBack({
        delta: 0,
      })
    }
  }
})
