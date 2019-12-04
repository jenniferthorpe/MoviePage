
// class Person {
//   constructor(obj){
//     this.firstName = obj.firstName;
//     this.email = obj.email;

//     this.setEmail = (email) => {
//       this.email = email;
//     }
//   }
// }



// const fetchData = () => {
//   return new Promise(function(resolve, reject) {
//     setTimeout(function() {
//       resolve(new Person({
//         firstName : "Anna",
//         email : "mailen"
//       }));
//     }, 3000);
//   });
// }

// const myPromise = fetchData();


// myPromise.then((value) => {
// console.log(value)
// })

const promise = fetch('https://api.themoviedb.org/3/trending/movie/week?api_key=d2530355598301431a821ae172ea0b6f');
promise.then((responseInstance) => {
  const promise2 = responseInstance.json();

  promise2.then((x) => {

  })
})

async function AwaitFunction() {
  const responseInstance = await fetch('https://api.themoviedb.org/3/trending/movie/week?api_key=d2530355598301431a821ae172ea0b6f');
}

async function test() {
  return 9;
};

const payload = test();
console.log(payload);
payload.then((x) => {
  console.log(x)
})




        // const getFavourites = await (await fetch(`https://api.themoviedb.org/3/account/{account_id}/favorite/movies?api_key=d2530355598301431a821ae172ea0b6f&session_id=${sessionID}`)).json();
