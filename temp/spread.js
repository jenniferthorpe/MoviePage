this.state = {
  movieDetails: null,
  credits: null
};

function test(obj) {
  return {
    adult: true,
    ...obj
  };
}

console.log(test({ adult: "male" }));


const person = {
  firstName: "Jennifer",
  lastName: "Thorpe"
}

const actor = {
  ...person,
  famousMovies: [
    'speed',
    'interstellar'
  ]
}

console.log(actor)
console.log(person)

//      prevState => (
//          {
//         movieDetails: {
//             ...prevState.movieDetails,
//             adult: "Yes"
//         }
//     })
// }

// else {
//     prevState => ({
//         movieDetails: {
//             ...prevState.movieDetails,
//             adult: "No"
//         }
//     })

// }

// const getCredits = await fetch ("https://api.themoviedb.org/3/movie/" + this.props.match.params.id + "/credits?api_key=d2530355598301431a821ae172ea0b6f");
// const creditsJson = await getCredits.json();
