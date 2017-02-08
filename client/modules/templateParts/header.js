import React from 'react';

//CSS
import styles from './header.css';


function Header() {
	return (
		<header>
			<div className={`row ${styles.headerContainer}`}>
				<h2>RSSFeddr</h2>
			</div>
		</header>
	);
}

export default Header;