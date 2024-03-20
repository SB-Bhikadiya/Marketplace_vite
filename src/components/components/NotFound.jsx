import { THEME_COLOR } from "../../constants/keys"

function NotFound({size}) {
  return (
    <div className={'d-flex justify-content-center align-items-center align-content-center w-100 p-4'}>
        <div className="spinner-grow"  style={{height:size   || 100,width:size||100,color:THEME_COLOR}} role="status">
  <span className="sr-only">Loading...</span>
</div>
    </div>
  )
}

export default NotFound