import uuid from 'react-uuid'

function chillHop () {
  return [
    {
      name: 'In My Head',
      artist: 'Misha',
      cover:
        'https://chillhop.com/wp-content/uploads/2022/01/6881c7456483ab8ea364152a594942a20669a058-1024x1024.jpg',
      id: uuid(),
      active: true,
      color: ['#DCCDB2', '#CB1841'],
      audio: 'https://mp3.chillhop.com/serve.php/?mp3=28809'
    },
    {
      name: 'Conflicted',
      artist: 'Hanz',
      id: uuid(),
      active: false,
      color: ['#BA4A46', '#FDF0DD'],
      cover:
        'https://chillhop.com/wp-content/uploads/2021/08/b0bb2309d0c8fe0a32907ecddab689501b7de5cf-1024x1024.jpg',
      audio: 'https://mp3.chillhop.com/serve.php/?mp3=24642'
    },
    {
      name: 'Where The Sun Goes',
      artist: 'Delayde, anybodyy',
      id: uuid(),
      active: false,
      color: ['#492C95', '#C4EAF5'],
      cover:
        'https://chillhop.com/wp-content/uploads/2021/09/6a9ef8ac00e168d3308fdf9e336874c03fab829d-1024x1024.jpg',
      audio: 'https://mp3.chillhop.com/serve.php/?mp3=23188'
    }
  ]
}

export default chillHop
