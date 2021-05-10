import React from 'react'

import copy from '../../../common/data/copy.json'

function isValidURL (string) {
  const res = string.match(
    /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
  )
  return res !== null
}

const getVideos = (videos) => {
  if (videos && videos.length) {
    return videos.map((fileName, i) => {
      return (
        <video key={fileName} className='video' width='550' height='380' controls>
          <source src={`./videos/${fileName}.mp4`} type='video/mp4' />
        </video>
      )
    })
  }
}

const getVictimName = (nombre) => {
  if (nombre) {
    return (
      <p className='nombre-muerto'>
        <span className='star' />
        {nombre}
        <span className='star' />
      </p>
    )
  }

  return null
}

const getSource = (source) => {
  const sources = source
    .trim()
    .split('https')
    .filter((s) => !!s)
    .map((s) => {
      if (s.charAt(0) === ':') {
        return `https${s}`
      } else {
        return s
      }
    })

  const res = []

  if (sources.length) {
    sources.forEach((s, idx) => {
      let fuente = ''

      if (isValidURL(s)) {
        fuente = (
          <p key={`fuente-${idx}`} className='fuente'>
            <a href={s} target='_blank'>
              {`Fuente ${idx + 1}`}
            </a>
          </p>
        )
      } else {
        fuente = (
          <p key={`fuente-${idx}`} className='fuente'>
            {s}
          </p>
        )
      }

      res.push(fuente)
    })

    return res
  }

  return null
}

const CardSummary = ({ language, data }) => {
  const summary = copy[language].cardstack.description
  const nombre = getVictimName(data.nombre_victima)
  const fuente = getSource(data.fuente)

  return (
    <div className='card-row summary'>
      <div className='card-cell'>
        <p className='card-categoria'>{`Categoría: ${data.category}`}</p>
        {nombre}
        <h4>{summary}</h4>
        <p>{data.description}</p>
        {getVideos(data.videos)}
        {fuente}
      </div>
    </div>
  )
}

export default CardSummary
