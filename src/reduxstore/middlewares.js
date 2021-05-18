//export let FirstMiddleWare= store=>next=>action=>{
export function FirstMiddleWare(store){
    return function (next) {
        return function (action) {
            console.log("Before Action ", action.type, store.getState())
            var result = next(action)
            console.log("After Action ", store.getState())
            return result
        }
    }
}

//ES6
export let logger= store=>next=>action=>{
    console.log("Before Action ", action.type, store.getState())
    var result = next(action)
    console.log("After Action ", store.getState())
    return result
}