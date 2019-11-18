import { AbstractReactFactory, GenerateWidgetEvent } from '@projectstorm/react-canvas-core';
import { DiagramEngine } from '@projectstorm/react-diagrams';
import * as React from "react";
import { GlobalState } from '../../../globalState';
import { RemapNodeModel } from './remapNodeModel';
import { RemapNodeWidget } from './remapNodeWidget';

/**
 * Node factory which creates editor nodes
 */
export class RemapNodeFactory extends AbstractReactFactory<RemapNodeModel, DiagramEngine>{
    private _globalState: GlobalState;

	/**
	 * Constructs a GenericNodeFactory
	 */
    constructor(globalState: GlobalState) {
        super("remap");

        this._globalState = globalState;
    }

	/**
	 * Generates a node widget
	 * @param diagramEngine diagram engine
	 * @param node node to generate
	 * @returns node widget jsx
	 */
    generateReactWidget(event: GenerateWidgetEvent<RemapNodeModel>): JSX.Element {
        return <RemapNodeWidget node={event.model} globalState={this._globalState} />;
    }

	/**
	 * Gets a new instance of a node model
	 * @returns input node model
	 */
    generateModel() {
        return new RemapNodeModel();
    }
}