
import React from "react";
import Footer from "../../components/User/Footer/Footer";
import NavBar from "../../components/User/NavBar/NavBar";
import Search from "../../components/User/Search/Search";
import ListProduct from "../../container/Users/ListProduct/ListProduct";
import './Home.css'

/**
 * Home
 * <p>
 * Version 1.0
 * <p>
 * Date: 30-05-2021
 * <p>
 * Copyright By DuyHV9
 * <p>
 * Modification Logs:
 * DATE             AUTHOR              DESCRIPTION
 * -------------------------------------------------
 * 07-06-2021       DuyHV9           Create
 */
const Home: React.FC<{}> = (props) => {

    
    return (
        <div className="home">
            <NavBar />

            <div className="home_content">
                <div className="home__action">
                    <Search />
                </div>
                <ListProduct />
            </div>
            <Footer />
            <div>

            </div>
        </div>
    );
};

export default Home;
