import { AbstractReactFactory, GenerateWidgetEvent } from '@projectstorm/react-canvas-core';
import { LightNodeWidget } from "./lightNodeWidget";
import { LightNodeModel } from "./lightNodeModel";
import * as React from "react";
import { GlobalState } from '../../../globalState';
import { DiagramEngine } from '@projectstorm/react-diagrams-core/dist/@types/src/DiagramEngine';

/**
 * Node factory which creates editor nodes
 */
export class LightNodeFactory extends AbstractReactFactory<LightNodeModel, DiagramEngine>{
    private _globalState: GlobalState;

	/**
	 * Constructs a LightNodeFactory
	 */
    constructor(globalState: GlobalState) {
        super("light");

        this._globalState = globalState;
    }

	/**
	 * Generates a node widget
	 * @param diagramEngine diagram engine
	 * @param node node to generate
	 * @returns node widget jsx
	 */
    generateReactWidget(event: GenerateWidgetEvent<LightNodeModel>): JSX.Element {
        return <LightNodeWidget node={event.model} globalState={this._globalState} />;
    }

	/**
	 * Gets a new instance of a node model
	 * @returns light node model
	 */
    generateModel() {
        return new LightNodeModel();
    }
}