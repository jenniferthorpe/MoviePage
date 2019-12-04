const fetchFirst = () =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve(1);
    }, 1000);
  });

const fetchSecond = () =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve(2);
    }, 1000);
  });

async function componentDidMount() {
  const allPayloads = await Promise.all([
    fetchFirst(),
    fetchSecond(),
    fetchFirst(),
    fetchSecond(),
    fetchFirst(),
    fetchSecond(),
    fetchFirst(),
    fetchSecond(),
    fetchFirst(),
    fetchSecond(),
    fetchFirst(),
    fetchSecond()
  ]);

  console.log(allPayloads[2]);
}

componentDidMount();

async function myFunc() {
  const details = "4";
  const getCredits = "5";

  const fetchAll = await Promise.all([details, getCredits]).then(val => {
    console.log(val);
  });
}

myFunc();



            // const { request_token: token }  = await (await fetch('https://api.themoviedb.org/3/authentication/token/new?api_key=d2530355598301431a821ae172ea0b6f')).json()

