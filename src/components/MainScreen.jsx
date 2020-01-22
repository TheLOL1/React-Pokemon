import React, { useState, useEffect } from "react";
import logo from  "../assets/poke_logo.png";
import styled from "styled-components";
import Poke from "../requests/poke";

const MainScreen = () =>
{
    const [pokemon,setPokemmon] = useState([]);
    const [contador,setContador] = useState(0);

    async function getDataAPI(Caminho)
    {
        let pokemonsJSON = await Poke.get(Caminho);
        let arrayPokemons = pokemonsJSON.data.results;
        setPokemmon(arrayPokemons);
    }


    useEffect(() =>
    {
        getDataAPI('/pokemon');
    }, []);

    const onClickNext = () =>
    {
        setContador(contador+1);
        const contadorAux = contador+1;
        const offset = 20 * contadorAux;
        getDataAPI('/pokemon?offset='+offset+'&limit=20');
    }

    const onClickPrevious = () =>
    {
        setContador(contador-1);
        const contadorAux = contador-1;
        const offset = 20 * contadorAux;
        getDataAPI('/pokemon?offset='+offset+'&limit=20');
    }

    return (
        <Container>
            <Logo src={logo}/>
            {pokemon.map(data =>{
                return <StyledLI>{data.name}</StyledLI>
            })}
            <ContainerButtons>
                {contador > 0 && contador !== 48 ? <Button onClick={onClickPrevious}  style={{marginRight: 20}}>ANTERIOR</Button> : null}
                {contador === 48 ? <Button onClick={onClickPrevious}>ANTERIOR</Button> : null}
                {contador !== 48 ? <Button onClick={onClickNext}>PRÓXIMO</Button> : null}
            </ContainerButtons>
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
    color: #3333FF;
`;

const Button = styled.button`
    width: 100px;
    height: 40px;
    background-color: #3333FF;
`;

const ContainerButtons = styled.div`
    flexDirection: 'row';
    margin-top: 3%;
`;

export default MainScreen;