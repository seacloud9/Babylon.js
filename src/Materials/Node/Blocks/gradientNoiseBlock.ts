import { NodeMaterialBlock } from '../nodeMaterialBlock';
import { NodeMaterialBlockConnectionPointTypes } from '../Enums/nodeMaterialBlockConnectionPointTypes';
import { NodeMaterialBuildState } from '../nodeMaterialBuildState';
import { NodeMaterialConnectionPoint } from '../nodeMaterialBlockConnectionPoint';
import { NodeMaterialBlockTargets } from '../Enums/nodeMaterialBlockTargets';
import { _TypeStore } from '../../../Misc/typeStore';
/**
 * Block used to multiply 2 values
 */
export class GradientNoiseBlock extends NodeMaterialBlock {
    /**
     * Creates a new MultiplyBlock
     * @param name defines the block name
     */
    public constructor(name: string) {
        super(name, NodeMaterialBlockTargets.Neutral);
        this.registerInput("gradientScale", NodeMaterialBlockConnectionPointTypes.Float);
        this.registerInput("uvScale", NodeMaterialBlockConnectionPointTypes.Vector2);
        this.registerOutput("output", NodeMaterialBlockConnectionPointTypes.Color4);
    }

    /**
     * Gets the current class name
     * @returns the class name
     */
    public getClassName() {
        return "GradientNoiseBlock";
    }

    /**
     * Gets the right operand input component
     */
    public get gradientScale(): NodeMaterialConnectionPoint {
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
        if (!this.gradientScale.isConnected) {
            return;
        }

        if (!this.uvScale.isConnected) {
            return;
        }

        if (!this._outputs[0].hasEndpoints) {
            return;
        }

        let gradientNoiseFunc = `

    // 2D Random
    float random (in vec2 st) {
        return fract(sin(dot(st.xy,
            vec2(12.9898,78.233)))
            * 43758.5453123);

    }

    // 2D Noise based on Morgan McGuire @morgan3d
    // https://www.shadertoy.com/view/4dS3Wd
    float noise (in vec2 st) {
        vec2 i = floor(st);
        vec2 f = fract(st);

        // Four corners in 2D of a tile
        float a = random(i);
        float b = random(i + vec2(1.0, 0.0));
        float c = random(i + vec2(0.0, 1.0));
        float d = random(i + vec2(1.0, 1.0));

        // Smooth Interpolation

        // Cubic Hermine Curve.  Same as SmoothStep()
        vec2 u = f*f*(3.0-2.0*f);
        // u = smoothstep(0.,1.,f);

        // Mix 4 coorners percentages
        return mix(a, b, u.x) +
        (c - a)* u.y * (1.0 - u.x) +
        (d - b) * u.x * u.y;
    }

    vec4 GradientNoise(float scaleNoise, vec2 uvScale){
        vec2 st = gl_FragCoord.xy/uvScale.xy;
        //vec2 st = vUV;

        // Scale the coordinate system to see
        // some noise in action
        vec2 pos = vec2(st*scaleNoise);

        // Use the noise function
        float n = noise(pos);

        return vec4(vec3(n), 1.0);
    }
        `;

        state._emitFunction('GradientNoise', gradientNoiseFunc, 'GradientNoise');
        state.compilationString += this._declareOutput(this._outputs[0], state) + ` = GradientNoise(${this.gradientScale.associatedVariableName}, ${this.uvScale.associatedVariableName});\r\n`;

        return this;
    }
}

_TypeStore.RegisteredTypes["BABYLON.GradientNoiseBlock"] = GradientNoiseBlock;