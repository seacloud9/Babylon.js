import { AbstractReactFactory, GenerateWidgetEvent } from '@projectstorm/react-canvas-core';
import { DiagramEngine } from '@projectstorm/react-diagrams';
import * as React from "react";
import { GlobalState } from '../../../globalState';
import { ClampNodeWidget } from './clampNodeWidget';
import { ClampNodeModel } from './clampNodeModel';

export class ClampNodeFactory extends AbstractReactFactory<ClampNodeModel, DiagramEngine>{
    private _globalState: GlobalState;

    constructor(globalState: GlobalState) {
        super("clamp");

        this._globalState = globalState;
    }

    generateReactWidget(event: GenerateWidgetEvent<ClampNodeModel>): JSX.Element {
        return <ClampNodeWidget node={event.model} globalState={this._globalState} />;
    }

    generateModel() {
        return new ClampNodeModel();
    }
}