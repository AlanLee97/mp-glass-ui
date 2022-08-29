// components/calendar/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // [{month, days: []}]
    activeDays: {
      type: Object,
      value: (() => [])()
    },
    // 展示过去多少个月
    showPassMonths: {
      type: [Number, String],
      value: 0
    },
    // 展示未来多少个月
    showFutureMonths: {
      type: [Number, String],
      value: 0
    },
    themeColor: {
      type: String,
      value: 'slateblue'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    weekDays: ['日', '一', '二', '三', '四', '五', '六'],
    showPassMonthsData: [],
    calendarList: [],
    currentCalendar: {
      days: [],
      day: 1,
      month: 0,
      year: 0,
      weekDay: 0, // 0-星期一，1-星期一  ...
    },
    currentSwiperIndex: 0,
  },

  lifetimes: {
    attached() {
      this.initData();
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    initData() {
      this.initCurrentCalendar();
    },

    initCurrentCalendar() {
      console.log('initCurrentCalendar showPassMonths', this.data.showPassMonths)
      setTimeout(() => {
        if(this.data.showPassMonths) {
          let list = this.genCalendarList();
          let currentCalendar = {};
          let curMonth = new Date().getMonth()+1;
          let index = 0;
          for(let i = 0; i < list.length; i++) {
            if(list[i].month === curMonth) {
              currentCalendar = list[i];
              index = i;
              break;
            }
          }
  
          this.setData({
            calendarList: list,
            currentCalendar: currentCalendar,
            currentSwiperIndex: index,
          })
        }else {
          let calendar = this.genCalendar();
          this.setData({
            currentCalendar: calendar,
            calendarList: [calendar]
          })
        }
      })
    },
    genCalendarList() {
      let curMonth = new Date().getMonth()+1;
      let list = []
      for(let i = this.data.showPassMonths; i > 0; i--) {
        let calcMonth = curMonth - i;
        list.push(this.genCalendar(calcMonth));
      }
      list.push(this.genCalendar());
      for(let i = 1; i <= this.data.showFutureMonths; i++) {
        list.push(this.genCalendar(curMonth+i));
      }
      console.log({list})
      return list;
    },
    genCalendar(month = new Date().getMonth()+1) {
      let calendar = {};
      let curDate = this.genCurrentDate(month);
      let days = this.genDays(month);
      calendar = {
        ...curDate,
        days
      }
      return calendar;

    },
    setCalendar(data = {}, cb = () => {}) {
      this.setData({
        calendar: {
          ...this.data.calendar,
          ...data,
        }
      }, cb);
    },

    genDays(month = new Date().getMonth()+1) {
      const date = new Date();
      // 当前月有多少天
      let totalDay = new Date(date.getFullYear(), month, 0).getDate();
      let days = new Array(totalDay).fill(0).map((item, index) => index+1);
      // 当前月1号是星期几
      let curWeekDay = new Date(date.getFullYear(), month-1, 1).getDay();
      // 给1号前的星期几填充空字符串
      let curWeekDayArr = new Array(curWeekDay).fill('');
      days = [...curWeekDayArr, ...days];
      return days;
    },

    genCurrentDate(month = new Date().getMonth()+1) {
      let date0 = new Date();
      let date = new Date(date0.getFullYear(), month-1, date0.getDate());
      let data = {
        day: date.getDate(),
        month: date.getMonth()+1,
        year: date.getFullYear(),
        weekDay: date.getDay()
      }
      return data;
    },

    swiperChange(e) {
      console.log('swiperChange', e.detail)
      this.setData({
        currentCalendar: this.data.calendarList[e.detail.current],
        currentSwiperIndex: e.detail.current,
      })
    },

    toLastMonth() {
      const {currentSwiperIndex} = this.data;
      console.log('toLastMonth');
      if(currentSwiperIndex <= 0) return;
      this.setData({
        currentSwiperIndex: currentSwiperIndex - 1
      })
    },

    toNextMonth() {
      console.log('toNextMonth');
      const {currentSwiperIndex, calendarList} = this.data;

      if(currentSwiperIndex >= calendarList.length - 1) return;
      this.setData({
        currentSwiperIndex: currentSwiperIndex + 1
      })
    }
  }
})
