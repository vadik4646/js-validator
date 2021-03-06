"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Parallel = (function () {
    function Parallel(callbacks) {
        this.results = [];
        this.ruleStack = [];
        if (!Array.isArray(callbacks)) {
            callbacks = [callbacks];
        }
        this.ruleStack = this.ruleStack.concat(callbacks);
    }
    Parallel.prototype.appendChain = function (callbacks) {
        if (!Array.isArray(callbacks)) {
            callbacks = [callbacks];
        }
        this.ruleStack = this.ruleStack.concat(callbacks);
        return this;
    };
    Parallel.prototype.subscribe = function (callback) {
        var _this = this;
        this.endCallback = callback;
        for (var i = 0; i < this.ruleStack.length; i++) {
            this.ruleStack[i].execute(function (validatorResponse) {
                _this.appendResponse(validatorResponse);
            });
        }
        return this;
    };
    Parallel.prototype.appendResponse = function (validatorResponse) {
        this.results.push(new Response(validatorResponse));
        if (this.results.length === this.ruleStack.length) {
            this.endCallback(this.results);
        }
    };
    return Parallel;
}());
exports.Parallel = Parallel;
