// pages/express/express.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    time:'',
    context:'',
    location:'',
    list:[],
    date:'',
    sancode:'',
    select: false,
    openGid:''
  },
  formSubmit: function (e) {
    var that=this;
    console.log(e)
    if (!e.detail.value.input || !e.detail.value.input2){
      wx.showToast({
        title: '客观,您输错了',
        icon: 'none',
        duration: 2000
      })
    }else{
      wx.request({
        url: 'https://www.kuaidi100.com/query?type={{type}}&postid={{postid}}', //仅为示例，并非真实的接口地址
        data: {
          type: e.detail.value.input,
          postid: e.detail.value.input2
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function (res) {
          that.setData({
            list: [].slice.call(res.data.data)           
            //res代表success函数的事件对，data是固定的，list是数组
          })
          wx.setStorage({
            key: 'kuaidi',
            data: res.data.data
          })
        },
        fail: function() {
          wx.showToast({
            title: '网络错误，稍后重试！',
            icon: 'none',
            duration: 2000
          })
        }

      })     
    }   
  },
  sancode: function () {
    wx.scanCode({
      onlyFromCamera: true,
      success: (res) => {
        this.setData({
          sancode:res.result
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showShareMenu({
      withShareTicket: true,
      success: function (res){
        console.log(res)
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    return {
      title: '您的快递到了？请您签收',
      path: '/pages/express/express',
      success: function (res) {
        console.log(JSON.stringify(res))
        var shareTickets = res.shareTickets;
        if (shareTickets.length == 0) {
          return false;
        }
        wx.getShareInfo({
          shareTicket: shareTickets[0],
          success: function (res) {
            var encryptedData = res.encryptedData;
            var iv = res.iv;
            console.log(iv)
            console.log(encryptedData)
          }
        })
      },
    }
  },

  bindFocusInput: function (e) {
    this.setData({
      border : "2rpx solid #717f08"
    })
  },
  bindBlurInput: function () {
    this.setData({
      border: ""
    })
  }
})