import React from "react";
import { Alert, Space } from "antd";

function About() {

    return (
        <>
            <Space direction='vertical' size='large'>
                <h1 className='bottomborder'>关于 速传图 图床</h1>
                <Alert
                    message="免费使用"
                    description="免费图床仅供分享图片使用，我们保留随时删除图片并举报上传违规图片者的权利"
                    type="info"
                    showIcon
                />
                <Alert
                    message="严禁上传及分享如下类型的图片："
                        description="含有色情、暴力、宣扬恐怖主义的图片, 侵犯版权、未经授权的图片, 其他违反中华人民共和国法律的图片, 其他违反香港法律的图片"
                    type="error"
                    showIcon
                />
                <Alert
                    message="科学上网，安全上网"
                    description="违者后果自负"
                    type="success"
                    showIcon
                    
                />
            </Space>
        </>
    )
}

export default About