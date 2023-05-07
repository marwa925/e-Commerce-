import React, { useEffect } from 'react'

export default function Profile({userData}) {

  return (
    <div className='my-5'>
      <h2>hello {userData?.name}</h2>
      <h3 className='text-center'>Welcome in our website,<br/>can buy any thing you want with sale 50%</h3>
    </div>
  )
}
