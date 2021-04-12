import React, { useRef } from 'react'
import { useStores } from '../stores'
import { observer, useLocalStore } from 'mobx-react'
import { Upload, message, Spin, Button } from 'antd'
import { InboxOutlined } from '@ant-design/icons'
import styled from 'styled-components'


const { Dragger } = Upload

const Result = styled.div`
    margin-top: 30px;
    border: 1px solid #ccc;
    border-radius: 10px;
    border-shadow: 0 0 0 4px rgba(0, 0 ,0, .3);
    background: #fff;
    /* opacity: .8; */
    padding: 20px;
`
const H1 = styled.h1`
    margin: 20px 0;
    text-align: center;
`
const Image = styled.img`
    margin-top:10px;
    max-width: 300px;
`
const A = styled.a`
    margin-left: 10px;
`

const Input = styled.input`
    outline: none;
    margin-right: 10px;
    margin-top: 10px;

`


//  observer 观察这个组件   监控组件变化
const Component = observer(() => {
    const { ImageStore, UserStore } = useStores()
    const ref1 = useRef()
    const ref2 = useRef()

    // 箭头函数的返回值是一个整体
    const store = useLocalStore(() => ({
        width: null,
        setWidth(width) {
            store.width = width
        },
        get widthStr() {
            return store.width ? `/w/${store.width}` : ''
        },
        height: null,
        setHeight(height) {
            store.height = height
        },
        get heightStr() {
            return store.height ? `/h/${store.height}` : ''
        },
        get fullStr() {
            //?imageView2/0/w/800/h/400)
            return ImageStore.serverFile.attributes.url.attributes.url + '?imageView2/0' + store.widthStr + store.heightStr
        }
    }))
    // 复制图片地址
    const bundleCopy = (url) => {
        let input = document.createElement('textarea')
        input.value = url
        input.style.position = 'absolute';
        input.style.left = '-9999px';
        document.body.appendChild(input);
        input.focus()
        input.select()
        if (document.execCommand('Copy')) {
            document.execCommand('Copy')
            message.success('复制成功')
        } else {
            message.error('复制失败,请通过在线预览手动复制')

        }
        document.body.removeChild(input);
    }


    const bindWidthChange = () => {
        store.setWidth(ref1.current.value)
    }
    const bindHeightChange = () => {
        store.setHeight(ref2.current.value)
    }

    const props = {
        showUploadList: false,  //是否展示文件列表
        beforeUpload: file => {
            ImageStore.setFile(file)
            ImageStore.setFilename(file.name)
            if (UserStore.currentUser === null) {
                message.warning('请先登录再上传！')
                return false
            }
            // 判断文件格式,  window.file = file 是将file放置到全局中
            window.file = file
            if (!/(svg$)|(png$)|(jpg$)|(jpeg$)|(gif$)/ig.test(file.type)) {//ig 忽略大小写
                message.error('只能上传svg/png/jpg/jpeg/gif格式的图片')
                return false
            }
            // 判断文件大小
            if (file.size > 2 * 1024 * 1024) {
                message.error('图片最大2M')
                return false
            }

            ImageStore.upload()
                .then((serverFile) => {
                    message.success('上传成功')
                    console.log(serverFile);
                }).catch(() => {
                    message.error('上传失败')
                })
            return false
        }
    }


    return (
        <div>
            <Spin tip='上传中' spinning={ImageStore.isUpLoading}>
                <Dragger {...props}>
                    <p className="ant-upload-drag-icon"> <InboxOutlined /> </p>
                    <p className="ant-upload-text">点击或者拖拽上传图片</p>
                    <p className="ant-upload-hint">
                        仅支持.svg/.png/.jpg/.jpeg/.gif 格式的图片，图片最大2M
                    </p>
                </Dragger>
            </Spin>
            {
                ImageStore.serverFile ? <Result>
                    <H1>上传结果</H1>
                    <dl>
                        <dt>线上地址</dt>
                        <dd>
                            <a target='_blank' href={ImageStore.serverFile.attributes.url.attributes.url}>点击查看</a>
                            <Button type="primary" onClick={bundleCopy.bind(null, ImageStore.serverFile.attributes.url.attributes.url)}>复制图片链接</Button>
                        </dd>

                        <dt>文件名: </dt>
                        <dd>{ImageStore.filename}</dd>

                        <dt >图片预览</dt>
                        <dd> <Image src={ImageStore.serverFile.attributes.url.attributes.url} /> </dd>

                        <dt>更多尺寸</dt>
                        <dd>
                            <Input ref={ref1} onChange={bindWidthChange} placeholder='最大宽度（可选）' />
                            <Input ref={ref2} onChange={bindHeightChange} placeholder='最大高度（可选）' />
                            <A target='_blank' href={store.fullStr} >点击查看图片</A>
                        </dd>
                    </dl>
                </Result> : null

            }
        </div>
    )
})
export default Component