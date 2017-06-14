import React, { Component } from 'react'
import _ from 'lodash'
import axios from 'axios'
import { Row, Col, Button,message } from 'antd'

import '../style.less'

import AddQuestion from '../components/AddQuestion'
import QuestionList from './QuestionList'

export default class Main extends Component {
    constructor(props) {
        super(props)
        this.state = {
            formDisplay: false,
            items: []
        }
        this.onToggleForm = this.onToggleForm.bind(this)
        this.newQuestion = this.newQuestion.bind(this)
        this.doVote = this.doVote.bind(this)
    }
    componentDidMount() {
        axios
            .get('https://easy-mock.com/mock/590a821d7a878d73716eb5c7/example/getAnswer')
            .then(res => {
                const posts = res.data;
                this.setState({
                    items: this.sortQuestion(posts)
                })
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
                    <h1>知乎问答</h1>
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

