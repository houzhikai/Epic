import AV, { Query, User } from 'leancloud-storage';
import resolve from 'resolve';


AV.init({
  appId: "g2WSNJhaSM4a9KnNo6K2q1Qf-gzGzoHsz",
  appKey: "myxtDHEwVrBC70maMDeu5pL3",
  serverURL: "https://g2wsnjha.lc-cn-n1-shared.com"
})
// 注册、登录、注销 组件
const Auth = {
    // 注册逻辑
    register(username, password) {
        let user = new User() 
        user.setUsername(username)
        user.setPassword(password)
        return new Promise((resolve, reject) => {
            user.signUp().then(loginUser => resolve(loginUser), error => reject(error))
        })
    },
    // 登录逻辑
    login(username, password) {
        return new Promise((resolve,reject) => {
            User.logIn(username, password).then(loginUser => resolve(loginUser), error => reject(error)) 
        })
    },
    // 注销
    logOut() {
        User.logOut()
    },
    // 获取用户当前信息
    getCurrentUser() {
        return User.current()
    }
}
// 对图片的 添加、查找 操作
const UpLoader = {
    add(file, filename) {//添加图片信息
        // 用来存储后台的图片信息
        const item = new AV.Object('Image')
        const avFile = new AV.File(filename, file)
        
        item.set('filename', filename)
        item.set('owner', AV.User.current())
        item.set('url', avFile)
        return new Promise((resolve, reject) => {
            item.save().then((serverFile) => resolve(serverFile), err => reject(err))
        })   
    },
    find({page=0, limit=10}) {//查找图片信息
        const query = new AV.Query('Image')
        query.include('owner')
        query.limit(limit)
        query.skip(page*limit)
        query.descending('createdAt') //descending 降序排列   ascending 升序排列
        query.equalTo('owner', AV.User.current())
        return new Promise((resolve, reject) => {
            query.find().then(results => {
                console.log('query')
                console.log(results)
                resolve(results)
            }).catch(error => reject(error) )
        })
    },
    destroy(item) {
        const file =  AV.Object.createWithoutData('Image',item.id)

        return new Promise((resolve, reject) => {
            file.destroy().then(() => resolve('success')).catch(error => reject(error))  
        })
        
    }
}

// 控制台验证
// window.UpLoader = UpLoader


export {
    Auth,
    UpLoader
}