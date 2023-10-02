import {Component} from 'react'
import './index.css'
import Cookies from 'js-cookie'
import {BiLinkExternal} from 'react-icons/bi'
import {AiFillStar} from 'react-icons/ai'
import Header from '../Header'

import Skillssection from '../Skillssection'
import Similarjob from '../Similarjob'

class Indepth extends Component {
  state = {
    usefulJobDetails: {},
    skills1: [],
    lifeatcompany1: {},
    similarJob1: [],
  }

  componentDidMount() {
    this.getDetails()
  }

  getDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jobDetailsApiUrl = `https://apis.ccbp.in/jobs/${id}`
    const jwtToken = Cookies.get('jwt_token')
    const optionsJobData = {
      headers: {Authorization: `Bearer ${jwtToken}`},
      method: 'GET',
    }
    const response = await fetch(jobDetailsApiUrl, optionsJobData)
    const data = await response.json()
    console.log(data)
    if (response.ok === true) {
      const jobDetails = [data.job_details].map(aich => ({
        id: aich.id,
        companyLogoUrl: aich.company_logo_url,
        companyWebsite: aich.company_website_url,
        employmentType: aich.employment_type,
        jobDescription: aich.job_description,

        lifeatcompany: {
          description: aich.life_at_company.description,
          imageUrl: aich.life_at_company.image_url,
        },
        location: aich.location,
        ppa: aich.package_per_annum,
        rating: aich.rating,
        skills: aich.skills.map(kich => ({
          name: kich.name,
          imageUrl: kich.image_url,
        })),
        title: aich.title,
      }))

      const similarJob = data.similar_jobs.map(each4 => ({
        companyLogoUrl: each4.company_logo_url,
        employementtype: each4.employment_type,
        id: each4.id,
        jobDescription: each4.job_description,
        location: each4.location,
        rating: each4.rating,
        title: each4.title,
      }))
      this.setState({usefulJobDetails: jobDetails[0]})
      this.setState({skills1: jobDetails[0].skills})
      this.setState({lifeatcompany1: jobDetails[0].lifeatcompany})
      this.setState({similarJob1: similarJob})
    }
  }

  render() {
    const {usefulJobDetails, skills1, lifeatcompany1, similarJob1} = this.state

    const {
      companyLogoUrl,
      employmentType,
      title,
      location,
      ppa,
      jobDescription,
      skills,
      rating,
      lifeatcompany,
      companyWebsite,
    } = usefulJobDetails
    const {description, imageUrl} = lifeatcompany1
    console.log(similarJob1)
    return (
      <>
        <Header />
        <div className="biggi">
          <div className="details-card">
            <div className="first">
              <div className="first-inside">
                <div className="logo-details">
                  <img
                    src={companyLogoUrl}
                    alt="job details company logo"
                    className="top-corner-logo"
                  />

                  <div className="logo-card2">
                    <h1 className="textcolors">{title}</h1>
                    <div className="limo">
                      <p className="textcolors">{rating}</p>
                      <AiFillStar className="star-decoration" />
                    </div>
                  </div>
                </div>
                <div className="location-details">
                  <li className="location123">
                    <p className="locate textcolors">{location}</p>
                    <p className="textcolors">{employmentType}</p>
                  </li>
                  <li className="package">
                    <p className="colors textcolors">{ppa}</p>
                  </li>
                </div>
              </div>
              <hr className="hori3" />
              <div className="second-inside">
                <div className="tc">
                  <h1 className="textcolors">Description</h1>

                  <a href={companyWebsite}>
                    Visit <BiLinkExternal />
                  </a>
                </div>
                <div className="bc">
                  <p className="dscription textcolors">{jobDescription}</p>
                </div>
              </div>
            </div>
            <h1 className="header-skills textcolors">Skills</h1>
            <ul className="second">
              {skills1.map(each1 => (
                <Skillssection herefirst={each1} key={each1.name} />
              ))}
            </ul>
            <h1 className="life-description textcolors">Life at Company</h1>
            <div className="third">
              <p className="textcolors">{description}</p>
              <img
                src={imageUrl}
                alt="life at company"
                className="right-bottom-corner-photo"
              />
            </div>
          </div>
          <h1 className="textcolors">Similar Jobs</h1>
          <ul className="similar-jobs-card">
            {similarJob1.map(each5 => (
              <Similarjob first2={each5} key={each5.id} />
            ))}
          </ul>
        </div>
      </>
    )
  }
}

export default Indepth
