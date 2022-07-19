import React, { useState } from 'react'
import { Navigate } from 'react-router-dom';

interface HomeProps {
  onLogOut: () => void
}

export const Home = (props: HomeProps) => {
  return (
    <div>
      <a href="/manage/comics">My Webcomics</a>
    </div>
  )
}
