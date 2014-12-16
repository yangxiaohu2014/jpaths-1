/*!
 * ====================================================
 * jpaths - v1.0.0 - 2014-12-02
 * https://github.com/fex-team/jpaths
 * GitHub: https://github.com/fex-team/jpaths.git
 * Copyright (c) 2014 Baidu FEX; Licensed BSD
 * ====================================================
 */
define(function(require, exports, module) {
    /**
     * 格式化函数
     * @param {String} template 模板
     * @param {Object} json 数据项
     */
    var utils = require('utils/utils');

    function Path() {
        var pathString = [].slice.call(arguments).join('');

        this._pathString = pathString ? pathString : 'M0 0';
        this.pathTool = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        this.pathString = this.toString() || 'M 0 0';
        this.pathList = this.toArray();
        this.pathNodeXY = this.pathNodePos();
    }
    Path.prototype.append = function() {
        var pathString = [].slice.call(arguments).join('');
        var pathList2,
            pathList1 = this.pathList;
        var pathNodeXY2,
            pathNodeXY = this.pathNodeXY;
        var curPos = [].slice.call(pathNodeXY, -1)[0];
        var letter = pathString.charAt(0);
        var bigLetter = letter.toUpperCase();

        // toDo 异常处理   
        if (letter !== bigLetter || bigLetter === 'H' || bigLetter === 'V' || bigLetter === 'Z') {
            this._pathString += pathString;
            pathString = 'M' + curPos.x + ',' + curPos.y + pathString;
            pathString = utils.toString({
                pathString: pathString,
                opt: 0
            });
            pathList2 = utils.toArray(pathString);
            pathList2.shift(0);

            pathNodeXY2 = utils.pathNodePos(pathString, curPos.x, curPos.y);
            pathNodeXY2.shift();

            this.pathString += pathString.replace(/M\d+,\d+/, '');
        } else {
            this._pathString += pathString;
            this.pathString += utils.toString({
                pathString: pathString,
                opt: 0
            });
            pathList2 = utils.toArray(pathString);

            pathNodeXY2 = utils.pathNodePos(pathString, curPos.x, curPos.y);
            pathNodeXY2.shift();
        }

        this.pathList = pathList1.concat(pathList2);
        this.pathNodeXY = pathNodeXY.concat(pathNodeXY2);

    };
    Path.prototype.toString = function() {
        var args = [].slice.call(arguments);
        var len = args.length;
        var tag = len === 0 ? 0 :
            args[0] === '%s' ? 1 :
            args[0] === '%n' ? 2 : 0;
        var result;

        switch (tag) {
            case 0:
                result = utils.toString({
                    pathString: this._pathString,
                    opt: 0
                });
                break;
            case 1:
                result = utils.toString({
                    pathString: this._pathString,
                    opt: 1
                });
                break;
            case 2:
                result = utils.toString({
                    pathString: this._pathString,
                    opt: 2
                });
                break;
            default:
                console.log('unkown type of toString');
                result = utils.toString({
                    pathString: this._pathString,
                    opt: 0
                });
        }
        return result;
    };
    Path.prototype.toArray = Path.prototype.valueOf = function() {
        var _path = this._pathString;
        return utils.toArray(_path);
    };
    Path.prototype.toRelative = function() {
        var path = this.pathString;
        return utils.toRelative(path);
    };
    Path.prototype.toAbsolute = function() {
        var path = this.pathString;
        return utils.toAbsolute(path);
    };
    Path.prototype.pathNodePos = function() {
        var path = this.pathString;
        return utils.pathNodePos(path);
    };
    Path.prototype.length = function() {};

    module.exports = function(path) {
        return new Path(path);
    };
    window.utils = utils;
});