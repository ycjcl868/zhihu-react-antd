import React, { Component } from 'react'
import _ from 'lodash'
import { Row, Col, Button, Form, Input, Icon } from 'antd'

import '../style.less'
const FormItem = Form.Item
class AddQuestion extends Component {
    constructor(props) {
        super(props)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleReset = this.handleReset.bind(this)
    }
    handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFields(( err, values ) => {
            if(!err) {
               console.log('form-data: ',values)
               this.props.newQuestion( values )
            }
        })
    }
    handleReset(e) {
        e.preventDefault()
        this.props.form.resetFields()
    }

    render () {
        const { getFieldDecorator } = this.props.form
        const styleObj = {
            display: this.props.display ? 'block' : 'none'
        }
        return (
            <div className='question-form' style={styleObj}>
                <Form onSubmit={this.handleSubmit}>
                    <FormItem
                        label='问题标题'
                    >
                     {getFieldDecorator('title', {
                          rules: [
                            { required: true, min: 6, max: 60 ,message: '标题至少为6个字符，至多为60个字符' }
                          ],
                        })(
                          <Input
                            placeholder="请输入标题"
                            type="text"
                          />
                        )}
                      
                    </FormItem>
                    <FormItem
                        label='问题描述'
                    >
                     {getFieldDecorator('description', {
                          rules: [
                            { required: true, min: 6, message: '描述至少为6个字符' }
                          ],
                        })(
                          <Input
                            placeholder="请输入描述"
                            type="textarea"
                            autosize={{ minRows: 2, maxRows: 10 }}
                          />
                        )}
                      
                    </FormItem>                    
                    <FormItem wrapperCol={{ span: 6, offset: 18 }}>
                        <Button type='primary' htmlType='submit' className='login-form-button'>
                            提交
                        </Button>
                        <Button style={{ marginLeft: 20 }} onClick={this.handleReset}>
                            清除
                        </Button>
                    </FormItem>
                    
                </Form>

            </div>
        );
    }
}

export default Form.create()(AddQuestion)


