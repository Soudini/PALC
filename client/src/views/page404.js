import React, { Component } from 'react';
import axios from "axios";
import "./page404.css"
import $ from 'jquery';
window.$ = $;


function loading(time) {
    setTimeout(function () {
        $('.biere').addClass('active');
        setTimeout(function () {
            $('.mousse > div').each(function () {
                var scaleValue = Math.floor((Math.random() * 5) + 3);
                $(this).css('opacity', 1);
                $(this).css({
                    '-webkit-transform': 'scale(' + scaleValue + ')',
                    '-moz-transform': 'scale(' + scaleValue + ')',
                    '-ms-transform': 'scale(' + scaleValue + ')',
                    '-o-transform': 'scale(' + scaleValue + ')',
                    'transform': 'scale(' + scaleValue + ')'
                });
            });
            setTimeout(function () {
                $('.mousse > div').each(function () {
                    var scaleValue = 0;
                    $(this).css('opacity', 1);
                    $(this).css({
                        '-webkit-transform': 'scale(' + scaleValue + ')',
                        '-moz-transform': 'scale(' + scaleValue + ')',
                        '-ms-transform': 'scale(' + scaleValue + ')',
                        '-o-transform': 'scale(' + scaleValue + ')',
                        'transform': 'scale(' + scaleValue + ')'
                    });
                });
                setTimeout(function () {
                    $('.biere').removeClass('active');
                    setTimeout(function () {
                        loading(time);
                    }, time);
                }, time);
            }, time);
        }, time);
    }, time);
}
$(function () {
    loading(500);
})


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
                <main>
                    <p id="texte_erreur">Erreur Page 404</p>
                    <br />
                    <br />
                    <div class="chope">
                        <div class="mousse">
                            <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
                        </div>
                        <div class="biere">
                        </div>
                    </div>
                    <div class="anse">
                    </div>
                    <br />

                </main>
                <div class="col-lg-8 mx-auto">
                    <div class="text-center">
                        <div class="row">
                            <div class="col">
                                <a class="btn1 btn-primary1 btn-xl" onClick={() => this.handlePageChange("")}>&nbsp;
                                  Accueil&nbsp;
              </a>
                            </div>
                            <div class="col">
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