import React from 'react';
import './Movies.css';
import { SearchForm } from '../SearchForm/SearchForm';
import { MoviesCardList } from '../MoviesCardList/MoviesCardList';
import { Footer } from '../Footer/Footer';
import { Header } from '../Header/Header';

function Movies() {

    return (
        <>
        <Header />
        <main>
            <SearchForm />
            <MoviesCardList />
        </main>
        <Footer />
        </>
    );
}

export { Movies };