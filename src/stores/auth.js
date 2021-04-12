// 管理登录注册
// 这里存放的只是状态
import { observable, action, makeObservable } from 'mobx'
import { Auth } from '../models'
import UserStore from './user'
import { message } from 'antd'
import HistoryStory from './history'
import ImageStore from './image'

class AuthStore {
    constructor() {
        makeObservable(this)
    }

    @observable values = {
        username: '',
        password: ''
    };

    @action setUsername(userName) {
        this.values.username = userName
    }
    @action setPassword(password) {
        this.values.password = password
    }

    @action login() {
        return new Promise((resolve, reject) => {

            Auth.login(this.values.username, this.values.password)
                .then(user => {// 登录成功,可以控制登录成功之后的行为
                    UserStore.pullUser()
                    message.success('登录成功')
                    resolve(user)
                }).catch(err => {// 登录失败，可以控制登录失败之后的行为
                    UserStore.resetUser()
                    message.error('用户名或密码错误')
                    reject(err)
                })
        })
    }

    @action register() {
        return new Promise((resolve, reject) => {
            Auth.register(this.values.username, this.values.password)
                .then(user => {// 注册成功,可以控制注册成功之后的行为
                    UserStore.pullUser()
                    message.success('注册成功')
                    resolve(user)
                })
                .catch(err => {// 注册失败，可以控制注册失败之后的行为
                    UserStore.resetUser()
                    message.error('注册失败')
                    reject(err)
                })
        })
    }

    @action logout() {
        Auth.logOut()
        UserStore.resetUser()
        HistoryStory.reset()
        ImageStore.reset()
    }
}

export default new AuthStore()