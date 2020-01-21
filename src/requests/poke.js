import Axios from "axios";

const pokemon = Axios.create({
  baseURL: 'https://pokeapi.co/api/v2'
})

export default pokemon;
