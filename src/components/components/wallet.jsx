import { useWeb3Modal } from '@web3modal/ethers/react';
import React, { useContext } from 'react';
import { MarketplaceContext } from '../../core/marketplace';


const Wallet= () => {
    
    const { open } = useWeb3Modal()

    const {intract} = useContext(MarketplaceContext)
    
    return (

  <div className="row">
    <div className="col-lg-3 mb30" onClick={async () => {
        await open()
    }}>
        <span className="box-url">
            <span className="box-url-label">Most Popular</span>
            <img src="./img/wallet/1.png" alt="" className="mb20"/>
            <h4>Metamask</h4>
            <p>Start exploring blockchain applications in seconds.  Trusted by over 1 million users worldwide.</p>
        </span>
    </div>
                         
</div>
);}
export default Wallet;