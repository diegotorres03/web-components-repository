// Note: if not imported with the /dist/aws... it will fail with fs_promises error
// const { Amplify, API, graphqlOperation } = require('aws-amplify/dist/aws-amplify')
const { Amplify, API, graphqlOperation } = window.modules['aws-amplfy']


const {
    sendLocalCommand,
    setupGetToyData,
    getQR,
} = lovense // require('./lovense')

const { log, warn, error } = console

log(getQR)



const gql = function (templates, ...values) {
    let str = ''
    templates.forEach((template, index) => {
        str += template
        str = values[index] ? str + values[index] : str
    })
    return str.trim()
}


const html = function (templates, ...values) {
    const template = document.createElement('template')
    let str = ''
    templates.forEach((template, index) => {
        str += template
        str = values[index] ? str + values[index] : str
    })
    template.innerHTML = str.trim()
    return template.content
}


const appConfig = {
    aws_appsync_graphqlEndpoint: "https://4yd4snopubgpzmkkk7wzemfo3q.appsync-api.us-west-2.amazonaws.com/graphql",
    aws_appsync_region: "us-east-2",
    aws_appsync_authenticationType: "API_KEY",
    aws_appsync_apiKey: "da2-yhhhdhvn7bb3feqqg2ugpeiilu",
}

log(appConfig)

console.log(appConfig)
Amplify.configure(appConfig)

function rungql(query) {
    return API.graphql(graphqlOperation(query))
}

async function listSessions() {
    const query = gql`query MyQuery {
        getUserSessions {
          id
          level
          recordType
        }
      }
      `
    const sessions = await rungql(query)
    console.log(sessions)
    return sessions.data.getUserSessions
}

async function listRooms() {

}

async function setRoomLevel(level) {
    return sendMutation('room-id', level, 'roomLevel')
}

async function createSession(id, level) {
    return sendMutation(id, level, 'session')
}

async function sendMutation(id, level, recordType) {
    const query = gql`mutation MyMutation {
        createSession(id: {id: "${id}", level: "${level}", recordType: "${recordType}"}) {
          id
          level
          recordType
        }
      }`
    console.log(query)
    const res = await rungql(query)
}

async function updateSession() { }

async function createRoom() { }


//////////////////////////////////////////

function getId() {
    return document.querySelector('#id').value
}


function renderSessionList(sessions) {
    const list = document.querySelector('#session-list')
    list.innerHTML = ''
    const uiSessions = sessions
        // .filter(session => session.id !== 'room-level')
        .map(session =>
            html`<div> <span class="user-image">=)</span>
    <input class="user-range" type="range" value="${session.level}" name="" id="session-id-${session.id}">
</div>`)

    // uiSessions.forEach(session =>
    // session.querySelector('input')
    // .addEventListener('change', event => createSession('3', event.target.value)))

    uiSessions.forEach(session => list.appendChild(session))
}

function subscribe(fn) {
    const query = gql`subscription MySubscription {
        onCreateSession {
          id
          level
          recordType
        }
      }`
    const subscription = rungql(query)
    subscription.subscribe({
        next: event => fn(event)
    })
    // return subscription.unsubscribe
}

function showQr(qrUrl) {
    console.log(qrUrl)
    const imageElement = document.createElement('img')
    imageElement.src = qrUrl
    document.body.appendChild(imageElement)
}

async function run() {
    // let toyData
    const token = `aCKulnOtrJXzT79pHv_0augwjxVtbylBGGaP8_HVcU2aq9fiZ9CKRkHn9F5waQ15`

    const id = getId() || '1' //|| prompt('insert id')

    const getToyData = setupGetToyData(id)
    console.log(await getToyData())
    const sessions = await listSessions()
    renderSessionList(sessions)
    // alert('test')

    // const createSessionBtn = document.querySelector('#create-session')
    // createSessionBtn.addEventListener('click', event => createSession(3, 20))

    // const connectDeviceBtn = document.querySelector('#connect-device')
    // connectDeviceBtn.addEventListener('click', async event => {
    //     const toyData = await getToyData()
    //     toyData.uid = getId()
    //     console.log(toyData)
    //     // sendLocalCommand(toyData, 1, 1)
    //     console.log(toyData)
    // })

    const emojis = Array.from(document.querySelectorAll('.emoji'))
    console.log(emojis)
    emojis.forEach(emojiBtn => emojiBtn.addEventListener('click', async event => {
        console.log(event.target.innerText)
    }))

    const myLevel = document.querySelector('#my-level')
    // console.log(myLevel)
    myLevel.addEventListener('change', event => {
        const id = getId()
        console.log(id, event)
        createSession(id, event.target.value)
    })

    const roomLevel = document.querySelector('#main-room-level')
    console.log(roomLevel)
    roomLevel.addEventListener('change', event => {
        console.log(`setting room level to ${event.target.value}`)
        setRoomLevel(event.target.value)
    })

    subscribe(async event => {
        // console.log(event)
        const item = event.value.data.onCreateSession
        if (event.recordType === 'session') {
            document.querySelector(`#session-id-${item.id}`).value = item.level
            console.log(item)
        } else if (item.recordType === 'roomLevel') {
            document.querySelector(`#main-room-level`).value = item.level
            roomLevel.value = Number(item.level)
            const toyData = await getToyData()
            toyData.uid = getId()
            sendLocalCommand(toyData, 600, item.level)
        }
    })

    const lovenseQrUrl = await getQR(id)
log(lovenseQrUrl)
    showQr(lovenseQrUrl)
}

run()

