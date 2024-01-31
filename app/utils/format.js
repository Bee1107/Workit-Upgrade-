export const bidToJobFormat = bid => {

    const job_time = new Date(bid.bidDate)
    const bidTime = new Date(bid.bidTime)
    job_time.setHours(bidTime.getHours())
    job_time.setMinutes(bidTime.getMinutes())
    job_time.setSeconds(bidTime.getSeconds())

    return {
        ...bid,
        user: {
            profile_picture: bid.user_image,
            name: bid.user_name,
            father_last_name: ''
        },
        status: bid.owner_status,
        job_time: job_time
    }
}