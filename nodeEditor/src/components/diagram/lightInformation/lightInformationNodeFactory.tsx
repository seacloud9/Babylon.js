import { AbstractReactFactory, GenerateWidgetEvent } from '@projectstorm/react-canvas-core';
import { DiagramEngine } from '@projectstorm/react-diagrams';
import { LightInformationNodeWidget } from "./lightInformationNodeWidget";
import { LightInformationNodeModel } from "./lightInformationNodeModel";
import * as React from "react";
import { GlobalState } from '../../../globalState';

/**
 * Node factory which creates editor nodes
 */
export class LightInformationNodeFactory extends AbstractReactFactory<LightInformationNodeModel, DiagramEngine>{
    private _globalState: GlobalState;

	/**
	 * Constructs a LightNodeFactory
	 */
    constructor(globalState: GlobalState) {
        super("light-information");

        this._globalState = globalState;
    }

	/**
	 * Generates a node widget
	 * @param diagramEngine diagram engine
	 * @param node node to generate
	 * @returns node widget jsx
	 */
    generateReactWidget(event: GenerateWidgetEvent<LightInformationNodeModel>): JSX.Element {
        return <LightInformationNodeWidget node={event.model} globalState={this._globalState} />;
    }

	/**
	 * Gets a new instance of a node model
	 * @returns light node model
	 */
    generateModel() {
        return new LightInformationNodeModel();
    }
}