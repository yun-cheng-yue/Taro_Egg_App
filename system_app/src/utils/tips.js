import Taro from '@tarojs/taro'
/**
 *整合封装微信原生弹窗
 */

export default class Tips{
    static isLoading = false
    // 信息提示
    static toast (title,onHide) {
        Taro.showToast({
            title: title,
            icon: 'none',
            mask: true,
            duration: 1500
            
    });
    // 隐藏结束回调
        if (onHide) {
        setTimeout(() => {
            onHide();
        }, 500);
        }
    }
    /**
     * 弹出加载
     */
    static loading (title = '加载中', force = false) {
        if ( this.isLoading && !force )
        {
            return;
        }
        this.isLoading = true
        if (Taro.showLoading) {
            Taro.showLoading({
            title: title,
             mask: true
        })
        } else {
        Taro.showNavigationBarLoading()
        }
    }
    /**
     * 加载完毕
     */
      static loaded() {
        let duration = 0
          if ( this.isLoading )
          {
              this.isLoading = false;
              if ( Taro.hideLoading )
              {
                  Taro.hideLoading();
              } else
              {
                  Taro.hideNavigationBarLoading();
              }
              duration = 500;
          }
          // 隐藏动画大约500ms，避免后面直接toast时的显示bug
          return new Promise( resolve => setTimeout( resolve, duration ) )
      }
      /**
   * 弹出提示框
   */
        static success(title, duration = 1500) {
            Taro.showToast({
            title: title,
            icon: '成功',
            mask: true,
            duration: duration
            });
            if (duration > 0) {
            return new Promise(resolve => setTimeout(resolve, duration));
            }
        }
}
 
