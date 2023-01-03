'use client'
import d3, { csv } from 'd3'
import React, { useEffect, useState } from 'react'

type Props = {
    path:string
}

const useGetData = ({path}: Props) => {
    const [data, setData] = useState([]);

    useEffect(() => {
      csv(path).then(d=>setData(d));
    }, []);
  return (
    setData
  )
}

export default useGetData