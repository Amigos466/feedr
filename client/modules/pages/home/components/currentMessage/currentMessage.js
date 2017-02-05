import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, hashHistory, browserHistory } from 'react-router';

//CSS
import styles from './currentMessage.css';

function stripHtml(e) {
    if (e) {
        let to_return = e.replace(/<\/?[^>]+(>|$)/g, "");
        return to_return + '...';
    }
}


function currentMessage(props) {
    return (
        <div>
          <h4>Current message</h4>
          <div className="card">
            <div className="card-block">
              <h4 className="card-title">{ props.current_message.title }</h4>
              <p className={`${styles.message_cont} card-text`} dangerouslySetInnerHTML={{__html: props.current_message.description}} >
              </p>
            </div>
          </div>
        </div>
        );
}

export default currentMessage;