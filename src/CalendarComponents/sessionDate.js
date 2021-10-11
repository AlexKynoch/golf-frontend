const sessionDate = (session) => {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    const sessionDate = new Date(session.date)
    const nameDay = days[sessionDate.getDay()]
    const month = months[sessionDate.getMonth()]
    const date = sessionDate.getDate()
    return nameDay + ', ' + month + ' ' + date
}

export default sessionDate