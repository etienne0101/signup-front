import ReactTestRenderer from 'react-test-renderer'
import Index from '../../pages'

describe('pages | index', () => {
  describe('render', () => {
    const renderer = ReactTestRenderer.create(<Index />)
    it('should be defined', () => {
      expect(renderer).toBeDefined()
    })
    it('should match snapshot', () => {
      expect(renderer).toMatchSnapshot()
    })
  })
})
