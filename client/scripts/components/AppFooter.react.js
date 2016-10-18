import React, { Component } from "react";
import ReactTransitionGroup from "react-addons-css-transition-group";
import AlertInfo            from "./alerts/AlertsInfo.react";
import AlertFailure         from "./alerts/AlertsFailure.react";
import AlertSuccess         from "./alerts/AlertsSuccess.react";
import AlertsStore          from "../stores/AlertStore";

export default class AppFooter extends Component {
    state = {
        info    : AlertsStore.info,
        failure : AlertsStore.failure,
        success : AlertsStore.success,
    }

    componentDidMount() {
        AlertsStore.addChangeListener( () => this.onAlertsChange() );
    }

    componentWillUnmount() {
        AlertsStore.removeChangeListener( this.onAlertsChange );
    }

    onAlertsChange() {
        this.setState( {
            info    : AlertsStore.info,
            failure : AlertsStore.failure,
            success : AlertsStore.success,
        } );
    }

    renderInfo() {
        return this.state.info.map( ( alert, key ) => (
            <AlertInfo key={key} index={key} message={alert.message} />
        ) );
    }

    renderFailure() {
        return this.state.failure.map( ( alert, key ) => (
            <AlertFailure key={key} index={key} message={alert.message} />
        ) );
    }

    renderSuccess() {
        return this.state.success.map( ( alert, key ) => (
            <AlertSuccess key={key} index={key} message={alert.message} />
        ) );
    }

    render() {
        return (
            <ReactTransitionGroup
                className="alerts qilin-panel"
                transitionName="fade"
                transitionEnterTimeout={500}
                transitionLeaveTimeout={500}
            >
                {this.renderInfo()}
                {this.renderFailure()}
                {this.renderSuccess()}
            </ReactTransitionGroup>
        );
    }
}