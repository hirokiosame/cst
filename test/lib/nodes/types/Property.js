import {parseAndGetObjectProperty} from '../../../utils';
import {expect} from 'chai';

describe('Property', () => {
    it('should return correct type', () => {
        expect(parseAndGetObjectProperty('x').type).to.equal('Property');
    });

    it('should accept key and value', () => {
        let property = parseAndGetObjectProperty('x: y');
        expect(property.key.type).to.equal('Identifier');
        expect(property.key.name).to.equal('x');
        expect(property.value.type).to.equal('Identifier');
        expect(property.value.name).to.equal('y');
        expect(property.shorthand).to.equal(false);
        expect(property.method).to.equal(false);
        expect(property.kind).to.equal('init');
    });

    it('should accept shorthand key', () => {
        let property = parseAndGetObjectProperty('x');
        expect(property.key.type).to.equal('Identifier');
        expect(property.key.name).to.equal('x');
        expect(property.value.type).to.equal('Identifier');
        expect(property.value.name).to.equal('x');
        expect(property.shorthand).to.equal(true);
        expect(property.kind).to.equal('init');
    });

    it('should accept getters', () => {
        let property = parseAndGetObjectProperty('get x ( ) { ; }');
        expect(property.key.type).to.equal('Identifier');
        expect(property.key.name).to.equal('x');
        expect(property.value.type).to.equal('FunctionExpression');
        expect(property.methodParams).to.deep.equal([]);
        expect(property.kind).to.equal('get');
        expect(property.method).to.equal(false);
        expect(property.shorthand).to.equal(false);
    });

    it('should accept setters', () => {
        let property = parseAndGetObjectProperty('set x ( v ) { ; }');
        expect(property.key.type).to.equal('Identifier');
        expect(property.key.name).to.equal('x');
        expect(property.value.type).to.equal('FunctionExpression');
        expect(property.methodParams[0].type).to.deep.equal('Identifier');
        expect(property.methodParams[0].name).to.deep.equal('v');
        expect(property.kind).to.equal('set');
        expect(property.method).to.equal(false);
        expect(property.shorthand).to.equal(false);
    });

    it('should accept methods', () => {
        let property = parseAndGetObjectProperty('x ( v , w ) { ; }');
        expect(property.key.type).to.equal('Identifier');
        expect(property.key.name).to.equal('x');
        expect(property.value.type).to.equal('FunctionExpression');
        expect(property.methodParams[0].type).to.deep.equal('Identifier');
        expect(property.methodParams[0].name).to.deep.equal('v');
        expect(property.methodParams[1].type).to.deep.equal('Identifier');
        expect(property.methodParams[1].name).to.deep.equal('w');
        expect(property.kind).to.equal('init');
        expect(property.method).to.equal(true);
        expect(property.shorthand).to.equal(false);
    });
});
