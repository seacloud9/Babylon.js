import { AbstractReactFactory, GenerateWidgetEvent } from '@projectstorm/react-canvas-core';
import { DiagramEngine } from '@projectstorm/react-diagrams';
import * as React from "react";
import { GlobalState } from '../../../globalState';
import { GradientNodeWidget } from './gradientNodeWidget';
import { GradientNodeModel } from './gradientNodeModel';

export class GradientNodeFactory extends AbstractReactFactory<GradientNodeModel, DiagramEngine>{
    private _globalState: GlobalState;

    constructor(globalState: GlobalState) {
        super("gradient");

        this._globalState = globalState;
    }

    generateReactWidget(event: GenerateWidgetEvent<GradientNodeModel>): JSX.Element {
        return <GradientNodeWidget node={event.model} globalState={this._globalState} />;
    }

    generateModel() {
        return new GradientNodeModel();
    }
}