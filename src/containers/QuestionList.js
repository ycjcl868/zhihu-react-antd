import React, { Component } from 'react';

import '../style.less';
import QuestionItem from '../components/QuestionItem';

export default class QuestionList extends Component {
    constructor(props) {
        super(props);
        this.doVote = this.doVote.bind(this);
        console.log(this.props.items);
    }
    doVote(num, id) {
        this.props.doVote(num, id);
    }
    render() {
        return (
          <div>
            {this.props.items.map((obj, i) =>
              (<QuestionItem
                key={i}
                doVote={this.doVote}
                {...obj}
              />)

                )}
          </div>
        );
    }
}
