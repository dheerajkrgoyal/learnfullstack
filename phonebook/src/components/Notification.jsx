
const Notification = ({notificationMessage, notificationClass}) => {
    if(notificationMessage !== null){
        return (
            <div className={notificationClass}>
                {notificationMessage}
            </div>
        )
    }
    return (
        <div>

        </div>
    )
    
}

export default Notification