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

// current time
let now = moment().format('MMMM Do YYYY, HH:mm')
console.log(now)

db.collection('trainTime').onSnapshot(({ docs }) => {
  // clears all before adding entire set so that existing docs are not added again
  document.querySelector('#trainDisp').innerHTML = ''
  docs.forEach(doc => {
    let { trainName, destination, frequency, firstTrain } = doc.data()
    
    // difference between the start time and now, in minutes
    let differenceHours = moment.utc(moment(now,'MMMM Do YYYY, HH:mm').diff(moment(firstTrain, 'HH:mm'))).format("HH:mm")
    let differenceMins = moment.duration(differenceHours).asMinutes()
    console.log(differenceMins)

    // minutes from now to next train is calculated using the remainder from
    // minutes from first train until now divided by the frequency
    let remainder = differenceMins%frequency    
    // minutes until the next train is the frequency minus the remainder
    let mins = frequency - remainder
    console.log(mins)

    // next train time is the current time plus the minutes until the next train
    let nextTrain = moment().add(mins, 'm').format("HH:mm")
    console.log(nextTrain)

    // rendering the data in the Current Train Schedule table
    let docElem = document.createElement('tr')
    docElem.innerHTML = `
      <td style="width:22%; padding:5px 0px; font-weight:normal">${trainName}</td>
      <td style="width:20%">${destination}</td>
      <td style="width:20%; text-align:center">${frequency}</td>
      <td type="time" style="width:20%; text-align:center">${nextTrain}</td>
      <td style="width:20%; text-align:center">${mins}</td>
    `
    document.querySelector('#trainDisp').append(docElem)
  })
})