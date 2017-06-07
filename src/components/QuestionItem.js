import React, { Component } from 'react'
import _ from 'lodash'
import { Row, Col, Button, message } from 'antd'

import '../style.less'

export default class QuestionItem extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isVote: false
        }
        this.voteUp = this.voteUp.bind(this)
        this.voteDown = this.voteDown.bind(this)
    }
    voteUp() {
        if(this.state.isVote) {
            message.success('您已经投过票了')
            return 
        }
        let num = this.props.num + 1
        this.props.doVote( num, this.props.id )
        this.setState({
            isVote: true
        })


        
    }
    voteDown() {

    }
    render () {
        return (
            <div className='item'>
                <Row gutter={8}>
                    <Col span={2}>
                        <Row>
                            <Col>
                                <Button onClick={this.voteUp} className='vote-btn up-btn' icon='caret-up'>
                                    <p>{this.props.num}</p>
                                </Button>

                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Button onClick={this.voteDown} className='vote-btn down-btn' icon='caret-down'>
                                    
                                </Button>
                            </Col>
                        </Row>
                    </Col>
                    <Col span={22}>
                        <h1>{this.props.title}</h1>
                        <p>{this.props.content}</p>
                        
                    </Col>
                </Row>
                
                
            </div>
        );
    }
}

