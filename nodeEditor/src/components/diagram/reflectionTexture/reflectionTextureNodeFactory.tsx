import { AbstractReactFactory, GenerateWidgetEvent } from '@projectstorm/react-canvas-core';
import { DiagramEngine } from '@projectstorm/react-diagrams';
import * as React from "react";
import { GlobalState } from '../../../globalState';
import { ReflectionTextureNodeModel } from './reflectionTextureNodeModel';
import { ReflectionTextureNodeWidget } from './reflectionTextureNodeWidget';

/**
 * Node factory which creates editor nodes
 */
export class ReflectionTextureNodeFactory extends AbstractReactFactory<ReflectionTextureNodeModel, DiagramEngine>{
    private _globalState: GlobalState;

	/**
	 * Constructs a TextureNodeFactory
	 */
    constructor(globalState: GlobalState) {
        super("reflectiontexture");

        this._globalState = globalState;
    }

	/**
	 * Generates a node widget
	 * @param diagramEngine diagram engine
	 * @param node node to generate
	 * @returns node widget jsx
	 */
    generateReactWidget(event: GenerateWidgetEvent<ReflectionTextureNodeModel>): JSX.Element {
        return <ReflectionTextureNodeWidget node={event.model} globalState={this._globalState} />;
    }

	/**
	 * Gets a new instance of a node model
	 * @returns texture node model
	 */
    generateModel() {
        return new ReflectionTextureNodeModel();
    }
}