import React, { Component } from 'react';
import './App.css';
var math = require('mathjs');

let checkPoint = (pixel, constant) => {
  var c = math.complex(constant.real, constant.imag)
  var z = math.complex(pixel.real, pixel.imag)
  var i = 0
  
  var cfunction = (x, z) => { 
    return math.subtract(math.multiply(x, x), z)
  }
  while(math.abs(z) < 2 && i < 20) {
    z = cfunction(z, c)
    i++
  }
  
  return i
};

class App extends Component {
  render() {
    return (
      <div id="fractalContainer">
        <h1 className="dark">Julia Set Generator</h1>
        <FractalViewer />
        <p className="dark">Click above to generate a new fractal</p>
      </div>
    )
  }
}

class FractalViewer extends Component {
  onBtnClick(evt) {
    var canvas = document.getElementById("FractalViewer");
    var ctx = canvas.getContext("2d");

    var xRatio = (evt.clientX - canvas.offsetLeft - (canvas.width / 2)) / (canvas.width / 2)
    var yRatio = (evt.clientY - canvas.offsetTop - (canvas.height / 2)) / (canvas.height / 2)
    var cnst = {
      real: xRatio,
      imag: yRatio
    }

    var res = 2

    for (var i=0; i < canvas.width/res; i++) {
      for (var j=0; j < canvas.height/res; j++) {
        var pixel = {
          real: res*j / canvas.width,
          imag: res*i / canvas.height
        }
        var intensity = checkPoint(pixel, cnst)
        
        var hexString = intensity.toString(16).toUpperCase()
        var rgbString = "#" + hexString + hexString + hexString

        ctx.fillStyle = rgbString
        ctx.fillRect(res*i, res*j, res, res)
      }
    }
  }
  
  render() {
    return <canvas id="FractalViewer" onClick={this.onBtnClick} width="600" height="600" />
  }
}

export default App;