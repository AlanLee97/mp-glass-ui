// components/popup/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    contentHeight: {
      type: String,
      value: '70vh'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    contnetStyle: ''
  },

  lifetimes: {
    attached() {
      this.setData({
        contnetStyle: `
        height: ${this.data.contentHeight};
        `
      })
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    closePopup() {
      this.triggerEvent('close');
    }
  }
})
