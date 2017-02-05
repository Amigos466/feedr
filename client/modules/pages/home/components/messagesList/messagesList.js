import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, hashHistory, browserHistory } from 'react-router';

//CSS
import styles from './messgesList.css';

function stripEndShort(e) {
    if (e) {
        let stripped = e.replace(/<\/?[^>]+(>|$)/g, "");
        let to_return = stripped.substr(0, 120);
        return to_return + '...';
    }
}


function messgesList(props) {
    return (
        <div>
          <h4>Messages list</h4>
          <div className={ styles.scroller }>
            <ul className="list-group">
              { Object.keys(props.saved_list).map((e) => {
                    return (  <span key={ e }
                                onClick={ () => props.chooseMessage(props.saved_list[e]) }
                                className={`${styles.itemls} list-group-item list-group-item-action flex-column align-items-start`}>
                                <div className="d-flex w-100 justify-content-between">
                                  <h5 className="mb-1">{ props.saved_list[e].title }</h5> <small>{props.saved_list[e].date}</small> </div>
                                <p className="mb-1">
                                  { stripEndShort(props.saved_list[e].description) } </p> <small>{ props.saved_list[e].author }</small></span>);
                }) }
            </ul>
          </div>
        </div>
        );
}

export default messgesList;