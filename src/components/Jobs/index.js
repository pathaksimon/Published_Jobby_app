import {Component} from 'react'
import './index.css'
import Cookies from 'js-cookie'
import {BsSearch} from 'react-icons/bs'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import Typeofemployement from '../Typeofemployement'
import Depthdescription from '../Depthdescription'
import SalaryRanges from '../SalaryRanges'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiJobsStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Jobs extends Component {
  state = {
    jobDetails: [],
    jobbyfilter: [],
    salaryfilty: [],
    changeofstate: '',
    changeofstate1: '',
    status: apiJobsStatusConstants.initial,
    status1: apiStatusConstants.initial,
    profileData: [],
  }

  componentDidMount() {
    this.getProducts()
    this.onGetProfileDetails()
  }

  onGetProfileDetails = async () => {
    this.setState({status1: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const {jobbyfilter, salaryfilty, changeofstate1} = this.state
    const profileApiUrl = 'https://apis.ccbp.in/profile'
    const optionsProfile = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const responseProfile = await fetch(profileApiUrl, optionsProfile)

    if (responseProfile.ok === true) {
      const fetchedDataProfile = [await responseProfile.json()]
      const updatedDataProfile = fetchedDataProfile.map(eachItem => ({
        name: eachItem.profile_details.name,
        profileImageUrl: eachItem.profile_details.profile_image_url,
        shortBio: eachItem.profile_details.short_bio,
      }))
      this.setState({
        profileData: updatedDataProfile,
        responseSuccess: true,
        status1: apiStatusConstants.success,
      })
    } else {
      this.setState({status1: apiStatusConstants.failure})
    }
  }

  getProducts = async () => {
    const {jobbyfilter, salaryfilty, changeofstate1} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${jobbyfilter}&minimum_package=${salaryfilty}&search=${changeofstate1}`
    this.setState({status: apiJobsStatusConstants.inProgress})
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const fetched = await response.json()
      const changed = fetched.jobs.map(each => ({
        companyLogoUrl: each.company_logo_url,
        employementType: each.employment_type,
        id: each.id,
        jobDescription: each.job_description,
        location: each.location,
        packagePerAnnum: each.package_per_annum,
        rating: each.rating,
        title: each.title,
      }))
      this.setState({jobDetails: changed})
      this.setState({status: apiJobsStatusConstants.success})
    } else {
      this.setState({status: apiJobsStatusConstants.failure})
    }
  }

  Jobfilter = employmentTypeId => {
    const {jobDetails, jobbyfilter} = this.state

    const inputNotInList = jobbyfilter.filter(
      eachItem => eachItem === employmentTypeId,
    )

    if (jobbyfilter.length === 0) {
      this.setState(
        prevState => ({
          jobbyfilter: [...prevState.jobbyfilter, employmentTypeId],
        }),
        this.getProducts,
      )
    } else {
      const filteredData = jobbyfilter.filter(
        eachItem => eachItem !== employmentTypeId,
      )
      this.setState(
        prevState => ({jobbyfilter: filteredData}),
        this.getProducts,
      )
    }
  }

  salaryfilter = label => {
    const {jobDetails, salaryfilty} = this.state
    this.setState({salaryfilty: label}, this.getProducts)
  }

  onchangeofstate = event => {
    this.setState({changeofstate: event.target.value})
  }

  searchofRequired = () => {
    const {changeofstate} = this.state
    this.setState({changeofstate1: changeofstate}, this.getProducts)
  }

  finding = () => {
    const {jobDetails, changeofstate1} = this.state
    if (jobDetails.length === 0) {
      return (
        <>
          <img
            src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
            alt="no jobs"
          />
          <h1 className="head">No Jobs Found</h1>
          <p className="head">We could not find any jobs.Try other filters </p>
        </>
      )
    }
    return jobDetails.map(each1 => (
      <Depthdescription first1={each1} key={each1.id} />
    ))
  }

  failure = () => {
    const retryingit = () => {
      this.getProducts()
    }
    return (
      <>
        <img
          src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
          alt=" failure view"
        />
        <h1 className="color">Oops! Something Went Wrong</h1>
        <p className="color">
          We cannot seem to find the page you are looking for
        </p>
        <button onClick={retryingit}>Retry</button>
      </>
    )
  }

  progress = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  lookingstatus = () => {
    const {status} = this.state
    switch (status) {
      case apiJobsStatusConstants.success:
        return this.finding()
      case apiJobsStatusConstants.failure:
        return this.failure()
      case apiJobsStatusConstants.inProgress:
        return this.progress()
      default:
        return null
    }
  }

  onGetProfileView = () => {
    const {profileData, responseSuccess} = this.state

    if (responseSuccess) {
      const {name, profileImageUrl, shortBio} = profileData[0]

      return (
        <div className="profile-container">
          <img src={profileImageUrl} className="profile-icon" alt="profile" />
          <h1 className="profile-name">{name}</h1>
          <p className="profile-description">{shortBio}</p>
        </div>
      )
    }
    return null
  }

  onRetryProfile = () => {
    this.onGetProfileDetails()
  }

  onGetProfileFailureView = () => (
    <div className="failure-button-container">
      <button
        className="failure-button"
        type="button"
        onClick={this.onRetryProfile}
      >
        Retry
      </button>
    </div>
  )

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  gettingProfile = () => {
    const {status1} = this.state

    switch (status1) {
      case apiStatusConstants.success:
        return this.onGetProfileView()
      case apiStatusConstants.failure:
        return this.onGetProfileFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    const {jobDetails, changeofstate1, profileData} = this.state
    console.log(jobDetails)
    console.log(profileData)
    return (
      <>
        <Header />
        <div className="Jobs-container">
          <div className="Filter-card">
            <div className="inside-filter">
              {this.gettingProfile()}
              <hr className="hori" />

              <div className="bottom-salary">
                <h1 className="heading">Type of Employement</h1>
                <ul className="ulu">
                  {employmentTypesList.map(each => (
                    <Typeofemployement
                      key={each.employmentTypeId}
                      type={each}
                      Jobfilter={this.Jobfilter}
                    />
                  ))}
                </ul>
              </div>
              <hr className="hori" />

              <div className="bottom-salary">
                <h1 className="heading">Salary Range</h1>
                <ul className="ulu">
                  {salaryRangesList.map(each => (
                    <SalaryRanges
                      key={each.salaryRangeId}
                      type1={each}
                      salaryfilter={this.salaryfilter}
                    />
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="description-card">
            <div className="top-search-icons">
              <input
                onChange={this.onchangeofstate}
                type="search"
                className="searchpatti"
              />
              <button
                data-testid="searchButton"
                onClick={this.searchofRequired}
                className="searchIcon"
                type="button"
              >
                <BsSearch />
              </button>
            </div>
            <ul className="ulu2">{this.lookingstatus()}</ul>
          </div>
        </div>
      </>
    )
  }
}

export default Jobs
