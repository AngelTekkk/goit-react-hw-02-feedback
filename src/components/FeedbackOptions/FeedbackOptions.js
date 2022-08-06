import React, { Component } from 'react';
import PropTypes from 'prop-types';
import s from './FeedbackOptions.module.css';

export default class FeedbackOptions extends Component {
  static propTypes = {
    options: PropTypes.shape({
      good: PropTypes.number.isRequired,
      neutral: PropTypes.number.isRequired,
      bad: PropTypes.number.isRequired,
    }),
    onLeaveFeedback: PropTypes.func.isRequired,
  };

  render() {
    return (
      <div className={s.buttonsList}>
        {Object.keys(this.props.options).map(mark => (
          <button
            type="button"
            key={mark}
            id={mark}
            className={s[mark]}
            onClick={this.props.onLeaveFeedback}
          >
            {mark}
          </button>
        ))}
      </div>
    );
  }
}
