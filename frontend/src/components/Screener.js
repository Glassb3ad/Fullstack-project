import StockList from "./StockList"
import SearchTab from "./SearchTab"
import Info from "./Info"
import Nasdaq100 from "./Nasdaq"
const Screener = (props) => {
    return(
        <>
            <Nasdaq100/>
            <SearchTab/>
            <StockList/>
            <footer>
                <Info/>
            </footer>
        </>
    )    
}

export default Screener