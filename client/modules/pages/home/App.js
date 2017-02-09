import React from 'react';
import { connect } from 'react-redux';
import { getChannel } from '../../../actions/actions';
import { getRssChannel } from '../../../reducers/reducers';

//CSS
import './App.css';

// Parst & Components
import Header from '../../templateParts/header';
import Footer from '../../templateParts/footer';
import ChannelsList from './components/channelsList/channelsList';
import MessagesList from './components/messagesList/messagesList';
import CurrentMessage from './components/currentMessage/currentMessage';
import Statistics from './components/statistics/statistics';

const App = React.createClass({

    getInitialState() {
        return {
            channel: {},
            errors: '',
            current_channel: 0,
            channels_meta: {},
            rss_channels_list: {},
            current_message: {}
        };
    },

    componentWillMount() {
        this.freshRssList();
    },

    componentWillReceiveProps(nextProps) {
        if (nextProps.rss_channel) {
            if (!nextProps.rss_channel.error) {
                this.setState({
                    current_message: nextProps.rss_channel.items[0],
                    channel: nextProps.rss_channel.items,
                    errors: ''
                });
                this.saveToLs(nextProps.rss_channel.items, nextProps.rss_channel.from);
            }
            else{
            	this.setState({
            		errors: `SERVER ERROR: ${nextProps.rss_channel.error}`
            	});
            }
        }
    },

    updateCurrentChannel(url, element) {
        this.setState({
            current_message: {},
            channel: {}
        });
        if (url) {
            this.props.dispatch(getChannel(url[0]));
        }
        this.toggleActive(element);
    },

    freshRssList() {
        if (window.localStorage) {
            let svaed_channels = localStorage.getItem('svaed_channels');
            let favobj = JSON.parse(svaed_channels);
            if (favobj) {
                this.setState({
                    rss_channels_list: favobj
                });
            }
        }
    },

    saveToLs(channel, url) {
        if (window.localStorage) {
            let svaed_channels = localStorage.getItem('svaed_channels');
            let favobj = JSON.parse(svaed_channels);
            if (favobj[url] && channel) {
                favobj[url].authorscount = this.countAuthors(channel);
                favobj[url].messagecount = channel.length;
                let change = this.state.channels_meta;
                change[url] = favobj[url];
                this.setState({
                    channels_meta: change
                });
            }
        }
    },

    countAuthors(channel) {
        if (channel) {
            var differ = {};
            for (let prop in channel) {
                if (differ.hasOwnProperty(channel[prop].author)) {
                    differ[channel[prop].author] = differ[channel[prop].author] + 1;
                } else {
                    differ[channel[prop].author] = 1;
                }
            }
            return Object.keys(differ).length;
        }
    },

    toggleActive(element) {
        let elementClassList = element.classList;
        let similar = document.getElementsByClassName(elementClassList.value);
        for ( let item of similar ) {
            item.classList.remove('active');
        }
        elementClassList.toggle('active');
    },

    chooseMessage(message, element) {
        this.setState({
            current_message: message
        });
        this.toggleActive(element);
    },

    render() {
        this.countAuthors();
        return (
            <div className="App">
              <div className="container-fluid">
                <Header current={ this.props.routes.reverse()[0].name } searchAction={ this.Search } />
                <div className="row">
                  <div className="col-md-6 col-xs-12">
                    <ChannelsList errors={this.state.errors} freshRssList={ () => this.freshRssList()} channels_meta={ this.state.channels_meta } updateCurrentChannel={ (e, element) => this.updateCurrentChannel(e, element)} saved_list={ this.state.rss_channels_list } />
                  </div>
                  <div className="col-md-6 col-xs-12">
					<Statistics current_message={ this.state.current_message } saved_list={ this.state.rss_channels_list } />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 col-xs-12">
					<MessagesList freshRssList={ () => this.freshRssList()} chooseMessage={ (message, element) => this.chooseMessage(message, element)} saved_list={ this.state.channel } />
                  </div>
                  <div className="col-md-6 col-xs-12">
                    <CurrentMessage freshRssList={ () => this.freshRssList()} current_message={ this.state.current_message } saved_list={ this.state.rss_channels_list } />
                  </div>
                </div>
                <Footer/>
              </div>
            </div>
        );
    }
});

function mapStateToProps(state) {
    return {
        rss_channel: getRssChannel(state)
    };
}


App.propTypes = {
    rss_channel: React.PropTypes.object.isRequired
};

export default connect(mapStateToProps)(App);