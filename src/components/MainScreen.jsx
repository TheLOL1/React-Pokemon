import React, { useState, useEffect } from "react";
import logo from  "../assets/poke_logo.png";
import styled from "styled-components";
import Poke from "../requests/poke";

const MainScreen = () =>
{
    const [pokemon,setPokemmon] = useState([]);


    useEffect(() =>
    {
        async function APIPokemons ()
        {
            let pokemonsJSON = await Poke.get('/pokemon');
            let arrayPokemons = pokemonsJSON.data.results;
            setPokemmon(arrayPokemons);
        }
        APIPokemons();
    }, []);

    return (
        <Container>
            <Logo src={logo}/>
            {pokemon.map(data =>{
                return <StyledLI>{data.name}</StyledLI>
            })}
        </Container>
    );
};

const Container = styled.div`
    display: flex;
    height: auto;
    width: auto;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const Logo = styled.img`
    heigth: 40vmin;
    width: 40vmin;
`;

const StyledLI = styled.li`
    display: flex;
    color: blue;
`;

export default MainScreen;