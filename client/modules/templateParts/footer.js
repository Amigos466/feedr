import React, { Component } from 'react';
import { connect } from 'react-redux';

import styles from './footer.css';

function Footer(props) {
    return (
          <footer>
            <div className={`${styles.footer_row} row`}>
              <p className={`${styles.footer_text}`}>belousvladislav@gmail.com 2017</p>
            </div>
       </footer>
    );
  }

export default Footer;