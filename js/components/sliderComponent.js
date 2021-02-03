
const MAX=10;
const MIN=1;
const template = document.createElement('template');
template.innerHTML = `
    <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
    
    
    
   
    
    <div class=" w3-center" id="number-container">    
        <input type="number" class="w3-input w3-border w3-round w3-center" id="amp-number" min="1" max="10" value="1">
         <p>*desatinné čísla sa zaokrúhľujú</p>
    </div>
    
    <div class="w3-center w3-container">
    <input type="checkbox" id="number-check" checked>
    <label for="number-check">Ukázať</label>
    </div>
    <div class=" w3-center" id="range-container">
        <input type="range" class="slider" id="amp-range" min="1" max="10" value="1">
    </div>
    <div class="w3-center w3-container">
    <input type="checkbox" id="slider-check" checked>
    <label for="slider-check">Ukázať</label> 
    </div>
    <style>
 .w3-container{
 margin-bottom: 20px;
 }
.w3-input{
width: 20%;
margin: auto;
}
 .slider {
  -webkit-appearance: none;
  width: 10%;
  height: 15px;
  border-radius: 5px;  
  background: lightskyblue;
  outline: none;
  opacity: 1.0;
  -webkit-transition: .2s;
  transition: opacity .2s;
  margin-top:20px;
}

.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 25px;
  height: 25px;
  border-radius: 50%; 
  background: dodgerblue;
  cursor: pointer;
}

.slider::-moz-range-thumb {
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background: lightskyblue;
  cursor: pointer;
}
p{
font-size: smaller;
}
</style>
`;


class SliderComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        this.value=1;


    }

    connectedCallback() {
        console.log('my component is connected!');
        this.shadowRoot.querySelector('#number-check').addEventListener('change',
            () => {
                if(this.shadowRoot.querySelector('#number-container').style.visibility==='hidden'){
                    this.shadowRoot.querySelector('#number-container').style.visibility='visible';
                }
                else{
                    this.shadowRoot.querySelector('#number-container').style.visibility='hidden';
                }


            });
        this.shadowRoot.querySelector('#slider-check').addEventListener('change',
            () => {
                if(this.shadowRoot.querySelector('#range-container').style.visibility==='hidden'){
                    this.shadowRoot.querySelector('#range-container').style.visibility='visible';
                }
                else{
                    this.shadowRoot.querySelector('#range-container').style.visibility='hidden';
                }


            });
        this.shadowRoot.querySelector('#amp-number').addEventListener('change',
            () => {

                if(Math.round(this.shadowRoot.querySelector('#amp-number').value)>MAX){
                    this.shadowRoot.querySelector('#amp-number').value=MAX;
                }
                if(Math.round(this.shadowRoot.querySelector('#amp-number').value)<MIN){
                    this.shadowRoot.querySelector('#amp-number').value=MIN;
                }

                this.shadowRoot.querySelector('#amp-range').value=Math.round(this.shadowRoot.querySelector('#amp-number').value);
                this.value = Math.round(this.shadowRoot.querySelector('#amp-number').value);
            });

        this.shadowRoot.querySelector('#amp-range').addEventListener('change',
            () => {

                this.shadowRoot.querySelector('#amp-number').value=Math.round(this.shadowRoot.querySelector('#amp-range').value);
                this.value = Math.round(this.shadowRoot.querySelector('#amp-range').value);
            });
        this.value=Math.round(this.value);
    }
}


window.customElements.define('slider-component', SliderComponent);
