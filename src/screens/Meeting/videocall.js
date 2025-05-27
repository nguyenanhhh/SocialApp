// export const token =
//   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlrZXkiOiIwMzAyNjY1Ny01Y2RmLTRkZDUtYThmMi04MmI2MmQwYzE3ZWUiLCJwZXJtaXNzaW9ucyI6WyJhbGxvd19qb2luIl0sImlhdCI6MTczMzAyNDgxNywiZXhwIjoxNzM1NjE2ODE3fQ.vvNCz1rNFPJ3znAHITtAjFMT7Bd_Apw_DBcETPnnnqQ'
// // API call to create meeting

export const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlrZXkiOiIyNmE4YTk5NC1jZWIwLTQ1OTEtYTA0ZS1hMDg1NzNjMDNjMzkiLCJwZXJtaXNzaW9ucyI6WyJhbGxvd19qb2luIl0sImlhdCI6MTc0Nzk5MzQyMCwiZXhwIjoxNzc5NTI5NDIwfQ.lZEq_KYuZ6N6JC0OG8jVDxcnC6uHJ5OULzkAROktYhU'
export const createMeeting = async () => {
  const res = await fetch(`https://api.videosdk.live/v2/rooms`, {
    method: 'POST',
    headers: {
      authorization: token,
      'Content-Type': 'application/json'
    }
  })
  const { roomId } = await res.json()
  console.log('response: ', roomId)

  return roomId
}

export const getToken = () => token

export const getMeetingId = async () => {
  try {
    //Use VideoSDK rooms API endpoint to create a meetingId
    const VIDEOSDK_API_ENDPOINT = `https://api.videosdk.live/v2/rooms`
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Pass the token in the headers
        Authorization: token
      }
    }
    const meetingId = await fetch(VIDEOSDK_API_ENDPOINT, options)
      .then(async (result) => {
        const { roomId } = await result.json()
        return roomId
      })
      .catch((error) => console.log('error', error))

    //Return the meetingId which we got from the response of the api
    return meetingId
  } catch (e) {
    console.log(e)
  }
}
