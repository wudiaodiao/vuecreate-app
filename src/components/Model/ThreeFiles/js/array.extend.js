(function (Array) {
    function SortedArray(array) {
        this._array = array || [];
        this._array.sort(function (a, b) { return a - b; });
    }

    SortedArray.prototype.contains = function (item) {
        var i = 0, j = this._array.length - 1;
        while (i <= j) {
            var k = Math.floor((i + j) / 2);
            if (this._array[k] == item)
                return true;
            if (this._array[k] < item)
                i = k + 1;
            else
                j = k - 1;
        }
        return false;
    };

    Array.prototype.indexOf = Array.prototype.indexOf || function (item, start) {
        start = start || 0;
        for (var i = start; i < this.length; i++) {
            if (this[i] == item)
                return i;
        }
        return -1;
    };

    Array.minus = function (a, b) {
        var c = [];
        for (var i = 0; i < a.length; i++) {
            if (!bb.contains(a[i]))
                c.push(a[i]);
        }
        return c;
    };

    Array.intersect = function (a, b) {
        var bb = new SortedArray(b);
        var c = new Array();
        for (var i = 0; i < a.length; i++) {
            if (bb.contains(a[i]))
                c.push(a[i]);
        }
        return c;
    };

    Array.union = function (a, b) {
        var bb = new SortedArray(b);
        var c = new Array();
        for (var i = 0; i < a.length; i++) {
            if (!bb.contains(a[i]))
                c.push(a[i]);
        }
        for (var i = b.length - 1; i >= 0; i--)
            c.push(b[i]);
        return c;
    };
} (Array));
