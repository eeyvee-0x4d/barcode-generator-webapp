import { useState } from 'react'
import reactLogo from './assets/react.svg'
import previewImg from './assets/preview.png'
import './App.css'

import 'jsbarcode'
import JsBarcode from 'jsbarcode'

import { Link } from 'react-router-dom'

function App() {

	const libraryUnitsList = [
		"COLLEGE OF MEDICINE LIBRARY",
		"COLLEGE OF LAW",
		"BU EAST CAMPUS LIBRARY",
		"BUCAF LIBRARY",
		"BUPC LIBARY",
		"BUTC LIBRARY",
		"BUGC LIBRARY",
		"FIL",
		"REF"
  	]
  	
	var libraryUnits = {...libraryUnitsList}
	localStorage.libraryUnits = JSON.stringify(libraryUnits)

//   localStorage.setItem('libraryUnits', JSON.stringify(libraryUnits))
//   for(var i = 0; i < Object.keys(libraryUnits).length; i++) {
// 	console.log(Object.keys(libraryUnits).length)
//   }

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

		JsBarcode("#barcode", formProps.dataSequence, {background: "#ffffff", marginTop: 70, marginLeft: 30, marginRight: 30, textMargin: 1, width: 3, height: 80, fontSize: 28})

		var svg = document.querySelector("#barcode")
		var svgNS = "http://www.w3.org/2000/svg"

		var newText = document.createElementNS(svgNS, "text")
		newText.setAttributeNS(null, 'x', "50%")
		newText.setAttributeNS(null, 'y', 35)
		newText.setAttributeNS(null, 'font-size', 32)
		newText.setAttributeNS(null, 'text-anchor', 'middle')
		newText.setAttributeNS(null, 'font-family', 'Arial Black')
		newText.setAttributeNS(null, 'font-weight', 'bold')
		newText.innerHTML = "BICOL UNIVERSITY"
		svg.appendChild(newText)

		var libraryUnit = document.createElementNS(svgNS, 'text')
		libraryUnit.setAttributeNS(null, 'x', '50%')
		libraryUnit.setAttributeNS(null, 'y', 60)
		libraryUnit.setAttributeNS(null, 'font-size', 20)
		libraryUnit.setAttributeNS(null, 'text-anchor', 'middle')
		libraryUnit.setAttributeNS(null, 'font-family', 'Arial')
		libraryUnit.setAttributeNS(null, 'font-weight', 'bold')
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
	// console.log(data)
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

	// ctx.clearRect(0, 0, canvas.width, canvas.height)
}

	const copyToClipboard = (event) => {
		event.preventDefault()

		// var barcodeSVG = document.querySelector('#barcode')
		// var canvas = document.querySelector('#canvas')
		// var ctx = canvas.getContext('2d')
		// var data = new XMLSerializer().serializeToString(barcodeSVG)
		// // console.log(data)
		// var DOMURL = window.URL || window.webkitURL || window

		// var img = new Image()
		// var svgBlob = new Blob([data], {type: 'image/svg+xml;charset=utf-8'})
		// var url = DOMURL.createObjectURL(svgBlob)


		// img.onload = () => {
		// 	ctx.drawImage(img, canvas.width/2 - img.width/2, canvas.height/2 - img.height/2)
		// 	// DOMURL.revokeObjectURL(url)

		// 	// var imgURI = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream')

		// 	// triggerDownload(imgURI)
		// }

		// img.src = url

		// var canvas = document.querySelector("#canvas")
		// canvas.toBlob(blob => navigator.clipboard.write([new ClipboardItem({'image/png': blob})]))
	}	

  return (
    <div className="App">
        <div className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full h-full'>
			<p className='font-bold text-3xl m-4 mt-0'>
				Barcode Generator
			</p>
			<hr/>
			{/* <div className='flex justify-end px-4 pt-2'>
				<Link to={`/settings`}>
					<button type="button" className='p-2 bg-gray-200 rounded-full'>
						<svg xmlns="http://www.w3.org/2000/svg" height={20} width={20} fill={'#374151'} viewBox="0 0 512 512"><path d="M495.9 166.6C499.2 175.2 496.4 184.9 489.6 191.2L446.3 230.6C447.4 238.9 448 247.4 448 256C448 264.6 447.4 273.1 446.3 281.4L489.6 320.8C496.4 327.1 499.2 336.8 495.9 345.4C491.5 357.3 486.2 368.8 480.2 379.7L475.5 387.8C468.9 398.8 461.5 409.2 453.4 419.1C447.4 426.2 437.7 428.7 428.9 425.9L373.2 408.1C359.8 418.4 344.1 427 329.2 433.6L316.7 490.7C314.7 499.7 307.7 506.1 298.5 508.5C284.7 510.8 270.5 512 255.1 512C241.5 512 227.3 510.8 213.5 508.5C204.3 506.1 197.3 499.7 195.3 490.7L182.8 433.6C167 427 152.2 418.4 138.8 408.1L83.14 425.9C74.3 428.7 64.55 426.2 58.63 419.1C50.52 409.2 43.12 398.8 36.52 387.8L31.84 379.7C25.77 368.8 20.49 357.3 16.06 345.4C12.82 336.8 15.55 327.1 22.41 320.8L65.67 281.4C64.57 273.1 64 264.6 64 256C64 247.4 64.57 238.9 65.67 230.6L22.41 191.2C15.55 184.9 12.82 175.3 16.06 166.6C20.49 154.7 25.78 143.2 31.84 132.3L36.51 124.2C43.12 113.2 50.52 102.8 58.63 92.95C64.55 85.8 74.3 83.32 83.14 86.14L138.8 103.9C152.2 93.56 167 84.96 182.8 78.43L195.3 21.33C197.3 12.25 204.3 5.04 213.5 3.51C227.3 1.201 241.5 0 256 0C270.5 0 284.7 1.201 298.5 3.51C307.7 5.04 314.7 12.25 316.7 21.33L329.2 78.43C344.1 84.96 359.8 93.56 373.2 103.9L428.9 86.14C437.7 83.32 447.4 85.8 453.4 92.95C461.5 102.8 468.9 113.2 475.5 124.2L480.2 132.3C486.2 143.2 491.5 154.7 495.9 166.6V166.6zM256 336C300.2 336 336 300.2 336 255.1C336 211.8 300.2 175.1 256 175.1C211.8 175.1 176 211.8 176 255.1C176 300.2 211.8 336 256 336z"/></svg>
					</button>
				</Link>
			</div> */}
			<form name="form" className="">
				<div className='p-4 space-y-4 flex flex-col'>
					<div className='space-y-1'>
						<label htmlFor="libraryUnit" className='block uppercase text-left font-bold text-sm'>Library Unit:</label>
						<div className='flex space-x-1'>
							<select name='libraryUnit' className='block bg-gray-200 border-2 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:ouline-none focus:bg-white'>
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
							{/* <button className='bg-gray-400 border-2 border-gray-400 p-2 rounded hover:border-gray-700 hover:bg-gray-200'>
								<svg xmlns="http://www.w3.org/2000/svg" fill="#374151" viewBox="0 0 512 512" height={20} width={20}><path d="M373.1 24.97C401.2-3.147 446.8-3.147 474.9 24.97L487 37.09C515.1 65.21 515.1 110.8 487 138.9L289.8 336.2C281.1 344.8 270.4 351.1 258.6 354.5L158.6 383.1C150.2 385.5 141.2 383.1 135 376.1C128.9 370.8 126.5 361.8 128.9 353.4L157.5 253.4C160.9 241.6 167.2 230.9 175.8 222.2L373.1 24.97zM440.1 58.91C431.6 49.54 416.4 49.54 407 58.91L377.9 88L424 134.1L453.1 104.1C462.5 95.6 462.5 80.4 453.1 71.03L440.1 58.91zM203.7 266.6L186.9 325.1L245.4 308.3C249.4 307.2 252.9 305.1 255.8 302.2L390.1 168L344 121.9L209.8 256.2C206.9 259.1 204.8 262.6 203.7 266.6zM200 64C213.3 64 224 74.75 224 88C224 101.3 213.3 112 200 112H88C65.91 112 48 129.9 48 152V424C48 446.1 65.91 464 88 464H360C382.1 464 400 446.1 400 424V312C400 298.7 410.7 288 424 288C437.3 288 448 298.7 448 312V424C448 472.6 408.6 512 360 512H88C39.4 512 0 472.6 0 424V152C0 103.4 39.4 64 88 64H200z"/></svg>
							</button> */}
						</div>
					</div>
					<div className='space-y-1'>
						<label htmlFor="dataSequence" className='block uppercase text-left font-bold text-sm'>Data Sequence:</label>
						<input type="text" name="dataSequence" className='block bg-gray-200 border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white'/>
					</div>
					<button type='submit' onClick={generate} className='place-self-end w-1/2 bg-gray-400 border-2 border-gray-400 py-2 px-4 rounded uppercase font-bold text-gray-100 text-sm hover:bg-gray-200 hover:border-gray-700 hover:text-gray-700'>Generate Barcode</button>
				</div>
			</form>
			<div id="previewSection" className='p-4 w-full h-full border-2 border-gray-400'>
				<img src={previewImg} id="preview" alt="barcodePreview" height={215} width={429} className="m-auto"/>
				<canvas id="canvas" height={"96px"} width={"192px"} className="hidden m-auto"></canvas>
				<svg id="barcode" height={"182px"} width={"396px"} className="hidden place-self-center mx-auto mb-4"></svg>
				{/* <svg id="barcode"></svg> */}
				<hr className='py-1'/>
				<div className='flex flex-row justify-end space-x-1'>
					<button type="button" onClick={copyToClipboard} id="copyButton" className='hidden space-x-2 uppercase font-bold text-xs bg-gray-400 appearance-none border-gray-400 border-2 rounded py-2 px-4 text-gray-100 hover:bg-gray-200 hover:border-gray-700 hover:text-gray-700'>
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
