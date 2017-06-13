import React, { Component } from 'react'
import _ from 'lodash'
import { Row, Col, Button } from 'antd'

import '../style.less'

import AddQuestion from '../components/AddQuestion'
import QuestionList from './QuestionList'

export default class Main extends Component {
    constructor(props) {
        super(props)
        this.state = {
            formDisplay: false,
            items: [{
                id: 1,
                title: '产品经理与程序员矛盾的本质是什么？',
                content: '理性探讨，请勿撕逼。产品经理的主要工作职责是产品设计。接受来自其他部门的需求，经过设计后交付研发。但这里有好些职责不清楚的地方。',
                num: 120
            },{
                id: 2,
                title: '热爱编程是一种怎样的体验？',
                content: '别人对玩游戏感兴趣，我对写代码、看技术文章感兴趣；把泡github、stackoverflow、v2ex、reddit、csdn当做是兴趣爱好；遇到重复的工作，总想着能不能通过程序实现自动化；喝酒的时候把写代码当下酒菜，边喝边想边敲；不给工资我也会来加班；做梦都在写代码',
                num: 10
            },{
                id: 3,
                title: '热爱编程是一种怎样的体验？',
                content: '别人对玩游戏感兴趣，我对写代码、看技术文章感兴趣；把泡github、stackoverflow、v2ex、reddit、csdn当做是兴趣爱好；遇到重复的工作，总想着能不能通过程序实现自动化；喝酒的时候把写代码当下酒菜，边喝边想边敲；不给工资我也会来加班；做梦都在写代码。',
                num: 103               
            }]
        }
        this.onToggleForm = this.onToggleForm.bind(this)
        this.newQuestion = this.newQuestion.bind(this)
        this.doVote = this.doVote.bind(this)
    }
    componentWillMount() {
        const newItem = this.sortQuestion( this.state.items )
        this.setState({
            items: newItem
        })
    }
    onToggleForm(e) {
        e.preventDefault();
        this.setState({
            formDisplay: !this.state.formDisplay
        })
    }
    // 添加新的问题
    newQuestion(obj) {
        let newItem = {
            id: this.state.items.length + 1,
            title: obj.title,
            content: obj.description,
            num: 0
        }
        newItem = this.state.items.concat( newItem )
        this.sortQuestion( newItem )
        this.setState({
            items: newItem
        })
    }
    // 问题排序
    sortQuestion(obj) {
        obj.sort((a, b) => {
            return b.num - a.num
        })
        return obj
    }
    // 投票
    doVote(num, id) {
        let items = _.uniq(this.state.items)
        const index = _.findIndex(items, obj => obj.id === id)
        items[index].num = num
        this.sortQuestion( items )
        this.setState({
            items: items
        })
    }
    render () {
        return (
            <div>
                <Row className='header' justify='center'>
                    <h1>React问答</h1>
                    <Button className='add-btn' onClick={this.onToggleForm} size='large' type="primary">添加问题</Button>
                </Row>
                <Row className="question-wrapper">
                    <Row className='addForm'>
                        <AddQuestion 
                            display={this.state.formDisplay} 
                            newQuestion={this.newQuestion}
                        />
                    </Row>
                    <Row className="items">
                        <QuestionList
                            items={this.state.items}
                            doVote={this.doVote}
                         />
                    </Row>
                </Row>

            </div>
        );
    }
}
