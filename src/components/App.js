import $ from 'jquery';
import Clock from'./Clock/Clock.js';
import inputs from './Inputs/Inputs.js';

const $page = $('#page');
const $tempo = $page.find('.tempo');

class App {
    constructor() {
        this.clock = new Clock($tempo.val());
        inputs.bind();
        this.bindEvents();
    }

    bindEvents() {
        $('.start').on('click', () => {
            this.clock.start();
        });

        $('.stop').on('click', () => {
            this.clock.stop();
        });

        $('.tempo').on('change', (e) => {
            this.clock.setTempo(e.currentTarget.value);
        });
    }
}

export default App;
