import { NodeMaterialBlock } from '../nodeMaterialBlock';
import { NodeMaterialBlockConnectionPointTypes } from '../Enums/nodeMaterialBlockConnectionPointTypes';
import { NodeMaterialBuildState } from '../nodeMaterialBuildState';
import { NodeMaterialConnectionPoint } from '../nodeMaterialBlockConnectionPoint';
import { NodeMaterialBlockTargets } from '../Enums/nodeMaterialBlockTargets';
import { _TypeStore } from '../../../Misc/typeStore';
/**
 * Block used to multiply 2 values
 */
export class TilingAndOffsetBlock extends NodeMaterialBlock {
    /**
     * Creates a new MultiplyBlock
     * @param name defines the block name
     */
    public constructor(name: string) {
        super(name, NodeMaterialBlockTargets.Neutral);
        this.registerInput("scaleGrid", NodeMaterialBlockConnectionPointTypes.Float);
        this.registerInput("uvScale", NodeMaterialBlockConnectionPointTypes.Vector2);
        this.registerOutput("output", NodeMaterialBlockConnectionPointTypes.Color4);
    }

    /**
     * Gets the current class name
     * @returns the class name
     */
    public getClassName() {
        return "TilingAndOffsetBlock";
    }

    /**
     * Gets the right operand input component
     */
    public get scaleGrid(): NodeMaterialConnectionPoint {
        return this._inputs[0];
    }

    public get uvScale(): NodeMaterialConnectionPoint {
        return this._inputs[1];
    }

    /**
     * Gets the output component
     */
    public get output(): NodeMaterialConnectionPoint {
        return this._outputs[0];
    }

    protected _buildBlock(state: NodeMaterialBuildState) {
        super._buildBlock(state);
        if (!this.scaleGrid.isConnected) {
            return;
        }

        if (!this.uvScale.isConnected) {
            return;
        }

        if (!this._outputs[0].hasEndpoints) {
            return;
        }

        let tilingAndOffsetFunc = `

        vec4 TilingAndOffset(float scaleGrid, vec2 uvScale) {
            vec2 st = gl_FragCoord.xy/uvScale.xy;
            vec3 color = vec3(0.0);
            st *=  scaleGrid;      // Scale up the space by 3
            st = fract(st); // Wrap arround 1.0
            color = vec3(st,0.0);

            return vec4(color,1.0);
        }
        `;

        state._emitFunction('TilingAndOffset', tilingAndOffsetFunc, 'TilingAndOffset');
        state.compilationString += this._declareOutput(this._outputs[0], state) + ` = TilingAndOffset(${this.scaleGrid.associatedVariableName}, ${this.uvScale.associatedVariableName});\r\n`;

        return this;
    }
}

_TypeStore.RegisteredTypes["BABYLON.TilingAndOffsetBlock"] = TilingAndOffsetBlock;