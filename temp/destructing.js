// const myObject = {
//   linken: 'hello',
//   jen: null,

//   nested: {
//     movies: []
//   }
// }

// const { nested  } = myObject

// console.log(nested)

// const array1 = [1,2,3]

// const [moviedetails, second] = array1

// console.log(second)

// const detailsJson = {
//   genre: "action"
// }

// const state = {
//     movieDetails: detailsJson,
//     credits: null
// }

//  const { movieDetails : {
//         detailsJson : {
//             genres: hej
//         }
//     }} = state;
//  console.log("hej");

const detailsJson = {
  genres: "action"
};

const state = {
  movieDetails: detailsJson
};

let {
  title: englishTitle, // rename
  translations: [
    {
      title: localeTitle // rename
    }
  ]
} = metadata;

console.log(englishTitle); // "Scratchpad"
console.log(localeTitle); // "JavaScript-Umgebung"
