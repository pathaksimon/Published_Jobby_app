import './index.css'
import {Link} from 'react-router-dom'
import {AiFillStar} from 'react-icons/ai'

const Depthdescription = props => {
  const {first1} = props
  const {
    companyLogoUrl,
    employementType,
    title,
    rating,
    location,
    packagePerAnnum,
    jobDescription,
    id,
  } = first1
  return (
    <Link className="underline" to={`/jobs/${id}`}>
      <li className="cards">
        <div className="margin-card">
          <div className="inside-first">
            <div className="inside-of-inside1">
              <div className="i1">
                <img
                  src={companyLogoUrl}
                  alt="job details company logo"
                  className="company-logo"
                />
              </div>
              <div className="i2">
                <h1 className="decoration">{title}</h1>
                <div className="align-them">
                  <AiFillStar className="star-icon" />
                  <p className="decoration">{rating}</p>
                </div>
              </div>
            </div>
            <div className="inside-of-inside2">
              <div className="o1">
                <p className="decoration">{location}</p>
                <p className="decoration">{employementType}</p>
              </div>
              <div className="o2">
                <p className="decoration">{packagePerAnnum}</p>
              </div>
            </div>
          </div>
          <hr />
          <div className="inside-second">
            <h1 className="decoration">Description</h1>
            <p className="description-para">{jobDescription}</p>
          </div>
        </div>
      </li>
    </Link>
  )
}

export default Depthdescription
