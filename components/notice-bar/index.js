// pages/components/notice-bar/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    text: {
      type: String,
      value: ''
    },
    show: {
      type: Boolean,
      value: false
    }
  },

  observers: {
    show(newVal) {
      console.log('show', newVal)
      if(newVal) {
        // 到时间已关闭通知
        let timer = setTimeout(() => {
          // console.log('到时间已关闭通知');
          this.triggerEvent('closed');
          clearTimeout(this.data.timer)
          this.setData({
            showEl: false
          })
        }, 5000);
        this.setData({
          showEl: newVal,
          timer,
          closeStyle: ''
        })
      }else {
        this.setData({
          closeStyle: 'animation: disappearEl 600ms;'
        });
        clearTimeout(this.data.timer)
      }
    }
  },

  lifetimes: {
    attached() {
      this.setData({
        showEl: this.data.show
      })
    },
    detached() {
      clearTimeout(this.data.timer)
    }
  },
  
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多 slot 支持
  },

  /**
   * 组件的初始数据
   */
  data: {
    timer: null,
    touchStartPosition: 0,
    touchEndPosition: 0,
    closeStyle: '',
    showEl: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    touchStart(e) {
      this.setData({
        touchStartPosition: e.changedTouches[0].pageY
      })
    },
    touchEnd(e) {
      this.setData({
        touchEndPosition: e.changedTouches[0].pageY
      }, () => {
        const {touchStartPosition, touchEndPosition} = this.data;
        // 手动关闭通知
        if(touchStartPosition - touchEndPosition > 25) {
          this.setData({
            closeStyle: 'animation: disappearEl 600ms;'
          }, () => {
            clearTimeout(this.data.timer);
            let timer = setTimeout(() => {
              // console.log('手动关闭通知')
              this.setData({
                showEl: false
              }, () => {
                this.triggerEvent('closed')
                clearTimeout(this.data.timer);
              })
            }, 500)
            this.setData({timer})
          })
        }
      })
    },
  }
})
