// 表单匹配的时候有几种写法
// 1. 定义 rules， require：true 表示必须存在，没有的话就是选填
// 2. 定义一个函数， 案例（validator: validateUsername），在前面加上 const ，定义里面的规则和值，对值做一个更精确的判断  符合规则的话，返回 promise.resolve 不符合规则的话 返回 promise.reject
// 3. 更精确规定：  与其他功能协同判断  直接写个函数
// 案例（validateConfirm） ，直接返回一个对象， const validateConfirm = ({getFieldValue})


import React from 'react'
import { Form, Input, Button } from 'antd';
import styled from 'styled-components'
import { useStores } from '../stores'
import { useHistory } from 'react-router-dom'

const Wrapper = styled.div`
    max-width: 600px;
    margin: 30px auto;
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
    border-radius: 4px;
    padding: 20px;
    background: rgb(255,255,255);
`;
const Title = styled.h1`
    text-align: center;
    margin-bottom: 20px;
`

const layout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 18,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 6,
    span: 18,
  },
};

const Component = () => {
  const history = useHistory()
  const { AuthStore } = useStores()

  const onFinish = values => {
    console.log('Success:', values);
    AuthStore.setUsername(values.username)
    AuthStore.setPassword(values.password)
    AuthStore.register()
      .then(()=>{
        console.log('注册成功，跳转到首页')
        history.push('/')
      }).catch(() => {
        console.log('注册失败，什么也不做')
      })
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  }



// Promise 对象有以下两个特点:
// 1、对象的状态不受外界影响。Promise 对象代表一个异步操作，有三种状态：
// pending: 初始状态，不是成功或失败状态。
// fulfilled: 意味着操作成功完成。
// rejected: 意味着操作失败。


// 有时需要将现有对象转为Promise对象，Promise.resolve方法就起到这个作用。
  const validateUsername = (rule, value) =>{
    //   匹配字母、数字、下划线。等价于 [A-Za-z0-9_]
      if(/\W/.test(value)) return Promise.reject('只能是字母数字下划线')
      if(value.length<4 || value.length>10) return Promise.reject('长度为4~10个字母')
      return Promise.resolve()
  }
//   返回一个对象，对象就叫做 getFieldValue  返回的是一个函数体，所以在箭头后面要加一个括号将其包住
  const validateConfirm = ({getFieldValue}) => ({
    validator(rule, value) {
        if(getFieldValue('password') === value) return Promise.resolve()
           return Promise.reject('两次密码不一致')
    }
  })


  return (
      <Wrapper>
      <Title>注册</Title>
    <Form
    // 对象，可以快速布局
      {...layout}
      name="basic"
      
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        label="用户名"
        name="username"
        rules={[
          {required: true,message: '输入用户名!',},{validator: validateUsername}
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="密码"
        name="password"
        rules={[
          {
            required: true,   
            message: '输入密码',
          },
          {
              min:4,
              message:'最少4个字符'
          },
          {
              max:10,
              message: '最多10个字符'
          }
        ]}
      >
        <Input.Password />
      </Form.Item>


      <Form.Item
        label="确认密码"
        name="confirmPassword"
        rules={[
          {required: true, message: '再次确认密码!',},validateConfirm
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          提交
        </Button>
      </Form.Item>
    </Form>
    </Wrapper>
  );
};
export default Component