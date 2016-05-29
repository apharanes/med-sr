/**
 * Created by apharanes on 24/01/16.
 */

var React = require('react');
var _ = require('lodash');
var PubSub = require('pubsub-js');
var Modal = require('react-bootstrap/lib/Modal');


var MModal = React.createClass({
    getInitialState: function () {
        return {
            visible: false,
            title: '',
            body: '',
            confirm: null
        }
    },
    componentWillMount: function () {
        PubSub.subscribe('modal:show', this.show);
    },
    show: function (msg, options) {
        if (this.isMounted()) {
            this.setState({
               visible: true,
                title: options.title,
                body: options.body,
                confirmMessage: options.confirmMessage
            });
        }
    },
    confirm: function () {
        this.hide();
        var message = this.state.confirmMessage;
        PubSub.publish(
            message.eventName,
            message.id
        );
    },
    hide: function () {
        if (this.isMounted()) {
            this.setState({
                visible: false
            });
        }
    },
    render: function () {
        return (
            <Modal show={this.state.visible} onHide={this.hide}>
                <Modal.Title>
                    {this.state.title}
                </Modal.Title>
                <Modal.Body>
                    {this.state.body}
                </Modal.Body>
                <Modal.Footer>
                    <button type="button" className="btn btn-default" onClick={this.hide}>
                        Cancel
                    </button>
                    <button type="button" className="btn btn-default" onClick={this.confirm}>
                        Yes
                    </button>
                </Modal.Footer>
            </Modal>
        );
    }
});

module.exports = MModal;