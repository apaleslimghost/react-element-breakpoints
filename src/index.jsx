import React, {Component} from 'react';
import {findDOMNode} from 'react-dom';
import ResizeObserver from 'resize-observer-polyfill';
import mapValues from 'lodash.mapvalues';

export const withResize = Child => class WithResize extends Component {
	constructor(props) {
		super(props);
		this.state = {rect: {}};
		this.observer = new ResizeObserver(entries => {
			this.setState({rect: entries[0].contentRect});
		});
	}

	componentDidMount() {
		this.wrapper = findDOMNode(this);
		if(this.wrapper) {
			this.observer.observe(this.wrapper);
		}
	}
	componentWillUnmount() {
		this.observer.unobserve(this.wrapper);
	}

	render() {
		return <Child {...this.props} rect={this.state.rect} />
	}
}

export const withBreakpoints = breakpoints => Child => withResize(
	props => <Child
	{...props}
	breakpoints={mapValues(breakpoints, breakpoint => breakpoint(props.rect))} />
);

export const bp = (fallback, values) => ({breakpoints}) => {
	for(const name in values) if(breakpoints[name]) return values[name];
	return fallback;
}
