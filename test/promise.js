class MPromise {
    static pendding = 'pendding'
    static fulfilled = 'fullfill'
    static rejected = 'rejected'
    constructor(excutor) {
        this.status = MPromise.pendding;
        this.value = undefined;
        this.reason = undefined;
        this.callbacks = [];
        excutor(this._resolve.bind(this), this._reject.bind(this));
    }

    then(onFulfilled, onRejected) {
        this.callbacks.push(onFulfilled, onRejected);
    }
    _resolve(value) {
        this.value = value;
        this.status = MPromise.fulfilled;
        this.callbacks.forEach(cb => this._handler(cb));
    }
    _reject(reason) {
        this.reason = reason;
        this.status = MPromise.rejected;
        this.callbacks.forEach(cb => this._handler(cb))
        console.log('bbb');
    }

    _handler(cb) {
        const { onFulfilled, onRejected } = cb;
        if (this.status === MPromise.fulfilled && onFulfilled) {
            onFulfilled(this.value);
        }

        if (this.status === MPromise.rejected && onRejected) {
            onRejected(this.reason);
        }
    }
}