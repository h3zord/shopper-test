"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAddressError = void 0;
var GetAddressError = /** @class */ (function (_super) {
    __extends(GetAddressError, _super);
    function GetAddressError(error) {
        var _this = this;
        if (error instanceof Error) {
            _this = _super.call(this, "Erro ao obter endere\u00E7o, ".concat(error.message)) || this;
        }
        else {
            _this = _super.call(this, 'Erro desconhecido ao obter endereço') || this;
        }
        return _this;
    }
    return GetAddressError;
}(Error));
exports.GetAddressError = GetAddressError;
