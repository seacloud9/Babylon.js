import { AbstractReactFactory, GenerateWidgetEvent } from '@projectstorm/react-canvas-core';
import * as React from "react";
import { GlobalState } from '../../../globalState';
import { InputNodeModel } from './inputNodeModel';
import { InputNodeWidget } from './inputNodeWidget';
import { DiagramEngine } from '@projectstorm/react-diagrams-core/dist/@types/src/DiagramEngine';

/**
 * Node factory which creates editor nodes
 */
export class InputNodeFactory extends AbstractReactFactory<InputNodeModel, DiagramEngine>{
    private _globalState: GlobalState;

	/**
	 * Constructs a GenericNodeFactory
	 */
    constructor(globalState: GlobalState) {
        super("input");

        this._globalState = globalState;
    }

	/**
	 * Generates a node widget
	 * @param diagramEngine diagram engine
	 * @param node node to generate
	 * @returns node widget jsx
	 */
    generateReactWidget(event: GenerateWidgetEvent<InputNodeModel>): JSX.Element {
        return <InputNodeWidget node={event.model} globalState={this._globalState} />;
    }

	/**
	 * Gets a new instance of a node model
	 * @returns input node model
	 */
    generateModel() {
        return new InputNodeModel();
    }
}