import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'





// import './SinglePost.css'


const SinglePlace = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [place, setPlace] = useState({})
    const [comment, setComment] = useState('')
    

    const [alert, setAlert] = useState({
        message: '',
        status: ''
    })
    
 
    const [refresh, setRefresh] = useState(false)

    useEffect(() => {
        axios.get('/api/places/single/' + id)
        .then(resp => {
            if(!resp.data) {
               
                navigate('/')
                return 
            }

            setPlace(resp.data)
        })
        .catch((error) => {
            console.log(error)
            navigate('/')
        })
    }, [id, navigate, refresh])

    const handleForm = (e) => {
        e.preventDefault()
        
        axios.post('/api/ratings/', { comment, postId: id })
        .then(resp => {
            setAlert({
                message: resp.data,
                status: 'success'
            })
            setComment('')

            setRefresh(!refresh)

            setTimeout(() => setAlert({
                message: '',
                status: ''
            }), 2000)
        })
        .catch(error => {
            console.log(error)
            setAlert({
                message: error.response.data,
                status: 'danger'
            })
      
            if(error.response.status === 401)
                setTimeout(() => navigate('/login'), 2000)
        })
    }

   

    return (
        <>
 
        <div className="container-single">
        
        <div className="single-post">
                <h1>{place.title}</h1>
                <div>

                <img src={place.photo} alt={place.title}/>

                </div>
                <div className="content">
                    {place.description}
                </div>
                {place.comments && (
                    <div className="comments">
                    
                        {place.comments.map((entry) => (
                            <div
                                key={entry.id}
                            
                            >
                                <div className="user mb-2">
                                <strong className="date d-block">{entry.user.username}</strong>
                          
                            </div>
                                <div className="single-comment">{entry.comment}</div>
                            </div>
                        ))}
                    </div>
                )}
                <div className="form-comment">
                    <form onSubmit={(e) => handleForm(e)}>
                            <textarea
                                className="form-control"
                                placeholder="Add a comment..."
                                name="comment"
                                onChange={(e) => setComment(e.target.value)}
                            />
                            <button className="btn-single">Post</button>
                     
                    
                    </form>
                    </div>
            </div>
                
                    
               
            </div>
     
    
    </>
    ) 
}

export default SinglePlace