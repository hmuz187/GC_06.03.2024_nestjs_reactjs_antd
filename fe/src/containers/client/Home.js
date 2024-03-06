
import { CC_FooterClient, CC_FooterCopyRight, CC_HeaderClient, CC_Hero, CC_Work } from '../../components'

const Home = () => {
  return (
    <div>
      <CC_HeaderClient/>
      <CC_Hero />
      <CC_Work />
      <CC_FooterClient/>
      <CC_FooterCopyRight/>
    </div>
  )
}

export default Home