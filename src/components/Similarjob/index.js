import './index.css'
import {AiFillStar} from 'react-icons/ai'

const Similarjob = props => {
  const {first2} = props

  const {
    location,
    companyLogoUrl,
    employementtype,
    jobDescription,
    title,
    rating,
  } = first2
  return (
    <li className="lista2">
      <div className="inside-1">
        <img
          src={companyLogoUrl}
          alt="similar job company logo"
          className="bottom-card-icon"
        />
        <div className="below-side">
          <h1 className="textcolors inside-of-inside">{title}</h1>

          <div className="limo">
            <p className="textcolors">{rating}</p>
            <AiFillStar className="star-decoration" />
          </div>
        </div>
      </div>

      <div className="inside-2">
        <h1 className="textcolors">Description</h1>
        <p className="textcolors">{jobDescription}</p>
        <p className="textcolors">{location}</p>
        <p className="textcolors">{employementtype}</p>
      </div>
    </li>
  )
}

export default Similarjob
