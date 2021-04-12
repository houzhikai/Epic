
import { observable, action, makeObservable } from 'mobx'
import { UpLoader } from '../models'
import { message } from 'antd'

class HistoryStore {
    constructor() {
        makeObservable(this)
    }

    @observable list = []
    @observable isLoading = false
    @observable hasMore = true
    @observable page = 0
    limit = 10    //不需要修改的数据，前面可以不用 @observable

    @action append(newList) {
        //合并两个或多个数组。此方法不更改现有数组，而是返回一个新数组
        this.list = this.list.concat(newList)   
        console.log(this.list)
    }
    @action find() {
        this.isLoading = true
        UpLoader.find({page: this.page, limit: this.limit})
          .then(newList => {
            this.append(newList)
            this.page++
            if(newList.length < this.limit) {
                this.hasMore = false
            }
          }).catch(err => {
              console.log('数据加载失败')
            //   message.error('数据加载失败')
          }).finally(()=> {
              this.isLoading = false
          })
    }
    @action reset() {
        this.list = []
        this.isLoading = false
        this.hasMore = true
        this.page = 0
    }

    @action destroy(item) {
        UpLoader.destroy(item).then(res => {
            console.log(res)
            console.log('删除over    ')
        })
        this.list = this.list.filter(i => i!== item)
        // this.isLoading = true
        // UpLoader.destroy().then(newList => {
        //     this.append(newList)
        //     this.page--
        //     if(newList.length < 0) {
        //         this.hasMore = false
        //     }
        // }).catch(() => message.success('删除成功')).finally(()=> this.isLoading = false)

        // this.list = this.list.concat(newList)
    }

}
export default new HistoryStore()