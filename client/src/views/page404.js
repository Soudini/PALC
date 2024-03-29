import React, { Component } from 'react';
import axios from "axios";
import "./page404.css"
import $ from 'jquery';
window.$ = $;



export default class Page404 extends Component {
    handlePageChange = (page) => { // navigate between pages

        this.props.history.push("/" + page);
        if (document.getElementById("navbar").classList.contains("show")) {
            document.getElementById("navbar-toggler").click();
        }
    }

    render() {
        return (
            <div>
                <div id="fond" class="text-center">
                    <div id="animation">

                        <div id="glass">
                            <div id="beer"></div>
                        </div>
                        <div id="poignet"></div>
                        <div id="mousse_1"></div>
                        <div id="mousse_2"></div>
                        <div id="mousse_3"></div>
                        <div id="mousse_4"></div>
                        <div id="mousse_5"></div>
                        <div id="mousse_volante"></div>
                        <div id="mousse_interieur"></div>
                        <div id="mousse_interieur_2"></div>
                        <div id="mousse_interieur_3"></div>
                        <div id="mousse_interieur_4"></div>

                        <p id="beer_text">Erreur<br />Page 404</p>

                        <br />

                    </div>
                </div >
                <div class="col-lg-8 mx-auto" id="boutons">
                    <div class="text-center">
                        <div class="row">
                            <div class="col" id="colonne">
                                <a class="btn1 btn-primary1 btn-xl" onClick={() => this.handlePageChange("")}>&nbsp;
                                  Accueil&nbsp;
      </a>
                            </div>
                            <div class="col" id="colonne">
                                <a class="btn1 btn-primary1 btn-xl"
                                    onClick={() => this.handlePageChange("all")}>Annonces</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}