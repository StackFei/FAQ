function Promise(executor) {
    let _this = this;
    _this.status = 'pending';
    _this.value = null;
    _this.reason = null;
    _this.onResolvedCallBacks = [];
    _this.onRejectedCallBacks = [];
    function resolve(value) {
        if (_this.status === 'pending') {
            _this.value = value;
            _this.status = 'resolved';
            _this.onResolvedCallBacks.forEach(fn => fn())
        }
    }

    function reject(reason) {
        if (_this.status === 'pending') {
            _this.reason = reason;
            _this.status = 'rejected';
            _this.onRejectedCallBacks.forEach(fn => fn())
        }
    }
    executor(resolve, reject)
}

Promise.prototype.then = function (onFulfilled, onRejected) {
    let _this = this;
    if (_this.status === 'resolved') {
        onFulfilled(_this.value);
    }
    if (_this.status === 'rejected') {
        onRejected(_this.reason);
    }
    if(_this.status = 'pending'){
        _this.onResolvedCallBacks.push(function(){onFulfilled(_this.value)})
        _this.onRejectedCallBacks.push(function(){onRejected(_this.reason)})
    }
}


return new Promise((resolve, reject) => {
    resolve(0)
}).then(data => {
    throw new Error('第一次出错了')
}).catch(err => {
    console.log(err,'2')
    console.log(data,'2')
}).catch(err => {
    console.log(err,'3')
    console.log(data,'3')
}).then(data => {
    throw new Error('第三次出错了')
}).catch(err => {
    console.log(err,'4')
    console.log(data,'4')
}).then(data => {
    console.log(data)
})