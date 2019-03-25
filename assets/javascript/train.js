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
  let id = db.collection('trainTime').doc().id
  db.collection('trainTime').doc(id).set({
    // create data fields in database document and link to corresponding form fields
    trainName: document.querySelector('#trainName').value,
    destination: document.querySelector('#destination').value,
    firstTrain: document.querySelector('#firstTrain').value,
    frequency: document.querySelector('#frequency').value,
  })
  // clear form fields after submit
  document.querySelector('#trainName').value = ''
  document.querySelector('#destination').value = ''
  document.querySelector('#firstTrain').value = ''
  document.querySelector('#frequency').value = ''
})

// db.collection('trainTime').onSnapshot(({ docs }) => {
//   document.querySelector('#displayContainer').innerHTML = ''
//   docs.forEach(doc => {
//     let { trainName, destination, firstTrain, frequency } = doc.data()
//     let docElem = document.createElement('div')
//     docElem.innerHTML = `
//       <h3>${trainName}</h3>
//       <h4>${destination}</h4>
//       <h6>${firstTrain}</h6>
//       <hr>
//     `
//     document.querySelector('#disp').append(docElem)
//   })
// })
