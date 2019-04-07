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
                var scaleValue = Math.floor((Math.random() * 5));
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
                    }, time * 2);
                }, time);
            }, time * 2);
        }, time);
    }, time / 2);
}
$(function () {
    loading(500);
})


export default class Home extends Component {
    render() {
        return (
            <div>
                <main>
                    <p>Erreur Page 404</p>
                    <br />
                    <hr class="light my-4" />
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

                </main>
            </div>
        )
    }
}