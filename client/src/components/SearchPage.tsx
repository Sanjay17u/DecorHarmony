import { useParams } from "react-router-dom"

const SearchPage = () => {

    const params = useParams()

    return(
        <>
          <div>SearchPage({params.text})</div>
        </>
    )
}

export default SearchPage