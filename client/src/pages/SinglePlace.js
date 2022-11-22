import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'

import './SinglePlace.css';




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


    const handleRatings = (e, placeId) => {
        axios.post('/api/ratings/rating/' + placeId, {
            rating: e.target.value
        })
        .then(resp => {
            setAlert({
                message: resp.data,
                status: 'success'
            })
            setRefresh(!refresh)
        })
        .catch(error => {
            console.log(error)
            setAlert({
                message: error.response.data,
                status: 'danger'
            })

            if(error.response.status === 401)
                navigate('/login')
        })
    }

    const handleForm = (e) => {
        e.preventDefault()
        
        axios.post('/api/ratings/', { comment, placeId: id })
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


            <div className ="post">
                <div className="left">

                <img src={place.photo} alt={place.title}/>

                </div>



                <div className="right">
                <h1>{place.title}</h1>
                <div className="content">
                    {place.description}
                </div>
                </div>

                </div>




                {place.ratings && (
                    <div className="comments">
                    
                        {place.ratings.map((entry) => (
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
                            {place.ratings ? 'Jūsų įvertinimas: ' + place.ratings.rating :
                                        <select onChange={(e) => handleRatings(e, place.placeId)}>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                        </select>
                                    }


                                    
                            <button className="btn-single">Post</button>
                     
                    
                    </form>
                    </div>
            </div>
                
                    
               
            </div>
     
    
    </>
    ) 
}

export default SinglePlace