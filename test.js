const chai = require("chai");
const expect = chai.expect;
var ExecutionOrder = require('./index');
var executionOrder = new ExecutionOrder();
describe('Screening Test', function () {
    describe('Test Case : 1 Task : [] Dependency : []', function () {
        it('Result : []', function () {
            expect([]).to.eql(executionOrder.traversal([], []));
        });
    });
    describe('Test Case : 2 Task : [a,b] Dependency : []', function () {
        it('Result : [a,b]', function () {
            expect(['a', 'b']).to.eql(executionOrder.traversal(["a", "b"], []));
        });
    });
    describe('Test Case : 3 Task : [a,b] Dependency : [a => b]', function () {
        it('Result : [b,a]', function () {
            expect(['b', 'a']).to.eql(executionOrder.traversal(["a", "b"], ["a => b"]));
        });
    });
    describe('Test Case : 4 Task : [a,b,c,d] Dependency : [a => b,c => d]', function () {
        it('Result : [b,a,d,c]', function () {
            expect(['b', 'a', 'd', 'c']).to.eql(executionOrder.traversal(["a", "b", "c", "d"], ["a => b", "c => d"]));
        });
    });
    describe(' Test Case : 5 Task : [a,b,c] Dependency : [a => b,b => c]', function () {
        it('Result : [c,b,a]', function () {
            expect(['c', 'b', 'a']).to.eql(executionOrder.traversal(["a", "b", "c"], ["a => b", "b => c"]));
        });
    });
    describe('Test Case : 6 Task : [a,b,c,d] Dependency : [a => b,b => c,c => a]', function () {
        it('Result : Error - this is a cyclic dependency', function () {
            expect(['Error - this is a cyclic dependency']).to.eql(executionOrder.traversal(["a", "b", "c", "d"], ["a => b", "b => c", "c => a"]));
        });
    });
    describe('Test Case : 7 Task : [a,b,c,d] Dependency : [a => b,c => a]', function () {
        it('Result : [b,a,c,d]', function () {
            expect(['b','a','c','d']).to.eql(executionOrder.traversal(["a", "b", "c", "d"], ["a => b", "c => a"]));
        });
    });
    describe('Test Case : 8 Task : [a,b,a,c] Dependency : [a => b]', function () {
        it('Result : [b,a,a,c]', function () {
            expect(['b','a','a','c']).to.eql(executionOrder.traversal(["a", "b", "a", "c"], ["a => b"]));
        });
    });
});