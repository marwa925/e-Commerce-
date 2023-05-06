import React from 'react'

export default function Profile({userData}) {
  return (
    <div>
      <h2>hello {userData?.name}</h2>
    </div>
  )
}
