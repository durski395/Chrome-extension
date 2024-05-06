let saveInput = document.getElementById("input-btn")
let myLeads = []
let oldLeads = []
let inputEl = document.getElementById("input-el")
let ulEl = document.getElementById("list")
let deleteBtn = document.getElementById("delete-btn")
let tabBtn = document.getElementById("tab-btn")


const leadsFromLocalStorage = JSON.parse (localStorage.getItem("myLeads"))

console.log(leadsFromLocalStorage)


if (leadsFromLocalStorage){
	myLeads = leadsFromLocalStorage
	render(myLeads)
}

tabBtn.addEventListener("click", function(){
	chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
	myLeads.push(tabs[0].url)
	localStorage.setItem("myLeads", JSON.stringify(myLeads))
	render(myLeads)
})


})

function render(leads){

	let listItems=""
	for (let i=0; i < leads.length; i++){
		listItems +=
		`<li>
			<a target ='blank' href='${leads[i]}'>
			${leads[i]}
			</a>
		</li>`
	}
	ulEl.innerHTML = listItems
}

deleteBtn.addEventListener("dblclick", function() {
	localStorage.clear()
	myLeads = []
	render(myLeads)
	})

saveInput.addEventListener("click", function(){

myLeads.push(inputEl.value)
inputEl.value = ""

localStorage.setItem("myLeads", JSON.stringify(myLeads))

render(myLeads)

console.log(localStorage.getItem("myLeads"))

})



