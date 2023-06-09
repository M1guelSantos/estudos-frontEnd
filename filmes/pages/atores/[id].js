import { Pagina } from '@/components/Pagina'
import React from 'react'
import apiFilmes from '../services/apiFilmes'
import { Card, Col, Row } from 'react-bootstrap'
import Imagens from '@/components/Imagens'

const DetalhesAct = (props) => {
    const ator = props.infAtor
    const movies = props.movies.cast
    const img = props.img.profiles
    const series = props.series.cast
    return (
        <Pagina>
            <Row>
                 <Col md={3}>
                    <Card.Img variant="top" src={"https://image.tmdb.org/t/p/w500" + ator.profile_path}/>
                </Col>
                <Col md={9}>
                    <p><strong> Data de Nascimento: </strong> {ator.birthday} </p>
                    <p><strong>Local de Nascimento: </strong>{ator.place_of_birth}</p>
                    <p><strong> Biografia: </strong> {ator.biography} </p>
                </Col>
            </Row>

            <Imagens titulo="Imagens" lista={img} foto="file_path" size={1}/>
            <Imagens titulo="Filmes em que atuou" lista={movies} foto="poster_path" size={2}/>
            <Row>
                <h2> Séries que atuou: </h2>

                    {series.map(se =>(
                      <Col md={2}>  
                        <Card.Img variant="top" src={"https://image.tmdb.org/t/p/w500" + se.poster_path} />
                      </Col>
                    ))}
            </Row>

        </Pagina>
    )
}

export default DetalhesAct

export async function getServerSideProps(context) {
    const id = context.params.id
    const resultAtor = await apiFilmes.get("/person/" + id)
    const resMovies = await apiFilmes.get("/person/" + id + "/movie_credits")
    const resImg = await apiFilmes.get("/person/" + id + "/images")
    const resSeries = await apiFilmes.get("/person/" + id + "/tv_credits")
    const infAtor = resultAtor.data
    const movies = resMovies.data
    const img = resImg.data
    const series = resSeries.data
    return {
        props: {
            infAtor, movies, img, series
        },
    }
}
