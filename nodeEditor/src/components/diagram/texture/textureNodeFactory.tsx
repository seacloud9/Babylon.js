import { TextureNodeWidget } from "./textureNodeWidget";
import { TextureNodeModel } from "./textureNodeModel";
import * as React from "react";
import { GlobalState } from '../../../globalState';
import { AbstractReactFactory, GenerateWidgetEvent } from '@projectstorm/react-canvas-core';
import { DiagramEngine } from '@projectstorm/react-diagrams';

/**
 * Node factory which creates editor nodes
 */
export class TextureNodeFactory extends AbstractReactFactory<TextureNodeModel, DiagramEngine>{
    private _globalState: GlobalState;

	/**
	 * Constructs a TextureNodeFactory
	 */
    constructor(globalState: GlobalState) {
        super("texture");

        this._globalState = globalState;
    }

	/**
	 * Generates a node widget
	 * @param diagramEngine diagram engine
	 * @param node node to generate
	 * @returns node widget jsx
	 */
    generateReactWidget(event: GenerateWidgetEvent<TextureNodeModel>): JSX.Element {
        return <TextureNodeWidget node={event.model} globalState={this._globalState} />;
    }

	/**
	 * Gets a new instance of a node model
	 * @returns texture node model
	 */
    generateModel() {
        return new TextureNodeModel();
    }
}