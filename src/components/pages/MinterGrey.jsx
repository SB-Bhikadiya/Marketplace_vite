import React, { useCallback, useEffect, useState } from "react";
import { createGlobalStyle } from "styled-components";
import api from "../../core/api";
import ColumnNewMint from "../components/ColumnNewMint";
import Footer from "../components/footer";

const GlobalStyles = createGlobalStyle`
  header#myHeader.navbar.sticky.white {
    background: #212428;
    border-bottom: 0;
    box-shadow: 0 4px 20px 0 rgba(10,10,10, .8);
  }
  header#myHeader.navbar .search #quick_search{
    color: #fff;
    background: rgba(255, 255, 255, .1);
  }
  header#myHeader.navbar.white .btn, .navbar.white a, .navbar.sticky.white a{
    color: #fff;
  }
  header#myHeader .dropdown-toggle::after{
    color: #fff;
  }
  header#myHeader .logo .d-block{
    display: none !important;
  }
  header#myHeader .logo .d-none{
    display: none !important;
  }
  header#myHeader .logo .d-4{
    display: block !important;
  }
  .navbar .search #quick_search{
    border-radius: 20px;
  }
  .navbar .navbar-item .lines {
    border-bottom: 2px solid #ff343f;
  }
  .navbar .mainside a{
    text-align: center;
    color: #fff !important;
    background: #ff343f;
    border-radius: 30px;
  }
  .navbar .mainside a:hover {
    box-shadow: 2px 2px 20px 0 #ff343f;
    transition: all .3s ease;
  }
  .navbar .menu-line, .navbar .menu-line1, .navbar .menu-line2{
    background: #fff;
  }
  .item-dropdown{
    color: #fff !important;
    background: rgba(33, 36, 40, .9);
    box-shadow: 2px 2px 30px 0px rgba(20, 20, 20, 0.1);
  }
  .item-dropdown .dropdown a{
    color: #fff !important;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }
  .item-dropdown .dropdown a:hover{
    color: #fff !important;
    background: #ff343f;
  }
  footer.footer-light .subfooter span img.d-1{
    display: none !important;
  }
  footer.footer-light .subfooter span img.d-4{
    display: inline-block !important;
  }
  .de_countdown{
    right: 10px;
    color: #fff;
  }
  .author_list_pp{
    margin-left:0;
  }
  footer.footer-light .subfooter{
    border-top: 1px solid rgba(255,255,255,.1);
  }
  #scroll-to-top div {
    background: #ff343f;
  }
  .mainside{
    .connect-wal{
      display: none;
    }
    .logout{
      display: flex;
      align-items: center;
    }
    .de-menu-notification .d-count{
      background: #FF343F;
    }
    .de-menu-notification .popshow span.viewaall, .de-menu-profile .popshow .d-name span.name{
      color: #FF343F;
    }
    .de-menu-profile .popshow .d-wallet #btn_copy:hover{
      background: #FF343F;
    }
  }
  @media only screen and (max-width: 1199px) { 
    .navbar {
      background: #212428;
    }
  }
`;

const Minter = (props) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [url, setURL] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const [status, setStatus] = useState("");

  const [manualInput, setManualInput] = useState(false);

  useEffect(() => {
    setStatus("");
    setWalletAddress("");
  }, []);

  const connectWalletPressed = async () => {
    console.log("wallet pressed");
  };

  const onMintPressed = async () => {
    console.log("mint pressed");
  };

  const toggleInput = () => {
    setManualInput(!manualInput);
    setName("");
    setDescription("");
    setURL("");
  };

  const onSelectNft = (nft) => {
    setName(nft.title);
    setDescription(nft.description);
    setURL(api.baseUrl + nft.preview_image);
  };

  const isEmpty = useCallback(() => {
    return url.trim() === "" || name.trim() === "" || description.trim() === "";
  }, [url, name, description]);

  return (
    <div className="greyscheme">
      <GlobalStyles />
      <section className="jumbotron breadcumb no-bg">
        <div className="mainbreadcumb">
          <div className="container">
            <div className="row m-10-hor">
              <div className="col-12">
                <h1 className="text-center">NFT Minting</h1>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="container">
        <div className="Minter">
          <h1>Mint your NFT</h1>

          {walletAddress.length === 0 && (
            <button
              id="walletButton"
              className="btn-main"
              onClick={connectWalletPressed}
            >
              Connect Metamask
            </button>
          )}
          {walletAddress.length > 0 && "Connected Address: " + walletAddress}
          <br />
          <br />
          {walletAddress.length === 0 && (
            <p>connect to metamask to start minting</p>
          )}
          {
            <div>
              {walletAddress.length > 0 && (
                <>
                  <button
                    id="toggleButton"
                    className="btn-main"
                    onClick={() => toggleInput()}
                  >
                    Switch to {manualInput ? "select" : "manual"} input
                  </button>
                  <br />
                  <br />
                  {!manualInput ? (
                    <ColumnNewMint
                      onSelectNft={onSelectNft}
                      showLoadMore={false}
                      authorId="1"
                    />
                  ) : (
                    <form>
                      <h2>Link to image asset: </h2>
                      <input
                        className="form-control"
                        type="text"
                        placeholder="e.g. https://gateway.pinata.cloud/ipfs/<hash>"
                        onChange={(event) => setURL(event.target.value)}
                      />
                      <h2>Name: </h2>
                      <input
                        className="form-control"
                        type="text"
                        placeholder="e.g. My first NFT!"
                        onChange={(event) => setName(event.target.value)}
                      />
                      <h2>Description: </h2>
                      <input
                        className="form-control"
                        type="text"
                        placeholder="e.g. My Cool NFT!"
                        onChange={(event) => setDescription(event.target.value)}
                      />
                    </form>
                  )}
                  {!isEmpty() && (
                    <>
                      <span>NFT Name: {name}</span>
                      <br />
                      <br />
                      <button
                        id="mintButton"
                        className="btn-main"
                        onClick={onMintPressed}
                      >
                        Proceed to Mint
                      </button>
                      <br />
                    </>
                  )}
                  <p id="status">{status}</p>
                </>
              )}
            </div>
          }
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Minter;
