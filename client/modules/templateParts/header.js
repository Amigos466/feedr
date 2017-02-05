import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, hashHistory, browserHistory } from 'react-router';

//CSS
import styles from './header.css';


function Header(props) {
    return (
        <header>
        	<div className={`row ${styles.headerContainer}`}>
            	<h2>RSSFeddr</h2>
            </div>
        </header>
        );
}

export default Header;