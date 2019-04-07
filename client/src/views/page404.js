import React, { Component } from 'react';
import axios from "axios";
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
                <a target="_blank" style={{ "display": "block", "position": "fixed", "z-index": "9999", "bottom": "10px", "right": "10px", "width": "60px", }} href="http://www.yoannbraie.fr/board/"><img style="width: 100%;" src="http://images.yoannbraie.fr/logoyb_white.png" alt="logo" /></a>
                <main>
                    <div class="chope">
                        <div class="mousse">
                            <div></div><div></div><div></div><div></div><div></div><div></div><div></div>
                        </div>
                        <div class="biere">
                        </div>
                    </div>
                    <div class="anse">
                    </div>
                    <p>Erreur Page 404</p>
                </main>
            </div>
        )
    }
}