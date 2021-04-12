//图片上传的历史记录， 因为在 history 上可能会有其他东西，所以新建了这个组件
//单一功能最好放在单一的组件里
import React, { useEffect } from 'react'
import { observer } from 'mobx-react'
import { useStores } from '../stores'
import InfiniteScroll from 'react-infinite-scroller'
import { List, Spin, Button } from 'antd'
import  styled  from 'styled-components'


//  object-fit: contain;   被替换的内容将被缩放，以在填充元素的内容框时保持其宽高比
//box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.6); //x偏移量 | y偏移量 | 阴影模糊半径 | 阴影扩散半径 | 阴影颜色
const Img = styled.img`
    width: 180px;
    object-fit: contain;  
    border: 1px solid #eee;
    box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.6); 
    border-radius: 6px;
    transition: all .3s;
`
const H5 = styled.h5`
    font-size: 20px;
    font-weight: 800;
`
const A = styled.a`
     font-size: 20px;
    font-weight: 800;
    color: #f2f157;
`

const Component = observer(() => {
    const { HistoryStore } = useStores()
    const loadMore = () => {
        HistoryStore.find()
    }
    const handleDestroy = (item) => {
        HistoryStore.destroy(item)
        console.log('删除成功');
    }

    useEffect(() => {
        console.log('进入组件')
        return () => {
            HistoryStore.reset()
        }
    }, [])//[]表示只执行一次

        
    return(
        <div>
            <InfiniteScroll
                initialLoad = {true}
                pageStart = {0}
                loadMore = {loadMore}
                hasMore = { !HistoryStore.isLoading && HistoryStore.hasMore }
                useWindow = { true }
            >
                <List 
                    dataSource={HistoryStore.list}
                    renderItem={                       
                        //       List.Item 注意 Item开头一定要写      
                        item => <List.Item key={item.id}>
                            <div>
                                <Img src={item.attributes.url.attributes.url} />                               
                            </div>
                            <div>
                                <H5>{item.attributes.filename}</H5>
                            </div>
                            <div>
                                <A target='_blank' href={item.attributes.url.attributes.url}>查看图片</A>
                            </div>
                            <div>
                                <Button type="primary" danger onClick={()=>handleDestroy(item)}>删除图片</Button>
                            </div>
                        </List.Item>           
                    }>

                    { HistoryStore.isLoading && HistoryStore.hasMore && (
                        <div>
                            <Spin tip= '加载中'/>
                        </div>
                    )}        
                               
                </List>
            </InfiniteScroll>
        </div>
    )
})
export default Component

