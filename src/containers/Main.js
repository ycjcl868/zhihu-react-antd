import React, { Component } from 'react';
import _ from 'lodash';
import axios from 'axios';
import { Row, Button, message, Spin } from 'antd';

import '../style.less';

import AddQuestion from '../components/AddQuestion';
import QuestionList from './QuestionList';

export default class Main extends Component {
    // 问题排序
  sortQuestion(obj) {
    obj.sort((a, b) => {
      return b.num - a.num;
    });
    return obj;
  }
  constructor(props) {
    super(props);
    this.state = {
      formDisplay: false,
      items: [],
    };
    this.onToggleForm = this.onToggleForm.bind(this);
    this.newQuestion = this.newQuestion.bind(this);
    this.doVote = this.doVote.bind(this);
  }
  componentDidMount() {
    const instance = axios.create({
      timeout: 2000,
    });
    instance
            .get('https://easy-mock.com/mock/590a821d7a878d73716eb5c7/example/getAnswer')
            .then((res) => {
              const posts = res.data;
              this.setState({
                items: this.sortQuestion(posts),
              });
              // console.log(this.state);
            })
            .catch(() => {
              const items = [
                {
                  id: 1,
                  title: 'Mock坏了，这是本地加载的数据data',
                  content: '理性探讨，请勿撕逼。产品经理的主要工作职责是产品设计。接受来自其他部门的需求，经过设计后交付研发。但这里有好些职责不清楚的地方。',
                  num: 120,
                },
                {
                  id: 2,
                  title: '热爱编程是一种怎样的体验？',
                  content: '别人对玩游戏感兴趣，我对写代码、看技术文章感兴趣；把泡github、stackoverflow、v2ex、reddit、csdn当做是兴趣爱好；遇到重复的工作，总想着能不能通过程序实现自动化；喝酒的时候把写代码当下酒菜，边喝边想边敲；不给工资我也会来加班；做梦都在写代码',
                  num: 10,
                },
                {
                  id: 3,
                  title: '热爱编程是一种怎样的体验？',
                  content: '别人对玩游戏感兴趣，我对写代码、看技术文章感兴趣；把泡github、stackoverflow、v2ex、reddit、csdn当做是兴趣爱好；遇到重复的工作，总想着能不能通过程序实现自动化；喝酒的时候把写代码当下酒菜，边喝边想边敲；不给工资我也会来加班；做梦都在写代码。',
                  num: 103,
                },
              ];
              this.setState({
                items: this.sortQuestion(items),
              });
            });
  }
  onToggleForm(e) {
    e.preventDefault();
    this.setState({
      formDisplay: !this.state.formDisplay,
    });
  }
    // 添加新的问题
  newQuestion(obj) {
    let newItem = {
      id: this.state.items.length + 1,
      title: obj.title,
      content: obj.description,
      num: 0,
    };
    newItem = this.state.items.concat(newItem);
    this.sortQuestion(newItem);
    this.setState({
      items: newItem,
    });
    message.success('添加问题成功');
  }

    // 投票
  doVote(num, id) {
    const items = _.uniq(this.state.items);
    const index = _.findIndex(items, obj => obj.id === id);
    items[index].num = num;
    this.sortQuestion(items);
    this.setState({
      items,
    });
  }
  render() {
    if (!this.state.items.length) {
      return (
        <div className="loading">
          <Spin size="large" />
        </div>
      );
    }
    return (
      <div>
        <Row className="header" justify="center">
          <h1>知乎问答</h1>
          <Button className="add-btn" onClick={this.onToggleForm} size="large" type="primary">添加问题</Button>
        </Row>
        <Row className="question-wrapper">
          <Row className="addForm">
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

