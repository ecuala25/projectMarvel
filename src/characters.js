import axios from "axios";

const options = {
  method: 'GET',
  url: 'https://gateway.marvel.com:443/v1/public/characters',
  params: {
    apikey: 'c9da5268e65c63da333bdb1bbb0d6944',
    ts: '1',
    limit: '100',
    hash: '58de8a9c691c51f18dda2c49fe429f65' 
  }
};


axios.request(options).then(function (response) {
  console.log(response.data);
}).catch(function (error) {
  console.error(error);
});