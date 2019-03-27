// Initialize Firebase
var config = {
  apiKey: "AIzaSyDygjyH6lFdEQ8g-ppn9pBZM8xjkcdzin4",
  authDomain: "traintime-3e2c9.firebaseapp.com",
  databaseURL: "https://traintime-3e2c9.firebaseio.com",
  projectId: "traintime-3e2c9",
  storageBucket: "traintime-3e2c9.appspot.com",
  messagingSenderId: "355957977261"
}
firebase.initializeApp(config)

let db = firebase.firestore()

// code to send data entererd into the form to the database
// taken entirely from class demo
document.querySelector('#submit').addEventListener('click', e => {
  e.preventDefault()
  // assigns id to each new document
  let id = db.collection('trainTime').doc().id
  db.collection('trainTime').doc(id).set({
    // create data fields in database document and link to corresponding form fields
    trainName: document.querySelector('#trainName').value,
    destination: document.querySelector('#destination').value,
    firstTrain: document.querySelector('#firstTrain').value,
    frequency: parseInt(document.querySelector('#frequency').value),
  })
  // clear form fields after submit
  document.querySelector('#trainName').value = ''
  document.querySelector('#destination').value = ''
  document.querySelector('#firstTrain').value = ''
  document.querySelector('#frequency').value = ''
})

db.collection('trainTime').onSnapshot(({ docs }) => {
  // clears all before adding entire set so that existing docs are not added again
  document.querySelector('#trainDisp').innerHTML = ''
  docs.forEach(doc => {
    let { trainName, destination, frequency } = doc.data()
    let docElem = document.createElement('tr')
    docElem.innerHTML = `
      <td style="width:25%; padding:5px 0px; font-weight:normal">${trainName}</td>
      <td style="width:23%; font-weight:normal">${destination}</td>
      <td style="width:20%; font-weight:normal">${frequency}</td>
      <td>20:00</td>
      <td>100</td>
    `
    document.querySelector('#trainDisp').append(docElem)
  })
})
