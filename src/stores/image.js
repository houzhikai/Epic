// 存放数据
import { observable, action, makeObservable } from 'mobx'
import { UpLoader } from '../models'
import { message } from 'antd'

class ImageStore {
  constructor() {
    makeObservable(this)
  }
  @observable filename = ''
  @observable file = null
  @observable isUpLoading = false
  @observable serverFile = null

  @action setFilename(newFilename) {
    this.filename = newFilename
  }

  @action setFile(newFile) {
      this.file = newFile
  }

@action upload() {
    this.isUpLoading = true
    this.serverFile = null  // 上传中 下面不会有图片产生
    // 这里的promise 是为了后面 upload的 ImageStore.upload， 如果这里不封装，后面将不能继续 catch
    return new Promise((resolve, reject) => {
        UpLoader.add(this.file, this.filename)
        .then(serverFile => {
            this.serverFile = serverFile
           resolve(serverFile)
        }).catch(err => {
            message.err('上传失败')
            reject(err)
        }).finally(() => {
          this.isUpLoading = false
        })
    })
}
@action reset() {
  this.isUpLoading = false
  this.serverFile = null
}
@action destroy() {
  this.isUpLoading = false
  this.serverFile = null
}

}


export default new ImageStore();