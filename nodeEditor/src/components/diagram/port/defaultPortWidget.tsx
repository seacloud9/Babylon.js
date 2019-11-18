import * as React from 'react';
import { NodeModel } from '@projectstorm/react-diagrams-core/dist/@types/src/entities/node/NodeModel';


export interface IDefaultPortWidgetProps {
	name: string;
	node: NodeModel;
    style: any;
}

export class DefaultPortWidget extends React.Component<IDefaultPortWidgetProps> {
    constructor(props: IDefaultPortWidgetProps) {
		super(props);
		this.state = {
			selected: false
		};
	}

	// getClassName() {
	// 	return "port " + super.getClassName() + (this.state.selected ? this.bem("--selected") : "");
	// }

	render() {
		return (
			<div
				style={this.props.style}
				// {...this.getProps()}
				// onMouseEnter={() => {
				// 	this.setState({ selected: true });
				// }}
				// onMouseLeave={() => {
				// 	this.setState({ selected: false });
				// }}
				// data-name={this.props.name}
				// data-nodeid={this.props.node.getID()}
			/>
		);
	}
}