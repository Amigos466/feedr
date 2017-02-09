import React from 'react';

//CSS
import styles from './channelsList.css';

function cropLink(e) {
	if (e[0].substr) {
		let to_return = e[0].substr(0, 30);
		return to_return + '...';
	}
}

function controlRssList(url, action, fresh) {
	if (window.localStorage) {
		let svaed_channels = localStorage.getItem('svaed_channels');
		let favobj = JSON.parse(svaed_channels);
		if (!favobj) {
			favobj = new Object;
		}
		if (action == 'add') {
			favobj[url] = [url];
		}
		if (action == 'delete') {
			delete favobj[url];
		}
		localStorage.setItem('svaed_channels', JSON.stringify(favobj));
		fresh();
	}
}

function getCount(url, meta, what) {
	for (let prop in meta) {
		if (prop == url) {
			return meta[prop][what];
		}
	}
}


function channelsList(props) {

	function confirmerControl(id, action) {

		let element = document.getElementById(id);
		let url = element.value;
		let validPatern = /^(http|https):\/\/[^ "]+$/;
		element.value = '';

		if (validPatern.test(url)) {
			controlRssList(url, action, props.freshRssList);
			let to_update = [];
			to_update[0] = url;
			props.updateCurrentChannel(to_update);
		}
		else{
			element.placeholder='Is not valid url!';
			element.style.borderColor = 'red';
		}
	}

	function freshErrors(id){
		let element = document.getElementById(id);
		element.placeholder='Enter channel url';
		element.style.borderColor = 'rgb(224, 224, 224)';
	}

	return (
        <div>
          <h4>RSS Channels controller</h4>
          <div className={styles.error}>{props.errors}</div>
          <div className="input-group">
            <input type="text"
        id="add_channel"
        className={'form-control'}
        onChange={() => freshErrors('add_channel')}
        placeholder="Enter channel url" />
            <span className="input-group-btn"><button id="add_butt" onClick={ () => confirmerControl('add_channel', 'add')} className={`btn btn-default ${styles['addbt']}`} type="button">ADD CHANNEL</button></span>
          </div>
          <div className={styles.scroller}>
            <ul className="list-group">
              { Object.keys(props.saved_list).map((e) => {
	return (<li onClick={(ev) => props.updateCurrentChannel(props.saved_list[e], ev.currentTarget)} key={ e } className={`list-group-item ${styles.itemlist} justify-content-between`}>
                              { cropLink(props.saved_list[e])}
                              <div className={ `${styles['info-controll']} align-middle` }>
                              <i className="fa fa-user"></i> <span className="badge badge-default badge-pill">{getCount(props.saved_list[e], props.channels_meta, 'authorscount')}</span> <i className="fa fa-envelope"></i> <span className="badge badge-default badge-pill">{getCount(props.saved_list[e], props.channels_meta, 'messagecount')}</span> 
                              <a onClick={ () => controlRssList(props.saved_list[e], 'delete', props.freshRssList)} className="badge badge-danger">X</a></div>
                            </li>);
})}
            </ul>
          </div>
        </div>
	);
}

export default channelsList;