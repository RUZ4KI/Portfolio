import { LattooScene, lattooInfo } from './scenes/lattoo'
import { KathputliScene, kathputliInfo } from './scenes/kathputli'
import { PinwheelScene, pinwheelInfo } from './scenes/pinwheels'

export const artworks = [
  { id: 'lattoo', label: 'Lattoo', Scene: LattooScene, ...lattooInfo },
  {
    id: 'kathputli',
    label: 'Kathputli',
    Scene: KathputliScene,
    ...kathputliInfo
  },
  {
    id: 'pinwheels',
    label: 'Paper pinwheels',
    Scene: PinwheelScene,
    ...pinwheelInfo
  }
]

export const getArtwork = id =>
  artworks.find(artwork => artwork.id === id) || artworks[0]
