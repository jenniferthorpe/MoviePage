const myObject = {
    myProp: 2,
    myFn() {
        return this.myProp
    }
}

const myFn = myObject.myFn.bind({ myProp: 4 })
const myFn2 = myFn.bind(myObject)
console.log(myFn2())




this.handleUsername = this.handleUsername.bind(this);
//i ES7:
handleUsername = () => {

}