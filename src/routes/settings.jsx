import { Link } from 'react-router-dom'
import { useState } from 'react'

export default function Settings() {

    var libraryUnits = Object.values(JSON.parse(localStorage.libraryUnits))

    var str = ""
    for(let libraryUnit in libraryUnits) {
        str += libraryUnits[libraryUnit] + "\n"
    }

    // var textarea = document.querySelector("#editLibraryUnits")
    // textarea.value = str

    const saveLibraryUnits = (event) => {
        event.preventDefault()
        
        var textArea = document.getElementById("editLibraryUnits")
        var val = textArea.value
        val = val.split("\n")
        var newLibraryUnitsList = val.filter(data => {
            return data !== ""
        })

        newLibraryUnitsList = newLibraryUnitsList.filter(data => {
            return !(new RegExp("[ ]{2,}").test(data))
        })

        console.log(newLibraryUnitsList)
    }

    return(
        <div className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full h-full'>
            <div>
                <h4 className="text-left font-bold">Add/Edit/Remove Library Units</h4>
                <hr />
                {/* <ul className="text-left text-sm">
                    { libraryUnitsList }
                </ul> */}
                <div>
                    <textarea className='px-2 border-2 border-gray-700' value={Object.values(JSON.parse(localStorage.libraryUnits))} resize="none" placeholder="" name="" id="editLibraryUnits" cols="70" rows="15"></textarea>
                </div>
                <div className="flex justify-end space-x-2">
                    <button type="button" onClick={saveLibraryUnits} className="py-2 px-4 bg-green-600 border-2 border-green-600 rounded text-gray-100 text-sm font-bold hover:bg-green-300 hover:text-gray-700 hover:border-green-700">Save</button>
                    <Link to={`/`}>
                        <button type="button" className="py-2 px-4 bg-gray-400 border-2 border-gray-400  rounded text-gray-100 text-sm font-bold hover:bg-gray-200 hover:text-gray-700 hover:border-gray-700">Cancel</button>
                    </Link>
                </div>
            </div>

        </div>
    )
}