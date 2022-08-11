import { useState } from 'react'
import reactLogo from './assets/react.svg'
import previewImg from './assets/preview.png'
import './App.css'

import 'jsbarcode'
import JsBarcode from 'jsbarcode'

function App() {
  const [count, setCount] = useState(0)

  const generate = (event) => {
	event.preventDefault()

	const formData = new FormData(document.querySelector("form"))
	const formProps = Object.fromEntries(formData)

	if (formProps.dataSequence === "") {
		alert("Data Sequence field requires an input.")
	}
	else {
	// var canvas = document.querySelector("#barcode")
	// var ctx = canvas.getContext("2d")

		JsBarcode("#barcode", formProps.dataSequence, {background: "#ffffff", marginTop: 50, marginLeft: 30, marginRight: 30, width: 3})

		var svg = document.querySelector("#barcode")
		var svgNS = "http://www.w3.org/2000/svg"

		var newText = document.createElementNS(svgNS, "text")
		newText.setAttributeNS(null, 'x', "50%")
		newText.setAttributeNS(null, 'y', 25)
		newText.setAttributeNS(null, 'font-size', 24)
		newText.setAttributeNS(null, 'text-anchor', 'middle')
		newText.setAttributeNS(null, 'font-family', 'Arial Black')
		newText.setAttributeNS(null, 'font-weight', 'bold')
		newText.innerHTML = "BICOL UNIVERSITY"
		svg.appendChild(newText)

		var libraryUnit = document.createElementNS(svgNS, 'text')
		libraryUnit.setAttributeNS(null, 'x', '50%')
		libraryUnit.setAttributeNS(null, 'y', 40)
		libraryUnit.setAttributeNS(null, 'font-size', 14)
		libraryUnit.setAttributeNS(null, 'text-anchor', 'middle')
		libraryUnit.innerHTML = formProps.libraryUnit
		svg.appendChild(libraryUnit)

		svg.setAttributeNS(null, 'height', 96)
		svg.setAttributeNS(null, 'width', 192)

		var img = document.querySelector("#preview")
		var xml = new XMLSerializer().serializeToString(svg)
		var svg64 = btoa(xml)
		var b64Start = 'data:image/svg+xml;base64,'
		var image64 = b64Start + svg64
		img.src = image64
	}
  }

  const downloadBarcode = (event) => {
	event.preventDefault()

	const triggerDownload = (imgURI) => {
		var evt = new MouseEvent('click', {
			view: window,
			bubbles: false,
			cancelable: true
		})

		const date = new Date()
		let year = date.getFullYear()
		let month = date.getMonth()
		let day = date.getDay()
		let hours = date.getHours()
		let minutes = date.getMinutes()
		let seconds = date.getSeconds()

		var a = document.createElement('a')
		a.setAttribute('download', year + "_" + month + "_" + day + "_" + hours + minutes + seconds + ".png")
		a.setAttribute('href', imgURI)
		a.setAttribute('targer', '_blank')

		a.dispatchEvent(evt)
	}
	
	var button = document.querySelector('#downloadButton')
	var barcodeSVG = document.querySelector('#barcode')
	var canvas = document.querySelector('#canvas')
	var ctx = canvas.getContext('2d')
	var data = new XMLSerializer().serializeToString(barcodeSVG)
	console.log(data)
	var DOMURL = window.URL || window.webkitURL || window

	var img = new Image()
	var svgBlob = new Blob([data], {type: 'image/svg+xml;charset=utf-8'})
	var url = DOMURL.createObjectURL(svgBlob)


	img.onload = () => {
		ctx.drawImage(img, canvas.width/2 - img.width/2, canvas.height/2 - img.height/2)
		DOMURL.revokeObjectURL(url)

		var imgURI = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream')

		triggerDownload(imgURI)
	}

	img.src = url
}

	const copyToClipboard = (event) => {
		event.preventDefault()

		var canvas = document.querySelector("#canvas")
		canvas.toBlob(blob => navigator.clipboard.write([new ClipboardItem({'image/png': blob})]))
	}	

  return (
    <div className="App">
        <div className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full h-full'>
			<p className='font-bold text-3xl m-4 mt-0'>
				Barcode Generator
			</p>
			<hr/>
			<form name="form" className="">
				<div className='p-4 space-y-4 flex flex-col'>
					<div className='space-y-1'>
						<label htmlFor="libraryUnit" className='block uppercase text-left font-bold text-sm'>Library Unit:</label>
						<div className='flex space-x-1'>
							<select name='libraryUnit' className='block bg-gray-200 border-2 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:ouline-none focus:bg-white'>
								<option value="BICOL UNIVERSITY LIBRARY">BICOL UNIVERSITY LIBRARY</option>
								<option value="COLLEGE OF MEDICINE LIBRARY">COLLEGE OF MEDICINE LIBRARY</option>
								<option value="COLLEGE OF LAW LIBRARY">COLLEGE OF LAW LIBRARY</option>
								<option value="BU EAST CAMPUS LIBRARY">BU EAST CAMPUS LIBRARY</option>
								<option value="BUCAF LIBRARY">BUCAF LIBRARY</option>
								<option value="BUPC LIBRARY">BUPC LIBRARY</option>
								<option value="BUTC LIBRARY">BUTC LIBRARY</option>
								<option value="BUGC LIBRARY">BUGC LIBRARY</option>
								<option value="FIL">FIL</option>
								<option value="REF">REF</option>
							</select>
							<button className='bg-gray-400 border-2 border-gray-400 p-2 rounded hover:border-gray-700 hover:bg-gray-200'>
								<svg xmlns="http://www.w3.org/2000/svg" fill="#374151" viewBox="0 0 512 512" height={20} width={20}><path d="M373.1 24.97C401.2-3.147 446.8-3.147 474.9 24.97L487 37.09C515.1 65.21 515.1 110.8 487 138.9L289.8 336.2C281.1 344.8 270.4 351.1 258.6 354.5L158.6 383.1C150.2 385.5 141.2 383.1 135 376.1C128.9 370.8 126.5 361.8 128.9 353.4L157.5 253.4C160.9 241.6 167.2 230.9 175.8 222.2L373.1 24.97zM440.1 58.91C431.6 49.54 416.4 49.54 407 58.91L377.9 88L424 134.1L453.1 104.1C462.5 95.6 462.5 80.4 453.1 71.03L440.1 58.91zM203.7 266.6L186.9 325.1L245.4 308.3C249.4 307.2 252.9 305.1 255.8 302.2L390.1 168L344 121.9L209.8 256.2C206.9 259.1 204.8 262.6 203.7 266.6zM200 64C213.3 64 224 74.75 224 88C224 101.3 213.3 112 200 112H88C65.91 112 48 129.9 48 152V424C48 446.1 65.91 464 88 464H360C382.1 464 400 446.1 400 424V312C400 298.7 410.7 288 424 288C437.3 288 448 298.7 448 312V424C448 472.6 408.6 512 360 512H88C39.4 512 0 472.6 0 424V152C0 103.4 39.4 64 88 64H200z"/></svg>
							</button>
						</div>
					</div>
					<div className='space-y-1'>
						<label htmlFor="dataSequence" className='block uppercase text-left font-bold text-sm'>Data Sequence:</label>
						<input type="text" name="dataSequence" className='block bg-gray-200 border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white'/>
					</div>
					<button type='submit' onClick={generate} className='place-self-end w-1/2 bg-gray-400 border-2 border-gray-400 py-2 px-4 rounded uppercase font-bold text-gray-100 text-sm hover:bg-gray-200 hover:border-gray-700 hover:text-gray-700'>Generate Barcode</button>
				</div>
			</form>
			<div className='p-4 w-full h-full border-2 border-gray-400'>
				<img src={previewImg} id="preview" alt="barcodePreview" height={215} width={429} className="m-auto"/>
				<canvas id="canvas" height={"96"} width={"192"} className="hidden m-auto"></canvas>
				<svg id="barcode" height={"182px"} width={"396px"} className="hidden place-self-center mx-auto mb-4"></svg>
				{/* <svg id="barcode"></svg> */}
				<hr className='py-1'/>
				<div className='flex flex-row justify-end space-x-1'>
					<button type="button" onClick={copyToClipboard} className='space-x-2 uppercase font-bold text-xs bg-gray-400 appearance-none border-gray-400 border-2 rounded py-2 px-4 text-gray-100 hover:bg-gray-200 hover:border-gray-700 hover:text-gray-700'>
						<svg xmlns="http://www.w3.org/2000/svg" className='inline' height="20px" width="20px" fill='#374151' viewBox="0 0 512 512"><path d="M384 96L384 0h-112c-26.51 0-48 21.49-48 48v288c0 26.51 21.49 48 48 48H464c26.51 0 48-21.49 48-48V128h-95.1C398.4 128 384 113.6 384 96zM416 0v96h96L416 0zM192 352V128h-144c-26.51 0-48 21.49-48 48v288c0 26.51 21.49 48 48 48h192c26.51 0 48-21.49 48-48L288 416h-32C220.7 416 192 387.3 192 352z"/></svg>
						<span className='inline'>
							copy to clipboard
						</span>
					</button>
					<button type='button' id="downloadButton" onClick={downloadBarcode} className='space-x-2 uppercase font-bold text-xs bg-gray-400 appearance-none border-gray-400 border-2 rounded py-2 px-4 text-gray-100 hover:bg-gray-200 hover:border-gray-700 hover:text-gray-700'>
						<svg xmlns="http://www.w3.org/2000/svg" className='inline' height="20px" width="20px" fill="#374151" viewBox="0 0 512 512"><path d="M480 352h-133.5l-45.25 45.25C289.2 409.3 273.1 416 256 416s-33.16-6.656-45.25-18.75L165.5 352H32c-17.67 0-32 14.33-32 32v96c0 17.67 14.33 32 32 32h448c17.67 0 32-14.33 32-32v-96C512 366.3 497.7 352 480 352zM432 456c-13.2 0-24-10.8-24-24c0-13.2 10.8-24 24-24s24 10.8 24 24C456 445.2 445.2 456 432 456zM233.4 374.6C239.6 380.9 247.8 384 256 384s16.38-3.125 22.62-9.375l128-128c12.49-12.5 12.49-32.75 0-45.25c-12.5-12.5-32.76-12.5-45.25 0L288 274.8V32c0-17.67-14.33-32-32-32C238.3 0 224 14.33 224 32v242.8L150.6 201.4c-12.49-12.5-32.75-12.5-45.25 0c-12.49 12.5-12.49 32.75 0 45.25L233.4 374.6z"/></svg>
						<span className='inline'>
							download
						</span>
					</button>
				</div>
			</div>
		</div>
    </div>
  )
}

export default App
